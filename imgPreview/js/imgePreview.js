//事件绑定
function domEventOn(dom,callback){
  var domLength = dom.length,
      state = isPcOrMobile()==="pc"?"click":"click";
  for(var i = 0 ;i< domLength;i++){
    dom[i].index = i;//设置元素索引
    dom[i].addEventListener(state,callback)
  }
}
function showImg(self) {
  var index = self.index,
      imgDom = document.getElementsByClassName("img-list-i")[index],
      img_list = document.getElementsByClassName("img-list");
  imgDom.style.display = "flex";
  var height = document.documentElement.clientHeight+"px";
  img_list[0].style.height = height;
  img_list[0].setAttribute("data-state",index);
}
function disPlayImg(self) {
  var state = self.getAttribute("data-state"), imgDom = document.getElementsByClassName("img-list-i")[state];
  imgDom.style.display = "none";
  self.style.height = 0;
}
//判断是手机访问还是PC访问
function isPcOrMobile() {
  var system ={},
      isPcOrMobile = "pc",
      p = navigator.platform;
  system.win = p.indexOf("Win") == 0;
  system.mac = p.indexOf("Mac") == 0;
  system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
  if(system.win||system.mac||system.xll){//如果是电脑跳转到百度
    isPcOrMobile = "pc"
  }else{  //如果是手机,跳转到谷歌
    isPcOrMobile = "mobile"
  }
  return isPcOrMobile
}
function runImg(option) {
  domEventOn(option.clickDom,function (e) {
    var self = this;
    showImg(self)
  });
  domEventOn(option.showBox,function (e) {
    var self = this;
    disPlayImg(self);
  });
}