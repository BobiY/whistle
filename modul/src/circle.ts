// 具体的圆的类型
import GraphBase from "./graphBase";
import { IArcClass } from "./interface/graphInterface";

export default class Circle extends GraphBase {
    constructor(option: IArcClass) {
        super();
    }

    draw() {
        // 画圆
    }

    pointInGraph() :boolean{
        // 判断点是否在园内
        return true; 
    }
}