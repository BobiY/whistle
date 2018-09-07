// 各类错误提示类


export default class ErrorBase {
    

    checkWithAndHeight(ele: HTMLCanvasElement){  // 要保证 canvas 元素上的 width 和 height 属性存在并且与样式中设置的值一致
        const { width, height } = window.getComputedStyle(ele);
        if ( ele.width !== parseInt(width) || ele.height !== parseInt(height) ) {
            window.alert(`
                传入的 canvas 元素缺少 width 或者 height 属性，
                或者在样式中给 canvas 添加的 width 和 height 属性值与元素上对应的属性数值不一致，
                这会导致图形模糊，请设置，若想跳过检测，可设置 check: false!
                但这会导致图形的显示不如预期。
            `)
        }
    }
}