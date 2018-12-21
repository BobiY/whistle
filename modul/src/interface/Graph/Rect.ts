export interface IVertexCoordinates {  //每个顶点坐标
    x: number;
    y: number;
}
export interface IRectBaseProps {
    width: number;
    height: number;
    originX: number;
    originY: number;
    vertexCoordinates: IVertexCoordinates[];  // 方形的四个顶点坐标
    addEvent: ( eventName: string, callback: Function ) => void;
    removeEvent: ( eventName: string ) => void; 
}