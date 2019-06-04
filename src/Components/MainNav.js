import React, { Component } from 'react'
import './mainnav.css'
import {Link} from 'react-router-dom'
import sapling from '../Image/sapling.png'
export default class MainNav extends Component {
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
                            <Link to="/" className='list'>Home</Link>
                            <li className='list'>Register</li>
                            <li className='list'>About</li>
                        </ul>

                   
                </nav>
            </div>
        )
    }
}
