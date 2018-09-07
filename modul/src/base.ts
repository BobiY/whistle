// 基类
import Circle from "./circle";
import Rect from "./Rect/rect";
import Line from "./line";
import ErrorBase from "./error";
import Util, * as Utils from "./Util/util";
import { IRect, IArc, ILine } from "./interface/graphInterface";
import { IBaseClassProps, IBaseClassOption, IMousePos, IEventFunc } from "./interface/baseClassInterface";
export default class BaseWhistle implements IBaseClassProps{
    public paintbrush: HTMLCanvasElement;
    private mousePos: IMousePos;
    public ctx: CanvasRenderingContext2D;
    public eventCallback: { [propsName: string] : Array<IEventFunc>};
    constructor(id: string) {
        this.renderWelcome();
        this.paintbrush = document.getElementById(id) as HTMLCanvasElement; // 获取 canvas 元素  添加断言可以添加自己的类型 防止类型不同意而不能通过编译
        this.ctx = this.paintbrush.getContext('2d'); // 画笔工具
        this.mousePos = {x: -1, y: -1};
        this.eventCallback = {"mousemove":[{
            isInside: true,
            func: this.mouseMove.bind(this)
        }]}
        new ErrorBase().checkWithAndHeight(this.paintbrush);
    }

    renderWelcome() {
        console.log("welcome to whistle")
    }

    /***
     * 1. 这里设想两种方式的重绘，一种是用户控制，一种是库自己完成
     * 2. 用户控制的话，只需要用户在合适的时机去调用重绘函数 ， 但是这里需要一种检测机制去提醒用户，不能在很短时间去重复调用，这样子会导致数据的更新不及时
     * 3. 库自己控制去更新的话， 提供的思想是 利用 Promise 会在本轮事件循环的最后执行，这样子就能充分的收集到用户修改的属性值
     * 4. 库控制的话，这里需要用户使用设置函数去改变属性值
     * 5. 用户自己调用，支持 函数和 点 改变属性两种方式
     */
    reDraw() {  // 这里会设想两种方式的重绘
        console.log("此方法将在图形的属性重新设置时进行图形重绘")
    }

    private mouseEventBind() {
        // 目前支持的事件类型
        const supportEventTypes: Array<string> = ["mouseup", "mousedown", "mouseover", "click", "dblclick"]
        const rootEle: HTMLCanvasElement = this.paintbrush;  // 根 Canvas 元素
        supportEventTypes.forEach( (item: string) => {
            this.eventCallback[item] = []; // 初始化图形注册的时间处理函数
            rootEle.removeEventListener(item, () => {console.log("event has removed")}) // 在初始化时，先移除用户提前绑定的事件
            rootEle.addEventListener(item, (e) => { 
                this.eventCallback[item].forEach( (sub: IEventFunc) => { sub.isInside && sub.func(e)} )
            }) // 执行注册事件回调
        })

    }

    private runDragAndDrop() { // 执行图形的拖拽事件，  这里指的拖拽仅仅指的是 mousemove 事件
        // 这个方法里会触发重绘操作   这里会改变一个图形的坐标信息  拖拽仅仅发生在一个图形上 这里可以直接用 点语法 主动触发重绘
        // 前面是改变位置的操作
        this.reDraw() 

    }

    private changeInside() {  // 改变图形鼠标是否在其中的标志位的状态 这个函数仅仅用来改变状态

    }

    private mouseMove() {  // 当鼠标在画布上移动是执行的函数
        this.changeInside();
        this.runDragAndDrop();
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

    /*************工具类******************/

    Utli() {
        return Util.getInstance();  // 返回工具类的实例
    }
}