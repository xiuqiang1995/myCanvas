var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

autoSetCanvasSize(canvas);

listenToMouse(canvas);

var eraserEnabled = false;
eraser.onclick = function() {
    eraserEnabled = true;
    actions.className = "actions change";
}
brush.onclick = function() {
    eraserEnabled = false;
    actions.className = "actions";
}


/***/
function listenToMouse(canvas) {

    var using = false;
    var lastPoint = { x: undefined, y: undefined };

    canvas.onmousedown = function(e) {
        var x = e.clientX;
        var y = e.clientY;
        using = true;
        if (eraserEnabled) {

            //正方形橡皮擦 鼠标在左上角
            ctx.clearRect(x - 15, y - 15, 30, 30);
        } else {

            lastPoint = { x: x, y: y };
        }
    }

    canvas.onmousemove = function(e) {
        var x = e.clientX;
        var y = e.clientY;
        if (!using) {
            return;
        }
        if (eraserEnabled) {

            ctx.clearRect(x - 15, y - 15, 30, 30);
        } else {
            var newPoint = { x: x, y: y };
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
            lastPoint = newPoint;
        }
    }
    canvas.onmouseup = function(e) {
        using = false;
    }
}

/*****/
function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.strokeStyle = 'black'; // 线的颜色
    ctx.moveTo(x1, y1); // 起点
    ctx.lineWidth = 5; // 线的宽度
    ctx.lineTo(x2, y2); //终点
    ctx.stroke();
    ctx.closePath();
}

/****/
function autoSetCanvasSize(canvas) {
    setCanvasSize();
    window.onresize = function() {
        setCanvasSize();
    }

    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth; // 获取屏幕宽度
        var pageHeight = document.documentElement.clientHeight; // 获取屏幕高度
        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }
}