import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getChildren} from '../redux/reducer'
import {Link} from 'react-router-dom'
import './childList.css'



let childList

class ChildList extends Component {


async componentDidMount(){
    const children = await axios.get('/api/getchildren')
    this.props.getChildren(children.data)
     childList = await this.props.children.map((child, i)=>(
        <div key={child.child_id} className='kid'>
            <img className='childPic' src={child.image ? child.image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkur8aZm5BZJMaT-KdzNPHsZVoNyUkOfJ36WnXJskQJyFYGuOZYg'} alt="" />
            <h2 className='name'>{child.first_name} {child.last_name}</h2>
            <Link className='button' to={`/childdata/${child.child_id}`}>Data</Link>
            <Link className='button' to={`/childedit/${child.child_id}`} >Edit</Link>
            <span className='colorDisplay' style={{background: `${child.color}`}}>Chart color</span>
        </div>
    ))
    return childList
    }

    render() {
        


        return (
            <div className='childbox'>
                {childList}
            </div>
        )
    }
}

function mapStateToProps(state){
    return state
}

export default connect(mapStateToProps, {getChildren})(ChildList)