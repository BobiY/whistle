import { IGraphCommon } from "./commonInterface";
import BaseWhistle from "../base";
// 各个图形接口只定义需要传入的个性数据


// 方形外传属性接口
export interface IRect extends IGraphCommon {
    width: number,
    heigth: number,
    x: number,
    y: number,
}

// 方形类需要的参数接口
export interface IRectClass {
    content: BaseWhistle,
    option: IRect
}




// 圆形外传属性接口
export interface IArc extends IGraphCommon {
    cx: number,
    cy: number,
    cr: number, 
}