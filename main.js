var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var lineWidth = 5;

autoSetCanvasSize(canvas);

listenToUser(canvas);

var eraserEnabled = false;
pen.onclick = function() {
    eraserEnabled = false;
    pen.classList.add('active');
    eraser.classList.remove('active');
}
eraser.onclick = function() {
        eraserEnabled = true;
        eraser.classList.add('active');
        pen.classList.remove('active');
    }
    //清空
clear.onclick = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    //下载
download.onclick = function() {
    var url = canvas.toDataURL('img/png');
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = 'myCanvas';
    a.target = '_blank';
    a.click();
}


red.onclick = function() {
    ctx.strokeStyle = 'red';
    red.classList.add('active');
    green.classList.remove('active');
    blue.classList.remove('active');
}
green.onclick = function() {
    ctx.strokeStyle = 'green';
    green.classList.add('active');
    red.classList.remove('active');
    blue.classList.remove('active');
}
blue.onclick = function() {
        ctx.strokeStyle = 'blue';
        blue.classList.add('active');
        green.classList.remove('active');
        red.classList.remove('active');
    }
    //画笔粗细
thin.onclick = function() {
    lineWidth = 5;
}
thick.onclick = function() {
    lineWidth = 10;
}


/***/
function listenToUser(canvas) {

    var using = false;
    var lastPoint = { x: undefined, y: undefined };

    //特性检测
    if (document.body.ontouchstart !== undefined) {
        //触屏设备
        canvas.ontouchstart = function(e) {
            //因为手机上有多点触控的存在，我们以第一个点touches[0]为准
            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;
            using = true;
            if (eraserEnabled) {

                //正方形橡皮擦 鼠标在左上角
                ctx.clearRect(x - 15, y - 15, 30, 30);
            } else {

                lastPoint = { x: x, y: y };
            }
        }

        canvas.ontouchmove = function(e) {
            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;
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
        canvas.ontouchend = function(e) {
            using = false;
        }
    } else {
        //非触屏设备
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
}

/*****/
function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    //ctx.strokeStyle = 'black'; // 线的颜色
    ctx.moveTo(x1, y1); // 起点
    ctx.lineWidth = lineWidth; // 线的宽度
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