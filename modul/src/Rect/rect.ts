import GraphBase from "../graphBase";
import { IRectClass } from "../interface/graphInterface";
import { IPosInfor } from "./Interface";
// 方块类
export default class React extends GraphBase{
    ctx: CanvasRenderingContext2D;
    posInfor: IPosInfor;
    drawWay: string;
    color: string;
    constructor(config: IRectClass) {
        super();
        this.ctx = config.content.ctx;
        const { x, y, width, height } = config.option;
        this.posInfor = { x, y, width, height }
        this.drawWay = config.option.drawWay;
        this.color = config.option.color;
    }

    draw() {
        const ctx: CanvasRenderingContext2D = this.ctx;
        const { x, y, width, height } = this.posInfor;
        ctx.save(); 
        ctx.beginPath();
        switch(this.drawWay) {
            case "fill":
                ctx.fillStyle = this.color;
                ctx.fillRect(x, y, width, height);
                break;
            default:
                ctx.strokeStyle = this.color;
                ctx.rect(x, y, width, height);
        }
        ctx.rect(x, y, width, height);
        ctx.closePath();
        ctx.restore();
    }

    pointInGraph(mx: number, my: number) :boolean {
        const { x, y, width, height } = this.posInfor;
        if ( mx < x || mx > x + width || my < y  || my > y + height  ) {
            return false;
        }

        return true;
    }
}