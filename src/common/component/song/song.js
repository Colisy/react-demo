import React, {Component} from 'react'
import './song.css';
import {sendAjax} from '../../../api/api'
import {Grid, Segment, Icon} from 'semantic-ui-react'
// import {Link} from 'react-router-dom'
import {testing} from '../../script/commonVarite';
//mv
function CardExample(props) {
  const datas = props.lists;
  const list = datas.map((data, index) => <li onClick={props.isplay} id={data.id} key={index}>
    <a>
      <Grid columns='equal'>
        <Grid.Column width={2}>
          <Segment className={index < 3
            ? 'redpink'
            : ''}>{index + 1}</Segment>
        </Grid.Column>
        <Grid.Column width={12}>
          <Segment>
            <p className='fontSize'>{data.title}</p>
            <p className='gray twoSize'>{data.nickname}</p>
          </Segment>
        </Grid.Column>
      </Grid>
    </a>
  </li>);
  return (
    <ul className='re_song'>
      <p>排行榜 热门推荐</p>
      {list}</ul>
  );
}
// 播放Icon
function PlayIcon(){
  return <Icon className='re-b-icon' size="big" name='pause circle outline'/>
}
// 暂停Icon
function PauseIcon(){
  return <Icon className='re-b-icon' size="big" name='play circle outline'/>
}
// 控制暂停播放
function ControlPlay(props){
  var _play=props.isPlayFlag
  if(_play){
    return <PlayIcon/>
  }else{
    return <PauseIcon/>
  }
}
// 播放的信息
function State(props) {
  var info=props.info;
  return (
    <div className='re-b-play' id={info.id} >
      <ControlPlay isPlayFlag={props.isPlayFlag}/>
      <audio src={testing.address + info.audio_url}></audio>
      <div>
        <p>{info.title}</p>
        <p>{info.nickname}</p>
      </div>
      <Icon className='re-b-icon re-b_download' size="big" name='arrow down'/>
    </div>
  )
}
// button
function Buten(props) {
  return (
    <div className='re-b-play'>
      <button type="button" className='re-p-all'>
        <Icon disabled name='caret right'/>
        播放全部
      </button>
    </div>
  )
}

// 判断
function Judgment(props) {
  var isplaying = props.play;
  if (isplaying) {
    return <State info={props.info} isPlayFlag={props.isPlayFlag}/>
  } else {
    return <Buten/>
  }
}

class MV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      y: '',
      totalPage: '',
      currentPage: '',
      flag: true,
      isPlay: false,
      songInfo:'',
      isPlayFlag:false
    };
    this.handleScroll = this.handleScroll.bind(this);
  }
  // 钩子
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  componentWillMount() {
    sendAjax('/index.php/api/song/2/1', (data) => {
      this.setState({lists: data.list, totalPage: data.totalPage, currentPage: data.curPage})
    })
  }
  //是否播放
  isplay(e) {
    var that=this;
    var _id=e.currentTarget.id;
    this.setState({isPlay: true})
    // 发送请求获取元素
    sendAjax('/index.php/api/song-detail/' + e.currentTarget.id, (data) => {
      that.setState({
        songInfo:data
      })
      if(that.state.songInfo!=""){
        // 控件开始播放
        that.setState({isPlayFlag: !that.state.isPlayFlag})
        if(_id!=localStorage.getItem('_id')){
            that.refs.play.children[0].children[0].children[0].children[1].children[1].play()
            if(!that.state.isPlayFlag){
              that.setState({isPlayFlag:!that.state.isPlayFlag })
            }
        }else{
          if(that.state.isPlayFlag){
            that.refs.play.children[0].children[0].children[0].children[1].children[1].play()
          }else{
            that.refs.play.children[0].children[0].children[0].children[1].children[1].pause()
          }
        }
      }
      localStorage.setItem('_id',_id)

    })
  }
  // scroll
  handleScroll(e) {
    e = e || window.event;
    // 获取卷起来的距离
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var scrollValve = 40;
    var scrollerscrollHeight = this.refs.play.scrollHeight; // 容器滚动总高度
    var scrollerHeight = document.body.clientHeight; // 容器滚动可见高度
    // var scrollerTop = this.refs.play.scrollTop; //滚过的高度
    // 达到滚动加载阀值
    if (scrollerscrollHeight - scrollerHeight - scrollTop <= scrollValve) {
      if (Number(this.state.currentPage) <= Number(this.state.totalPage) && this.state.flag) {
        this.setState({flag: false})
        sendAjax('/index.php/api/song/2/' + (Number(this.state.currentPage) + 1), (data) => {
          var lists = this.state.lists.concat(data.list);
          this.setState({lists: lists, totalPage: data.totalPage, currentPage: data.curPage, flag: true})
        })
      }
    }
    // 判断滚动卷起来的高度
    if (scrollTop >= 168) {
      this.refs.play.children[0].children[0].style = 'position:fixed;top:-168px;width:100%;z-index:10;';
    } else {
      this.refs.play.children[0].children[0].style = "";
    }
  }
  // render
  render() {
    const dataNum = this.state.lists;
    return (
      <div className='re-transtion' ref="play">
        <div>
          <div className='re-s-out'>
            <div className='re-s-ct'>
              <div className='re-s-top'>
                <img src={require("../../../assets/a.jpg")} alt=""/>
                <div className='re-s-title'>
                  <h2>热歌榜-推荐歌曲</h2>
                  <p className='fontSize'>重磅来袭</p>
                  <p className='fontSize'>2017-11-14 更新</p>
                </div>
              </div>
              <Judgment isPlayFlag={this.state.isPlayFlag} play={this.state.isPlay} info={this.state.songInfo}/>
            </div>
            <div className='re-dark'></div>
            <div className='re-s-bg'></div>
          </div>
          <CardExample lists={dataNum} isplay={this.isplay.bind(this)}/>
        </div>
      </div>
    )

  }

}
export default MV;
