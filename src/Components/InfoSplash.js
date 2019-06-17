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
              allImages: [Weight, Height, Headsize],
              counter: 0,
              slide: 'noContainer'
          }
        }
componentDidMount(){
  this.time()
  this.nextPic()
}
slideIn = () => {
  this.setState({
      slide: 'infoContainer'
  })
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
  time = () => setInterval(this.slideIn,200)
  nextPic = () => setInterval(this.picChanger,4000)
        
  render(){
 

  
    

    return (
     
       
          <div>
            
            <div className={this.state.slide}>
              <img src={this.state.image} alt="" />
              <h1>Track your childs growth from birth</h1>
            </div>
           
       </div>
       
    )
}
}
export default InfoSplash
