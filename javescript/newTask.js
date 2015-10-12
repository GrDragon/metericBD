$(function() {
	initForm();//表单初始化

			$("#taskType").change(function(){

				if($(this).find("option:selected").val() == "onceRun"){
					$("div.onceRun").show();
					$("div.repeatRun").hide();
				}
				if($(this).find("option:selected").val() == "repeatRun"){
					$("div.repeatRun").show();
					$("div.onceRun").hide();
				}
			});


			$("#frequency").change(function() {
				if($(this).find("option:selected").val() == "time_1"){
					$(".time_1").show();
					$(".time_2").hide();
				}
				if($(this).find("option:selected").val() == "time_2"){
					$(".time_2").show();
					$(".time_1").hide();
				}
			});
			//响应该事件
			$("#enSure").click(function(){
				//检查数据的有效性
				if(document.getElementById("taskName").value == "")	{
					//作业名
					alert("请输入作业名");
					return false;
				};
				if(document.getElementById("taskType").value == document.getElementById("taskType")[0].value){
					//作业类型
					alert("请选择作业类型");
					return false;
				};
				if(document.getElementById("taskType").value == "repeatRun"){
					if(document.getElementById("frequency").value == document.getElementById("frequency")[0].value){
					//作业执行频率
						alert("请选择执行频率");	
					return false;
				} 
				    if(document.getElementById("frequency").value == document.getElementById("frequency")[2].value){
					//执行频率中执行次数选择
						if(document.getElementById("time_2_times").value < 1){
							alert("执行次数不能小于1");
						return false;
					};
					//return false;
					
				};
				//return false;
				};
				
				if(document.getElementById("taskContent").value == document.getElementById("taskContent")[0].value){
					//作业执行内容
					alert("请选择作业执行内容");
					return false;
				};

				var postData = {
					"taskName" 			: document.getElementById("taskName").value,
					"taskType" 			: document.getElementById("taskType").value,
					"onceRun_date"		: document.getElementById("onceRun_date").value,
					"onceRun_time"		: document.getElementById("onceRun_time").value,
					"period"   			: document.getElementById("period").value,
					"frequency"			: document.getElementById("frequency").value,
					"time_1_startDate"  : document.getElementById("time_1_startDate").value,
					"time_1_startTime"  : document.getElementById("time_1_startTime").value,
					"time_2_startDate"	: document.getElementById("time_2_startDate").value,
					"time_2_startTime"  : document.getElementById("time_2_startTime").value,
					"time_2_times"		: document.getElementById("time_2_times").value,
					"taskContent"		: document.getElementById("taskContent").value
						};
			//发送请求
			$.post('http://127.0.0.1:3000/',postData,function (data,status) {
              	var returnData = JSON.parse(data);
              	$('#taskExplain').html(returnData);  
        });
	});
});

//表单初始化
function initForm() {
document.getElementById("taskType").selectedIndex = 0;//selectedIndex 属性设置为0
document.getElementById("frequency").selectedIndex = 0;
document.getElementById("taskContent").selectedIndex = 0;

}
