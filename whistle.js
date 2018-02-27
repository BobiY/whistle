/**
 * 1. 一种基本图形是一个类
 * 
 * 目前需要的  储存画布信息的类
 *            储存方块信息的类
 *            储存线信息的类
 */


(function(Window){
    function Whistle(canvas) {
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
        this.dtDistence = { dx:0,dy:0 };
        this.mousePos = {x:0,y:0};
        var currentArr = [];
        var canvasBoundingClientRect = this.canvas.getBoundingClientRect()
        this.push = function (params) {
            this.child.push(params)
            this.reprint()
        }

        this.pointInPath = function (x, y,ele) { // 判断点是否在方形内的自定义方法
            var xRange = [ele.x, ele.x + ele.width]
            var yRenge = [ele.y, ele.y + ele.height]
            if ((x >= xRange[0] && x <= xRange[1]) && (y >= yRenge[0] && y <= yRenge[1])) {
                return true
            }
            return false
        }
        this.leaveCanvas = function (x,y) {
            var leave = document.createElement("canvas");
            leave.height = this.Cheight;
            leave.width = this.Cwidth;
            var len = this.child.length;
            var ctx = canvas.getContext('2d'); // 画笔工具
            for (var i = 0; i < len; i++) {
                // 这里将画布对象传入
                var currentChild = this.child[i];
                currentChild.index = i;
                currentChild.printRect(ctx)
                if (ctx.isPointInPath(x, y)) {
                    currentArr.push( currentChild );
                }
            }

        }
        this.reprint = function(x,y,bool){ //当条件改变时，重绘所有图案
            x = x || 0;
            y = y || 0;
            var len = this.child.length;
            var cxt = this.content2D;
            currentArr = [];
            var currentId = 0;
            this.leaveCanvas(x,y);
            this.content2D.clearRect(0, 0, this.Cwidth, this.Cheight);
            currentArr.length && (currentId = currentArr[currentArr.length -1 ].id);
            for( var i = 0; i<len;i++ ){
                // 这里将画布对象传入
                var currentChild = this.child[i];
                currentChild.printRect(cxt)
                if (cxt.isPointInPath(x, y) ) {
                    if ( currentId == currentChild.id ){
                        if ((!bool) || (!this.mouseInGraph) || (this.mouseInGraph.id !== currentChild.id)) {
                            this.mouseInGraph = currentChild;
                            cxt.strokeStyle = currentChild.strokeColor;
                            cxt.lineWidth = 4;
                            cxt.strokeRect(currentChild.x, currentChild.y, currentChild.width, currentChild.height);
                        }
                    }
                    if (bool) {
                        this.mouseDownEle = currentChild;
                        this.dtDistence = {
                            dx: this.mouseDownPos.x - this.mouseDownEle.x,
                            dy: this.mouseDownPos.y - this.mouseDownEle.y
                        }
                    }

                }
                if ((this.mouseDownEle && this.mouseInGraph) && (this.mouseInGraph.id == this.mouseDownEle.id)) {
                    this.mouseDownEle.x = x - this.dtDistence.dx;
                    this.mouseDownEle.y = y - this.dtDistence.dy;
                }
            }
        }

        this.canvas.addEventListener("mousedown",function (e) {
            _this.mouseDownPos = _this.getMousePosition(e.clientX, e.clientY )
            _this.reprint(_this.mouseDownPos.x, _this.mouseDownPos.y,true )
        })

        this.canvas.addEventListener("mouseup", function (e) {
            _this.mouseDownEle = null;
        })



        this.canvas.addEventListener("mousemove", function (e) {
            _this.mousePos = _this.getMousePosition(e.clientX, e.clientY)
            _this.reprint(_this.mousePos.x, _this.mousePos.y,false);
        })

        this.getMousePosition = function(X,Y){
            var x = X - canvasBoundingClientRect.left;
            var y = Y - canvasBoundingClientRect.top;
            return { x:x,y:y } 
        }

    }
    Window.Ws = Whistle;
    Rect.prototype = new RectMethod();

})(window);

function Stage(stageObject){
    var that = this;
    this.cxt = stageObject;
    this.add = function(node){
        this.cxt.push(node);
    }



    Stage.prototype.Rect = Rect;
}


function Rect(option) {
    console.log(this)
    /*************** 方块元素的基本信息 ****************/
    this.x = 0;
    this.y = 0;
    this.height = 32;
    this.width = 32;
    this.fillColor ="blue";
    this.strokeColor = "#fff";
    this.textPos = {};
    this.id = new Date().getTime()*Math.random(); // 乘以随机数，防止id 重复
    this.mouseInEle = false;
    /*************** 方块元素的基本信息 ****************/

    this.getAttrFromOption(this, option);
    this.centerPos = this.getRectCenter(this.x,this.y,this.width,this.height)
    

}


function RectMethod() {  // 储存方形画图的相关方法
    this.print = function (content) {
        // 重绘的时候，如果有 src 则显然图片，如果没有则直接画方块
    }

    this.drawRect = function (ctx) {
        ctx.beginPath()
        ctx.fillStyle = this.fillColor;
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
        ctx.closePath()
    }

    this.printRect = function (ctx) {
        this.drawRect(ctx)
        this.printText(this.x, this.y, this.text, ctx)
        return this;
    }



    this.setAttr = function (atttName, attrValue) {
        this[atttName] = attrValue;
        this.ctx.reprint();  //如果有样式更新，则触发清理画布，更新画布
    }

    this.printText = function (x, y, text, ctx) {
        // 字体设置一定要在获取宽度之前
        ctx.font = "12px Consolas";
        ctx.fillStyle = "#fff";
        var textWidth = this.getTextWidth(text, ctx);
        var rectCenter = this.getRectCenter(x, y, this.width, this.height);
        if (x > 0) {
            x = rectCenter.x - textWidth / 2;
        }
        y = y + this.height + 15;
        this.textPos = { x: x, y: y }
        ctx.fillText(text, x, y);
    }
    this.getAttrFromOption = function (a, option) {
        for (var key in option) {
            a[key] = option[key]
        }
    }

    // 获取方块的中心点坐标
    this.getRectCenter = function (x, y, width, height) {
        var centerX = x + width / 2;
        var centerY = y + height / 2;
        return {
            x: centerX,
            y: centerY
        }
    }
    // 获取需要显示文字的宽度
    this.getTextWidth = function (text, ctx) {
        return ctx.measureText(text).width;
    }

    this.ptintImg = function (src) {
        var t = this;
        var image = new Image();
        image.src = src;
        image.onload = function () {
            t.content2D.drawImage(this, t.x, t.y, t.width, t.height)
        }
        //this.content2D.drawImage(image, this.x, this.y);
    }

    this.setImgSrc = function (src) {
        this.content2D.clearRect(0, 0, this.Cwidth, this.Cheight);
        this.content2D.fillColor = "rgba(255,255,255,0)"
        this.ptintImg(src);
    }

}








