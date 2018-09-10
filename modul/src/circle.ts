// 具体的圆的类型
/**
 * 暂不支持自选弧度画图形
 */
import GraphBase from "./graphBase";
import { IArcClass } from "./interface/graphInterface";
import { IEventFunc } from "./interface/baseClassInterface";
import { ISelfEvent } from "./interface/SelfEvent";
import * as CommonVar from "./Util/CommonVar";
export default class Circle extends GraphBase {
    isInside: boolean;
    x: number;
    y: number;
    r: number;
    drx: number;
    dry: number;
    canDrap: boolean;
    drawWay: string;
    type: string;
    color: string;
    optionDrap: boolean;
    eventCollect: { [propsName: string] : Array<IEventFunc>};
    ctx: CanvasRenderingContext2D;
    constructor(option: IArcClass) {
        super();
        const { cx, cy ,cr } = option.option;
        this.x = cx;
        this.y = cy;
        this.r = cr || CommonVar.CIRCLERADIUS;
        this.drx = CommonVar.INITDRX;
        this.dry = CommonVar.INITDRY;
        this.type = CommonVar.CIRCLETYPE;
        this.drawWay = option.option.drawWay || CommonVar.DRAWWAY;
        this.color = option.option.color || CommonVar.INITCOLOR;
        this.ctx = option.content.ctx;
        this.eventCollect = option.content.eventCallback;
        this.isInside = CommonVar.INITINSIDE;
        this.canDrap = CommonVar.INITDRAP;
        this.optionDrap = option.option.canDrap;
        this.draw();
        this.registeredInitEvent();
    }

    draw() {
        const ctx: CanvasRenderingContext2D = this.ctx;
        const { x, y, r } = this;
        ctx.save(); 
        ctx.beginPath();
        switch(this.drawWay) {
            case CommonVar.DRAWWAY:
                ctx.fillStyle = this.color;
                ctx.arc(x, y, r, 0,2*Math.PI);
                ctx.fill();
                break;
            default:
                ctx.strokeStyle = this.color;
                ctx.arc(x, y, r, 0,2*Math.PI);
                ctx.stroke();
        }
        ctx.closePath();
        ctx.restore();
    }

    pointInGraph(mx: number, my:number) :boolean{
        const { x, y, r } = this;
        const littleX = Math.abs(x-mx);
        const littleY = Math.abs(y-my);
        if ( (littleX * littleX + littleY * littleY) > r * r ) {
            return false;
        }
        return true; 
    }

    on(eventType: string, callBack: (e?: ISelfEvent) => void) {
        if ( this.eventCollect[eventType] ) {
            const tmpObj: IEventFunc = {
                func: callBack.bind(this),
                isInside: this.isInside,
                content: this,
            }
            this.eventCollect[eventType].push(tmpObj);
        } else {
            console.log(`${eventType} 事件暂不支持`)
        }
    }

    /**
     * 需要给每个图形注册基本的拖拽事件
     * 在 mousedown 事件里要改变图形的拖拽状态 表示此时是可拖拽的  用于改变图形的拖拽状态   保存鼠标位置和当前圆形中心点的坐标差
     * 在 mousemove 事件里面改变图形的位置信息
     * 在 mouseup 事件里面改变图形的拖拽状态  解除拖拽状态
     */

    drapMouseDown(selfEvent: ISelfEvent) {
        this.drx = selfEvent.mouseX - this.x;
        this.dry = selfEvent.mouseY - this.y;
        this.canDrap = true;
    }

    drapMouseUp() {
        this.canDrap = false;
    }

    registeredInitEvent() { 
        this.on( "mousedown", this.drapMouseDown.bind(this) );
        this.on( "mouseup", this.drapMouseUp.bind(this) );
    }

}