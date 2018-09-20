// 基类
import Circle from "./circle";
import Rect from "./Rect/rect";
import Line from "./line";
import ErrorBase from "./error";
import Util, * as Utils from "./Util/util";
import { IRect, IArc, ILine } from "./interface/graphInterface";
import { IBaseClassProps, IBaseClassOption, IMousePos, IEventFunc } from "./interface/baseClassInterface";
import { ISelfEvent } from "./interface/SelfEvent";
import Event from "./event";
export default class BaseWhistle implements IBaseClassProps{
    public eleArr :Array<any>;
    [name: string]: any;
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
        this.eleArr = [];
        new ErrorBase().checkWithAndHeight(this.paintbrush); // canvas 元素检测
        this.mouseEventBind();
    }

    private renderWelcome() {
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
        const ctx = this.ctx;
        const ele = this.paintbrush
        Promise.resolve().then( () => { 
            ctx.clearRect(0,0,ele.width, ele.height) // 重绘之前需要清理画布
            this.eleArr.forEach( item => {
                item.draw();
            } ) 
        } );
    }

    private mouseEventBind() {
        // 目前支持的事件类型
        const supportEventTypes: Array<string> = ["mouseup", "mousedown", "mouseover", "click", "dblclick", "mousemove"]
        const rootEle: HTMLCanvasElement = this.paintbrush;  // 根 Canvas 元素
        supportEventTypes.forEach( (item: string) => {
            if ( !this.eventCallback[item] ) {
                this.eventCallback[item] = []
            }
            // this.eventCallback[item] = []; // 初始化图形注册的时间处理函数
            rootEle.removeEventListener(item, () => {console.log("event has removed")}) // 在初始化时，先移除用户提前绑定的事件
            rootEle.addEventListener(item, (e: MouseEvent) => {
                // 需要实时的获取鼠标位置
                const eventType: string = e.type; // 触发的鼠标事件类型
                // 记录鼠标位置
                const pos = this.paintbrush.getBoundingClientRect();
                this.mousePos = {x: e.clientX - pos.left, y: e.clientY - pos.top  }
                const selfEvent: ISelfEvent = { 
                    mouseX: this.mousePos.x,
                    mouseY: this.mousePos.y,
                }
                // 根据鼠标是否在图像上决定是否执行图像的对应回调函数
                this.eventCallback[item].forEach( (sub: IEventFunc) => { 
                    //console.log(sub.isInside)
                        if (sub.content) {
                            sub.content.isInside && sub.func(selfEvent)
                        } else {
                            sub.isInside && sub.func(selfEvent)
                        }
                    } )
                }) // 执行注册事件回调
        })

    }

    private runDragAndDrop() { // 执行图形的拖拽事件，  这里指的拖拽仅仅指的是 mousemove 事件
        // 这个方法里会触发重绘操作   这里会改变一个图形的坐标信息  拖拽仅仅发生在一个图形上 这里可以直接用 点语法 主动触发重绘
       this.eleArr.forEach( item => {
           if (item.isInside && item.optionDrap && item.canDrap) {
                item.x = this.mousePos.x - item.drx;
                item.y = this.mousePos.y - item.dry;
           }
       } )
        this.reDraw() 

    }

    private changeInside() {  // 改变图形鼠标是否在其中的标志位的状态 这个函数仅仅用来改变状态
        this.eleArr.forEach( item => {
            item.isInside = item.pointInGraph(this.mousePos.x, this.mousePos.y);
            item.canDrap && (item.canDrap = item.isInside);  // 这一步是防止鼠标拖拽太快脱离元素时鼠标再放上去的时候元素会跟着动
        } )
    }

    private mouseMove() {  // 当鼠标在画布上移动是执行的函数
        //console.log("this is parent mouseMove method")
        this.changeInside();
        this.runDragAndDrop();
    }


    /********图形相关的方法********/
    private Rect(option: IRect) :Rect {
        const rect = new Rect({content:this, option})
        this.eleArr.push(rect);
        return rect
    }

    private Arc(option: IArc) :Circle {
        const circle = new Circle({content:this, option})
        this.eleArr.push(circle);
        return circle
    }

    private Line(option: ILine) :Line {
        const line = new Line({content:this, option})
        this.eleArr.push(line);
        return line
    }
    /***********图形相关方法结束*************/

    /*************工具类******************/

    Utli() {
        return Util.getInstance();  // 返回工具类的实例
    }
}