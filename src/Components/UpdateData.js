import React, { Component } from 'react'
import './login.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './dataupdate.css'
import Dropzone from 'react-dropzone'
import { BarLoader } from 'react-spinners'
import randomstring from 'randomstring'





class UpdateData extends Component {
    constructor(){
        super()
        this.state = {
            allData: [],
            age: null,
            height: null,
            weight: null,
            head_size: null,
            image: '',
            isUploading: false
            
        }
    }
async componentDidMount(){

  const res = await axios.get(`/api/getonedata/${this.props.match.params.id}`) 
    .then(res => {
        this.setState({
            age: +res.data[0].age,
            height: +res.data[0].height,
            weight: +res.data[0].weight,
            head_size: +res.data[0].head_size,
            image: res.data[0].image,
        })
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
    addData = (e) => {
        e.preventDefault()

        const {
            age,
            height,
            weight,
            head_size,
            image
        } = this.state
        axios.put(`/api/updatedata/${this.props.match.params.id}`, {
            age: age,
            height: +height || null,
            weight: +weight || null,
            head_size: +head_size || null,
            image})
        .then(res => {

            this.setState({
            image: ''
        })
            this.props.history.push(`/childdata/${this.props.match.params.childid}`)
        })
        .catch((err) => {console.log(err)})
        
    }
    handleDelete = (e) => {
        axios.delete(`/api/deletedatapoint/${this.props.match.params.id}`)
        .then(res => {
            this.setState({
            image: ''
        })
            this.props.history.push(`/childdata/${this.props.match.params.childid}`)
        })
    }
    handleCancel = () => {
        this.props.history.push(`/childdata/${this.props.match.params.childid}`)
    }

    render() {

        return (
          <div className='box' >  
            <div className='datacontainer'>
                <div className='logInTitle'>
                    <h1>Edit Data</h1>
                </div>
                <form className='dataForm' onSubmit={this.addData}>
                    <img className='addedImage' src={this.state.image} alt=""/>
                    <h4>Age</h4>
                    <input 
                    className='username'
                    type="number"
                    name='age'
                    placeholder={this.state.age}
                    onChange={this.handleChange}
                    />
                    <h4>Height</h4>
                    <input 
                    className='username'
                    type="number"
                    name='height'
                    placeholder={this.state.height}
                    onChange={this.handleChange}
                    />
                    <h4>Weight</h4>
                    <input 
                    className='username'
                    type="number"
                    name='weight'
                    placeholder={this.state.weight}
                    onChange={this.handleChange}
                    />
                    <h4>Head size</h4>
                    <input 
                    className='username'
                    type="number"
                    name='head_size'
                    placeholder={this.state.head_size}
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

                    
                    <button onClick={this.addData} className='button'>Update Data</button>
                    <button className='button' onClick={this.handleCancel}>Cancel</button>
                    <button className='buttonDel' onClick={this.handleDelete}>Delete</button>
                </form>
            </div>       
        </div>
        
        )
    }
}
export default UpdateData