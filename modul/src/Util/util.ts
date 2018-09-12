// 工具类
/**
 *  1. 此类型提供了各类使用工具和运动轨迹计算方程
 *  2. 平行线方程
 *  3. 三角函数计算方程
 *  5. 随机数计算方程
 *  6. 随机颜色计算方程
 */
import { Pos } from "./UtilInterface";
import * as CommonVar from "./CommonVar";
import { coordinateDifference, getPropsValue } from "./CommonFunc";
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

    getPropsValue(object: any, propsName:string) :number {  // 只能检测数字类型的属性
        return object[propsName] ? object[propsName] : 0 
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
            const { x, y, width, height } = getPropsValue(item);
            return { w: x+ width/2, h:y+height/2 }
        } )
        return result;
    }

    calcCrossPoint(item: any) {
        if ( item.type === "Rect" ) {

        } 
    }

    calcResultPos( tmpArr: Array<any>, lineFunc: any, symbolrelationship: any) {
        const result = tmpArr.map( (item, index) => {
            if ( item.type === CommonVar.RECTTYPE ) {
                const x = lineFunc.x(item.y + item.height);
                let g = Math.atan(lineFunc.slope);
                const botmY = item.y + item.height;  // 方形下边界直线方程 
                const topY = item.y;  // 水平上边界直线方程
                const leftX = item.x; // 竖直左边界直线方程 
                const rightX = item.x + item.width; // 竖直右边界直线方程
                const centerPos = {x: item.x + item.width/2, y: item.y + item.height/2} // 中心点坐标
                const leftLine = lineFunc.y(leftX) // 左边线与直线的相交点的 y 坐标
                const bottomLine = lineFunc.x(botmY) // 下边线与直线相交点的 x 坐标
                const rightLine = lineFunc.y(rightX) // 右边线与直线相交的 y 坐标
                const topLine = lineFunc.x(topY)  // 上边线与直线相交的 x 左边
                const leftPoin = {x: leftX, y:leftLine, isRect: (leftLine <= botmY && leftLine >= topY) }
                const bottomPoin = { x: bottomLine, y: botmY, isRect: ( rightX >= bottomLine && bottomLine >= leftX ) }
                const rightPoin = { x:rightX, y: rightLine, isRect: ( rightLine <= botmY && rightLine >= topY ) }
                const topPoin = { x: topLine, y: topY, isRect: ( topLine <= rightX && topLine >= leftX ) }
                if ( index === 0 ) { // 说明是在上面
                    if ( symbolrelationship.x > 0 ) { // 大于 0 说明是在
                        if ( leftPoin.isRect ) {
                            return {x: leftPoin.x, y:leftPoin.y}
                        } else if ( bottomPoin.isRect ){
                            return {x: bottomPoin.x, y:bottomPoin.y}
                        }
                    } else if ( symbolrelationship.x === 0 ) {
                        return {x: item.x + item.width/2, y:bottomPoin.y}
                    } else {
                        if ( rightPoin.isRect ) {
                            return {x: rightPoin.x, y:rightPoin.y}
                        } else if ( bottomPoin.isRect ){
                            return {x: bottomPoin.x, y:bottomPoin.y}
                        }
                    }
                } else { // 说明是在下面
                    //console.log( symbolrelationship.x )
                    if ( symbolrelationship.x > 0  ) {
                        if ( rightPoin.isRect ) {
                            return {x: rightPoin.x, y:rightPoin.y}
                        } else if ( topPoin.isRect ){
                            return {x: topPoin.x, y:topPoin.y}
                        }
                    } else if (symbolrelationship.x === 0) {
                        return {x: item.x + item.width/2, y:topPoin.y}
                    } else {
                        if ( rightPoin.isRect ) {
                            return {x: leftPoin.x, y:leftPoin.y}
                        } else if ( topPoin.isRect ){
                            return {x: topPoin.x, y:topPoin.y}
                        }
                    }
                }
            } else if ( item.type === CommonVar.CIRCLETYPE ) {
                // console.log(lineFunc.slope)
                let g = Math.atan(lineFunc.slope);
                if ( g === Infinity ) {
                    g = Math.PI /2;
                } else if ( g === -Infinity ) {
                    g = -Math.PI / 2;
                }
                //console.log(symbolrelationship.x,g)
                if ( index === 0 ) { // 说明是在上面
                    if ( symbolrelationship.x > 0 ) { // 说明是在右边，这时是第二象限
                        return { x: item.x - Math.cos(g)*item.r, y:item.y - Math.sin(g)*item.r }
                    } else { // 这时是在第一象限
                        return { x: item.x + Math.cos(g)*item.r, y:item.y + Math.sin(g)*item.r }
                    }
                } else {
                    if ( symbolrelationship.x > 0 ) { // 说明是在右边，这时是第三象限
                        return { x: item.x + Math.cos(g)*item.r, y:item.y + Math.sin(g)*item.r }
                    } else { // 这时是在第四象限
                        return { x: item.x - Math.cos(g)*item.r, y:item.y - Math.sin(g)*item.r }
                    }
                }   
            } else {
                return item;
            }
        });
        return result;
    }


}