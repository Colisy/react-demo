/**
  sendAjax--> get请求
  postAjax--> post请求
*/
import {testing} from '../common/script/commonVarite';
// get
const sendAjax=(url,callback)=>{
  fetch(testing.address+url)
    .then((response) =>response.json())
    .then((body)=>{
      if(body.status==='ok'){
        callback(body.data)
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
// post
const postAjax=(url,params,callback)=>{
  fetch(testing.address+url, {
      method: 'POST',
      body: JSON.stringify(params)
  })
  .then((response) =>response.json())
  .then((body)=>{
    if(body.status==='ok'){
      callback(body.data)
    }
  })
  .catch((error) =>console.log(error))
}
export {sendAjax,postAjax};
