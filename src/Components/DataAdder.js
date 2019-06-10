import React, { Component } from 'react'
import './login.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './dataAdder.css'
import Dropzone from 'react-dropzone'
import { BarLoader } from 'react-spinners'
import randomstring from 'randomstring'



let dataSet

class DataAdder extends Component {
    constructor(){
        super()
        this.state = {
            allData: [],
            age: null,
            height: null,
            weight: null,
            head_size: null,
            image: '',
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkur8aZm5BZJMaT-KdzNPHsZVoNyUkOfJ36WnXJskQJyFYGuOZYg',
            isUploading: false
            
        }
    }
async componentDidMount(){

  const res = await axios.get(`/api/childdata/${this.props.match.params.id}`) 
try{
  dataSet = await res.data.map(child => (
      <div className='data' key={child.data_id}>
          <div className='h3'>
          {child.image && <img className='dataPic' src={child.image} /> }
          </div>
          {child.age && <h3 className='h3'>{child.age}</h3>}
          {child.height && <h3 className='h3'>{child.height}</h3>}
          {child.weight && <h3 className='h3'>{child.weight}</h3>}
          {child.head_size ? <h3 className='h3'>{child.head_size}</h3> :
         <h3 className='h3'>none</h3> }

      </div>
  ))
        this.setState({
            allData: res.data 
        })
    }
        catch(err){
            this.props.history.push('/')
        }
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
    addData = (e) => {
        e.preventDefault()

        const {
            age,
            height,
            weight,
            head_size,
            image
        } = this.state
        axios.post('/api/adddata', {
            child_id: this.props.match.params.id,
            age,
            height,
            weight,
            head_size,
            image})
        .then(res => {

            this.setState({
                allData: [...this.state.allData, res.data[0]]
            })
            this.props.history.push('/dashboard')
        })
        .catch((err) => {console.log(err)
        alert('Incorect Username or Password')})
        e.target.age = null
        e.target.height = null
        e.target.weight = null
        e.target.head_size = null
        this.setState({
            image: ''
        })
    }


    render() {
        return (
          <div className='box' >  
            <div className='container'>
                <div className='logInTitle'>
                    <h1>Add Data</h1>
                </div>
                <form className='loginForm' onSubmit={this.addData}>
                    <img className='addedImage' src={this.state.image ? this.state.image : this.state.url} alt=""/>
                    <input 
                    className='username'
                    type="number"
                    name='age'
                    placeholder='Age'
                    onChange={this.handleChange}
                    />
                    <input 
                    className='username'
                    type="number"
                    name='height'
                    placeholder='Height'
                    onChange={this.handleChange}
                    />
                    <input 
                    className='username'
                    type="number"
                    name='weight'
                    placeholder='Weight'
                    onChange={this.handleChange}
                    />
                    <input 
                    className='username'
                    type="number"
                    name='head_size'
                    placeholder='Head size'
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

                    
                    <button onClick={this.addData} className='button'>Add Data</button>
                    <Link className='button' to='/dashboard'>Cancel</Link>
                </form>
            </div>
            
                <div className='dataContainer'>
                <div className='dataSet'>
                        
                    <h3 className='h3'>Image</h3>
                    <h3 className='h3'>Age</h3>
                    <h3 className='h3'>Height</h3>
                    <h3 className='h3'>Weight</h3>
                    <h3 className='h3'>Head size</h3>
                </div>         
                <dir className='displayData'>           
                    {dataSet}
                </dir>         
                        
             </div>           
        </div>
        
        )
    }
}
export default DataAdder