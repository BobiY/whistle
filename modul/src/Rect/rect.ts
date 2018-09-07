import GraphBase from "../graphBase";
import { IRectClass } from "../interface/graphInterface";
import { IPosInfor } from "./Interface";
import { IEventFunc } from "../interface/baseClassInterface";
// 方块类
interface IProps{
    readonly ctx: CanvasRenderingContext2D;  // 画笔工具
    posInfor: IPosInfor;  // 图形的基本位置信息
    drawWay: string;  // 描边还是填充
    color: string;  // 图形的颜色
    eventCollect: { [propsName: string] : Array<IEventFunc>  };  // 图像上注册的鼠标事件
    mouseInside: boolean;  // 鼠标是否在图像上
}
export default class Rect extends GraphBase<IProps>{
    constructor(config: IRectClass) {
        super();
        const { x, y, width, height } = config.option;
        this.props = {
            ctx: config.content.ctx,
            posInfor: { x, y, width, height },
            drawWay: config.option.drawWay || "stroke",
            color: config.option.color,
            eventCollect: config.content.eventCallback,
            mouseInside: false  // 图形自己维护鼠标是否在自己的身上
        }
        this.draw();
    }

    draw() {
        const ctx: CanvasRenderingContext2D = this.props.ctx;
        const { x, y, width, height } = this.props.posInfor;
        ctx.save(); 
        ctx.beginPath();
        switch(this.props.drawWay) {
            case "fill":
                ctx.fillStyle = this.props.color;
                ctx.fillRect(x, y, width, height);
                break;
            default:
                ctx.strokeStyle = this.props.color;
                ctx.rect(x, y, width, height);
                ctx.stroke();
        }
        ctx.closePath();
        ctx.restore();
    }

    pointInGraph(mx: number, my: number) :boolean {
        const { x, y, width, height } = this.props.posInfor;
        let isInside: boolean = true; // 假定鼠标在当前元素上
        if ( mx < x || mx > x + width || my < y  || my > y + height  ) {
            isInside =  false; // 不在的话将状态置为 false
        }
        this.props.mouseInside = isInside;
        return isInside;
    }

    on(eventType: string, callBack: (e?: Event) => void ) {
        if ( this.props.eventCollect[eventType] ) {
            const tmpObj: IEventFunc = {
                func: callBack.bind(this),
                isInside: this.props.mouseInside
            }
            this.props.eventCollect[eventType].push(tmpObj);
        } else {
            console.log(`${eventType} 事件暂不支持`)
        }
    }
}