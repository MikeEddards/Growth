import React, { Component } from 'react'
import axios from 'axios'
import Dropzone from 'react-dropzone'
import { BarLoader } from 'react-spinners'
import randomstring from 'randomstring'
import {Link} from 'react-router-dom'
import './addChild.css'


class AddChild extends Component {
    constructor(){
        super()
        this.state = {
            first_name: '',
            last_name: '',
            sex: 'female',
            image: '',
            isUploading: false,
            checked: true,
            style: true
         
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    addChild = (e) => {
        e.preventDefault()
        
        const {first_name, last_name, sex, image} = this.state
        axios.post('/api/addchild', {first_name, last_name, sex, image})
        .then(res => this.props.history.push('./dashboard'))
        .catch((err) => {console.log(err)
        alert('Incorect Username or Password')})
        e.target.first_name = ''
        e.target.last_name = ''
    }
    handleCheck = () => {
        this.setState({
            style: !this.state.style,
            sex: this.state.style ? 'male' : 'female'
        })
    }
   
    changeStyle = () =>{
        this.setState({
            style: !this.state.style
        })
    }
    getSignedRequest = ([file]) => {
        this.setState({isUploading: true})
        
        const fileName = `${randomstring.generate()}-${file.name.replace(/\s/g, '-')}`
        console.log(fileName)
        axios.get('/sign-s3', {
            params: {
            'file-name': fileName,
            'file-type': file.type
            }
        }).then( (res) => {
            const { signedRequest, url } = res.data 
    
            this.uploadFile(file, signedRequest, url)
        }).catch( err => {
            console.log(err)
        })
        }
    
        uploadFile = ( file, signedRequest, url) => {
            const header = {
                headers: {
                    'Content-Type': file.type,
                    },
                };
            axios.put(signedRequest, file, header)
            .then((res) => {
                this.setState({
                    image: url,
                    isUploading: false
                })
                
            })
        }
render() {
 
    return (
        <div className='container'>
            <div className='logInTitle'>
                <h1>Add Data</h1>
            </div>
            <form className='loginForm' onSubmit={this.addChild}>
                 <input 
                    className='username'
                    type="text"
                    name='first_name'
                    placeholder='First Name'
                    onChange={this.handleChange}
                />
                <input 
                    className='username'
                    type="text"
                    name='last_name'
                    placeholder='Last Name'
                    onChange={this.handleChange}
                />
            <div className='switch'>
                <h3 
                    onClick={this.handleCheck} className={this.state.style ? 'default' : 'notdefault'}>Male</h3>
                <h3 
                onClick={this.handleCheck} className={this.state.style ? 'notdefault' : 'default'}>Female</h3>
            </div>
            <Dropzone
                onDropAccepted={this.getSignedRequest}
                accept="image/*"
                multiple={false}>
                {({getRootProps, getInputProps}) => (
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {this.state.isUploading ? <BarLoader
color={'#304246'} /> : <span className='button'>Upload Picture</span>}
                </div>
            )}
            </Dropzone> 

                <Link to='/dashboard' className='button'
                onClick={this.addChild}>Add</Link>
                <Link to='/dashboard' className='button'
                >Cancel</Link>
            </form>
        </div>
        )
    }
}
export default AddChild