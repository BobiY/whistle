// 这里定义一些图形所需的坐标和相关数据的处理函数，减少每个图形类的实际代码量
/**
 *  1. 这里的函数希望尽量遵循以下原则，以使代码中不会出现严重的引用变量 bug;
 */
import { IPosTmp } from "../interface/commonInterface";
import { IPos } from "../Rect/Interface";
export function coordinateDifference(ele1: any, ele2: any) : IPos {  // 获取两个元素的坐标差
    const ele1Pos: IPosTmp = getPropsValue(ele1);
    const ele2Pos: IPosTmp = getPropsValue(ele2);
    return {
        x: ele1Pos.x + ele1Pos.width/2 - ( ele2Pos.x + ele2Pos.width /2 ),
        y: ele1Pos.y + ele1Pos.height/2 - ( ele2Pos.y + ele2Pos.height /2 )
    }
}

export function getPropsValue (ele: any): IPosTmp { // 获取固定的属性值
    const checkPropsArr = ["x", "y", "width", "height"]
    const tmpObj: any = {};
    checkPropsArr.forEach( item => {
        tmpObj[item] = ele[item] || 0; // 有些元素上不存在 width 和 height 属性直接设置为 0 不影响最终计算结果
    } )
    return tmpObj;
}

export function resetLinePon(tmpArr: any[], checkType: any, ) { // 改变线条的两点坐标  使用时需要在构造函数里绑定 this
    const recordSymbol: any = coordinateDifference(tmpArr[0], tmpArr[1]); // 获取坐标差
    const result = checkType.getResetLint(tmpArr); // 获取中心点坐标
    result.forEach( (item: any, index: number) => {
        this["x" + (index + 1)] = item.w;
        this["y" + (index + 1)] = item.h;
    } )
    const equation = checkType.calcLineFunc({x: this.x1, y:this.y1}, {x: this.x2, y: this.y2});
    const results = checkType.calcResultPos(tmpArr, equation, recordSymbol);
    results.forEach( (item : any, index: number) => {
        this["x" + (index + 1)] = item.x;
        this["y" + (index + 1)] = item.y;
    } ) 
}