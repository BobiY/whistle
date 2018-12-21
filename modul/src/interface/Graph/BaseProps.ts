import { IPointCoordinates } from "../InterFace/PointInterFace";

export interface IBaseGraphProps {  // 图形基类的属性
    id: Symbol;
    fontColor: string;
    fillColor: string;
    strokeColor: string;
    centerCoordinates?: IPointCoordinates;  // 圆心坐标
    vertexCoordinates?: IPointCoordinates[]; // 顶点坐标
    lineWidth: number;
    fontSize: string;
}