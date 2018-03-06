// 画方块的类

function Rect(option) { //

    /*************** 方块元素的基本信息 ****************/
    this.x = 0;
    this.y = 0;
    this.height = 32;
    this.width = 32;
    this.fillColor = "blue";
    this.strokeColor = "#fff";
    this.textPos = "";  // 文字的位置以及宽度信息
    this.id = new Date().getTime() * Math.random(); // 乘以随机数，防止id 重复
    this.eventList = {};// 储存用户注册的事件列表
    this.src = "";
    this.isImageToRect = false;
    this.isHighLight = true;
    this.orderDraw = true;
    this.textOffsetX = 0;
    this.textOffsetY = 0;
    //this.ctx = Window.$$whistle;
    this.attrArr = ["width", "height", "x", "y", "id", "fillColor", "strokeColor", "textPos", "centerPos", "eventList"]
    /*************** 方块元素的基本信息 ****************/

    this.getAttrFromOption(this, option);
    this.centerPos = this.getRectCenter(this.x, this.y, this.width, this.height);

    if (Object.defineProperty) {
        Object.defineProperty(this, "ctx", {
            value: Window.$$whistle,
            writable: false, // 不可写!
            configurable: false,
            enumerable: false
        });
    }

}


function RectMethod() {  // 储存方形画图的相关方法
    var textData = ["textOffsetX", "textOffsetY", "textPos"]; // 文字位置相关配置
    var styleArr = ["fontStyle", "fontVariant", "fontWeight", "fontSize", "fontFamily", "fontColor"]; // 文字样式相关配置

    this.print = function (content) {
        // 重绘的时候，如果有 src 则显然图片，如果没有则直接画方块
    }

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

    this.strokeAtMouseEle = function (currentChild, cxt) {
        cxt.beginPath();
        cxt.strokeStyle = currentChild.strokeColor;
        cxt.lineWidth = 4;
        cxt.strokeRect(currentChild.x, currentChild.y, currentChild.width, currentChild.height);
        cxt.closePath();

    }

    this.drawRect = function (ctx, bool) {
        ctx.beginPath()
        ctx.fillStyle = this.fillColor;
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
        ctx.closePath()
        if (bool && this.isHighLight) {
            this.strokeAtMouseEle(this, ctx)
        }
    }

    this.printRect = function (ctx, bool) {
        this.centerPos = this.getRectCenter(this.x, this.y, this.width, this.height)
        this.drawRect(ctx, bool)
        var option = this.getTextOption(this)
        new DrawText(option).printText(this.x, this.y, this.width, this.height, this.text, ctx)
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

    this.attrNameIsSrc = function (attrName, src) {
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
        if (type == "String" || type == "Object") {
            switch (type) {
                case "String":
                    this.newAttrNameIsString(attrName, attrValue);
                    break;
                case "Object":
                    this.newAttrNameIsObject(attrName);
            }
        } else {
            // 需要错误类
            throw new Error("The first argument of the setAttr function is Object or String ,but you send " + type + ", please check!!!")
        }
        this.ctx.reprint(this.ctx.mousePos.x, this.ctx.mousePos.y);  //如果有样式更新，则触发清理画布，更新画布
    }

    this.drawImage = function (src, boolean, option) { // src 是当前图片的路径 boolean 是图片大小与所画方块不一致时，是否强制将图片尺寸缩小
        this.src = src;
        this.isImageToRect = boolean ? boolean : true;
        this.ctx.reprint(this.ctx.mousePos.x, this.ctx.mousePos.y);

    }

    this.printImg = function (ele, src, boolean, ctx, stroke) {
        var t = this;
        if (!this.img) {  // 缓存图片
            var image = new Image();
            image.src = ele.src;
            image.onload = function () {
                t.img = this;
                t.fromBooleanDrawImage(this, boolean, ele, ctx);
            }
        } else {
            this.fromBooleanDrawImage(this.img, boolean, ele, ctx);
        }
        if (stroke && this.isHighLight) {
            this.strokeAtMouseEle(this, ctx)
        }
        this.centerPos = this.getRectCenter(this.x, this.y, this.width, this.height)
    }

    this.fromBooleanDrawImage = function (img, boolean, ele, ctx) {
        if (boolean) {
            ctx.drawImage(img, ele.x, ele.y, ele.width, ele.height);
        } else {
            ctx.drawImage(img, ele.x, ele.y);
        }
        var option = this.getTextOption(this)
        new DrawText(option).printText(this.x, this.y, this.width, this.height, this.text, ctx);
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

    this.on = function (String, cb) {  // 事件注册函数
        this.eventList[String] = cb.bind(this);
    }

    this.update = function (params) {
        this.ctx.reprint(this.ctx.mousePos.x, this.ctx.mousePos.y);
    }

    function createFontStyle() {

    }

}