// 基类
import Circle from "./circle";
import Rect from "./Rect/rect";
import Line from "./line";
import * as Utils from "./util";
import { IRect, IArc, ILine } from "./interface/graphInterface";
import { IBaseClassProps, IBaseClassOption, IMousePos, IEventFunc } from "./interface/baseClassInterface";
import Event from "./event";
export default class BaseWhistle implements IBaseClassProps{
    [name: string]: any;
    public paintbrush: HTMLCanvasElement;
    private mousePos: IMousePos;
    public ctx: CanvasRenderingContext2D;
    public eventCallback: { [propsName: string] : Array<IEventFunc>};
    public eleCollect: Array<any>;
    constructor(option: IBaseClassOption) {
        this.renderWelcome();
        this.paintbrush = document.getElementById(option.id) as HTMLCanvasElement; // 获取 canvas 元素  添加断言可以添加自己的类型 防止类型不同意而不能通过编译
        this.ctx = this.paintbrush.getContext('2d'); // 画笔工具
        this.mousePos = {x: -1, y: -1};
        this.eventCallback = {};
        this.eleCollect = [];
        this.mouseEventBind();
    }

    private renderWelcome() {
        console.log("welcome to whistle")
    }

    reDraw() {
        console.log("此方法将在图形的属性重新设置时进行图形重绘")
    }

    private mouseEventBind() {
        // 目前支持的事件类型
        const supportEventTypes: Array<string> = ["mouseup", "mousedown", "mouseover", "click", "dblclick", "mousemove"]
        const rootEle: HTMLCanvasElement = this.paintbrush;  // 根 Canvas 元素
        supportEventTypes.forEach( (item: string) => {
            this.eventCallback[item] = []; // 初始化图形注册的时间处理函数
            //rootEle.removeEventListener(item, () => {console.log("event has removed")}) // 在初始化时，先移除用户提前绑定的事件
            rootEle.addEventListener(item, (e: MouseEvent) => { 
                // 需要实时的获取鼠标位置
                const eventType: string = e.type;
                // 记录鼠标位置
                const pos = this.paintbrush.getBoundingClientRect();
                this.mousePos = {x: e.clientX - pos.left, y: e.clientY - pos.top  }

                // 根据鼠标是否在图像上决定是否执行图像的对应回调函数
                this.eventCallback[eventType].forEach( (sub: IEventFunc) => { sub.isInside && sub.func(e)} )}) // 执行注册事件回调
        })

    }

    private runEventCallback() { // 执行对应图形的回调函数

    }

    /********图形相关的方法********/
    private Rect(option: IRect) :Rect {
        const rect = new Rect({content:this, option})
        this.eleCollect.push(rect);
        return rect
    }

    private Arc(option: IArc) :Circle {
        const circle = new Circle({content:this, option})
        this.eleCollect.push(circle);
        return circle
    }

    private Line(option: ILine) :Line {
        const line = new Line({content:this, option})
        this.eleCollect.push(line);
        return line
    }
    /***********图形相关方法结束*************/
}