// 基类
import Circle from "./circle";
import Rect from "./Rect/rect";
import Line from "./line";
import * as Utils from "./util";
import { IRect, IArc, ILine } from "./interface/graphInterface";
import { IBaseClassProps, IBaseClassOption, IMousePos } from "./interface/baseClassInterface";
export default class BaseWhistle implements IBaseClassProps{
    public paintbrush: HTMLCanvasElement;
    private mousePos: IMousePos;
    public ctx: CanvasRenderingContext2D;
    public eventCallback: { [propsName: string] : Array<(e?: Event) => void>  };
    constructor(option: IBaseClassOption) {
        this.renderWelcome();
        this.paintbrush = document.getElementById(option.id) as HTMLCanvasElement; // 获取 canvas 元素  添加断言可以添加自己的类型 防止类型不同意而不能通过编译
        this.ctx = this.paintbrush.getContext('2d'); // 画笔工具
        this.mousePos = {x: -1, y: -1};
        this.eventCallback = {
            "a": [() => {}]
        }
    }

    renderWelcome() {
        console.log("welcome to whistle")
    }

    reDraw() {
        console.log("此方法将在图形的属性重新设置时进行图形重绘")
    }

    private mouseEventBind() {
        // 目前支持的事件类型
        const supportEventTypes: Array<string> = ["mouseup", "mousedown", "mouseover", "click", "dblclick"]
        const rootEle: HTMLCanvasElement = this.paintbrush;  // 根 Canvas 元素
        supportEventTypes.forEach( (item: string) => {
            this.eventCallback[item] = []; // 初始化图形注册的时间处理函数
            rootEle.removeEventListener(item, () => {console.log("event has removed")}) // 在初始化时，先移除用户提前绑定的事件
            rootEle.addEventListener(item, (e) => { this.eventCallback[item].forEach( (sub: (e: Event) => void) => {sub(e)} )}) // 执行注册事件回调
        })

    }

    /********图形相关的方法********/
    Rect(option: IRect) :Rect {
        return new Rect({content:this, option})
    }

    Arc(option: IArc) :Circle {
        return new Circle({content:this, option})
    }

    Line(option: ILine) :Line {
        return new Line({content:this, option})
    }
    /***********图形相关方法结束*************/
}