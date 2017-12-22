import React, {Component} from 'react'
import './swiper.css'
function SwiperItems(props) {
  const numbers = props.numbers;
  const left=props.left;
  const width=props.width;
  const listItems = numbers.map((number) =>
    <li key={number.id}>
      <img src={number.value} alt="" />
    </li>
  );
  return (
    <ul  className='re-sw-out' style={{left:left,width:width}}>
      {listItems}
    </ul>
  )
};
const items=[{'value':require('../../../assets/f.jpg'),'id':0},{'value':require('../../../assets/s.jpg'),'id':1}];

class Swiper extends Component {
  render() {
    const left='0'
    const width=100*(Number(items.length))+ '%'
    return (
      <div className='re-sw'  ref='div'>
        <SwiperItems left={left} width={width}  numbers={items}/>
      </div>
    )
  }

  componentDidMount(){
    let div=this.refs.div;
    var count=0;
    var width=Number(window.getComputedStyle(div).width.substring(0,window.getComputedStyle(div).width.length-2));
    // var timer=setInterval(()=>{
      if(Number(div.children[0].style.left.substring(0,div.children[0].style.left.length-2))>(-width)){
        count++;
        div.children[0].style.left=-(count*width)+'px';
      }else{
        count=0;
        div.children[0].style.left='0px'
      }
    // },3000)


  }

}

export default Swiper;
