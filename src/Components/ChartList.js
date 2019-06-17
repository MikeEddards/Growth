import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './charts.css'

 class ChartList extends Component {
    constructor(){
        super()
        this.state = {
            slide: 'noContainer',
            charts: 'noContainer'
        }
    }
    componentDidMount(){
        this.time()
    }
    slideIn = () => {
        this.setState({
            slide: 'chartList',
            charts: 'charts'
        })
    }
    time = () => setInterval(this.slideIn,200)
    render(){
    return (
        <div className={this.state.slide}>
            <Link to='/heightChart036boys'className={this.state.charts}>
                <h3>Height</h3>
                <p>Boys 0-36 months</p>
            </Link>
            <Link to='/heightChart036girls'className={this.state.charts}>
                <h3>Height</h3>
                <p>Girls 0-36 months</p>
            </Link>
            <Link to='/cdcweightboys036'className={this.state.charts}>
                <h3>Weight</h3>
                <p>Boys 0-36 months</p>
            </Link>
            <Link to='/cdcweightgirls036'className={this.state.charts}>
                <h3>Weight</h3>
                <p>Girls 0-36 months</p>
            </Link>
            <Link to='/cdcheadsize036boys'className={this.state.charts}>
                <h3>Head size</h3>
                <p>Boys 0-36 months</p>
            </Link>
            <Link to='/cdcheadsize036girls'className={this.state.charts}>
                <h3>Head size</h3>
                <p>Girls 0-36 months</p>
            </Link>
            <Link to='/cdcheightboys220'className={this.state.charts}>
                <h3>Height</h3>
                <p>Boys 2-20 years</p>
            </Link>
            <Link to='/cdcheightgirls220'className={this.state.charts}>
                <h3>Height</h3>
                <p>Girls 2-20 years</p>
            </Link>
            <Link to='/cdcweight220boys'className={this.state.charts}>
                <h3>Weight</h3>
                <p>Boys 2-20 years</p>
            </Link>
            <Link to='/cdcweight220girls'className={this.state.charts}>
                <h3>Weight</h3>
                <p>Girls 2-20 years</p>
            </Link>

        </div>
    )
}
 }
export default ChartList
