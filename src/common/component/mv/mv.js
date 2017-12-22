import React, {Component} from 'react'
import './mv.css';
import {Card} from 'semantic-ui-react'
import {sendAjax} from '../../../api/api'
import {testing} from '../../script/commonVarite';
import {Link} from 'react-router-dom'
//mv
function CardExampleCardProps(props) {
  const datas = props.datas;
  const listItems = datas.map((data, index) => index < 2
    ? <li key={data.id}>
      <Link to={"/play?id="+data.id}>
        <Card image={testing.address + data.cover_img} header={data.title}/>
        </Link>
      </li>
    : "");
  return (
    <ul className='re-lists'>
      <p className='paddinLeft fontSize'>热门MV</p>{listItems}</ul>
  );
}

class MV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  // 挂载元素之前 componentWillMount
  // 挂载元素之后 componentDidMount
  componentWillMount() {
    sendAjax('/index.php/api/mv/1/1', (body) => {
      this.setState({data: body.list})
    });
  }

  render() {
    const dataNum = this.state.data;
    return (
      <div>
        <div className='ul-out'><CardExampleCardProps datas={dataNum}/></div>
        <div className='re-ft paddinLeft fontSize'>
          <p>热门歌单</p>
          <div className='center'>
            <p className='gray _a'>去客户端发现更多好音乐></p>
            <p className='_a'>查看电脑版网页</p>
            <p className='_a re-img'>
              <img src={require('../../../assets/logo.png')} alt="" />
              <strong className='normal'>中国儿童音乐网</strong>
            </p>
            copyright Copyright © 1998 - 2017 Tencent. All Rights Reserved.
          </div>
        </div>
      </div>
    )

  }

}
export default MV;
