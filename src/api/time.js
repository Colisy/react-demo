/**
  封装时间转换方法
*/
const time=(times)=>{
  var other = Number(times) % 3600;
  var minute = Math.floor (other / 60);
  var second = (other % 60).toFixed (0);
  if(minute>=0&&minute<=9){
    minute="0"+minute;
  }
  if(second>=0&&second<=9){
    second="0"+second;
  }
  return minute+':'+second
}







export {time};

//
