import { GRAPH_IN, GRAPH_OUT } from "./CommonVar";
import { IPointCoordinates } from "../../interface/InterFace/PointInterFace";
export default class CalcPos {
    static instance;

    static getInsence() {
        if ( !CalcPos.instance ) {
            CalcPos.instance = new CalcPos();
        }
        return CalcPos.instance; 
    }

    // 计算点是否在图形内
    calcPointInGraphics(testPoiont: IPointCoordinates, vertexCoordinates: IPointCoordinates[]) :string {
        const px = testPoiont.x,
              py = testPoiont.y;
        let sum = 0;

        for(var i = 0, l = vertexCoordinates.length, j = l - 1; i < l; j = i, i++) {
            const sx = vertexCoordinates[i].x,
                  sy = vertexCoordinates[i].y,
                  tx = vertexCoordinates[j].x,
                  ty = vertexCoordinates[j].y;

            // 点与多边形顶点重合或在多边形的边上  前面是在边上  后面是在顶点上
            if( ((sx - px) * (px - tx) >= 0 && (sy - py) * (py - ty) >= 0 ) || ( (px - sx) * (ty - sy) === (py - sy) * (tx - sx) ) ) {
                return GRAPH_IN;
            }

            // 点与相邻顶点连线的夹角
            var angle = Math.atan2(sy - py, sx - px) - Math.atan2(ty - py, tx - px)

            // 确保夹角不超出取值范围（-π 到 π）
            if(angle >= Math.PI) {
                angle = angle - Math.PI * 2;
            } else if(angle <= -Math.PI) {
                angle = angle + Math.PI * 2;
            }

            sum += angle;
        }

        // 计算回转数并判断点和多边形的几何关系
        return Math.round(sum / Math.PI) === 0 ? GRAPH_OUT : GRAPH_IN;
    }
    // 计算点是否在圆内
    calcPointInCircle( testPoiont: IPointCoordinates, centerCoordinates: IPointCoordinates, R: number ): string {
        const differX = Math.pow( testPoiont.x - centerCoordinates.x , 2 );
        const differY = Math.pow( testPoiont.y - centerCoordinates.y, 2 );
        return differX + differY <= Math.pow( R, 2 ) ? GRAPH_IN : GRAPH_OUT;
    }
}