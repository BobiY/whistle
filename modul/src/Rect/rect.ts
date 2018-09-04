import GraphBase from "../graphBase";
import { IRectClass } from "../interface/graphInterface";
import { IPosInfor } from "./Interface";
import { IEventFunc } from "../interface/baseClassInterface";
// 方块类
export default class Rect extends GraphBase{
    ctx: CanvasRenderingContext2D;
    posInfor: IPosInfor;
    drawWay: string;
    color: string;
    eventCollect: { [propsName: string] : Array<IEventFunc>  };
    mouseInside: boolean;
    constructor(config: IRectClass) {
        super();
        this.ctx = config.content.ctx;
        const { x, y, width, height } = config.option;
        this.posInfor = { x, y, width, height }
        this.drawWay = config.option.drawWay;
        this.color = config.option.color;
        this.eventCollect = config.content.eventCallback;
        this.mouseInside = false;  // 图形自己维护鼠标是否在自己的身上
    }

    draw() {
        const ctx: CanvasRenderingContext2D = this.ctx;
        const { x, y, width, height } = this.posInfor;
        ctx.save(); 
        ctx.beginPath();
        switch(this.drawWay) {
            case "fill":
                ctx.fillStyle = this.color;
                ctx.fillRect(x, y, width, height);
                break;
            default:
                ctx.strokeStyle = this.color;
                ctx.rect(x, y, width, height);
        }
        ctx.rect(x, y, width, height);
        ctx.closePath();
        ctx.restore();
    }

    pointInGraph(mx: number, my: number) :boolean {
        const { x, y, width, height } = this.posInfor;
        let isInside: boolean = true; // 假定鼠标在当前元素上
        if ( mx < x || mx > x + width || my < y  || my > y + height  ) {
            isInside =  false; // 不在的话将状态置为 false
        }
        this.mouseInside = isInside;
        return isInside;
    }

    on(eventType: string, callBack: (e?: Event) => void ) {
        if ( this.eventCollect[eventType] ) {
            const tmpObj: IEventFunc = {
                func: callBack.bind(this),
                isInside: this.mouseInside
            }
            this.eventCollect[eventType].push(tmpObj);
        } else {
            console.log(`${eventType} 事件暂不支持`)
        }
    }
}