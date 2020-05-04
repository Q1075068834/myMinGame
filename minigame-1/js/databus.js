// 公共状态
let instance;
export class DataBus{
  constructor(){
    if(instance){
      return instance;
    }else{
      instance=this;
      this.gameove=false;//游戏状态
      this.canvas;//画布
      this.ctx;//画布上下文对象
      this.obstaclelist=[] //障碍物列表
      this.timer=null;//游戏状态
    }
  }
  // 重启游戏方法,重置数据
  reset(){
    this.gameover=true;
    this.obstaclelist=[];
    this.timer=null;
  }
}