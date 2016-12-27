  var audioDom = document.getElementsByTagName("audio")[0],
      timeDom = document.getElementsByClassName("content__time")[0],
      timerun = '';
  //监听是否音频是否准备就绪，如果准备完毕设置播放总时长
  audioDom.oncanplay = function(){
    timeDom.innerText = parseInt(audioDom.duration)
  }
  /**
   * 点击播放，处理时间倒计时
   * 
   * @param {any} e 当前点击对象
   */
  function play(e){
    var dateType = e.getAttribute("data-type"),
        moveDom = document.getElementsByClassName("content__mask")[0],
        timeValue = timeDom.innerText,
        audioLong = "";
        
    if ( dateType === "1" ){
      audioDom.play();
      moveDom.setAttribute("class","content__mask content__mask--move");
      e.setAttribute("data-type","0");
      var audioTime = parseInt(audioDom.duration),
          nowAudioTime = parseInt(audioDom.currentTime);
      if (timeValue === ""){
        audioLong = audioTime;
      }else{
        audioLong = audioTime - nowAudioTime;//总时长减去播放时长等于剩余时长
      }
      timeDom.innerText = audioLong;//点击播放时设置时长
      timerun = setInterval(function(){
        audioLong--
        timeDom.innerText = audioLong;
        if(audioLong <= 0){
          timeDom.innerText = audioTime;
        }
      },1000)
      addListenAutoIsFinish({
        audio:audioDom,//音频dom
        moveDom:moveDom,//移动dom
        timerun:timerun,//循环事件
        audioTime:audioTime,//音频总时长
        timeDom:timeDom//时间显示dom
        });
    }else{
      moveDom.setAttribute("class","content__mask");
      audioDom.pause();
      e.setAttribute("data-type","1")
      clearInterval(timerun);
    }
  }

  /**
   * 监听播放是否结束，并重置时间和去掉动画
   * 
   * @param {any} option
   */
  function addListenAutoIsFinish(option){
    option.audio.onended = function(){
      option.moveDom.setAttribute("class","content__mask");
      option.timeDom.innerText = option.audioTime;
      clearInterval(option.timerun);
    }
  }