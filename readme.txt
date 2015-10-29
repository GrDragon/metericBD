// agentS
//created 20150810
//开发环境 NodeJs(v0.12.7)+MongoDB(V3.0.5)+sublime Text2/3+javescript+webkit(v0.12.3)

3，请求数据构造和说明

objs 值格式:[{"参数1":"参数1 值","参数2":"参数2值","参数3":"参数3 值",…,"
参数n":"参数n 值"}]
例：
设备类型编码(eqpt_type):0a0001a03c
设备标识码(eqpt_id_code):140417004301
指令类型码(cmd_type):dsj
指令标识码(cmd_id):zhygzdn
bjs=[{"eqpt_type":"0a0001a03c","eqpt_id_code":"140417004301","cmd_type":"dsj","cmd
_id":"zhygzdn"}]




1，agentserve项目结构
	node_modules文件夹：各个node摸块所在目录，安装各个模块时最好指定相应的版本，方便移植。

	main.js:主程序

	javescript：存放相关js文件，主要是用来存放自己构造的模块、函数等

			dataProduce.js:用来产生构造数据，验证是否有设备密匙(eqpt_pwd),不同的请求数据调用不同的加密dll.
			encryption.js:edge加密模块
			mongoosedb.js:mogodb数据库相关

     
	mode_modules:加载的必用nodejs核心模块
	html:html文件
	dll:动态库文件
	css:css文件
	img:图片文件
	other:无关文件，不影响项目







