import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import Dropzone from 'react-dropzone'
import { BarLoader } from 'react-spinners'
import randomstring from 'randomstring'
import {Link} from 'react-router-dom'
import { updateUser} from '../redux/reducer'


class ProfileEdit extends Component {
    constructor(){
        super()
        this.state = {
            user: [],
            username: '',
            email: '',
            first_name: '',
            last_name: '',
            image: '',
            isUploading: false,
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkur8aZm5BZJMaT-KdzNPHsZVoNyUkOfJ36WnXJskQJyFYGuOZYg'
        }
    }  

    componentDidMount(){
        
        return axios.get('/auth/user')
        .then(res => {
       
          this.setState({
              user: res.data,
              image: res.data.image
          })
            
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {email,
            first_name, 
            last_name, 
            image} = this.state


        
        axios.put('/auth/updateuser', {
            email,
            first_name, 
            last_name, 
            image} )
        .then(res => {
            this.props.history.push('/dashboard')})
        .catch((err) => {console.log(err)
        alert('Incorect Username or Password')})
        e.target.first_name = ''
        e.target.last_name = ''
        this.setState({
            image: '',
        
        })
   
    }
    

getSignedRequest = ([file]) => {
    this.setState({isUploading: true})
    
    const fileName = `${randomstring.generate()}-${file.name.replace(/\s/g, '-')}`
   
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

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    render() {
        return (
            <div className='box' >  
            <div className='container'>
                <div className='logInTitle'>
                    <h1>Edit</h1>
                </div>
                <form className='loginForm' onSubmit={this.handleSubmit}>
                <img className='addedImage' src={this.state.image ? this.state.image : this.state.url} alt=""/>
                    <input 
                    className='username'
                    type="text"
                    name='first_name'
                    placeholder={this.props.first_name}
                    onChange={this.handleChange}
                    />
                    <input 
                    className='username'
                    type="text"
                    name='last_name'
                    placeholder={this.props.last_name}
                    onChange={this.handleChange}
                    />
                    <input 
                    className='username'
                    type="text"
                    name='email'
                    placeholder={this.props.email}
                    onChange={this.handleChange}
                    />
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
                    <div>
            </div>
                    <Link to='/dashboard' className='button' onClick={this.handleSubmit}>Submit</Link>
                    <Link to='/dashboard' className='button' >Cancel</Link>
                </form>

            </div>
        </div>
        )
    }
}

function mapStateToProps(state){
    return state
}

export default connect(mapStateToProps,{updateUser})(ProfileEdit)