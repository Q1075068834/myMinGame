//障碍物
import { DataBus } from '../databus.js';
let databus = new DataBus();

export class Obstacle {
  constructor(top, src, imgtype) {
    this.x = databus.canvas.width;
    this.y = 0;
    this.w = 86;
    this.h = 406;
    this.img = wx.createImage();
    this.img.src = src;
    this.top = top;
    this.imgtype = imgtype
    this.speed = 2;
  }
  render() {
    console.log(this.top)
    console.log(this.imgtype )
    console.log(this.imgtype)
    if (this.imgtype == 'up') {
      // console.log(1111)
      this.y = this.top - this.h; //随机距离减去自身高度
    } else {
      // console.log(222)
      let height = databus.canvas.height / 5;
      this.y = this.top + height;
    }
    this.x = this.x - this.speed

    this.newx=this.newx+this.speed
    if(this.newx>(this.w-databus.canvas.width)){
      this.newx=0
    }
    databus.ctx.drawImage(this.img, 0, 0, this.w,
      this.h, this.x, this.y, this.w, this.h)
  }
}