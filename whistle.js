/**
 * 1. 一种基本图形是一个类
 * 
 * 目前需要的  储存画布信息的类
 *            储存方块信息的类
 *            储存线信息的类
 * 将鼠标触发的各种事件做区分，在触发重绘时应根据事件类型和元素做出相应的动作
 * 什么清理图片缓存，怎么清除
 * 目前报错的地方还在少数，多了就需要整理类
 * 实现随机颜色
 */




(function(Window){
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
        this.dtDistence = { dx:0,dy:0 };
        this.mousePos = {x:0,y:0};
        var cxt = this.content2D;
        var currentArr = [];
        var canvasBoundingClientRect = this.canvas.getBoundingClientRect();
        

        this.canvas.addEventListener("mousedown",function (e) {
            _this.mouseDownPos = _this.getMousePosition( e.clientX, e.clientY )
            _this.reprint(_this.mouseDownPos.x, _this.mouseDownPos.y, _this.onMouseDown )
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

        this.getMousePosition = function(X,Y){
            var x = X - canvasBoundingClientRect.left;
            var y = Y - canvasBoundingClientRect.top;
            return { x:x,y:y } 
        }

        this.canvas.addEventListener("click",function(e){  // 点击是要相应事件的
            _this.mousePos = _this.getMousePosition(e.clientX, e.clientY)
            _this.reprint(_this.mousePos.x, _this.mousePos.y,_this.onClick);
        })



    }
    Window.Ws = Whistle;
    Whistle.prototype = new WhistleMethod();
    Rect.prototype = new RectMethod();

})(window);

function WhistleMethod(params) {
    this.push = function (params) {
        this.child.push(params)
        this.reprint()
    }

    this.pointInPath = function (x, y, ele) { // 判断点是否在方形内的自定义方法
        var xRange = [ele.x, ele.x + ele.width]
        var yRenge = [ele.y, ele.y + ele.height]
        if ((x >= xRange[0] && x <= xRange[1]) && (y >= yRenge[0] && y <= yRenge[1])) {
            return true
        }
        return false
    }

    this.pointIsInDraw = function (x, y, arr, ctx, cb) {
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            var currentChild = this.child[i];
            currentChild.index = i;
            currentChild.printRect(ctx)
            if (ctx.isPointInPath(x, y)) {
                cb(currentChild)
            }
        }
    }
    this.leaveCanvas = function (x, y) { // 使用离屏canvas去判断重叠时高亮的元素
        var leave = document.createElement("canvas");
        leave.height = this.Cheight;
        leave.width = this.Cwidth;
        var ctx = canvas.getContext('2d'); // 画笔工具
        function doSomething(ele) {
            currentArr.push(ele)
        };
        this.pointIsInDraw(x, y, this.child, ctx, doSomething)

    }
    this.reprint = function (x, y, cb) { //当条件改变时，重绘所有图案
        cb && (cb = cb.bind(this))
        x = x || 0;
        y = y || 0;
        var len = this.child.length;
        var cxt = this.content2D;
        currentArr = [];
        var currentId = 0;
        this.leaveCanvas(x, y);
        cxt.clearRect(0, 0, this.Cwidth, this.Cheight);
        currentArr.length && (currentId = currentArr[currentArr.length - 1].id);
        for (var i = 0; i < len; i++) {
            // 这里将画布对象传入
            var currentChild = this.child[i];
            
            if (( this.mouseDownEle && this.mouseInGraph ) && (this.mouseInGraph.id == this.mouseDownEle.id)) {
                
                this.mouseDownEle.x = x - this.dtDistence.dx;
                this.mouseDownEle.y = y - this.dtDistence.dy;
            }
            
            if ( currentChild.src ){
                if (currentId == currentChild.id ){
                    currentChild.printImg(currentChild, currentChild.src, currentChild.isImageToRect, cxt,true);
                }else{
                    currentChild.printImg(currentChild, currentChild.src, currentChild.isImageToRect, cxt,false);
                }
                cb && cb(currentId, currentChild, x, y, cxt);
            }else{
                if ( currentId == currentChild.id ){
                    currentChild.printRect(cxt,true);
                    cb && cb(currentId, currentChild, x, y, cxt);
                }else{
                    currentChild.printRect(cxt,false);
                    cb && cb(currentId, currentChild, x, y, cxt);
                }
            }

        }
    }

    this.onMouseDown = function (currentId, currentChild, x, y, cxt) {
        if (currentId == currentChild.id) {
            currentChild.eventList["mousedown"] && currentChild.eventList['mousedown'](cxt, x, y);  // 如果元素存在事件则执行元素对应的事件
            cxt.strokeStyle = currentChild.strokeColor;
            cxt.lineWidth = 4;
            cxt.strokeRect(currentChild.x, currentChild.y, currentChild.width, currentChild.height);
            this.mouseDownEle = currentChild;
            this.dtDistence = {
                dx: this.mouseDownPos.x - this.mouseDownEle.x,
                dy: this.mouseDownPos.y - this.mouseDownEle.y
            }
        }

    }

    this.onMouseMove = function (currentId, currentChild, x, y, cxt) {
        if (currentId == currentChild.id) {
            if (!this.mouseInGraph || (currentChild.id != this.mouseInGraph.id )){ // 如果是在拖拽一个元素，就不更新鼠标在哪个元素上
                this.mouseInGraph = currentChild;
            }
            this.mouseInGraph.eventList["mousemove"] && this.mouseInGraph.eventList['mousemove'](cxt, x, y); // 如果元素存在事件则执行元素对应的事件
        }
    }

    this.onMouseUp = function (currentId, currentChild, x, y, cxt) {
        if (currentId == currentChild.id) {
            this.mouseInGraph = currentChild;
            currentChild.eventList["mouseup"] && currentChild.eventList['mouseup'](cxt, x, y); // 如果元素存在事件则执行元素对应的事件
        }
    }

    this.onClick = function (currentId, currentChild, x, y, cxt) {
        if (currentId == currentChild.id) {
            this.mouseInGraph = currentChild;
            currentChild.eventList["click"] && currentChild.eventList['click'](cxt, x, y);// 如果元素存在事件则执行元素对应的事件
        }
    }



}

function Stage(stageObject) { // 调节画布和图形的中间类
    var that = this;
    this.cxt = stageObject;
    this.add = function (node) {
        this.cxt.push(node);
    }
    Window.$$whistle = stageObject;
    Stage.prototype.Rect = Rect;
}




function Rect(option) { //
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
    this.eventList = {};// 储存用户注册的事件列表
    this.src = "";
    this.isImageToRect = false;
    //this.ctx = Window.$$whistle;
    this.attrArr = ["width", "height", "x", "y", "id", "fillColor", "strokeColor", "textPos","centerPos","eventList"]
    /*************** 方块元素的基本信息 ****************/

    this.getAttrFromOption(this, option);
    this.centerPos = this.getRectCenter(this.x,this.y,this.width,this.height);
    if (Object.defineProperty ){
        Object.defineProperty(this, "ctx", {
            value: Window.$$whistle,
            writable: false, // 不可写!
            configurable: false,
            enumerable: false
        });
    }

}


function RectMethod() {  // 储存方形画图的相关方法

    this.print = function (content) {
        // 重绘的时候，如果有 src 则显然图片，如果没有则直接画方块
    }

    this.strokeAtMouseEle = function (currentChild, cxt) {
        cxt.beginPath();
        cxt.strokeStyle = currentChild.strokeColor;
        cxt.lineWidth = 4;
        cxt.strokeRect(currentChild.x, currentChild.y, currentChild.width, currentChild.height);
        cxt.closePath();

    }

    this.drawRect = function (ctx,bool) {
        ctx.beginPath()
        ctx.fillStyle = this.fillColor;
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
        ctx.closePath()
        if (bool) {
            this.strokeAtMouseEle(this, ctx)
        }
    }

    this.printRect = function (ctx,bool) {
        this.centerPos = this.getRectCenter(this.x, this.y, this.width,this.height)
        this.drawRect(ctx,bool)
        this.printText(this.x, this.y, this.text, ctx)
        return this;
    }

    this.newAttrNameIsString = function (attrName, attrValue) {
        his.attrNameIsSrc(attrName, attrValue)
        this[attrName] = attrValue;
    } 

    this.newAttrNameIsObject = function (attrName) {
        for (var k in attrName) {
            this.attrNameIsSrc(k, attrName[k])
            this[k] = attrName[k]
        }   
    }

    this.attrNameIsSrc = function (attrName,src) {
        if (attrName == "src") {  // 如果是更改图片的 src ，则直接更新图片资源缓存
            var image = new Image();
            image.src = ele.src;
            image.onload = function () {
                t.img = this;
            }
        }
    }

    this.setAttr = function (attrName, attrValue) {  // 应该支持属性批量更新
        var type = Util.isType(attrName);
        if (type == "String" || type == "Object" ){
            switch(type){
                case "String": 
                    this.newAttrNameIsString(attrName, attrValue);
                    break;
                case "Object":
                    this.newAttrNameIsObject( attrName );
            }
        }else{
            // 需要错误类
            throw new Error("The first argument of the setAttr function is Object or String ,but you send " + type + ", please check!!!")
        }
        this.ctx.reprint(this.ctx.mousePos.x, this.ctx.mousePos.y);  //如果有样式更新，则触发清理画布，更新画布
    }

    this.drawImage = function (src,boolean,option) { // src 是当前图片的路径 boolean 是图片大小与所画方块不一致时，是否强制将图片尺寸缩小
        this.src = src;
        this.isImageToRect = boolean ? boolean : true;
        this.ctx.reprint(this.ctx.mousePos.x, this.ctx.mousePos.y);
        
    }

    this.printImg = function (ele,src,boolean,ctx,stroke) {
        var t =this;
        if( !this.img ){  // 缓存图片
            var image = new Image();
            image.src = ele.src;
            image.onload = function () {
                t.img = this;
                t.fromBooleanDrawImage(this,boolean, ele, ctx);
            }
        }else{
            this.fromBooleanDrawImage(this.img,boolean, ele,ctx);
        }
        if ( stroke ){
            this.strokeAtMouseEle(this, ctx)
        }
        this.centerPos = this.getRectCenter(this.x, this.y, this.width, this.height)
    }

    this.fromBooleanDrawImage = function (img,boolean,ele,ctx) {
        if( boolean ){
            ctx.drawImage(img, ele.x, ele.y, ele.width, ele.height);
        }else{
            ctx.drawImage(img, ele.x, ele.y);
        }
        this.printText(this.x,this.y,this.text,ctx);
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


    this.on = function (String,cb) {  // 事件注册函数
        this.eventList[String] = cb.bind(this);
    }

}


var $$jsTypeVar = {
    "[object Number]":"Number",
    "[object String]":"Srting",
    "[object Undefined]":"Undefined",
    "[object Boolean]":"Boolean",
    "[object Object]":"Object",
    "[object Array]":"Array",
    "[object Function]":"Function"
}

var Util = { // 工具类  随机颜色
    isType:function (value) {
        return $$jsTypeVar[Object.prototype.toString.call(value)];
    }
}

function WhistleAnimation(params) {  // 运动类
    
}








