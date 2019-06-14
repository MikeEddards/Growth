import React, {Component} from 'react'
import './infoSplash.css'

import Headsize from '../Image/headsize.png'
import Height from '../Image/height.png'
import Weight from '../Image/weight.png'




class InfoSplash extends Component {
        constructor(){
          super()
          this.state ={
              image: Headsize,
              style: 'infoContainer',
              allImages: [Weight, Height, Headsize],
              counter: 0
          }
        }
componentDidMount(){
  this.nextPic()
}

  picChanger = () => {
    
    
    if(this.state.counter < this.state.allImages.length){
      
      
      this.setState({
        image: this.state.allImages[this.state.counter],
        counter: ++this.state.counter
      })
      
    }else if(this.state.counter === 3){
      this.setState({
        counter: 0
      })
    }
  }
  nextPic = () => setInterval(this.picChanger,4000)
        
  render(){
 

  
    

    return (
     
       
          <div>
            
            <div className={this.state.style}>
              <img src={this.state.image} alt="" />
              <h1>Track your childs growth from birth</h1>
            </div>
           
       </div>
       
    )
}
}
export default InfoSplash
