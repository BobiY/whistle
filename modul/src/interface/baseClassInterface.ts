// 基类的配置参数接口
export interface IBaseClassOption {
    id: string,  // canvas 元素的 id
}

// 基类的属性接口
export interface IBaseClassProps {
    paintbrush: HTMLElement,  // 储存 canvas 元素
}


// 鼠标位置接口
export interface IMousePos {
    x: number,
    y: number
}