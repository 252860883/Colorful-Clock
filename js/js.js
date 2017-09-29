var r=6;
var windowWidth=1000;
var windowHeight=window.innerHeight;
var balls=[];//存放小球球的数组
var curshowTime;

window.onload=function(){

    var canvas=document.getElementById("canvas");
    canvas.width=windowWidth;
    canvas.height=windowHeight;
    var context=canvas.getContext('2d');

    var start=function (){
        context.clearRect(0,0,windowWidth,windowHeight);
        update();
        render(context);

        /*优化了setInterval事件，改写为 requestAnimationFrame 事件*/
        requestAnimationFrame(start);
    };
    start();
};

function render(context){
    var date=new Date();
    var hours=date.getHours();
    var minutes=date.getMinutes();
    curshowTime=date.getSeconds();

    renderDigit(50,200,parseInt(hours/10),context);
    renderDigit(170,200,parseInt(hours%10),context);
    renderDigit(290,200,10,context);
    renderDigit(340,200,parseInt(minutes/10),context);
    renderDigit(460,200,parseInt(minutes%10),context);
    renderDigit(580,200,10,context);
    renderDigit(630,200,parseInt(curshowTime/10),context);
    renderDigit(750,200,parseInt(curshowTime%10),context);

    for(var i=0;i<balls.length;i++){
        var fillColor=['#FFC1C1','#FF6EB4','#FF3E96','#FF69B4','#FFE4E1','#FF00FF','#FF4040','#F08080'];
        context.beginPath();
        context.arc(balls[i].x,balls[i].y,r,0,Math.PI*2);
        context.closePath();
        context.fillStyle=fillColor[Math.floor(Math.random()*7)];
        context.fill();
    }
}

//绘制时间 x,y坐标参数，num当前显示数字，context画布内容

function renderDigit(x,y,num,context){
    context.fillStyle="#bbb";
    for(var i=0;i<digit[num].length;i++){
        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j]==1){
                context.beginPath();
                context.arc(x+j*2*(r+1)+(r+1) , y+i*2*(r+1)+(r+1) , r , 0 , Math.PI*2);
                context.closePath();
                context.fill();
            }
        }
    }
}

//更新时间

function update(context){

    var date=new Date();
    var hours=date.getHours();
    var minutes=date.getMinutes();
    var seconds=date.getSeconds();

    if(curshowTime!=seconds){
        addBalls(630,200,parseInt(seconds/10),context);
        addBalls(750,200,parseInt(seconds%10),context);
        if(seconds==0){
            addBalls(340,200,parseInt(minutes/10),context);
            addBalls(460,200,parseInt(minutes%10),context);
            if(minutes==0){
                addBalls(50,200,parseInt(hours/10),context);
                addBalls(170,200,parseInt(hours%10),context);
            }
        }
    }
    updateBalls(context);
}

//在时间更新以后，动态添加小球

function addBalls(x,y,num){
    for(var i=0;i<digit[num].length;i++){
        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j]==1){
                var aball={

                    //zheli
                    x:x+j*2*(r+1)+(r+1),
                    y:y+i*2*(r+1)+(r+1),
                    g:1.5+Math.random(),
                    vx:Math.pow(-1,Math.ceil(Math.random()*1000))*5,
                    vy:-3
                };
                balls.push(aball);
            }
        }
    }
}

//控制小球运动

function updateBalls(context){
    for(var i=0;i<balls.length;i++)
    {
        //垃圾回收优化，移除视野的小球清空
        if (balls[i].x<=100 || balls[i].x>=windowWidth){
            balls[i]="";
        }
        balls[i].x=balls[i].x+balls[i].vx;
        balls[i].y=balls[i].y+balls[i].vy;
        balls[i].vy=balls[i].vy+balls[i].g;

        if(balls[i].y>=windowHeight-r){
            balls[i].y=windowHeight;
            balls[i].vy=-balls[i].vy*0.45;
        }
    }
}

