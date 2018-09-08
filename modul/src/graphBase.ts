// 各类图形的基类
import { ISelfEvent } from "./interface/SelfEvent";
export default abstract class GraphBase{
    id: number;  // 标记每个图形的 id 保证去唯一性
    x: number;
    y: number;
    r?: number; // 圆的半径
    width?: number; // 方块的宽度
    height?: number; // 方块的高度
    canDrap: boolean; // 是否允许拖拽
    constructor() {
        this.id = new Date().getTime()*Math.random();
    }
    abstract  draw() :void //画图形的方法

    abstract pointInGraph(x: number, y:number) :boolean // 判断点是否存在于图形中， 这个方法的实现需要根据各自图形的特性自定义

    abstract on(eventType: string, callBack: (e?: ISelfEvent) => void) : void  // 事件注册函数  

}