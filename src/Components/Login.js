import React, { Component } from 'react'
import './login.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import InfoSplash from './InfoSplash'

class Login extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: ''        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    userLogin = (e) => {
        e.preventDefault()
      
        const {username, password} = this.state
        axios.post('/auth/login', {username, password})
        .then(res => this.props.history.push('/dashboard'))
        .catch((err) => {console.log(err)
        alert('Incorect Username or Password')})
        e.target.username = ''
        e.target.password = ''
    }


    render() {
        return (
          <div className='box' >  
            <div className='container'>
                <div className='logInTitle'>
                    <h1>Log In</h1>
                </div>
                <form className='loginForm' onSubmit={this.userLogin}>
                    <input 
                    className='username'
                    type="text"
                    name='username'
                    placeholder='Username'
                    onChange={this.handleChange}
                    />
                    <input 
                    className='password'
                    type="password"
                    name='password'
                    placeholder='Password'
                    onChange={this.handleChange}
                    />
                    <button className='button'>Log In</button>
                    <Link to='/register' className='button'>Register</Link>
                </form>
            </div>
            <div>
                <InfoSplash />
            </div>
            </div>
        )
    }
}
export default withRouter(Login)