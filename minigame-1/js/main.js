import {DataBus} from './databus.js';
import {Seabed} from './runtime/seabed.js';
import {SeaLevel} from './runtime/sealevel.js';
import {Button} from './runtime/button.js';
import {Music} from './runtime/music.js'
import {Obstacle} from './runtime/obstacle.js';
import {Fish} from './player/fish.js'
import {Score} from './player/score.js'
let databus = new DataBus();
let muisc = new Music();
export class Main {
  constructor() {
    this.canvas = wx.createCanvas();
    this.ctx = this.canvas.getContext('2d');
    databus.canvas = this.canvas;
    databus.ctx = this.ctx;
    //页面初始化init
    this.init();
       // 注册事件
       this.registerEvent();
  }
  init() {
    this.bg = new Seabed();
    this.level = new SeaLevel();
    this.btn = new Button();
    this.fish = new Fish();
    this.score = new Score()
    // 创建障碍物
    this.createObstacle()
    this.startGame();
    // setTimeout(()=>{
    //   databus.gameover=true;
    // },5000);
  }
  //检查是否碰撞到.. (碰到渔网，碰到四周)
  check() {
    //鱼的边框模型，模拟鱼的时时位置
    const fishBorder = {
      top: this.fish.y,
      bottom: this.fish.y + this.fish.h,
      left: this.fish.x,
      right: this.fish.x + this.fish.w
    };
    //循环遍历所有的障碍物
    for (let i = 0; i < databus.obstaclelist.length; i++) {
      //创建障碍物边框模型
      const obstacle = databus.obstaclelist[i];
      const obstacleBorder = {
        top: obstacle.y,
        bottom: obstacle.y + obstacle.h,
        left: obstacle.x,
        right: obstacle.x + obstacle.w
      };

      if (this.isCheck(fishBorder, obstacleBorder)) {
        console.log('抓到鱼');
        databus.gameover = true;
        return;
      }
    }

    //和海平面撞击判断
    if (this.fish.newy + this.fish.h >= databus.canvas.height - this.level.h) {
      console.log('撞击地板啦');
      databus.gameover = true; //设置游戏状态，停止游戏
      return;
    }

    //加分逻辑
    if (this.fish.x > databus.obstaclelist[0].x + databus.obstaclelist[0].img.width &&
      this.score.isScore) {
      wx.vibrateShort({
        success: function () {
          console.log('振动成功');
        }
      });
      this.score.isScore = false;
      this.score.scoreNumber++;
    }
  }
  // 验证是否有碰撞
  isCheck(fish, obstacle) {
    let s = false; //未碰撞状态
    if (fish.top > obstacle.bottom ||
      fish.bottom < obstacle.top ||
      fish.right < obstacle.left ||
      fish.left > obstacle.right
    ) {
      s = true;
    }
    return !s;
  }
  startGame() {
    this.check();
    if (!databus.gameover) {
      this.bg.render() //渲染
      this.level.render();
      this.fish.render()
      this.score.render()
      // 清除障碍物
      // 当第一组障碍物消失屏幕时,清除第一组
      if(databus.obstaclelist[0].x+databus.obstaclelist[0].img.width<=0&&databus.obstaclelist.length==4){
        databus.obstaclelist.shift()
        databus.obstaclelist.shift()
        this.score.isScore=true;
      }
      // 当障碍物已经移动到了屏幕左侧,并且当前页面只有两个障碍物时,额外再增加两个
      if(databus.obstaclelist[0].x<=(databus.canvas.width-databus.obstaclelist[0].img.width)/2&&databus.obstaclelist.length==2){
        this.createObstacle()
      }
      // 渲染障碍物
      databus.obstaclelist.forEach(value=>{
        // console.log(value)
        value.render();
      })
      // console.log(databus.obstaclelist[0])
      let timer=requestAnimationFrame(() => {
        // console.log(1)
        this.startGame()
      })
      databus.timer=timer;
    }else{
      // 游戏结束
      console.log(databus)
      console.log('结束')
      databus.reset();
      this.btn.render();
      cancelAnimationFrame(databus.timer);
      wx.triggerGC();
    }
  
   
  }
  //创建障碍物
  createObstacle(){
    // 控制上下高度的上限
    let minTop=databus.canvas.height/8; //最低高度为屏幕的八分之一 75
    let maxTop=databus.canvas.height/2;//最低高度为屏幕的八分之一 300
    // console.log(minTop,maxTop)
    // 计算随机数
    let top=minTop+Math.random()*(maxTop-minTop)
    // console.log(top)
    databus.obstaclelist.push(new Obstacle(top,'images/pi_up.png','up'))
    databus.obstaclelist.push(new Obstacle(top,'images/pi_down.png','down'))
  }
  // 触摸方法
  registerEvent(){
    wx.onTouchStart(()=>{
      console.log(1,databus.gameover)
      if(databus.gameover){
        console.log('游戏开始')
        databus.gameover=false;
        // 页面初始化init
        this.init();
     
      }else{
          // 让鱼跳
          this.fish.y=this.fish.newy;
          // 时间清零
          this.fish.time=0;
      }
    })
  }

}