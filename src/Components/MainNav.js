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
            windowWidth: null,
            windowHeight: null,
            dropDown: true,
            classMenu: 'menu',
            classDrop: 'noShow'
         }
     }
     componentDidMount(){
        window.addEventListener('resize', this.updateSize)
        
     }
     logOut = () => {
        this.props.clearStore()
        axios.get('/auth/logout')
     }
     updateSize = () => {
        this.setState({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        })
        if((this.state.windowWidth > 985) && (this.state.classDrop === 'show')){
            this.setState({
                classDrop: 'noShow'
            })
        }
     }
     handleDropdown = () => {
         this.setState({
             dropDown: !this.state.dropDown
         })
        if(this.state.dropDown){
            this.setState({
                classDrop: 'show'
            })
        }else if(!this.state.dropDown){
            this.setState({
                classDrop: 'noShow'
            })
        }
     }
     render() {
        console.log(this.state.windowWidth)
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
            <div>
                {this.state.windowWidth <= 985 ?
                <div onClick={this.handleDropdown} className='menuBox'> 
                <div className={this.state.classMenu}></div>
                <div className={this.state.classMenu}></div>
                <div className={this.state.classMenu}></div>
                </div>
                :
                <div className='links'>
                {this.props.email ? <Link className='list' to='/dashboard'>Dashboard</Link> : <Link className='list' to='/'>Home</Link>}
                
    
                {this.props.email ? <Link onClick={this.logOut} to='/' className='list'>Log Out</Link> :
                <Link to='/register' className='list'>Register</Link>}
    
            </div>

            }
            </div>


                   
                </nav>
            <div className={this.state.classDrop}>
                <div className='dropDownLinks'>
                {this.props.email ? <Link className='list' to='/dashboard'>Dashboard</Link> : <Link className='list' to='/'>Home</Link>}
                
    
                {this.props.email ? <Link onClick={this.logOut} to='/' className='list'>Log Out</Link> :
                <Link to='/register' className='list'>Register</Link>}
    
            </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state){

    return state
}

export default connect(mapStateToProps, {clearStore})(MainNav)