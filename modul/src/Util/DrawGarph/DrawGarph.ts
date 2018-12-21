
export default class DrawGarph {  // 控制图形的绘制
    static instance;

    static getInstance() {
        if ( !DrawGarph.instance ) {
            DrawGarph.instance = new DrawGarph();
        }
        return DrawGarph.instance;
    }

    drawGraph() {  // 绘制图形

    }

    calcMouseIsInGraph() { // 计算鼠标是否在图形内

    }
}