	//背景网格相关
    var canGrid=document.getElementById("canGrid");     //背景网格ID
	var ctxGrid = canGrid.getContext("2d");             //背景网格画图2D对象
	
	var wid = canGrid.width;                            //背景网格的宽度
	var heit = canGrid.height;                          //背景网格高度
	
	//线条画布相关
	var canLine = document.getElementById("canLine");
	var ctxLine = canLine.getContext("2d");

	//线条标题
    var canTitle = document.getElementById("canTitle");
    var ctxTitle = canTitle.getContext("2d");
	
	//心电数据数据
	var datas1= new Array("787878787878787878787878787A787A787A7A7A7A7A7A7A7A8082807C787A7A80C4F084547C80767A787A7C80848A8E90929494948E827A78787678787878787878787A7A7A7A7A787A7A7A7A7A7A");
	var datas2= new Array("7C7E7E7C7E7E808080808080828280807E7C7C7C7C7C7C7C7C7C7C7C7C7C7C7C7C7C7C7C7C7E7E7E7E7E7E7E808282807E7E7E80AED09872807E7A7E7C7C7E7E8080808080808282807E7C7C7C7C7C")
	var datasres=[];
    var data2sres = [];
    var data3sres = [];
	var currentIndexI = 0 ;  //I心电数据的index
    var currentIndexII = 0 ;  //I心电数据的index
	var xoffset =  10 ;     //x轴上线条绘制的初始位置
	var yoffset =heit/6;     //y轴上线条绘制的初始位置,默认居中
	var xsplit = 2;         //x轴绘制的宽度(每隔5画一个点)
	var timeSpan = 62;	    //心电绘制时间间隔，毫秒。控制绘制快慢
    var draw_lines_index = [0, 1, 2, 3, 4, 5];   //线条的index

    init();    //初始化
	function init(){
		drawGrid(ctxGrid,'#ffbebe',wid,heit);  //背景网格
		DrawLine();  	                       //画心电线条
        addfilltext(ctxTitle);                 //添加标题
	}

    // //获取心电数据
    // function GetData() {
		// datasres=[];
    //     var dataLength = datas1.length;
    //     for(var C = 0; C < dataLength; C++) {
    //         var B = datas1[C];
    //         for (var d=0;d<B.length;d=d+2)
    //         {
    //             datasres.push(parseInt( B.substr(d,2) ,16));
    //         }
    //         console.log("转换结果为:"+datasres)
    //     }
    // }

    //封装处理心电数据
    function GetData() {
        datasres=[];
        data2sres = [];
        data3sres = [];

        var dataLength = datas1.length;        //1导波数据长度
        var data2Length = datas2.length;       //2导波数据长度
        for(var C = 0; C < dataLength; C++) {
            var B = datas1[C];                  //1导波
            for (var d=0;d<B.length;d=d+2)
            {
                datasres.push(parseInt( B.substr(d,2) ,16));
            }
            console.log("转换结果为:"+datasres)
        };

        for(var j = 0; j < data2Length; j++) {
            var M = datas2[j];                  //1导波
            for (var d=0;d<M.length;d=d+2)
            {
                data2sres.push(parseInt( M.substr(d,2) ,16));
            }
            console.log("2转换结果为:"+data2sres)
        }
        for(var i=0;i<datasres.length;i++){
            data3sres.push(datasres[i]-data2sres[i]);
            console.log("3转换结果为:"+data3sres)
		}
    }

	//画网格背景
	function drawGrid(ctx,gridColor,gridWid,gridHeit){
		var wid = gridWid;
		var heit = gridHeit;
		var pointX = 0;        //原点X轴
		var pointY = 0;        //原点Y轴
		var baseOff = 10;      //画图单位距离
		var heitSix = heit/6;  
		
		ctx.lineWidth=4;
		ctx.strokeStyle = gridColor;
		
		//画X轴
		ctx.moveTo(pointX,pointY);
		ctx.lineTo(wid,pointY);	
		ctx.stroke();
		
		//平行于X轴的6根主分界线
		while ( pointY < heit){
			pointY = pointY + heitSix;
			ctx.moveTo(pointX,pointY-2);     //减去的值为线条宽度的1/2
			ctx.lineTo(wid,pointY-2); 
			ctx.stroke();
		}
		
		pointY = 0;	
		
		//X轴左侧线条
		ctx.moveTo(pointX,pointY);
		ctx.lineTo(pointX,heit);
		ctx.stroke();
		
	 	//X轴右侧线条
		ctx.moveTo(wid,pointY);
		ctx.lineTo(wid,heit);
		ctx.stroke();
		
		ctx.lineWidth=1;
	    ctx.strokeStyle = gridColor;
		wid = gridWid;
		heit = gridHeit;
		pointX = 0;    //原点X轴
		pointY = 0;    //原点Y轴
		
		//横线	
		while(pointY < heit){
			for(i=0;i<9;i++){
				pointY = pointY + baseOff;
				ctx.moveTo(pointX,pointY-0.5);
				ctx.lineTo(wid,pointY-0.5);
			    ctx.stroke();
			}		
		}
		
		wid = gridWid;
		heit = gridHeit;
		pointX = 0;    //原点X轴
		pointY = 0;    //原点Y轴
		//竖线	
		while(pointX < wid){
			for(j=0;j<9;j++){
				pointX = pointX + baseOff;
				ctx.moveTo(pointX-0.5,pointY);
				ctx.lineTo(pointX-0.5,heit);
			    ctx.stroke();
			}		
		}	
	}


    //增加标题文字
    function addfilltext(ctx) {
        var titleText = ["I","II", "III", "aVR", "aVL", "aVF"];  //标题文字
        var titleHeight = ((heit-20)/6);                    //第一个标题在Y轴的初始位置
        var D = 0;
        var linesIndex = draw_lines_index;                     //心电线条的index
        for(var E = 0; E < linesIndex.length; E++) {
            D = D + titleHeight;
            ctx.font = "28px Verdana bolder";
            ctx.fillText("" + titleText[linesIndex[E]] + "", 10, D)        //context.fillText(text,x,y,maxWidth);
        }
    }

    function DrawLine() {
        //清除即将绘制的区域 context.clearRect(x,y,width,height);矩形左上角的 x 坐标,y 坐标,清除的矩形的宽度(高度)
        ctxLine.clearRect(currentIndexI * xsplit + xoffset, 0, 2 * xsplit, heit) //第1条线清除的区域
        ctxLine.beginPath();
        //绘制起始位置移动到上一个坐标，绘制第一个坐标不需要此操作
        if (currentIndexI > 0) {
            ctxLine.moveTo((currentIndexI - 1) * xsplit + xoffset, datasres[currentIndexI - 1]  );        //第1条线的起点
        }
        //绘制结束位置，当前坐标的数据
        ctxLine.lineTo(currentIndexI * xsplit + xoffset, datasres[currentIndexI]);   //第1条线
        //绘制样式
        ctxLine.lineCap = "round";
        ctxLine.strokeStyle = "#000";
        ctxLine.stroke();
        //绘制索引+1
        currentIndexI += 1;
        //当前数据绘制完成，获取新数据继续绘制
        if (currentIndexI > datasres.length - 1) {
            GetData();
            currentIndexI = 0;
        }
        //绘制间隔时间后继续绘制
        setTimeout(DrawLine, timeSpan);
    }


