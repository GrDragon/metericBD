//构造请求数据

var moment = require('moment');//时间格式输出模块
var encryption = require('./encryption');
var querystring = require('querystring');
var crypto = require('crypto');//
//根据webkit的请求数据来选择不同的加密方式
var dllPath = '../dll/create_direct_opt_by_user.dll';
var dllEqptPwdPath= '../dll/create_direct_opt_by_user_get_eqpt_pwd.dll';
//var dllPath = '../agentServe/agent/dll/create_direct_opt_by_user.dll';
//var dllEqptPwdPath= '../agentServe/agent/dll/create_direct_opt_by_user_get_eqpt_pwd.dll';



function createPostData(data){
order_no=func_order_no();//随机42位数字字母字符串
//合作者账户，密匙。
var partner = '6ccpug';
var partnerKey = '057100000153tt6k7y13tp36h7929nz0dubk94eq432pl23x6c68o45mkbyk4m61';
//命令请求
//var objs = '[{"eqpt_type":"0a0001aa7k","eqpt_id_code":"140307001610","cmd_type":"dsj","cmd_id":"syje"}]';
var objs='[{"eqpt_type":"0a0001aa7k","eqpt_id_code":"140307001610","eqpt_pwd":"101EBE5F2EBEF631101EBE5F2EBEF631","resdatatype":"","cmd_type":"dsj","cmd_id":"hjwd"}]';
var initData =  querystring.stringify({
	'order_no'  : order_no,
	'partner'   : partner,
	'objs'	    : objs
});
var sign = "";
var dataComeFormWebkit = initData;
var webkitPostData = querystring.parse(dataComeFormWebkit);
var tempObjs = webkitPostData["objs"];//解析请求数据中的objs


//两种方式都可以
tempObjs = tempObjs.substring(1,tempObjs.length-1);//分割字符串
//tempObjs = tempObjs.slice(1,-1);//分割字符串
var jsonObjs = JSON.parse(tempObjs);//解析json格式

////****可以在此对前端来的数据和后台进行数据交互替换***///////////
//console.log("jsonObjs "+ jsonObjs["cmd_id"]);
jsonObjs["cmd_id"] = data["taskContent"];
//console.log("jsonObjs "+ jsonObjs["cmd_id"]);
////*************************************************///////////

// 判断该调用哪种形式的dll加密方式
if(jsonObjs.eqpt_pwd == null){//若设备密匙（eqpt）不存在,执行读数据不受影响
   console.log("无设备密匙");
   sign = encryptionUseDll(dataComeFormWebkit,partnerKey,dllPath);//获取不带设备密匙签名
} else {   //若设备密匙（eqpt）存在
   console.log("有设备密匙");
   jsonObjs.eqpt_pwd = encryptionUseDll(jsonObjs.eqpt_pwd,partnerKey,dllEqptPwdPath);
   tempObjs =JSON.stringify(jsonObjs);
   objs = '['+tempObjs+']';//重构objs
   var initData1=  querystring.stringify({
                    	'order_no'  : order_no,
                    	'partner'   : partner,
                    	'objs'	    : objs
                    });
sign = encryptionUseDll(initData1,partnerKey,dllPath);//获取带设备密匙的签名
  };

var postData =  querystring.stringify({
	'order_no'  : order_no,
	'partner'   : partner,
	'objs'	    : objs,
	'sign'      : sign
});
return postData;
}
module.exports.createPostData = createPostData;



//用ddl来加密获取,签名
function encryptionUseDll(encryptionData,encryptionKey,dllPath){

  var signSecret = require('edge').func({
      assemblyFile: dllPath,
      typeName: 'Startup',
      methodName: 'Invoke' // Func<object,Task<object>>
});
var sign = " ";
var objsign = { signstring: encryptionData, key: encryptionKey};
  signSecret(objsign, function (error, result) { 
	   sign =result;
  });
return sign;
};
//产生42位数字字母字符串
function func_order_no(){
    var md5 = crypto.createHash('md5');
    var data = (new Date()).getMilliseconds();
    md5.update(String(data),'utf8');
    var order_no = moment().format('YYMMDDHHmm') + md5.digest('hex');
    return order_no;
};



//cmd_id
//空调参数
//环境温度：hjwd
//时间：sj
//日期星期：rqxq
//剩余金额:syje

