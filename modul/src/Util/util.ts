// 工具类
/**
 *  1. 此类型提供了各类使用工具和运动轨迹计算方程
 *  2. 平行线方程
 *  3. 三角函数计算方程
 *  5. 随机数计算方程
 *  6. 随机颜色计算方程
 */
import { Pos } from "./UtilInterface";
export default class Util {
    [props: string]: any;
    static _Intance: Util;
    static getInstance() {
        if ( Util._Intance ) {
            return this._Intance;
        } else {
            return new Util();
        }
    }
    constructor() {
        this.checkTypes();
    }

    calcSumOfSquare(pos: Pos) { // 计算平方和

    }

    calcParallelLines(firstPoint: Pos, secondPoint: Pos, lineWidth: number) {  // 根据线宽计算平行线方程


    }
    calcLineFunc(firstPoint: Pos, secondPoint: Pos) {
        const x1 = firstPoint.x;
        const y1 = firstPoint.y;
        const x2 = secondPoint.x;
        const y2 = secondPoint.y;
        const slope = (y2-y1)/(x2-x1); // 计算斜率
        const b = y1 - x1 * slope;
        return {
            y:(x: number) => slope * x + b,  // 根据 x 算 y
            x:(y: number) => (y - b) / slope,  // 根据 y 算 x
            slope
        } // 传入 x 返回直线方程
    }
    calcRandom() {  // 返回一个随机数

    }

    calcColor(type?: string) {  // 返回一个随机颜色  接收的参数是生成的颜色类型

    }

    checkTypes() {
        const _this :any = this;
        (function() {
            var type: any = {};
            var typeArr = ['String', 'Object', 'Number', 'Array','Undefined', 'Function', 'Null', 'Symbol'];
            for (var i = 0; i < typeArr.length; i++) {
                (function(name) {
                    _this['is' + name] = function(obj: any) {
                        return Object.prototype.toString.call(obj) == '[object ' + name + ']';
                    }
                })(typeArr[i]);
            }
            return type;
        })()
    }

    getRectCenterPoint(x: number, y:number, w:number, h:number) :{w: number, h:number} {
        w = x + w/2;
        h = y + h/2;
        return {w, h}
    }

    getResetLint(eleArr: Array<any>) {
        const result = eleArr.map( item => {
            if ( item.type === "Rect" ) {
                const { x, y, width, height } = item;
                return this.getRectCenterPoint(x, y, width, height);
            } else if ( item.type === "Circle" ) {
                return { w: item.x, h:item.y }
            }
        } )
        return result;
    }

    calcCrossPoint(item: any) {
        if ( item.type === "Rect" ) {

        } 
    }

    calcResultPos( tmpArr: Array<any>, lineFunc: any, symbolrelationship: any) {
        const result = tmpArr.map( (item, index) => {
            if ( item.type === "Rect" ) {
                const x = lineFunc.x(item.y + item.height);
                let g = Math.atan(lineFunc.slope);
                const botmX = item.x + item.width;
                const topX = item.x;
                const leftY = item.y;
                const rightY = item.y + item.height;
                const centerPos = {x: item.x + item.width/2, y: item.y + item.height/2}
                const leftLine = lineFunc.y(item.x)
                const bottomLine = lineFunc.x(item.y + item.height)
                const rightLine = lineFunc.y(item.x + item.width)
                const topLine = lineFunc.x(item.y)
                const leftPoin = {x: item.x, y:leftLine, isRect: (leftLine < rightY && leftLine > leftY) }
                const bottomPoin = { x: bottomLine, y: item.y + item.height, isRect: ( bottomLine > topX && bottomLine< botmX ) }
                const rightPoin = { x:item.x + item.width, y: rightLine, isRect: ( rightLine < rightY && rightLine > leftY ) }
                const topPoin = { x: item.x, y: topLine, isRect: ( topLine < rightY && topLine > leftY ) }
                console.log( leftPoin, bottomPoin,rightPoin,topPoin );
                // if ( symbolrelationship.x <= 0 ) {
                //     return {x, y:item.y + item.height};
                // } else {
                //     return {x, y:(item.y - item.height)};
                // }
                return {x: (item.x + item.width/2), y:(item.y + item.height/2)}
            } else if ( item.type === "Circle" ) {
                // console.log(lineFunc.slope)
                let g = Math.atan(lineFunc.slope);
                //console.log(symbolrelationship.y, g)
                    if ( (symbolrelationship.y > 0 && g > 0) || ( symbolrelationship.y < 0 && g < 0 ) ) {  // 代表圆的 1 3 象限
                        return { x: item.x + Math.cos(g)*item.r, y:item.y + Math.sin(g)*item.r }
                    } else { 
                        return { x: item.x - Math.cos(g)*item.r, y:item.y - Math.sin(g)*item.r } // 代表圆的 2，4 象限
                    }
            }
        });
        return result;
    }


}