import React, { Component } from 'react'
import axios from 'axios'
class Register extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: '',
            email: '',
            first_name: '',
            last_name: ''
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    register = (e) => {
        e.preventDefault()
        
        const {username, password, email, first_name, last_name} = this.state
        axios.post('/auth/register', {username, password, email, first_name, last_name})
        .then(res => this.props.history.push('./dashboard'))
        .catch((err) => {console.log(err)
        alert('Incorect Username or Password')})
        e.target.username = ''
        e.target.password = ''
    }
    render() {
        return (
            <div className='container'>
                <div className='logInTitle'>
                    <h1>Register</h1>
                </div>
                <form className='loginForm' onSubmit={this.register}>
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
                    <input 
                    className='username'
                    type="email"
                    name='email'
                    placeholder='Email'
                    onChange={this.handleChange}
                    />
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
                    <button className='button'>Register</button>
                </form>
            </div>
        )
    }
}
export default Register