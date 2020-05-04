//分数
import {DataBus} from '../databus.js';
let databus=new DataBus();

export class Score{
  constructor(){
    this.scoreNumber=0;
    this.isScore=true;
  }
  render(){
    databus.ctx.font = '30pt Times New Roman';
    databus.ctx.fillStyle='#ffff';
    databus.ctx.fillText("count:"+this.scoreNumber,0,100,200); 
  }
}
