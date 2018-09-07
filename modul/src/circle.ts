// 具体的圆的类型
/**
 * 暂不支持自选弧度画图形
 */
import GraphBase from "./graphBase";
import { IArcClass } from "./interface/graphInterface";
import { IEventFunc } from "./interface/baseClassInterface";
interface IProps{
    eventCollect: { [name: string]: Array<IEventFunc> }
    posInfor: { cx: number, cy: number, cr:number }
    color: string;
    drawWay: string;
    readonly ctx: CanvasRenderingContext2D
}
export default class Circle extends GraphBase<IProps> {
    constructor(option: IArcClass) {
        super();
        const { cx, cy ,cr } = option.option;
        this.props = {
            eventCollect: option.content.eventCallback,
            posInfor: { cx, cy, cr },
            color: option.option.color,
            drawWay: option.option.drawWay,
            ctx: option.content.ctx
        }
        this.draw();
    }

    draw() {
        const ctx: CanvasRenderingContext2D = this.props.ctx;
        const { cx, cy, cr } = this.props.posInfor;
        ctx.save(); 
        ctx.beginPath();
        switch(this.props.drawWay) {
            case "fill":
                ctx.fillStyle = this.props.color;
                ctx.arc(cx, cy, cr, 0,2*Math.PI);
                ctx.fill();
                break;
            default:
                ctx.strokeStyle = this.props.color;
                ctx.arc(cx, cy, cr, 0,2*Math.PI);
                ctx.stroke();
        }
        ctx.closePath();
        ctx.restore();
    }

    pointInGraph(mx: number, my:number) :boolean{
        const { cx, cy, cr } = this.props.posInfor;
        const littleX = Math.abs(cx-mx);
        const littleY = Math.abs(cy-my);
        if ( (littleX * littleX + littleY * littleY) > cr * cr ) {
            return false;
        }
        return true; 
    }

    on(eventType: string, callBack: (e?: Event) => void) {
        if ( this.props.eventCollect[eventType] ) {
            const tmpObj: IEventFunc = {
                func: callBack.bind(this),
                isInside: false
            }
            this.props.eventCollect[eventType].push(tmpObj);
        } else {
            console.log(`${eventType} 事件暂不支持`)
        }
    }
}