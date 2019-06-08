import React, { Component } from 'react'
// import {Chart} from 'react-chartjs-2'
import {Chart} from 'chart.js'

class HeightChart extends Component {
    constructor(){
        super()
        this.state ={

        }
    }

    render() {
       
        return (
            <div>
                <canvas id="myChart"></canvas>
            </div>
        )
    }
}
export default HeightChart