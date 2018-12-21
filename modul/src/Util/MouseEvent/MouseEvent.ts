import { mouseEventType } from "./commonVar";
import Circle from "../../circle";
import Rect from "../../Rect/rect";
import Line from "../../line";
import Text from "../../Text";
export default class MouseEvent {  // 鼠标事件的直行鱼绑定
    static instance: MouseEvent;

    static getInstance(): MouseEvent {
        if (!MouseEvent.instance) {
            MouseEvent.instance = new MouseEvent();
        }

        return MouseEvent.instance;
    }
    supportEvent: string[]; // 支持的事件类型
    subEventRecord: object;
    constructor() {
        this.supportEvent = mouseEventType;
    }

    bindTheAllEvent(CanvasEle: HTMLCanvasElement) {  // 父元素绑定所有支持的事件
        this.supportEvent.forEach( item => {
            CanvasEle.addEventListener( item, e => { console.log(e) } );
        } );
    }
    
    createRecordSubEleEventObj() {  // 初始化子元素事件记录对象
        this.supportEvent.forEach( item => {
            this.subEventRecord[item] = [];  // => { callback, isInside, id }
        } )
    }
    removeEventFromEle( ele: Rect | Line | Text | Circle , eventName: string ) {
        // const ids = ele.id;  // 获取元素 id ，找到对应的事件记录，解绑
    }
    addEvent( ele: Rect | Line | Text | Circle, eventName: string ) {
        // 找到时间记录，添加
    }
}