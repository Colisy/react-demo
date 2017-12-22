import React, {Component} from 'react'
import './select.css';
import 'swiper/dist/css/swiper.min.css'
import Swiper from 'swiper/dist/js/swiper.min.js'
class Select extends Component {
  // 构造器
  constructor(props) {
    super(props)
    this.changeImg = this.changeImg.bind(this)
    this.state = {
      transform: "matrix(1,0,0,1,0,0)",
      startNum: 0,
      isStart: false
    }
  }
  // 挂载元素之后
  componentDidMount() {
    var mySwiper = new Swiper('.swiper-container', {
      direction: 'horizontal',
      grabCursor: true,
      // virtualTranslate : true,
      loop: true,
      autoplay: true, //可选选项，自动滑动
      // 3d 滚动
      // effect: 'coverflow',
      slidesPerView: 7,
      // coverflowEffect: {
      //   rotate: -20,
      //   stretch: 0,
      //   depth: 100,
      //   modifier: 2,
      //   slideShadows: true
      // },

      // 如果需要分页器
      pagination: '.swiper-pagination',
      pagination: {
        el: '.swiper-pagination'
      },
      // 如果需要前进后退按钮
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    })
  }
  // 暂停与旋转
  changeImg() {
    this.setState({
      isStart: !this.state.isStart
    })
    var timer;
    timer = setInterval(() => {
      if (!this.state.isStart) {
        clearInterval(timer);
      } else {
        this.setState({
          startNum: this.state.startNum + 1
        })
        var cosVal = Math.cos(this.state.startNum * Math.PI / 180),
          sinVal = Math.sin(this.state.startNum * Math.PI / 180);
        var valTransform = 'matrix(' + cosVal.toFixed(6) + ',' + sinVal.toFixed(6) + ',' + (-1 * sinVal).toFixed(6) + ',' + cosVal.toFixed(6) + ',0,0)';
        this.setState({transform: valTransform})
      }
    }, 10)
  }

  // render
  render() {
    const transform = this.state.transform
    return (
      <div>
        <span className='matrix'>matrix旋转</span>
        <div className='re-select' onClick={this.changeImg}>
          <img src={require("../../assets/s.jpg")} alt="" style={{
            transform: transform
          }}/>
          <div className='character-bg' ref='character' style={{
            transform: transform
          }}></div>
        </div>
        <div className="swiper-container">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <img src={require('../../assets/a.jpg')} alt=""/>
            </div>
            <div className="swiper-slide">
              <img src={require('../../assets/f.jpg')} alt=""/>
            </div>
            <div className="swiper-slide">
              <img src={require('../../assets/s.jpg')} alt=""/>
            </div>
            <div className="swiper-slide">
              <img src={require('../../assets/a.jpg')} alt=""/>
            </div>
            <div className="swiper-slide">
              <img src={require('../../assets/f.jpg')} alt=""/>
            </div>
            <div className="swiper-slide">
              <img src={require('../../assets/logo.png')} alt=""/>
            </div>
          </div>
          <div className="swiper-pagination"></div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </div>
        <span className=''>太阳绕着地球转地球自转</span>
        <div className='outer'>
          <div className='sun'>
            <div className='sunChildren'></div>
            <div className='earth'></div>
          </div>
        </div>
      </div>
    )
  }
}
export default Select;
