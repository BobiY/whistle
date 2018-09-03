// 具体的圆的类型
import GraphBase from "./graphBase";
import { IArcClass } from "./interface/graphInterface";

export default class Circle extends GraphBase {
    eventCollect: { [name: string]: Array<(e?: Event) => void> }
    constructor(option: IArcClass) {
        super();
        this.eventCollect = option.content.eventCallback;
    }

    draw() {
        // 画圆
    }

    pointInGraph() :boolean{
        // 判断点是否在园内
        return true; 
    }

    on(eventType: string, callBack: (e?: Event) => void) {
        if ( this.eventCollect[eventType] ) {
            this.eventCollect[eventType].push(callBack.bind(this));
        } else {
            console.log(`${eventType} 事件暂不支持`)
        }
    }
}