import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Line} from 'react-chartjs-2'
import { DotLoader } from 'react-spinners'
import './charts.css'


class HeadSize_0_36_boys extends Component {
    constructor(){
        super()
        this.state ={
            heightBirth: [],
            Agemos: [],
            p3: [],
            p5: [],
            p10: [],
            p25: [],
            p50: [],
            p75: [],
            p90: [],
            p95: [],
            p97: [],
            dataSet: [],
            loading: true
            

        }
    }
    componentDidMount(){

        axios.get('/cdcheadsizeboys')
        .then(res => {this.setState({
            heightBirth: res.data,
            p3:  [],
            p5:  [],
            p10: [],
            p25: [],
            p50: [],
            p75: [],
            p90: [],
            p95: [],
            p97: []
        })})
        .then(res => { 
            let sort = this.state.heightBirth.map((num)=>{
                this.setState({
                    Agemos: [...this.state.Agemos, num.Agemos],
                    p3: [...this.state.p3, +num.p3 ],
                    p5: [...this.state.p5, +num.p5 ],
                    p10: [...this.state.p10, +num.p10],
                    p25: [...this.state.p25, +num.p25],
                    p50: [...this.state.p50, +num.p50 ],
                    p75: [...this.state.p75, +num.p75 ],
                    p90: [...this.state.p90, +num.p90 ],
                    p95: [...this.state.p95, +num.p95 ],
                    p97: [...this.state.p97, +num.p97 ]
                   })
            })
        })
        .then(res => {
            this.setState({
               dataSet: 
          [{
                label: '3 percentile',
                lineTension: .04,
                backgroundColor: 'rgb(73,203,190)',
                borderColor: 'rgb(73,203,190)',
                pointRadius: 0,
                fill: false,
                borderWidth: 1,
                data: this.state.p3
                
                    },
            {
                label: '5th percentile',
                lineTension: .04,
                backgroundColor: 'rgb(73,203,190)',
                borderColor: 'rgb(73,203,190)',
                pointRadius: 0,
                fill: false,
                borderWidth: 1,
                data: this.state.p5
            
                },
            {
                label: '10th percentile',
                lineTension: .04,
                backgroundColor: 'rgb(73,203,190)',
                borderColor: 'rgb(73,203,190)',
                pointRadius: 0,
                fill: false,
                borderWidth: 1,
                data: this.state.p10
            
                },
           {
                label: '25th percentile',
                lineTension: .04,
                backgroundColor: 'rgb(73,203,190)',
                borderColor: 'rgb(73,203,190)',
                pointRadius: 0,
                fill: false,
                borderWidth: 1,
                data: this.state.p25
            
                },
            {
                label: '50th percentile',
                lineTension: .04,
                backgroundColor: 'rgb(73,203,190)',
                borderColor: 'rgb(73,203,190)',
                pointRadius: 0,
                fill: false,
                borderWidth: 1,
                data: this.state.p50
            
                },
            {
                label: '75th percentile',
                lineTension: .04,
                backgroundColor: 'rgb(73,203,190)',
                borderColor: 'rgb(73,203,190)',
                pointRadius: 0,
                fill: false,
                borderWidth: 1,
                data: this.state.p75
            
                },
           {
                label: '90th percentile',
                lineTension: .04,
                backgroundColor: 'rgb(73,203,190)',
                borderColor: 'rgb(73,203,190)',
                pointRadius: 0,
                fill: false,
                borderWidth: 1,
                data: this.state.p90
            
                },
            {
                label: '95th percentile',
                lineTension: .04,
                backgroundColor: 'rgb(73,203,190)',
                borderColor: 'rgb(73,203,190)',
                pointRadius: 0,
                fill: false,
                borderWidth: 1,
                data: this.state.p95
            
                },
            {
                label: '97th percentile',
                lineTension: .04,
                backgroundColor: 'rgb(73,203,190)',
                borderColor: 'rgb(73,203,190)',
                pointRadius: 0,
                fill: false,
                borderWidth: 1,
                data: this.state.p97
            
                }]
            })
            return axios.get('/api/alldata')
            .then(res => {
                let finder = res.data.map(child => {
                    let index 
                    let find = this.state.dataSet.filter((item, i) =>{
                         if(item.label === child.first_name){
                             return index = i
                         }
                        }
                    )

                
                    if((find.length === 0 && child.age <= 3)&&(find.length === 0 && child.sex === 'male')){
                       
                        this.setState({
                            dataSet: [...this.state.dataSet, {
                                label: child.first_name,
                                lineTension: .04,
                                backgroundColor: child.color,
                                borderColor: child.color,
                                pointRadius: 3,
                                fill: false,
                                data: [
                                        {
                                        x: +child.age * 12,
                                        y: +child.head_size * 2.54 
                                        }
                                      ]
                                    }] 
                                })
                    }
                    else if((find.length !== 0 && child.age <= 3)&&(find.length !== 0 && child.sex === 'male')){
                  
                        const updateDataSet = this.state.dataSet[index].data.push({
                            x: +child.age * 12,
                            y: +child.head_size * 2.54
                        });
                        this.setState({
                            [this.state.dataSet[index].data]: updateDataSet
                        })
                    }
                    
                })
                })
                 
                    
            }).then(res => {
                this.setState({
                    loading: false
                })
            })
        
       

      
    }


    render() {
    
    
       const data = {
           labels: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36],
           xAxisId: 'Age in months',
           yAxisId: 'Head size in cm',
           datasets: this.state.dataSet
           
           
        }
       
        return (
            <div className='chartBox'>
                {this.state.loading ? <DotLoader
         size={250}
         color={'#59F8E8'}
         /> :
        <Line
          data={data}
          options={{ maintainAspectRatio: false,
            
            legend: {
                display: true,
                position: 'right',
                labels: {
                    fontColor: '#304246',
                    fontFamily: 'Mada',
                    
                }
                
            },
            scales: {
                xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Age in months'
                        }
                    }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Head size in cm'
                    }
                }]    
                }
        }}
          
        
          
        />
    }
        
        <h1>Head size chart for boys 0-36 months</h1>
        <div className='cancelButtonBox'>
        <Link to='/charts' className='button'>Back</Link>
        </div>
            </div>
        )
    }
}


export default HeadSize_0_36_boys