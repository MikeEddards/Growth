import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import 'rc-color-picker/assets/index.css'
import ColorPicker from 'rc-color-picker'
import hexRgb from 'hex-rgb'
import Dropzone from 'react-dropzone'
import { BarLoader } from 'react-spinners'
import randomstring from 'randomstring'

class ChildEdit extends Component {

    constructor(){
        super()
        this.state = {
            first_name: '',
            last_name: '',
            chart_color: '',
            image: '',
            child_id: null,
            isUploading: false,
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkur8aZm5BZJMaT-KdzNPHsZVoNyUkOfJ36WnXJskQJyFYGuOZYg'

        }
    }
    componentDidMount(){
        
        return axios.get(`/api/getchildinfo/${this.props.match.params.id}`)
        .then(res => {
          
            this.setState({
                first_name: res.data.first_name,
                last_name: res.data.last_name,
                chart_color: res.data.color,
                image: res.data.image,
                child_id: res.data.child_id
            })
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
 
        const {first_name, last_name, chart_color, image } = this.state
        axios.put(`/api/updateinfo/${this.state.child_id}`, {first_name, last_name, chart_color, image })
        .then(res => this.props.history.push('/dashboard'))
        .catch((err) => {console.log(err)
        alert('Incorect Username or Password')})
        e.target.first_name = ''
        e.target.last_name = ''
        this.setState({
            first_name: '',
            last_name: '',
            chart_color: '',
            image: '',
            child_id: null
        })
            
    }
   changeHandler = (colors) => {

        let color = hexRgb(colors.color)
       
        this.setState({
            chart_color: `rgb(${color.red},${color.green},${color.blue})`
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
    handleDelete = () => {
     axios.delete(`/api/deletechild/${this.props.match.params.id}`)
     .then(res => console.log(res.status))  
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
                    placeholder={this.state.first_name}
                    onChange={this.handleChange}
                    />
                    <input 
                    className='username'
                    type="text"
                    name='last_name'
                    placeholder={this.state.last_name}
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
               <div style={{ textAlign: 'center' }}>
                    <ColorPicker
                    color={`${this.state.chart_color}`}
                    onChange={this.changeHandler}
                    >
                      
                    <span  className='button' >Chart Color</span>
                    </ColorPicker>
                </div>
            </div>
                    <Link to='/dashboard' className='button' onClick={this.handleSubmit}>Submit</Link>
                    <Link to='/dashboard' className='button' onClick={this.handleSubmit}>Cancel</Link>
                    <Link to='/dashboard' className='button' onClick={this.handleDelete}>Delete</Link>

                </form>

            </div>
        </div>
        )
}}

export default ChildEdit