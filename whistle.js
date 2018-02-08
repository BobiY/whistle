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
        this.content2D = canvas.getContext('2d');
        this.child = [];
        this.refresh = function(atttName,attrValue){
            this[atttName] = attrValue;
            this.Rect();
        }

    }
    Window.Ws = Whistle;
    Whistle.prototype.Rect = Rect;
})(window)



function Rect(text,option) {
    /*************** 方块元素的基本信息 ****************/
    this.x = 0;
    this.y = 0;
    this.height = 32;
    this.width = 32;
    this.fillColor ="blue";
    this.text = "";
    this.content2D = Ws.content2D;
    this.textPos = {};
    this.Cwidth = Ws.Cwidth;
    this.Cheight = Ws.Cheight;
    /*************** 方块元素的基本信息 ****************/

    this.print = function(content){

    }

    this.printRect = function (text) {
        this.text = text ? text : this.text;
        this.content2D.clearRect(0, 0, this.Cwidth, this.Cheight);
        this.content2D.fillStyle = this.fillColor;
        this.content2D.fillRect(this.x, this.y, this.width, this.height);
        this.printText(this.x, this.y, this.text)
        return this;
    }

    this.setAttr = function (atttName, attrValue) {
        this[atttName] = attrValue;
        this.printRect();
    }

    this.printText = function (x, y, text) {
        // 字体设置一定要在获取宽度之前
        this.content2D.font = "12px Consolas";
        this.content2D.fillStyle = "#fff";
        var textWidth = this.getTextWidth(text);
        var rectCenter = this.getRectCenter(x, y, this.width, this.height);
        if ( x > 0 ){
            x = rectCenter.x - textWidth / 2;
        }
        y = y + this.height + 15;
        this.textPos = {x:x,y:y}
        this.content2D.fillText(text, x, y);
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
    this.getTextWidth = function(text) {
        return this.content2D.measureText(text).width;
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
    this.printRect(text)


}







