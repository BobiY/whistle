// 基类
import Circle from "./circle";
import Rect from "./rect";
import Line from "./line";
import * as Utils from "./util";
import { IRect, IArc, ILine } from "./interface/graphInterface";
import { IBaseClassProps, IBaseClassOption } from "./interface/baseClassInterface";
export default class BaseWhistle implements IBaseClassProps{
    public paintbrush: Element;
    private mousePos: object;
    constructor(option: IBaseClassOption) {
        this.renderWelcome();
        this.paintbrush = document.getElementById(option.id);
        this.mousePos = {x: -1, y: -1};
    }

    renderWelcome() {
        console.log("welcome to whistle")
    }

    reDraw() {
        console.log("此方法将在图形的属性重新设置时进行图形重绘")
    }

    mouseEventBind() {
        console.log("此方法将自动在实例化舞台对象时绑定通用鼠标事件到 canvae 元素上")
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