//网格画布
var canGrid = document.getElementById("canBack");
var ctxGrid = canGrid.getContext("2d");
var wid = canGrid.width;
var heit = canGrid.height;
//线条画布
var canLine = document.getElementById("canLine");
var ctxLine = canLine.getContext("2d");
//数据
var datas = [];  //[10,10,10,70,10] y轴坐标集合
//绘图配置
var currentIndex = 0;  //当前绘制的心电数据坐标。初始为0，从第一个数据开始绘制
var timeSpan = 62;	   //心电绘制时间间隔，毫秒。控制绘制快慢
var xsplit = 5;		   //心电图坐标x轴宽度。控制线条变化趋势
var yoffset = heit / 2;	   //绘制心电数据Y轴偏移量。控制线条绘制Y轴位置，默认居中
var xoffset = 10;	  	   //绘制心电数据X轴偏移量。控制线条绘制X轴起始位置



Init();    //调用初始化

//初始化
function Init() {
	GetData();  	 //初始获取数据
	DrawGrid(ctxGrid, "#ffbebe", wid, heit);  //画背景网格
	DrawLine();  	//画心电线条
}

//画线条，按时间间隔依次绘制线条，绘制完成后获取新数据继续循环绘制
function DrawLine() {
	//清除即将绘制的区域
	ctxLine.clearRect(currentIndex * xsplit + xoffset, 0, 2 * xsplit, heit)
	ctxLine.beginPath();
	//绘制起始位置移动到上一个坐标，绘制第一个坐标不需要此操作	
	if (currentIndex > 0) {
		ctxLine.moveTo((currentIndex - 1) * xsplit + xoffset, datas[currentIndex - 1] + yoffset);
	}
	//绘制结束位置，当前坐标的数据
	ctxLine.lineTo(currentIndex * xsplit + xoffset, datas[currentIndex] + yoffset);
	//绘制样式
	ctxLine.lineCap = "round";
	ctxLine.strokeStyle = "#000";
	ctxLine.stroke();
	//绘制索引+1
	currentIndex += 1;
	//当前数据绘制完成，获取新数据继续绘制
	if (currentIndex > datas.length - 1) {
		GetData();
		currentIndex = 0;
	}
	//绘制间隔时间后继续绘制
	setTimeout(DrawLine, timeSpan);
}

//画表格
function DrawGrid(ctx, lineCol, canwidth, canheight) {
	var D = 25;
	var H = 25;
	var B = 0;
	var C = 0;
	var G = canwidth;
	var E = canheight;
	var F = D / 5;
	
	//线条宽度为2的线条
	ctx.lineWidth = 2;
	ctx.strokeStyle = lineCol;
	
	ctx.moveTo(B, C);
	ctx.lineTo(G, C);
	ctx.stroke();
	
	while (C < E) {
		C = C + H;
		ctx.moveTo(B, C - 1);
		ctx.lineTo(G, C - 1);
		ctx.stroke()
	}
	C = 0;
	ctx.moveTo(B, C);
	ctx.lineTo(B, E);
	ctx.stroke();
	while (B < G) {
		B = B + D;
		ctx.moveTo(B - 1, C);
		ctx.lineTo(B - 1, E);
		ctx.stroke()
	}
	
	
	//线条宽度为1的线条
	ctx.lineWidth = 1;
	ctx.strokeStyle = lineCol;
	B = 0;
	C = 0;
	G = canwidth;
	E = canheight;
	while (C < E) {
		for (var A = 0; A < 4; A++) {
			C = C + F;
			ctx.moveTo(B, C - 0.5);
			ctx.lineTo(G, C - 0.5);
			ctx.stroke()
		}
	}
	B = 0;
	C = 0;
	G = canwidth;
	E = canheight;
	while (B < G) {
		for (var A = 0; A < 4; A++) {
			B = B + F;
			ctx.moveTo(B - 0.5, C);
			ctx.lineTo(B - 0.5, E);
			ctx.stroke()
		}
	}
}

//获取心电图数据，调用接口从后台获取数据
function GetData() {
	datas = [];  //清空
	//调用接口从后台获取数据
	//此处随机生成模拟数据
	for (var i = 0; i < 200; i++) {
		if (i % 20 == 0) {
			datas.push(0 - parseInt(Math.random() * (30 - 20 + 1) + 20, 10));  //20-30间的随机数
		}
		else if (i % 20 < 19) {
			datas.push(parseInt(Math.random() * (5 - 0 + 1) + 0, 10)); //0-5间的随机数
		}
		else if (i % 20 == 19) {
			datas.push(parseInt(Math.random() * (10 - 5 + 1) + 5, 10)); //5-10间的随机数
		}

	}
}