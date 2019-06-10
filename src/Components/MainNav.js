import React, { Component } from 'react'
import './mainnav.css'
import {Link} from 'react-router-dom'
import sapling from '../Image/sapling.png'
import {connect} from 'react-redux'
import axios from 'axios'
import {clearStore} from '../redux/reducer'

 class MainNav extends Component {
     constructor(){
         super()
         this.state = {

         }
     }
     logOut = () => {
        this.props.clearStore()
        axios.get('/auth/logout')
        .then(res => console.log('ok') )
    
     }
     render() {

        return (
    <div>
        <nav>
            <div className='logoContainer' >
                <div className='logoBackground'>
                <img className='logo' src={sapling} alt=""/>
                </div>
                <div>
                    <h1 className='title'>Watch my Growth</h1>
                </div>
            </div>
    
        <ul className='links'>
            {this.props.email ? <Link className='list' to='/dashboard'>Dashboard</Link> : <Link className='list' to='/'>Home</Link>}
            

            {this.props.email ? <Link onClick={this.logOut} to='/' className='list'>Log Out</Link> :
            <Link to='/register' className='list'>Register</Link>}

            <li className='list'>About</li>
        </ul>

                   
                </nav>
            </div>
        )
    }
}
function mapStateToProps(state){

    return state
}

export default connect(mapStateToProps, {clearStore})(MainNav)