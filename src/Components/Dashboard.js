import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import { updateUser} from '../redux/reducer'
import ChildList from './ChildList'
import './dashBoard.css'



class  Dashboard extends Component  {
    componentDidMount(){
        axios.get('/auth/userinfo')
        .then(res => {
            this.props.updateUser(res.data)    
        })
        .catch(err => this.props.history.push('/') )
    }


   render(){
    
    const {id, username, email, first_name, last_name, image} = this.props

    return (
        <div className='maindash'>
            <div className='userContainer'>
                <img className='profilePic' src={image ? image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkur8aZm5BZJMaT-KdzNPHsZVoNyUkOfJ36WnXJskQJyFYGuOZYg'} alt="" />
                <h2 className='name'>{first_name} {last_name}</h2>
                <button className='button'>Add Child</button>
                <button className='button'>View Charts</button>
                <button className='button'>Edit Profile</button>
            </div>
            <ChildList />
        </div>
    )

 }
}
function mapStateToProps(state){
    return state
}

export default connect(mapStateToProps, {updateUser})(Dashboard)