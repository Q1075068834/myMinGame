//音乐
let instance;
export class Music{
  constructor(){
    if(instance){
      return instance;
    }else{
      instance=this;
      this.bgmAudio=wx.createInnerAudioContext()
      this.bgmAudio.loop=true;//循环播放
      this.bgmAudio.src='audio/bgm.mp3';
      this.playBgm()
    }
  }
  //方法
  playBgm(){
    this.bgmAudio.play()//播放音乐
    console.log('播放音乐')
  }

}