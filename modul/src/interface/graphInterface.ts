import { IGraphCommon } from "./commonInterface";
import BaseWhistle from "../BaseDraw/BaseDraw";
// 各个图形接口只定义需要传入的个性数据


// 方形外传属性接口
export interface IRect extends IGraphCommon {
    width: number,
    height: number,
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

// 圆形类构造需要的参数
export interface IArcClass {
    content: BaseWhistle,
    option: IArc
}


// 线条的外传属性接口
export interface ILine extends IGraphCommon {
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    lineWidth: number;
    color: string;
    bendWay: string;
}

// 线条类需要的参数
export interface ILineClass {
    content: BaseWhistle,
    option: ILine
}


export interface ITextClass{
    font?: string
    drawWay?: string
    text: string
    x: number
    y: number 
    color?: string 
}

export interface IText{
    content: BaseWhistle,
    option: ITextClass
}