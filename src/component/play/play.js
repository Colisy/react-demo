import React, {Component} from 'react'
import './play.css';
import {sendAjax} from '../../api/api'
import {Icon, Button, Progress} from 'semantic-ui-react'
import {testing} from '../../common/script/commonVarite';
import {time} from '../../api/time'
function IsPlay(props) {
  const isFlag = props.isFlag;
  if (isFlag) {
    return <Icon onClick={props.changePlay} className='re-play-icon' size='huge' name='play video'/>;
  } else {
    return <Icon onClick={props.changePlay} className='re-play-icon' size='huge' name='pause circle'/>
  }
}

const PlayControl = (props) => {
  const data = props.lists;
  const lyrics = props.lyrics;
  let lyr_re;
  if (lyrics === "歌词未编辑" || lyrics === undefined) {
    lyr_re = lyrics;
  } else {
    let datas = data.lrc_text.split(/。|！| |\?|？|\n|\r|\\s/);
    lyr_re = datas.map((data, index) => <li key={index}>
      {data}
    </li>);
  }

  return (
    <div className='re-page'>
      <header>
        <img src={data.cover_url} alt=""/>
        <div>
          <p>{data.title}</p>
          <p>{data.nickname}</p>
        </div>
        <IsPlay isFlag={props.isFlag} changePlay={props.changePlay}/>
      </header>
      <div className='re-lyric'>
        <ul>
          {lyr_re}
        </ul>
      </div>
      <p className='re_p'>
        <Icon className='p-h' size='big' name='empty heart'/>
        <Icon className='p-up' size='big' name='thumbs outline up'/>
      </p>
      <audio src={testing.address + data.audio_url}></audio>
      <div className='re-pro'>
        <span>{props.startTime}</span>
        <div>
          <Progress value={props.percent} total={props.total} />
        </div>
        <span>{props.endTime}</span>
      </div>
      <Button circular className='re-download'>
        <img src={require("../../assets/logo.png")} alt=""/>
        下载这首歌</Button>
    </div>
  )
}
// 定时器
var timer;

class Play extends Component {
  // 构造器
  constructor(props) {
    super(props)
    this.state = {
      lists: {},
      lyrics: '',
      id: props.location.search.substring(props.location.search.indexOf('=') + 1, props.location.search.length),
      _isPlay: true,
      percent: "0",
      startTime: "00:00",
      endTime: "00:00",
      total:''
    }
    this.changePlay = this.changePlay.bind(this)
  }
  // before render
  componentWillMount() {
    sendAjax('/index.php/api/song-detail/' + this.state.id, (data) => {
      this.setState({
        lists: data,
        lyrics: data.lrc_text,
        startTime: time(this.refs.re_play.children[0].children[3].currentTime)
      })
    })
  }
  // 挂载元素之后
  componentDidMount() {
    var that = this;
    setTimeout(() => {
      this.setState({
        endTime: time(that.refs.re_play.children[0].children[3].duration),
        total:that.refs.re_play.children[0].children[3].duration
      })
    }, 1000)
  }
  // control play or pause
  changePlay() {
    this.setState({
      _isPlay: !this.state._isPlay
    })
    // play
    if (this.state._isPlay) {
      console.log(this.refs)
      //currentTime 0.4751
      // duration 91.559125
      // volume
      timer=setInterval(()=>{
        this.setState({
          percent: this.refs.re_play.children[0].children[3].currentTime,
          startTime:time(this.refs.re_play.children[0].children[3].currentTime)
        })
      },1000)

      this.refs.re_play.children[0].children[3].play()
    } else {
      // pause
      this.refs.re_play.children[0].children[3].pause()
      // 消除定时器
      window.clearInterval(timer);
    }
  }
  // render
  render() {
    const data = this.state.lists;
    const _isPlay = this.state._isPlay;
    const lyrics = this.state.lists.lrc_text;
    const backgroundImage = 'url("' + data.cover_url + '")';
    return (
      <div className='re-play' ref='re_play'>
        <PlayControl lists={data} lyrics={lyrics} changePlay={this.changePlay} isFlag={_isPlay} percent={this.state.percent} startTime={this.state.startTime} endTime={this.state.endTime} total={this.state.total}/>
        <div className='re-bg' style={{
          backgroundImage: backgroundImage
        }}></div>
        <div className='re-mark'></div>
      </div>
    )

  }

}
export default Play;
