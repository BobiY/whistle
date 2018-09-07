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
    static _Intance: Util;
    static getInstance() {
        if ( Util._Intance ) {
            return this._Intance;
        } else {
            return new Util();
        }
    }
    constructor() {

    }

    calcSumOfSquare(pos: Pos) { // 计算平方和

    }

    calcParallelLines(firstPoint: Pos, second: Pos, lineWidth: number) {  // 根据线宽计算平行线方程


    }

    calcRandom() {  // 返回一个随机数

    }

    calcColor(type?: string) {  // 返回一个随机颜色  接收的参数是生成的颜色类型

    }

}