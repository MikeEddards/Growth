import React, { Component } from 'react'
import './mainnav.css'
import {Link} from 'react-router-dom'
import sapling from '../Image/sapling.png'
import {connect} from 'react-redux'

 class MainNav extends Component {
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
                            {this.props.id ? <Link className='list' to='/dashboard'>Dashboard</Link> : <Link className='list' to='/'>Home</Link>}
                           

                            {this.props.id ? <Link className='list'>Log Out</Link> :
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

export default connect(mapStateToProps)(MainNav)