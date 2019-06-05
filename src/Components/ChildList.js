import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getChildren} from '../redux/reducer'

let childList

class ChildList extends Component {

async componentDidMount(){
    const children = await axios.get('/api/getchildren')
    this.props.getChildren(children.data)
     childList = await this.props.children.map((child, i)=>(
        <h1>{child.first_name}</h1>
    ))
    return childList
    }

    render() {
        


        return (
            <div>
                {childList}
            </div>
        )
    }
}

function mapStateToProps(state){
    return state
}

export default connect(mapStateToProps, {getChildren})(ChildList)