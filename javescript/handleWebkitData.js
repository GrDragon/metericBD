var querystring = require('querystring');
var dataProduce = require("./dataProduce");
var moment = require('moment');
var later = require("later");
var postToMiddleware = require("./postToMiddleware");
function handleWebkitData(data,res){
	
	console.log("in handleWebkitData getData:" +data);
	var data = querystring.parse(data);//解析成对象
	//console.log("in handleWebkitData getData2:" +data["taskName"]);
	switch(data["taskType" ]){
		case "onceRun": onceRun(data,res);
			break;
		case "repeatRun":repeatRun(data,res);
			break;
		case "autoRun": console.log(3);//Todo
			break;
		case "freeRun": console.log(4);//Todo
			break;
		default: break;
	}
}
module.exports.handleWebkitData = handleWebkitData;
//作业时间解析和作业的制定
function onceRun(data,res){

	var str =data["onceRun_date"]+" "+data["onceRun_time"];
    str = str.replace(/-/g,"/");//将字符串解析成时间
    var onceRunNowTime = new Date();
 	//console.log("onceRunNowTime"+onceRunNowTime);
	var onceRunStartTime = new Date(str);//
	//console.log("testdate"+onceRunStartTime);
	var timeDiff = onceRunStartTime.getTime()-onceRunNowTime.getTime();//时间差的毫秒数
	//console.log("timeDiff: "+ timeDiff);
	var setTimeGo;
    if(timeDiff <= 0){
    	setTimeGo=1;//1毫秒，当设定时间小于后台时间时立即执行作业操作,在苹果机上的最小时间间隔是10毫秒，在Windows系统上的最小时间间隔大约是15毫秒,当小于这个时间时，将按最小时间间隔来执行操作） 
    } else {
    	setTimeGo=timeDiff;
    };
    //console.log("setTimeGo"+setTimeGo)
    setTimeout(function(){taskExecute(data,res)}, setTimeGo);//解决setTimeout 参数传递问题
};
function repeatRun(data,res){
	var time_2_times ;
	if(data["time_2_times"]>1){
		var str = data["time_2_startDate"]+" "+data["time_2_startTime"];
		time_2_times = data["time_2_times"];
	} else {
		var str =data["time_1_startDate"]+" "+data["time_1_startTime"];
		time_2_times = 1;
	};
    str = str.replace(/-/g,"/");
    var repeatRunNowTime = new Date();
	var repeatRunStartTime = new Date(str);
	//console.log("repeatRunStartTime"+repeatRunStartTime);
	var timeDiff = repeatRunStartTime.getTime()-repeatRunNowTime.getTime();//时间差的毫秒数
	var setTimeGo;//开始执行时间
	 if(timeDiff <= 0){
    	setTimeGo=1;//1毫秒
    } else {
    	setTimeGo=timeDiff;
    };
    var timesOfSeconds =  Math.round((24/time_2_times)*60*60);//向下取整
    console.log("timesOfSeconds "+timesOfSeconds);
    console.log("Math.round(setTimeGo/1000) "+Math.round(setTimeGo/1000));
	var sched = later.parse.recur().every(timesOfSeconds).second().startingOn(Math.round(setTimeGo/1000));
	//var sched = later.parse.recur().every(15).minute().startingOn(10);
	taskHandle = later.setInterval(function(){
    //taskExecute(data);
    test();
    }, sched);
    function test(){
    	console.log("testData "+1111);
    }
    setTimeout(function(){
	   taskHandle.clear();
	   console.log("Clear");
	           },30*1000);//30秒取消
}
//执行作业
function taskExecute(data,res){
	console.log("go taskExecute");
	var postToMiddlewareData = dataProduce.createPostData(data);
	console.log("taskExecute post data "+ postToMiddlewareData);
	postToMiddleware.postToMiddleware(postToMiddlewareData,res,b);//函数回调 
}

function b(toWebkit,res){
	toWebkit = JSON.stringify(toWebkit);
	console.log("toWebkit: "+toWebkit);
	res.write(toWebkit);
	res.end();
};
	     
     