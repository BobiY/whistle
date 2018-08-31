// 基本的构造类


function Whistle(canvas) { // 初始类
    const _this = this;
    // 获取画笔工具
    this.canvas = canvas;
    this.Cwidth = canvas.width;
    this.Cheight = canvas.height;
    this.content2D = canvas.getContext('2d'); // 画笔工具
    this.child = [];
    this.mouseInGraph = null; // 鼠标滑过的元素
    this.mouseDownEle = null; // 鼠标按下的元素
    this.mouseDownPos = { x: 0, y: 0 }; // 鼠标按下的位置
    this.dtDistence = { dx: 0, dy: 0 };
    this.mousePos = { x: 0, y: 0 };
    var cxt = this.content2D;
    var currentArr = [];

    // 获取 canvas 元素的位置信息  getBoundingClientRect 属于内置方法
    var canvasBoundingClientRect = this.canvas.getBoundingClientRect();


    this.canvas.addEventListener("mousedown", function (e) {
        _this.mouseDownPos = _this.getMousePosition(e.clientX, e.clientY)
        _this.reprint(_this.mouseDownPos.x, _this.mouseDownPos.y, _this.onMouseDown)
    })

    this.canvas.addEventListener("mouseup", function (e) {
        _this.mousePos = _this.getMousePosition(e.clientX, e.clientY)
        _this.mouseDownEle = null;
        _this.reprint(_this.mouseDownPos.x, _this.mouseDownPos.y, _this.onMouseUp)
    })



    this.canvas.addEventListener("mousemove", function (e) {
        _this.mousePos = _this.getMousePosition(e.clientX, e.clientY)
        _this.reprint(_this.mousePos.x, _this.mousePos.y, _this.onMouseMove);
    })

    this.getMousePosition = function (X, Y) {
        var x = X - canvasBoundingClientRect.left;
        var y = Y - canvasBoundingClientRect.top;
        return { x: x, y: y }
    }

    this.canvas.addEventListener("click", function (e) {  // 点击是要相应事件的
        _this.mousePos = _this.getMousePosition(e.clientX, e.clientY)
        _this.reprint(_this.mousePos.x, _this.mousePos.y, _this.onClick);
    })

}