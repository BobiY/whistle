// 线条
import GraphBase from "./graphBase";
import { ILineClass } from "./interface/graphInterface";
import { IEventFunc } from "./interface/baseClassInterface";
export default class Line extends GraphBase{
    eventCollect: { [name: string]: Array<IEventFunc> }
    constructor(option: ILineClass) {
        super()
        this.eventCollect = option.content.eventCallback;
    }

    draw() {
        // 画线的具体方法实现
    }

    pointInGraph() :boolean { // 判断一个点是否在一条线上
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