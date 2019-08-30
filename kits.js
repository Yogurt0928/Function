/* 
  我们将来在开发的时候，肯定会有很多重复使用的代码
  这些代码我们应该封装起来，以提高工作效率

  怎么封装呢？
    通常我们喜欢把方法封装到对象身上
*/
var kits = {};

kits.dispatchZero = function (num) {
  if (num < 10) {
    num = '0' + num;
  }
  return num;
}

// 把方法都放到对象的身上
kits.formatDate = function () {
  var date = new Date();
  // 把年月日时分秒获取
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = this.dispatchZero(month);
  var day = date.getDate();
  day = this.dispatchZero(day);
  var hour = date.getHours();
  hour = this.dispatchZero(hour);
  var minute = this.dispatchZero(date.getMinutes());
  var second = this.dispatchZero(date.getSeconds());
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

kits.randomInt = function (n, m) {
  return Math.floor(Math.random() * (m - n + 1) + n);
}

// 常见的给id的方式
// 当前时间戳 + 大的随机数
kits.getId = function () {
  // 返回一个不容易重复的id
  let date = new Date();
  let time = date.getTime();// 得到的是从1970年1月1日到现在为止的毫秒总数
  // 然后在得到一个足够大的随机数，把毫秒和随机数相连，作为新的id
  let r = this.randomInt(100000, 999999);
  // 把两个数字连起来
  let id = time + '' + r;
  return id;
}


//随机获取一个十六进制的颜色
kits.randomHexColor = function () {
  let str = "#";
  //定义一个十六进制的数组
  let arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
  for (let i = 0; i < 6; i++) {
    //通过随机数生成索引，根据索引找到数组中对应的值然后拼接一起
    let num = parseInt(Math.random() * 16);
    str += arr[num];
  }
  return str;
}


//获取n-m之间的随机整数
kits.random = function (n, m) {
  let result = Math.floor(Math.random() * (m - n + 1) + n);
  return result;
}


// 随机获取一个rgb颜色
kits.randomColor = function () {
  let r = kits.random(0, 255);
  let g = kits.random(0, 255);
  let b = kits.random(0, 255);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}

//存储数据
kits.saveLocalDataArray = function(key,arr){
  //1.把arr转成json格式的字符串
  let jsonStr = JSON.stringify(arr);
  //2.存储本地
  localStorage.setItem(key,jsonStr);
}

//根据id修改数据
kits.modifyLocalDataById = function(key ,id,data){
  //1.先把本地的数据取出来
  let arr = this.getLocalDataArray(key);
  //6.假设一个返回值是false，表明没有修改成功
  let flag = false;
  //2.遍历数组arr
  arr.forEach((e,i) => {
    //3.判断每一项的id是否和我们传入的id一致
    if (e.id == id){
      //4.找到这项数据进行修改
      arr[i] = data;
      flag = true;
    }
  });
  //5.存储修改后的数据
  this.saveLocalDataArray(key,arr);
  return flag;
}

//获取数据
kits.getLocalDataArray = function(key){
  let jsonStr = localStorage.getItem(key);
  let arr = JSON.parse(jsonStr);
  arr = arr || [];
  return arr;
}