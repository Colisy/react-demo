import React, {Component} from 'react'
import {Header} from 'semantic-ui-react'
import './header.css';
class Head extends Component{
  render() {
    return (
      <div  className='re_header'>
        <Header as='h6'>
          <img src={require('../../../assets/logo.png')} alt="" className='re-img' />
          <strong className='normal re-text'>中国儿童音乐网</strong>
        </Header>
      </div>
    )
  }
}
export default Head;
