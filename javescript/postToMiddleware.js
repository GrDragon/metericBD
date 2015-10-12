var http = require('http');
var querystring = require('querystring');
var crypto = require('crypto');//
var moment = require('moment');//
var db = require("monk")("localhost/metericDB");//数据库
//var dataProduce = require('./dataProduce');
//var events = require('events');
//var event = new events.EventEmitter();

function postToMiddleware(data,res1,callback){
var receiveData = "";
//console.log("Data: "+data);
//var postData = querystring.stringify(data);
postData =data;
//console.log("postData: "+postData);
var options = {
	host: '10.168.1.226',//默认localhost
	port: 8817,//默认 80
	path: '/Action',
	method:'POST'  //默认GET
};
// 向中间件post请求
var req = http.request(options,function(res){
	res.setEncoding('utf8');
	res.on('data',function(dataChunk){	
		receiveData += dataChunk;
	});

	res.on("end",function(){
			var executeTime = moment().format('YYYY-MM-DD HH:mm:ss');
		    var taskResult= db.get("taskResult");//数据集合
		    taskResult.insert({executeTime:executeTime,postData:postData,receiveData:receiveData});//插入数据
		    db.close();
			return(callback(receiveData,res1));
		//return receiveData;
	});	
});
req.write(postData);

req.on('error',function(err){
	console.log('problem with request:' + err.message);
});

req.end();

}
module.exports.postToMiddleware = postToMiddleware;