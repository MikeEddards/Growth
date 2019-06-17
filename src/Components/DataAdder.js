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
            months: null,
            years: null,
            age: null,
            height: null,
            weight: null,
            head_size: null,
            image: '',
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkur8aZm5BZJMaT-KdzNPHsZVoNyUkOfJ36WnXJskQJyFYGuOZYg',
            isUploading: false,
            isMonths: false,
            slide: 'noContainer',
            dataSlide: 'noContainer'
            
        }
    }
async componentDidMount(){
    this.time()
  const res = await axios.get(`/api/childdata/${this.props.match.params.id}`) 
try{
  dataSet = await res.data.map(child => (
      <div className='data' key={child.data_id}>
          <div className='h3'>
          {child.image && <img className='dataPic' src={child.image} /> }
          </div>
          <div className='ageh3'>
            {child.age && <h3 >
            {child.age}</h3>}
          </div>
          {child.height && <h3 className='h3'>{child.height}</h3>}
          {child.weight && <h3 className='h3'>{child.weight}</h3>}
          {child.head_size ? <h3 className='h3'>{child.head_size}</h3> :
         <h3 className='h3'>none</h3> }
         <Link className='button' to={`/dataedit/${child.child_id}${child.data_id}`} >Edit</Link>

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
        let month = this.state.months / 12
        let year = this.state.years
        let newAge = null 
        if(!year){
            newAge = +month.toFixed(3)
        }else if(!month){
            newAge = +year
        }else if((year <= 0) && (month <12)){
            newAge = +month.toFixed(3)
        }
        else if((year >= 1) && (month <12)){
            newAge = +year + +month.toFixed(3)
        }else if(+month === 0){
            newAge = 0 
        }else{
            newAge = +year
        }

        const {
            
            height, 
            weight,
            head_size,
            image
        } = this.state
        axios.post('/api/adddata', {
            child_id: this.props.match.params.id,
            age: newAge,
            height,
            weight,
            head_size,
            image})
        .then(res => {

            this.setState({
                allData: [...this.state.allData, res.data[0]]
            })
        
        })
        .catch((err) => {console.log(err)
        alert('Log In Please')})
        e.target.age = null
        e.target.height = null
        e.target.weight = null
        e.target.head_size = null
        this.setState({
            image: ''
        })
        this.props.history.push('/dashboard')
    }

    slideIn = () => {
        this.setState({
            slide: 'dataBox',
            dataSlide: 'dataContainer'
        })
    }
    time = () => setInterval(this.slideIn,200)



    
    render() {
        return (
          <div className='box' >  
            <div className={this.state.slide}>
                <div className='logInTitle'>
                    <h1>Add Data</h1>
                </div>
                <form className='addDataForm' onSubmit={this.addData}>
                    <img className='addedImage' src={this.state.image ? this.state.image : this.state.url} alt=""/>
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

                    <span className='agebox'>
                    <input 
                    className='age'
                    type="number"
                    name='years'
                    placeholder='years'
                    min='0'
                    max='20'
                    onChange={this.handleChange}
                    />
                    <input 
                    className='age'
                    type="number"
                    name='months'
                    placeholder='months'
                    min='0'
                    max='12'
                    onChange={this.handleChange}
                    />
                    </span>
                    <input 
                    className='username'
                    type="number"
                    name='height'
                    placeholder='Height'
                    min='0'
                    onChange={this.handleChange}
                    />
                    <input 
                    className='username'
                    type="number"
                    name='weight'
                    placeholder='Weight'
                    min='0'
                    onChange={this.handleChange}
                    />
                    <input 
                    className='username'
                    type="number"
                    name='head_size'
                    placeholder='Head size'
                    min='0'
                    onChange={this.handleChange}
                    />

                    
                    <button onClick={this.addData} className='button'>Add Data</button>
                    <Link className='button' to='/dashboard'>Cancel</Link>
                </form>
            </div>
            
                <div className={this.state.dataSlide}>
                <div className='dataSet'>
                        
                    <h3 className='h3'>Image</h3>
                    <h3 className='h3'>Age</h3>
                    <h3 className='h3'>Height</h3>
                    <h3 className='h3'>Weight</h3>
                    <h3 className='h3'>Head size</h3>
                    <span className='empty'></span>
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