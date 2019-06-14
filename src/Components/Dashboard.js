import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import { updateUser, addAgeData} from '../redux/reducer'
import ChildList from './ChildList'
import {Link} from 'react-router-dom'
import './dashBoard.css'



class  Dashboard extends Component  {
    

    componentDidMount(){
        
        axios.get('/auth/userinfo')
        .then(res => {
            this.props.updateUser(res.data)    
        })
        .catch(err => this.props.history.push('/') )

        axios.get('/api/alldata')
        .then(res => {
            this.props.addAgeData(res.data)
        })
    }


   render(){
    console.log(this.props.ageData)
    const {first_name, last_name, image} = this.props

    return (
        <div className='maindash'>
            <div className='userContainer'>
                <img className='profilePic' src={image ? image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkur8aZm5BZJMaT-KdzNPHsZVoNyUkOfJ36WnXJskQJyFYGuOZYg'} alt="" />
                <h2 className='name'>{first_name} {last_name}</h2>
                <Link to='/addchild' className='button'>Add Child</Link>
                <Link to='/charts' className='button'>View Charts</Link>
                <Link to='/profileedit' className='button'>Edit Profile</Link>
            </div>
            <ChildList />
        </div>
    )

 }
}
function mapStateToProps(state){
    return state
}

export default connect(mapStateToProps, {updateUser, addAgeData})(Dashboard)