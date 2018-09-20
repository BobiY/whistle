// 文字类
import * as CommonVar from "./Util/CommonVar";
import { IText } from "./interface/graphInterface";
interface ITexts{
    draw: () => void  // 用来写文字
}

export default class Texts implements ITexts {
    ctx: any;
    font: string;
    drawWay: string;
    color: string;
    text: string;
    textWidth: number;
    x: number;
    y: number;
    constructor(config: IText) {
        this.ctx = config.content.ctx;
        this.x = config.option.x;
        this.y = config.option.y;
        this.font = config.option.font || "italic 16px 黑体";
        this.color = config.option.color || CommonVar.INITCOLOR;
        this.drawWay = config.option.drawWay || CommonVar.DRAWWAY;
        this.text = config.option.text;
        this.draw();
    }

    draw() {
        const { ctx, color, drawWay, font, text, textWidth, x, y } = this;
        ctx.font = font;
        switch(drawWay) {
            case "fill":
                ctx.fillStyle = color;
                this.textWidth = this.ctx.measureText(this.text).width;
                ctx.fillText(text,x,y, this.textWidth);
            default:
                ctx.strokeStyle = color;
                this.textWidth = this.ctx.measureText(this.text).width;
                ctx.strokeText(text,x,y, this.textWidth);
        }

    }

    pointInGraph() :boolean {
        return false;
    }
}