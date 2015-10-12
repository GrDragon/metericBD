//server for webkit
var http =require('http');
var querystring =require('querystring');
var fileHandle = require('./fsSystem');
var async = require("async");
var moment = require('moment');//时间格式输出模块
var postToMiddleware = require("./postToMiddleware");
var db = require("monk")("localhost/metericDB");//数据库
var handleWebkitData = require("./handleWebkitData");
//var db = require("monk")("localhost/metericDB,192.168.1.1");


//function start(){

    var server = http.createServer(function(req,res){
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8' }); 
    var getWebkitData = "";

  req.on('data', function (chunck) {
    getWebkitData += chunck;
  });

   
  req.on('end',function(){
    console.log("nw数据接收完成");
    var params = querystring.parse(getWebkitData);  
    //作业入库
    var task = db.get("task");//数据集合
    task.insert(params);//插入数据对象
    db.close();
    handleWebkitData.handleWebkitData(getWebkitData,res);
    //handleWebkitData.handleWebkitData(getWebkitData,res);//写数据不行的话采用这种形式传参数
    console.log("接收到来自webkit的数据： " + params);
    //fileHandle.saveJs(params.taskName,params);//数据保存
	 /*  function b(toWebkit){
	     toWebkit = JSON.stringify(toWebkit);
	     console.log("toWebkit: "+toWebkit);
	     res.write(toWebkit);
	     res.end();
	     };
	     postToMiddleware.postToMiddleware(b);//函数回调 
      */
    });

  req.on('error',function(err){
  	console.log("error:"+err);
  }); 
});

server.listen(3000,"127.0.0.1",function(){
	console.log("开始监听 " +server.address().port+ " ......");
 });
 //};
//module.exports.start = start;




