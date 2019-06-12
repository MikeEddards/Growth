import React from 'react'
import {Link} from 'react-router-dom'
import './charts.css'

 function ChartList() {
    return (
        <div className='chartList'>
            <Link to='/heightChart036boys'className="charts">
                <h3>Height</h3>
                <p>Boys 0-36 months</p>
            </Link>
            <Link to='/heightChart036girls'className="charts">
                <h3>Height</h3>
                <p>Girls 0-36 months</p>
            </Link>
            <Link to='/cdcweightboys036'className="charts">
                <h3>Weight</h3>
                <p>Boys 0-36 months</p>
            </Link>
            <Link to='/cdcweightgirls036'className="charts">
                <h3>Weight</h3>
                <p>Girls 0-36 months</p>
            </Link>
            <Link to='/cdcheadsize036boys'className="charts">
                <h3>Head size</h3>
                <p>Boys 0-36 months</p>
            </Link>
            <Link to='/cdcheadsize036girls'className="charts">
                <h3>Head size</h3>
                <p>Girls 0-36 months</p>
            </Link>
            <Link to='/cdcheightboys220'className="charts">
                <h3>Height</h3>
                <p>Boys 2-20 years</p>
            </Link>
            <Link to='/cdcheightgirls220'className="charts">
                <h3>Height</h3>
                <p>Girls 2-20 years</p>
            </Link>
            <Link to='/cdcweight220boys'className="charts">
                <h3>Weight</h3>
                <p>Boys 2-20 years</p>
            </Link>
            <Link to='/cdcweight220girls'className="charts">
                <h3>Weight</h3>
                <p>Girls 2-20 years</p>
            </Link>

        </div>
    )
}
export default ChartList
