import React,{Component} from 'react'

export default class SliderArrows extends Component{
  constructor(props){
    super(props)
  }
  handleArrowClick(options){
    this.props.turn(options)
  }
  render(){
    return(
      <div className='slider-arrows-wrap'>
        <span className='slider-arrow slider-arrow-left' onClick={this.handleArrowClick.bind(this,-1)}>
        &lt;
        </span>
        <span className='slider-arrow slider-arrow-right' onClick={this.handleArrowClick.bind(this,1)}>
        &gt;
        </span>
      </div>
    )
  }
}












//
