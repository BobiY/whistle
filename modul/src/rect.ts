import GraphBase from "./graphBase";
import { IRectClass } from "./interface/graphInterface";
// 方块类
export default class React extends GraphBase{
    constructor(config: IRectClass) {
        super();
    }

    draw() {

    }

    pointInGraph() :boolean {
        return true;
    }
}