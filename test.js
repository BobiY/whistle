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

        if (ctx.isPointInPath(downX,downY) ){
            isCanTuo = true;
            isLa = false;
            dx = downX - draw.x;
            dy = downY - draw.y
        }

        for (var i = 0; i < arcArr.length; i++) {
            ctx.beginPath();
            ctx.arc(arcArr[i][0], arcArr[i][1], r, 0, Math.PI * 2)
            ctx.stroke()
            ctx.closePath();

            if (ctx.isPointInPath(downX, downY)) {
                isCanTuo = false;
                isLa = true;
                drawX = arcArr[i][0]; 
                drawY = arcArr[i][1];
                width = draw.width;
                height = draw.width;
                ax = draw.x;
                ay = draw.y;
                direction = arcArr[i][3].split("_")
                //console.log(drawX, drawY)
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
                    var xx = Math.abs(x - drawX);
                    var yy = Math.abs(y - drawY);
                    console.log( xx )
                    if (direction[0] == "Lx" && direction[1] == "yT" ){
                        draw.x = ax - xx;
                        draw.y = ay - yy;
                        draw.height = yy + height;
                        draw.width = xx + width;
                    }
                    console.log(draw.x, draw.y, draw.width, draw.height  )
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

        // var lineArr = [   // 指定每一条线的两个端点
        //     [x-4, y, 4], // x,y
        //     [x + width / 2 - 4 , y, 4], // x + width/2 ,y   
        //     [x + width + 8, y, 4], // x + width, y
        //     [x + width, y + height / 2, 4], // x + width, y+heigth/2
        //     [x + width, y + height, 4], // x + width,y+height
        //     [x + width / 2, y + height, 4], // x + width/2,y + height
        //     [x, y + height, 4], // x,y + height
        //     [x, y + height / 2, 4], // x,y + height
        //     [x, y, 4]  //  x,y
        // ]
        
           ctx.strokeStyle = "#fff";
           for( var i = 0; i< arcArr.length; i++ ){
             ctx.beginPath();
             ctx.arc( arcArr[i][0], arcArr[i][1], r,0,Math.PI * 2 )
             ctx.stroke()
             ctx.closePath();
           }

           ctx.beginPath();
           ctx.moveTo(arcArr[0][0], arcArr[0][1])
           for( var i=1;i<arcArr.length;i++ ){
             ctx.lineTo(arcArr[i][0], arcArr[i][1])
           }
           //ctx.lineTo( arcArr[0][0], arcArr[0][1] )
           ctx.stroke()
           ctx.closePath();




    }

}