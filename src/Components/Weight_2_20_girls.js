import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Line} from 'react-chartjs-2'
import { DotLoader } from 'react-spinners'
import './charts.css'



class Weight_2_20_girls extends Component {
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

        axios.get('/cdc220weightgirls')
        .then(res => {this.setState({heightBirth: res.data})})
        .then(res => { 
            let sort = this.state.heightBirth.map((num)=>{
                this.setState({
                    Agemos: [...this.state.Agemos, num.Agemos],
                    p3: [...this.state.p3, {
                        x: +num.Agemos /12 ,
                        y: +num.p3 * 2.205
                        } ],
                    p5: [...this.state.p5, {
                        x: +num.Agemos /12 ,
                        y: +num.p5 * 2.205
                        } ],
                    p10: [...this.state.p10, {
                        x: +num.Agemos /12 ,
                        y: +num.p10 * 2.205
                        } ],
                    p25: [...this.state.p25, {
                        x: +num.Agemos /12 ,
                        y: +num.p25 * 2.205
                        } ],
                    p50: [...this.state.p50, {
                        x: +num.Agemos /12 ,
                        y: +num.p50 * 2.205
                        } ],
                    p75: [...this.state.p75, {
                        x: +num.Agemos /12 ,
                        y: +num.p75 * 2.205
                        } ],
                    p90: [...this.state.p90, {
                        x: +num.Agemos /12 ,
                        y: +num.p90 * 2.205
                        } ],
                    p95: [...this.state.p95, {
                        x: +num.Agemos /12 ,
                        y: +num.p95 * 2.205
                        } ],
                    p97: [...this.state.p97, {
                        x: +num.Agemos /12 ,
                        y: +num.p97 * 2.205
                        } ]
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

                
                    if((find.length === 0 && child.age >= 2)&&(find.length === 0 && child.sex === 'female')){
                       
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
                                        x: +child.age ,
                                        y: +child.weight 
                                        }
                                      ]
                                    }] 
                                })
                    }
                    else if((find.length !== 0 && child.age >= 2)&&(find.length !== 0 && child.sex === 'female')){
                  
                        const updateDataSet = this.state.dataSet[index].data.push({
                            x: +child.age,
                            y: +child.weight 
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
           labels: [,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
           xAxisId: 'Age in years',
           yAxisId: 'Weight in pounds',
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
                    ticks: {
                        min: 2,
                        max: 20
                    }, 
                        type: 'linear',
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Age in years'
                        }
                    }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Weight in pounds'
                    }
                }]    
                }
        }}
          
        
          
        />
    }
        <h1>Weight chart for girls 2-20 years old</h1>
        <div className='cancelButtonBox'>
        <Link to='/charts' className='button'>Back</Link>
        </div>
            </div>
        )
    }
}


export default Weight_2_20_girls