//  画文字的类

function DrawText(option) {  // 将文字的画法函数直接
    var supportPos = ["center", "left", "right", "top", "bottom"]; // 支持的字符串位置
    var textStyle = ["hor", "vertical", "italic"]  // 水平，竖直，倾斜  支持的文字显示样式
    var reg = /\%/g;
    var reg1 = /\px/g;
    var t = this;
    this.textOffsetX = 0;
    this.textOffsetY = 0;
    this.font = "";
    this.fontStyle = "normal";
    this.fontVariant = "normal";
    this.fontWeight = "normal";
    this.fontSize = "12px";
    this.fontFamily = "微软雅黑";
    this.textPos = "bottom_center";
    var textData = ["left", "right", "top", "bottom"]
    var styleArr = ["fontStyle", "fontVariant", "fontWeight", "fontSize", "fontFamily"];
    this.getAttrFromOption = function (context, option) {
        for (var key in option) {
            context[key] = option[key]
        }
    }

    // 获取需要显示文字的宽度
    this.getTextWidth = function (text, ctx) {
        return ctx.measureText(text).width;
    }

    this.printText = function (x, y, width, height, text, ctx) { // x,y 是相对的小方块的位置  
        // 字体设置一定要在获取宽度之前
        ctx.beginPath();
        ctx.font = this.font ? this.font : "12px Consolas";
        ctx.fillStyle = "#fff";
        var textWidth = this.getTextWidth(text, ctx);
        var posObj = this.getTextPos(this.textPos, x, y, width, height, ctx, textWidth);
        ctx.fillText(text, posObj.x, posObj.y);
        ctx.closePath();
    }

    this.adjustFontSize = function (fontSize) { //将 fontSize 调整成 数字 + px 的字符串形式
        var type = Util.isType(fontSize);
        if (type == "String") {
            if (reg1.test(fontSize)) {
                this.fontSize = fontSize;
            }
        } else if (type == "Number") {
            this.fontSize = fontSize + "px";
        }
    }

    this.getTextStyle = function () {  // 获取 font 的样式
        for (var i = 0; i < styleArr.length; i++) {
            this.font += this[styleArr[i]] + " ";
        }
    }

    this.getTextPos = function (posType, x, y, width, height, ctx, textWidth) {

        var reg = /\_/g;  // 验证 posType 中是否存在下滑先，而且类型必须是 string

        var x, y; // 记录文字的起点坐标信息
        var fontSize = parseInt(this.fontSize);

        // if( !Util.isType(posType) == "String" && !reg.test( posType ) ){
        //     throw new Error("posType is String");
        // } 

        var posPart = posType.split("_"); // left_top  [left,top]; 

        var xPos = getHorizontalCoordinate(posPart[1], x, width, textWidth);
        var yPos = getVerticalCoordinate(posPart[0], y, height, fontSize);
        return { x: xPos, y: yPos };

    }

    function getHorizontalCoordinate(type, x, width, textWidth) { // 根据类型获取文字的 x 坐标
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


    function getVerticalCoordinate(type, y, height, fontSize) {
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


    this.getAttrFromOption(this, option);
    this.adjustFontSize(this.fontSize);
    this.getTextStyle();
}