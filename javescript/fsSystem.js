var fs = require('fs');
var path = require('path');


//var fileName ="bb1";//文件名
//var filePlace = path.join('../agent/filejs','/');
//var fileContent = null ;//文件内容

//b= SaveJs("ss",{"d":3,"2":"d"},'E:\\');//调用方式
//console.log("b= "+b);

function saveJs(fileName,fileContent,filePlace){

if(filePlace == null){
	filePlace='../filejs/';
}
//将数据转化为string
var fileContent = JSON.stringify(fileContent);
  //写入文件
  fs.writeFile(filePlace+fileName+'.js',fileContent,function (err) {
      if (err) {

      	throw err ;
      	
      }
      //console.log("File Saved !"); //文件被保存
  });
 //     
  //fs.exists( filePlace+fileName+'.js' ,function(exists){            
 // console.log(exists ? "文件存在了，不能重新创建了" : "文件不存在，文件创建失败了");
 // }) ;
}


 //
 
 function readJs(fileName,filePlace){
 var result;
 if(filePlace == null){
 filePlace=path.join('agent/filejs','/');
 }
 var options = {
 	encoding : 'utf8',
 	flag : 'r'
 }
 result = fs.readFileSync(filePlace+fileName+".js", options);
 return result;
 }

 //var a= readJs("bb");
 //console.log(a);
//console.log()


module.exports.saveJs = saveJs;
module.exports.readJs = readJs;