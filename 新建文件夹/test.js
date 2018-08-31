window.onload = function () {
    var canvas = document.getElementById("cvs");
    var ctx = canvas.getContext("2d");
    var canvasBoundingClientRect = canvas.getBoundingClientRect();
    var isFirstMouseDown = 0;
    var currentDrawRect = false;
    var isCanTuo = false;
    var isLa = false;
    var downX = 0;
    var downY = 0;
    var arcArr = [];
    var drawX = 0;
    var drawY = 0;
    var direction = [];
    var width, height,ax,ay;
    var r = 8;
    var draw = {
        x:0,y:0,width:0,height:0
    }
    var dx = 0; 
    var dy = 0;
    canvas.width = 1200;
    canvas.height = 658;
    ctx.beginPath();
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    ctx.beginPath();

    canvas.addEventListener("mousedown",function (e) {
        if ( isFirstMouseDown == 0  ){
            isFirstMouseDown = 1;
        }
        downX = e.clientX - canvasBoundingClientRect.left;
        downY = e.clientY - canvasBoundingClientRect.top;
        ctx.beginPath();
        ctx.strokeStyle = "rgba(0,0,0,0)";
        ctx.rect(draw.x, draw.y, draw.width, draw.height);
        ctx.stroke();
        ctx.closePath();

        if (ctx.isPointInPath(downX,downY) ){  // 判断鼠标是否在方块中
            isCanTuo = true;
            isLa = false;
            dx = downX - draw.x;
            dy = downY - draw.y
        }

        for (var i = 0; i < arcArr.length; i++) {  // 普安段鼠标是否在圆中
            ctx.beginPath();
            ctx.arc(arcArr[i][0], arcArr[i][1], r, 0, Math.PI * 2)
            ctx.stroke()
            ctx.closePath();

            if (ctx.isPointInPath(downX, downY)) {
                isCanTuo = false;
                isLa = true;
                dx = downX - arcArr[i][0]; 
                dy = downY - arcArr[i][1];
                width = draw.width;
                height = draw.height;
                ax = draw.x;
                ay = draw.y;
                direction = arcArr[i][3].split("_");
                break;
            }
        }

    })

    canvas.addEventListener("mousemove",function (e) {
        var x = e.clientX - canvasBoundingClientRect.left;
        var y = e.clientY - canvasBoundingClientRect.top;
        if ( isFirstMouseDown == 1 ){
            width = x - downX;
            height = y - downY;
            draw.x = downX;
            draw.y = downY;
            draw.width = width;
            draw.height = height;
            drawRect(draw.x, draw.y, draw.width, draw.height);   
        }else{
            if( isCanTuo ){
                draw.x = x - dx;
                draw.y = y - dy;
                drawRect(draw.x, draw.y, draw.width, draw.height);
            }else{
                if( isLa ){

                    var xx = x - dx - ax;  // 拖拽的 x 向距离
                    var yy = y - dy - ay;  // 拖拽的 y 向距离

                    if (direction[0] == "Lx" && direction[1] == "yT" ){  // 拖拽左上角的圆圈  需要根据拖拽距离去更新 x y width heigth
                        draw.x = x - dx;
                        draw.y = y - dy;
                        draw.height =  height - yy;
                        draw.width  = width - xx;
                    }

                    if (direction[0] == "" && direction[1] == "yT" ){ // 上边中间的圆圈
                        //draw.x = x - dx;
                        draw.y = y - dy;
                        draw.height = height - yy;
                        //draw.width = width - xx;
                    }

                    if (direction[0] == "Rx" && direction[1] == "yT") { // 右上的圆圈
                        //draw.x = x - dx;
                        draw.y = y - dy;
                        draw.height = height - yy;
                        draw.width = xx;
                        // width + x 初始坐标  x - dx - Inlt_x  修正后的新坐标
                    }

                    if (direction[0] == "Rx" && direction[1] == "") { // 右边中间的圆圈
                        //draw.x = x - dx;
                        //draw.y = y - dy;
                        //draw.height = height - yy;
                        draw.width = xx;
                        // width + x 初始坐标  x - dx - Inlt_x  修正后的新坐标
                    }

                    if (direction[0] == "Rx" && direction[1] == "yR") { // 右下的圆圈
                        //draw.x = x - dx;
                        //draw.y = y - dy;
                        draw.height = yy;
                        draw.width = xx;
                        // width + x 初始坐标  x - dx - Inlt_x  修正后的新坐标
                    }

                    if (direction[0] == "" && direction[1] == "yB") { // 右下中间的圆圈
                        //draw.x = x - dx;
                        //draw.y = y - dy;
                        draw.height = yy;
                        //draw.width = xx;
                        // width + x 初始坐标  x - dx - Inlt_x  修正后的新坐标
                    }

                    if (direction[0] == "Lx" && direction[1] == "yB") { // 坐下的圆圈
                        draw.x = x - dx;
                        //draw.y = y - dy - height;
                        draw.height = yy;
                        draw.width = width - xx;
                        // width + x 初始坐标  x - dx - Inlt_x  修正后的新坐标
                    }

                    if (direction[0] == "Lx" && direction[1] == "") { // 坐下的圆圈
                        draw.x = x - dx;
                        //draw.y = y - dy - height;
                        //draw.height = yy;
                        draw.width = width - xx;
                        // width + x 初始坐标  x - dx - Inlt_x  修正后的新坐标
                    }

                    drawRect(draw.x, draw.y, draw.width, draw.height);
                }
            }
            
        }
        //console.log( width )
    })

    canvas.addEventListener("mouseup", function (e) {
        isFirstMouseDown = 2;
        isCanTuo = false;
        isLa = false;
        //currentDrawRect = false;

    })

    function drawRect(x,y,width,height) {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.beginPath();
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fill();
        ctx.closePath();

        arcArr = [ 
              [x,y,4,"Lx_yT"], // x,y
              [x + width / 2,y,4,"_yT"], // x + width/2 ,y   
              [x + width, y,4,"Rx_yT"], // x + width, y
              [x + width, y + height / 2,4,"Rx_"], // x + width, y+heigth/2
              [x + width, y + height,4,"Rx_yR"], // x + width,y+height
              [x + width / 2, y + height,4,"_yB"], // x + width/2,y + height
              [x, y + height,4,"Lx_yB"], // x,y + height
              [x, y + height/2,4,"Lx_"], // x,y + height
              [x, y, 4, "Lx_yT"], // x,y
           ]

           ctx.strokeStyle = "#fff";
           for( var i = 0; i< arcArr.length; i++ ){
             ctx.beginPath();
             ctx.arc( arcArr[i][0], arcArr[i][1], r,0,Math.PI * 2 )
             ctx.stroke()
             ctx.closePath();
           }
           ctx.save();
            ctx.globalCompositeOperation = 'destination-out';
           ctx.beginPath();
           ctx.moveTo(arcArr[0][0], arcArr[0][1])
           for( var i=1;i<arcArr.length;i++ ){
             ctx.lineTo(arcArr[i][0], arcArr[i][1])
           }
           //ctx.lineTo( arcArr[0][0], arcArr[0][1] )
           ctx.fill()
           ctx.closePath();
           ctx.restore();

    }

    var btn = document.getElementById("btn");
    var btn1 = document.getElementById("btn1");
    var canvas1 = null;
    var ctx1 = null;
    var box = document.getElementById("box")
    btn.addEventListener("click",function (params) {
        //console.log( draw )
        var img = new Image();
        //img.crossOrigin = "anonymous";
        img.src = "./a.png";
        var imageData = null;
        if( canvas1 ){
            box.removeChild(canvas1)
        }

        canvas1 = document.createElement("canvas");
        ctx1 = canvas1.getContext("2d");
        canvas1.width = draw.width;
        canvas1.height = draw.height;
        box.appendChild(canvas1)
        img.onload = function (params) {
            ctx1.drawImage(this, draw.x, draw.y, canvas1.width, canvas1.height, 0, 0,draw.width,draw.height);
            //var data = canvas1.toDataURL();
        }
    })

    // function convertBase64UrlToBlob(urlData, type) {
    //     var bytes = window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte
    //     //处理异常,将ascii码小于0的转换为大于0
    //     var ab = new ArrayBuffer(bytes.length);
    //     var ia = new Uint8Array(ab);
    //     for (var i = 0; i < bytes.length; i++) {
    //         ia[i] = bytes.charCodeAt(i);
    //     }
    //     return new Blob([ab], { type: 'image/' + type });
    // }
    // var ctx = document.getElementById('materialCanvas');
    // var dataURL = ctx.toDataURL("image/png", 1.0);
    // var file1 = convertBase64UrlToBlob(dataURL, "png");

    btn1.addEventListener("click",function (params) {
        // var data = canvas1.toDataURL();
        // var file = onvertBase64UrlToBlob(data, "png");

        // 功能尚未实现  cors 限制
    })
}