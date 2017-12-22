import React, {Component} from 'react'
import './mvList.css';
// import {sendAjax} from '../../api/api'
// import {testing} from '../../common/script/commonVarite';
//mvList

class MVList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lists: []
    }
  }
  componentWillMount() {
    // sendAjax('/index.php/api/song/2/1', (data) => {
    //   this.setState({lists: data.list})
    //   console.log(data)
    // })
  }

  render() {
    return (
      <div className='re-ml'>
        <header className='re-ml-logo'>
          <p className='_a re-img'>
            <img src={require('../../assets/logo.png')} alt=""/>
            <strong className='normal'>飞猪儿童音乐</strong>
            <span>参与人数2343</span>
          </p>
          <div className='_a ml-title'>
            <span>独家首发</span>
            <div>
              <span>2017</span>
              <span>17</span>
              <span>17</span>
              <span>NOW</span>
            </div>
          </div>
        </header>
      </div>
    )

  }

}











export default MVList;
