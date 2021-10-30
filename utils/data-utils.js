/**
 * 处理DatePicker组件的当月，之前的时间禁止选择
 */
export function monthOptions(date) {
  var dateNow = new Date();
  return date && date.valueOf() < dateNow.setMonth(dateNow.getMonth() - 1);
}

/**
 * 处理DatePicker组件的当前时间，之前的时间禁止选择
 */
export function timeOptions(date) {
  var dateNow = new Date();
  return date && date.valueOf() < dateNow.setDate(dateNow.getDate() - 1);
}


/**
 * 时间戳转换
 * @param {*} inputTime 
 * @returns 
 */
export function formatDateTime(inputTime, type) {
  var date = new Date(inputTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return formatDateType(type, { y, m, d, h, minute, second })
};

/**
 * 时间转换格式
 */
function formatDateType(type, params) {
  type = type ? type.toLowerCase() : 'yyyy-mm-dd h:m:s';
  let time = '';
  switch (type) {
    // 时:分
    case 'h:m':
      time = `${params.h}:${params.minute}`
      break;
    // 时:分:秒
    case 'h:m:s':
      time = `${params.h}:${params.minute}:${params.second}`
      break;
    // 年-月
    case 'yyyy-mm':
      time = `${params.y}-${params.m}`
      break;
    // 年-月-日
    case 'yyyy-mm-dd':
      time = `${params.y}-${params.m}-${params.d}`
      break;
    // 年-月-日 时:分
    case 'yyyy-mm-dd h:m':
      time = `${params.y}-${params.m}-${params.d} ${params.h}:${params.minute}`
      break;
    // 年-月-日 时:分:秒
    case 'yyyy-mm-dd h:m:s':
      time = `${params.y}-${params.m}-${params.d} ${params.h}:${params.minute}:${params.second}`
      break;
  }
  console.log('time',time)
  return time;
}