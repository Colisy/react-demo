import React, {Component} from 'react'

export default class SliderDots extends Component {
  constructor(props) {
    super(props)
  }
  handleDotClick(i) {
    var options=i-this.props.nowLocal;
    this.props.turn(options)
  }

  render() {
    let dotsNode = []
    let {count, nowLocal} = this.props
    for (let i = 0; i < count; i++) {
      dotsNode[i] = (
        <span key={'dot' + i} className={'slider-dot' + (i === this.props.nowLocal
          ? " slider-dot-selected"
          : "")} onClick={this.handleDotClick.bind(this, i)}></span>
      )
    }

    return (
      <div className='slider-dots-wrap'>
        {dotsNode}
      </div>
    )
  }
}

//
