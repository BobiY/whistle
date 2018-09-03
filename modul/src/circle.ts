// 具体的圆的类型
import GraphBase from "./graphBase";
import { IArcClass } from "./interface/graphInterface";
import { IEventFunc } from "./interface/baseClassInterface";
export default class Circle extends GraphBase {
    eventCollect: { [name: string]: Array<IEventFunc> }
    posInfor: { cx: number, cy: number, cr:number }
    constructor(option: IArcClass) {
        super();
        this.eventCollect = option.content.eventCallback;
        const { cx, cy ,cr } = option.option;
        this.posInfor = { cx, cy, cr };
    }

    draw() {
        // 画圆
    }

    pointInGraph(mx: number, my:number) :boolean{
        const { cx, cy, cr } = this.posInfor;
        const littleX = Math.abs(cx-mx);
        const littleY = Math.abs(cy-my);
        if ( (littleX * littleX + littleY * littleY) > cr * cr ) {
            return false;
        }
        return true; 
    }

    on(eventType: string, callBack: (e?: Event) => void) {
        if ( this.eventCollect[eventType] ) {
            const tmpObj: IEventFunc = {
                func: callBack.bind(this),
                isInside: false
            }
            this.eventCollect[eventType].push(tmpObj);
        } else {
            console.log(`${eventType} 事件暂不支持`)
        }
    }
}