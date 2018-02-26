/**
 * 1. 一种基本图形是一个类
 * 
 * 目前需要的  储存画布信息的类
 *            储存方块信息的类
 *            储存线信息的类
 */


(function(Window){
    function Whistle(canvas) {

        // 获取画笔工具
        this.canvas = canvas;
        this.Cwidth = canvas.width;
        this.Cheight = canvas.height; 
        this.content2D = canvas.getContext('2d'); // 画笔工具
        this.child = [];

        this.push = function (params) {
            this.child.push(params)
            this.reprint()
        }

        this.reprint = function(x,y){
            x = x || 0;
            y = y || 0;
            var len = this.child.length;
            var cxt = this.content2D;
            this.content2D.clearRect(0, 0, this.Cwidth, this.Cheight);
            for( var i = 0; i<len;i++ ){
                // 这里将画布对象传入
                this.child[i].printRect(cxt,x,y)
            }
        }

    }
    Window.Ws = Whistle;

})(window);

function Stage(stageObject){
    var that = this;
    this.cxt = stageObject;
    this.add = function(node){
        this.cxt.push(node);
    }

    this.mousePos = {
        x:0,
        y:0
    }

    stageObject.canvas.addEventListener("mousemove",function(e){
        that.mousePos.x = e.clientX - that.cxt.canvas.getBoundingClientRect().left;
        that.mousePos.y = e.clientY - that.cxt.canvas.getBoundingClientRect().top;
        that.cxt.reprint(that.mousePos.x,that.mousePos.y);
    })

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
    /*************** 方块元素的基本信息 ****************/

    this.print = function(content){
        // 重绘的时候，如果有 src 则显然图片，如果没有则直接画方块
    }

    this.drawRect = function(ctx){
        ctx.beginPath()
        ctx.fillStyle = this.fillColor;
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
        ctx.closePath()
    }

    this.printRect = function (ctx,x,y) {
        this.drawRect(ctx)
        if(ctx.isPointInPath(x,y)){
            ctx.strokeStyle = this.strokeColor;
            ctx.lineWidth = 4;
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
        this.printText(this.x, this.y, this.text,ctx)
        return this;
    }


    this.pointInPath = function(x,y){ // 判断点是否在方形内的自定义方法
        var xRange = [this.x,this.x + this.width]
        var yRenge = [this.y,this.y + this.height]
        if( ( x>=xRange[0] && x<= xRange[1] ) && ( y>= yRenge[0] && y<=yRenge[1] ) ){
            return true
        }
        return false
    }

    this.setAttr = function (atttName, attrValue) {
        this[atttName] = attrValue;
        this.ctx.reprint();  //如果有样式更新，则触发清理画布，更新画布
    }

    this.printText = function (x, y, text,ctx) {
        // 字体设置一定要在获取宽度之前
        ctx.font = "12px Consolas";
        ctx.fillStyle = "#fff";
        var textWidth = this.getTextWidth(text,ctx);
        var rectCenter = this.getRectCenter(x, y, this.width, this.height);
        if ( x > 0 ){
            x = rectCenter.x - textWidth / 2;
        }
        y = y + this.height + 15;
        this.textPos = {x:x,y:y}
        ctx.fillText(text, x, y);
    }
    this.getAttrFromOption = function(a,option){
        for( var key in option ){
            a[key] = option[key]
        }
    }

    // 获取方块的中心点坐标
    this.getRectCenter = function (x,y,width,height) {
        var centerX = x + width/2;
        var centerY = y + height/2;
        return {
            x:centerX,
            y:centerY
        }
    }
    // 获取需要显示文字的宽度
    this.getTextWidth = function(text,ctx) {
        return ctx.measureText(text).width;
    }

    this.ptintImg = function (src) {
        var t = this;
        var image = new Image();
        image.src = src;
        image.onload = function () {
            t.content2D.drawImage(this, t.x, t.y,t.width,t.height)
        }
        //this.content2D.drawImage(image, this.x, this.y);
    }

    this.setImgSrc = function(src){
        this.content2D.clearRect(0,0, this.Cwidth, this.Cheight);
        this.content2D.fillColor = "rgba(255,255,255,0)"
        this.ptintImg(src);
    }

    this.getAttrFromOption(this, option);
    

}







