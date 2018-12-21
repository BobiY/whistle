import BaseGraph from "../../BaseDraw/BaseGraph";
import { IRectBaseProps, IVertexCoordinates } from "../../interface/Graph/Rect";
export default class Rect extends BaseGraph implements IRectBaseProps {
    width: number;
    height: number;
    originX: number;
    originY: number;
    vertexCoordinates: IVertexCoordinates[];
    registeredEventName: object;
    constructor(option) {  // option = { content: fatherEle, config: {} } 
        super();
        this.registeredEventName = {};
    }

    calcRectVertexCoordinates( width: number, height: number, originX: number, originY: number ) {  // 计算方形的四顶点坐标
        for ( let i = 0; i<= 3; i++ ) {
            const tmp: IVertexCoordinates = { x: 0, y: 0 };
            if ( i % 2 === 0 ) {
                tmp.x = (i % 2) * width + originX;  // 左上， 右下的计算
                tmp.y = (i % 2) * height + originY;
            } else {
                tmp.x = (i - 2) > 0 ? width + originX : 0;
                tmp.y = (i - 2) > 0 ? 0 : height + originY; 
            }
            this.vertexCoordinates.push( tmp );
        }
    }

    getVertexCoordinates(): IVertexCoordinates[] {  // 获取顶点坐标
        return this.vertexCoordinates;
    }

    addEvent( eventName: string, callback ) {  // 添加事件
        this.registeredEventName[eventName] = 0;
        // 将事件注册进对应的事件数组中，保存对应的 index 移除时方便
    }

    removeEvent( eventName: string ) { // 移除事件
        // 根据事件名字查询 id 和 事件类型记录，然后进行删除操作
    }
}