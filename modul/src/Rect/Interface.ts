// 方形类内部各属性的接口

// 基本位置接口
interface IPos {
    x: number,
    y: number
} 


export interface IPosInfor extends IPos {
    width: number,
    height: number
}
