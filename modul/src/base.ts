// 基类
import Circle from "./circle";
import Rect from "./rect";
import Line from "./line";
import * as Utils from "./util";
import { IRect } from "./interface/graphInterface";
import { IBaseClassProps, IBaseClassOption } from "./interface/baseClassInterface";
export default class BaseWhistle implements IBaseClassProps{
    public paintbrush: Element;
    constructor(option: IBaseClassOption) {
        this.renderWelcome();
        this.paintbrush = document.getElementById(option.id);
    }

    renderWelcome() {
        console.log("welcome to whistle")
    }

    Rect(option: IRect) :Rect {
        return new Rect({content:this, option})
    }

    Arc(option: object) :Circle {
        return new Circle()
    }

    Line(option: object) :Line {
        return new Line()
    }
}