// 线条 暂不支持拖拽
import GraphBase from "./graphBase";
import { ILineClass } from "./interface/graphInterface";
import { IEventFunc } from "./interface/baseClassInterface";
import { ISelfEvent } from "./interface/SelfEvent";
import * as CommonVar from "./Util/CommonVar";
import Util from "./Util/util";
import { coordinateDifference, resetLinePon } from "./Util/CommonFunc";
export default class Line extends GraphBase{
    [props: string]: any
    eventCollect: { [name: string]: Array<IEventFunc> }
    type: string;
    x1: any;
    y1: number;
    x2: any;
    y2: number;
    lineWidth: number;
    color: string;
    readonly ctx: CanvasRenderingContext2D; 
    constructor(option: ILineClass) {
        super()
        this.type = CommonVar.LINETYPE;
        this.eventCollect = option.content.eventCallback;
        this.x1 = option.option.x1;
        this.y1 = option.option.y1;
        this.x2 = option.option.x2;
        this.y2 = option.option.y2;
        this.ele1 = option.option.x1;
        this.ele2 = option.option.x2;
        this.lineWidth = option.option.lineWidth;
        this.color = option.option.color || CommonVar.INITCOLOR;
        this.ctx = option.content.ctx;
        this.resetLinePon = resetLinePon.bind(this);
        this.draw()
        //option.content.eleArr.push(this);
    }

    draw() {
        this.checkArg();
        const { ctx, x1, y1, x2, y2 } = this;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
        
    }

    checkArg() { // 直线可以单独画 也可以是链接连个图形  这里做的是解析参数，看是否需要重置参数
        const { ele1, ele2 } = this;
        const checkType = Util.getInstance();
        /**
         * 1. x1 和 x2 都是数字类型 不用检测重置数据
         * 2. x1 是元素 x2 是数字  或者  x2 是元素 x1 是数字
         * 3. x1 和 x2 都是元素
         */
        if ( checkType.isNumber(ele1) && checkType.isNumber(ele2) ) {
            console.log("传入的数字，不用做额外处理")
        } else if ( checkType.isObject(ele1) && checkType.isObject(ele2) ) {
            // 这里表示是两个元素  需要重置 x1 y1 x2 y2  现在默认是中心点
            const tmpArr = ele1.y > ele2.y ? [ele2, ele1] : [ele1, ele2] ;  // 这一步保证 坐标小的图形在上边 大的在下边
            this.resetLinePon(tmpArr, checkType)
        } else if ( ( checkType.isNumber(ele1) && checkType.isObject(ele2) ) || ( checkType.isNumber(ele2) && checkType.isObject(ele1) ) ) {
            // 这里重置参数的作用是，永远 tmpEle1 代表的是 元素  tmpEle2 代表的是 点
            const tmpEle2 = checkType.isNumber(ele1) ? ele2 : ele1;
            const tmpEle1 = checkType.isNumber(ele2) ? { x: this.x2, y: this.y2 } : { x: this.x1, y: this.y1 };  
            const tmpArr = [tmpEle1, tmpEle2] ;  // 这一步保证 坐标小的图形在上边 大的在下边
            this.resetLinePon(tmpArr, checkType) 
        }

    }
    pointInGraph() :boolean { // 判断一个点是否在一条线上
        return true;
    }

    on(eventType: string, callBack: (e?: ISelfEvent) => void) {
        if ( this.eventCollect[eventType] ) {
            const tmpObj: IEventFunc = {
                func: callBack.bind(this),
                isInside: false,
                content: this
            }
            this.eventCollect[eventType].push(tmpObj);
        } else {
            console.log(`${eventType} 事件暂不支持`)
        }
    }
}