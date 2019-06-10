import React from 'react'
import {Link} from 'react-router-dom'
import './charts.css'

 function ChartList() {
    return (
        <div className='chartList'>
            <Link to='/HeightChart036boys'className="charts">
                <h3>Height</h3>
                <p>Boys 0-36 months</p>
            </Link>
            <Link to='/HeightChart036boys'className="charts">
                <h3>Weight</h3>
                <p>Boys 0-36 months</p>
            </Link>
            <Link to='/HeightChart036boys'className="charts">
                <h3>Head size</h3>
                <p>Boys 0-36 months</p>
            </Link>
            <Link to='/HeightChart036girls'className="charts">
                <h3>Height</h3>
                <p>Girls 0-36 months</p>
            </Link>
            <Link to='/HeightChart036boys'className="charts">
                <h3>Weight</h3>
                <p>Girls 0-36 months</p>
            </Link>
            <Link to='/HeightChart036boys'className="charts">
                <h3>Head size</h3>
                <p>Girls 0-36 months</p>
            </Link>
            <Link to='/HeightChart036boys'className="charts">
                <h3>Height</h3>
                <p>Boys 2-20 years</p>
            </Link>
            <Link to='/HeightChart036boys'className="charts">
                <h3>Weight</h3>
                <p>Boys 2-20 years</p>
            </Link>
            <Link to='/HeightChart036boys'className="charts">
                <h3>BMI</h3>
                <p>Boys 2-20 years</p>
            </Link>
            <Link to='/HeightChart036boys'className="charts">
                <h3>Height</h3>
                <p>Girls 2-20 years</p>
            </Link>
            <Link to='/HeightChart036boys'className="charts">
                <h3>Weight</h3>
                <p>Girls 2-20 years</p>
            </Link>
            <Link to='/HeightChart036boys'className="charts">
                <h3>Bmi</h3>
                <p>Girls 2-20 years</p>
            </Link>
        </div>
    )
}
export default ChartList
