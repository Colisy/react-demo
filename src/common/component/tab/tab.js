import React, {Component} from 'react'
import {Tab} from 'semantic-ui-react'
import './tab.css'
import Swiper from '../swiper/swiper'
import MV from '../mv/mv'
import Song from '../song/song'
import Select from '../../../component/select/select'
// import Slider from '../Slider/Slider.jsx'
const IMAGE_DATA = [
  {
    src: require('../../../assets/a.jpg'),
    alt: 'images-1'
  }, {
    src: require('../../../assets/f.jpg'),
    alt: 'images-2'
  }, {
    src: require('../../../assets/s.jpg'),
    alt: 'images-3'
  }
];
// <Slider items={IMAGE_DATA} speed={1.2} delay={2.1} pause={true} autoplay={true} dots={true} arrows={true}/>
const panes = [
   {
    menuItem: '推荐',
    render: () => <Tab.Pane>
        <Swiper/>
        <MV/>
      </Tab.Pane>
  }, {
    menuItem: '排行榜',
    render: () => <Tab.Pane attached={false}>
        <Song/>
      </Tab.Pane>
  },{
    menuItem: '搜索',
    render: () => <Tab.Pane>
        <Select/>

      </Tab.Pane>
  }
]

const TabExampleSecondaryPointing = () => (<Tab className='re-tab' menu={{
  secondary: true,
  pointing: true
}} panes={panes}/>)

class NavTab extends Component {
  render() {
    return (<TabExampleSecondaryPointing/>)
  }
}
export default NavTab;
