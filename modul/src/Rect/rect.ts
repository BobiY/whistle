import GraphBase from "../graphBase";
import { IRectClass } from "../interface/graphInterface";
import { IPosInfor } from "./Interface";
import { IEventFunc } from "../interface/baseClassInterface";
import { ISelfEvent } from "../interface/SelfEvent";
import * as CommonVar from "../Util/CommonVar";
// 方块类
export default class Rect extends GraphBase{
    isInside :boolean;
    x: number;
    y: number;
    drx: number;
    dry: number;
    width: number;
    height: number;
    drawWay: string;
    color: string;
    canDrap: boolean;
    optionDrap: boolean;
    type: string;
    eventCollect: { [propsName: string] : Array<IEventFunc>  };  // 图像上注册的鼠标事件
    readonly ctx: CanvasRenderingContext2D;
    constructor(config: IRectClass) {
        super();
        const { x, y, width, height } = config.option;
        //config.content.eleArr.push(this);
        this.x = x;
        this.y = y;
        this.drx = CommonVar.INITDRX;
        this.dry = CommonVar.INITDRY;
        this.width = width;
        this.type = CommonVar.RECTTYPE;
        this.height = height;
        this.drawWay = config.option.drawWay || CommonVar.DRAWWAY;
        this.color = config.option.color || CommonVar.INITCOLOR;
        this.eventCollect = config.content.eventCallback;
        this.ctx = config.content.ctx;
        this.isInside = CommonVar.INITINSIDE;
        this.canDrap = CommonVar.INITDRAP;
        this.optionDrap = config.option.canDrap;
        this.draw();
        this.registeredInitEvent();
    }

    draw() {
        const ctx: CanvasRenderingContext2D = this.ctx;
        const { x, y, width, height } = this;
        ctx.save(); 
        ctx.beginPath();
        switch(this.drawWay) {
            case CommonVar.DRAWWAY:
                ctx.fillStyle = this.color;
                ctx.fillRect(x, y, width, height);
                break;
            default:
                ctx.strokeStyle = this.color;
                ctx.rect(x, y, width, height);
                ctx.stroke();
        }
        ctx.closePath();
        ctx.restore();
    }

    pointInGraph(mx: number, my: number) :boolean {
        const { x, y, width, height } = this;
        let isInside: boolean = true; // 假定鼠标在当前元素上
        if ( mx < x || mx > x + width || my < y  || my > y + height  ) {
            isInside =  false; // 不在的话将状态置为 false
        }
        return isInside;
    }

    on(eventType: string, callBack: (e?: ISelfEvent) => void ) {
        if ( this.eventCollect[eventType] ) {
            const tmpObj: IEventFunc = {
                func: callBack.bind(this),
                isInside: this.isInside,
                content: this
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