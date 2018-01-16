import Vue from 'vue';
const filter = [
    Vue.filter("timeAgo", function(time){
      return timeAgo(time);
    })
];

function timeAgo(time){
  if(time < 0){return;}
  var minute = 60;
  var hour = minute * 60;
  var day = hour * 24;
  var month = day * 30;
  var result = "";
  var monthC =time/month;
  var weekC =time/(7*day);
  var dayC =time/day;
  var hourC =time/hour;
  var minC =time/minute;
  if(monthC>=1){
    result="" + parseInt(monthC) + "月前";
  }
  else if(weekC>=1){
    result="" + parseInt(weekC) + "周前";
  }
  else if(dayC>=1){
    result=""+ parseInt(dayC) +"天前";
  }
  else if(hourC>=1){
    result=""+ parseInt(hourC) +"小时前";
  }
  else if(minC>=1){
    result=""+ parseInt(minC) +"分钟前";
  }else{
    result="刚刚";
  }
  return result;
};
export default filter;