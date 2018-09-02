// 线条
import GraphBase from "./graphBase";
import { ILineClass } from "./interface/graphInterface";

export default class Line extends GraphBase{
    constructor(option: ILineClass) {
        super()
    }

    draw() {
        // 画线的具体方法实现
    }

    pointInGraph() :boolean { // 判断一个点是否在一条线上
        return true;
    }
}