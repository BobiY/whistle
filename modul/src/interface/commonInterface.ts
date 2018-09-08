// 图形的公共参数接口
export interface IGraphCommon {
    color?: string,  // 标记图形的颜色
    drawWay?: string, // 标记图形是填充样式还是描边样式
    isStroke?: boolean // 标记是否鼠标滑过自动描边
    canDrap?: boolean // 外传的是否可以拖拽
}