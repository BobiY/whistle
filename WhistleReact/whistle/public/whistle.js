

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
    Window.Whistle = Whistle;
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
            currentChild.drawRect(ctx)  // 这里只是判断鼠标在不在图形中
            if (ctx.isPointInPath(x, y)) {
                cb(currentChild)
            }
        }
    }
    this.leaveCanvas = function (x, y) { // 先判断当前鼠标在那个元素上，这里存在多个元素重叠的现象，这是，按照渲染顺序，在最后渲染的元素上显示高亮样式
        function doSomething(ele) {
            currentArr.push(ele)
        };
        this.pointIsInDraw(x, y, this.child, this.content2D, doSomething)

    }
    this.reprint = function (x, y, cb) { //当条件改变时，重绘所有图案
        cb && (cb = cb.bind(this))
        x = x || 0;
        y = y || 0;
        var len = this.child.length;
        var cxt = this.content2D;
        currentArr = [];
        var currentId = 0;
        this.leaveCanvas(x, y); // 先判断鼠标在那个元素里
        cxt.clearRect(0, 0, this.Cwidth, this.Cheight);
        //console.log( currentArr )
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
            }else{
                if ( currentId == currentChild.id ){
                    currentChild.printRect(cxt,true);
                }else{
                    currentChild.printRect(cxt,false);
                }
            }
            cb && cb(currentId, currentChild, x, y, cxt);
        }
    }

    this.onMouseDown = function (currentId, currentChild, x, y, cxt) {
        if (currentId == currentChild.id) {
            currentChild.eventList["mousedown"] && currentChild.eventList['mousedown'](cxt, x, y);  // 如果元素存在事件则执行元素对应的事件
            if (currentChild.orderDraw ){
                this.mouseDownEle = currentChild;
                this.dtDistence = {
                    dx: this.mouseDownPos.x - this.mouseDownEle.x,
                    dy: this.mouseDownPos.y - this.mouseDownEle.y
                }
            }
        }

    }

    this.onMouseMove = function (currentId, currentChild, x, y, cxt) {
        if (currentId == currentChild.id) {
            //this.canvas.style = "cursor:point"
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
    Stage.prototype.Alink = Alink;
    Stage.prototype.TextNode = TextNode;
}




function Rect(option) { //
   
    /*************** 方块元素的基本信息 ****************/
    this.x = 0;  
    this.y = 0;
    this.height = 32;
    this.width = 32;
    this.fillColor ="blue";
    this.strokeColor = "#fff";
    this.textPos = "";  // 文字的位置以及宽度信息
    this.id = new Date().getTime()*Math.random(); // 乘以随机数，防止id 重复
    this.eventList = {};// 储存用户注册的事件列表
    this.src = "";
    this.isImageToRect = false;
    this.isHighLight = true;
    this.orderDraw = true;
    this.textOffsetX = 0;
    this.textOffsetY = 0;
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
    var textData = ["textOffsetX","textOffsetY","textPos"]; // 文字位置相关配置
    var styleArr = ["fontStyle", "fontVariant", "fontWeight", "fontSize", "fontFamily","fontColor"]; // 文字样式相关配置

    this.print = function (content) {
        // 重绘的时候，如果有 src 则显然图片，如果没有则直接画方块
    }

    this.getTextOption = function (context) {
        var option = {};
        var tmpArr = textData.concat( styleArr );
        var len = tmpArr.length;
        for( var i = 0;i<len;i++ ){
            var child = tmpArr[i];
            context[child] && (option[child] = context[child] );
        }
        return option;
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
        if (bool && this.isHighLight) {
            this.strokeAtMouseEle(this, ctx)
        }
    }

    this.printRect = function (ctx,bool) {
        this.centerPos = this.getRectCenter(this.x, this.y, this.width,this.height)
        this.drawRect(ctx,bool)
        var option = this.getTextOption(this)
        new DrawText(option).printText(this.x, this.y, this.width, this.height, this.text, ctx, this.isUnderLine)
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
        if ( stroke && this.isHighLight ){
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
        var option = this.getTextOption(this)
        new DrawText(option).printText(this.x, this.y, this.width, this.height, this.text, ctx,this.isUnderLine);
    }


    this.getAttrFromOption = function (context, option) {
        for (var key in option) {
            context[key] = option[key]
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
   
    this.on = function (String,cb) {  // 事件注册函数
        this.eventList[String] = cb.bind(this);
    }

    this.update = function (params) {
        this.ctx.reprint(this.ctx.mousePos.x, this.ctx.mousePos.y);
    }

    function createFontStyle() {
        
    }

}


var $$jsTypeVar = {  // 支持的类型检查的类型
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
    },
    getRandomColor: function (string, opacity) {
        opacity = opacity || 0.5;

        if( !string ){
            return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
        }

        if( string == "rgb" ){
            var r = Math.floor(Math.random() * 256);
            var g = Math.floor(Math.random() * 256);
            var b = Math.floor(Math.random() * 256);
            return "rgb(" + r + ',' + g + ',' + b + ")";
        }

        if( string == "rgba" ){
            var r = Math.floor(Math.random() * 256);
            var g = Math.floor(Math.random() * 256);
            var b = Math.floor(Math.random() * 256);
            return "rgba(" + r + ',' + g + ',' + b + ',' + opacity +")";
        }
    }
}


function DrawText(option) {  // 将文字的画法函数直接
    var reg1 = /\px/g;
    var t = this;
    this.textOffsetX = 0;
    this.textOffsetY = 0;
    this.font = "";
    this.fontStyle = "normal";
    this.fontVariant = "normal";
    this.fontWeight = "normal";
    this.fontSize = "12px";
    this.fontColor = "#fff";
    this.fontFamily = "微软雅黑";
    this.textPos = "bottom_center";

    var textData = [ "left","right","top","bottom" ]
    var styleArr = ["fontStyle", "fontVariant", "fontWeight", "fontSize","fontFamily"];
    this.getAttrFromOption = function (context, option) {
        for (var key in option) {
            context[key] = option[key]
        }
    }

    // 获取需要显示文字的宽度
    this.getTextWidth = function (text, ctx) {
        return ctx.measureText(text).width;
    }

    // 获取加上样式后的字体宽度
    this.getCalculateTextWidth = function (text,ctx) {
        ctx.font = this.font ? this.font : "12px Consolas";
        var textWidth = this.getTextWidth(text, ctx);
        return textWidth;
    }

    // draw underLine

    this.drawUnderLine = function (x,y,width,ctx) {
        ctx.beginPath();
        ctx.strokeStyle = this.fontColor ? this.fontColor : "#fff";
        ctx.lineWidth = 2;
        ctx.moveTo(x + 2, y + 12 + parseInt(this.fontSize));
        ctx.lineTo(x + width + 6, y + 12 + parseInt(this.fontSize) );
        ctx.stroke();
        ctx.closePath();
    }

    this.printText = function (x, y,width, height, text, ctx,isUnderLine) { // x,y 是相对的小方块的位置  
        // 字体设置一定要在获取宽度之前
        ctx.beginPath();
        ctx.font = this.font ? this.font : "12px Consolas";
        ctx.fillStyle = this.fontColor ? this.fontColor : "#fff";
        var textWidth = this.getTextWidth(text, ctx);
        var posObj = this.getTextPos(this.textPos,x,y,width,height,ctx,textWidth );
        ctx.fillText(text, posObj.x, posObj.y);
        ctx.closePath();
        if( isUnderLine ){
            this.drawUnderLine(x, y, textWidth,ctx);
        }
    }

    this.adjustFontSize = function (fontSize) { //将 fontSize 调整成 数字 + px 的字符串形式
        var type = Util.isType(fontSize);
        if(type == "String"){
            if (reg1.test(fontSize)) {
                 this.fontSize = fontSize;
            }
        }else if( type == "Number" ){
            this.fontSize = fontSize + "px";
        }
    }

    this.getTextStyle = function () {  // 获取 font 的样式
        for( var i = 0;i<styleArr.length;i++ ){
            this.font += this[styleArr[i]] + " ";
        }
    }

    this.getTextPos = function (posType, x, y, width, height, ctx, textWidth) {
        
        var reg = /\_/g;  // 验证 posType 中是否存在下滑先，而且类型必须是 string

        var x,y; // 记录文字的起点坐标信息
        var fontSize = parseInt(this.fontSize);

        // if( !Util.isType(posType) == "String" && !reg.test( posType ) ){ // 此处做容错处理
        //     throw new Error("posType is String");
        // } 
        
        var posPart = posType.split("_"); // left_top  [left,top]; 

        var xPos = getHorizontalCoordinate(posPart[1], x, width, textWidth );
        var yPos = getVerticalCoordinate(posPart[0], y, height, fontSize );
        return { x:xPos,y:yPos };
        
    }

    function getHorizontalCoordinate(type,x,width,textWidth){ // 根据类型获取文字的 x 坐标
        var defOffsetX = 0; // 默认偏移量
        var offsetX;
        switch (type) {
            case "left":
                offsetX = x - defOffsetX - textWidth + t.textOffsetX;
                break;
            case "center":
                offsetX = x + width / 2 - textWidth / 2 + t.textOffsetX;
                break;
            case "right":
                offsetX = x + defOffsetX + width + t.textOffsetX;
                break;
            default:
                offsetX = x + width / 2 - textWidth / 2 + t.textOffsetX;  // 默认位置 水平在 中间
                break;
        }

        return offsetX
    }


    function getVerticalCoordinate(type,y,height,fontSize) {
        var defOffsetY = 0; // 默认偏移量
        var offsetX;
        switch (type) {
            case "top":
                offsetX = y - defOffsetY + t.textOffsetY;
                break;
            case "center":
                offsetX = y + height / 2 + fontSize / 2 + t.textOffsetY;
                break;
            case "bottom":
                offsetX = y + defOffsetY + height + fontSize + t.textOffsetY;
                break;
            default:
                offsetX = y + defOffsetY + height + fontSize + t.textOffsetY; // 默认位置 竖直在 底部
                break;
        }

        return offsetX
    }


    this.getAttrFromOption(this,option);
    this.adjustFontSize(this.fontSize);
    this.getTextStyle();
}


function WhistleAnimation(styleOption) {  // 运动类
    this.font = styleOption[""]
}

function Alink(option) {  // 超链接节点
    this.x = 0;
    this.y = 0;
    this.text = "默认文字";
    this.fontStyle = "normal";
    this.fontVariant = "normal";
    this.fontWeight = "700";
    this.fontSize = "18px";
    this.fontColor = "#00f";
    this.fontFamily = "微软雅黑";
    this.isUnderLine = true;
    
    if (Object.defineProperty) {
        Object.defineProperty(this, "ctx", {
            value: Window.$$whistle,
            writable: false, // 不可写!
            configurable: false,
            enumerable: false
        });
    }

    var textData = ["textOffsetX", "textOffsetY", "textPos"]; // 文字位置相关配置
    var styleArr = ["fontStyle", "fontVariant", "fontWeight", "fontSize", "fontFamily", "fontColor"]; // 文字样式相关配置

    this.getTextOption = function (context) {
        var option = {};
        var tmpArr = textData.concat(styleArr);
        var len = tmpArr.length;
        for (var i = 0; i < len; i++) {
            var child = tmpArr[i];
            context[child] && (option[child] = context[child]);
        }
        return option;
    }

    this.getAttrFromOption = function (context, option) {
        for (var key in option) {
            context[key] = option[key]
        }
    }

    this.getAttrFromOption(this,option);
    var options = this.getTextOption(this);
    var text = new DrawText(options);

    // 获取连接文字宽度
    var textWidth = text.getCalculateTextWidth(this.text,this.ctx.content2D);

    var rect =  new Rect({ 
        x: this.x, 
        y: this.y, 
        width: textWidth + 8, 
        height: parseInt(this.fontSize) + 16, 
        fillColor: "rgba(255,255,255,0)",
        text: this.text, 
        fontSize: this.fontSize, 
        textOffsetY: - (parseInt(this.fontSize) + 10),
        fontColor:this.fontColor,
        isUnderLine:this.isUnderLine  // 控制是否需要下滑线
    });
    
    this.isUnderLine && rect.on("click",function (params) {  // 给超链接注册 click 事件
        console.log("click")  // 具体执行的跳转逻辑
    })

    return rect;  // 将包装好的 方块元素返回

}


function TextNode(option) {  // 文本节点
    this.x = 0;
    this.y = 0;
    this.text = "默认文字";
    this.fontStyle = "normal";
    this.fontVariant = "normal";
    this.fontWeight = "700";
    this.fontSize = "18px";
    this.fontColor = "#fff";
    this.fontFamily = "微软雅黑";

    this.getAttrFromOption = function (context, option) {
        for (var key in option) {
            context[key] = option[key]
        }
    }

    this.getAttrFromOption(this, option);

    var text = new Alink({
        x: this.x,
        y: this.y,
        text: this.text,
        isUnderLine: false,  // 控制是否需要下滑线
        fontColor:this.fontColor
    });

    return text;

}






