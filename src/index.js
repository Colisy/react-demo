import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
// 缓存、提高速度
import registerServiceWorker from './registerServiceWorker';
// semantic
import 'semantic-ui-css/semantic.min.css';
// common- js、css
import './common/script/position'
import './common/style/reset.css'
import './common/style/comsty.css'
// component
import Home from './component/home/home';
import Play from './component/play/play';
import MvList from './component/mvList/mvList';
ReactDOM.render(
  (<Router >
   <div>
     <Route exact path="/" component={Home}/>
     <Route path="/play" component={Play}/>
     <Route path="/mvList" component={MvList}/>
   </div>
 </Router>),
  document.getElementById('root')
);
registerServiceWorker();

//
