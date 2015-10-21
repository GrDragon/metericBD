$(function(){

//打开新建任务
$('#newTaskOn').click(function(){
	window.open('./html/newTask.html',"newTask");
	});

	

	//load native UI Library
    var gui = require('nw.gui');
    //create an windows menu
    var menubar = new gui.Menu({ type: 'menubar' });

    //create an empty menu
    var sub1 = new gui.Menu();
    var sub2 = new gui.Menu();
    var sub3 = new gui.Menu();
    var sub4 = new gui.Menu();
    var sub5 = new gui.Menu();

    //create menuitem
    sub1_1 = new gui.MenuItem({label:"导入JS"});
    sub1_2 = new gui.MenuItem({label:"导出JS"});
    sub1_3 = new gui.MenuItem({label:"开启代理服务"});
    sub1_4 = new gui.MenuItem({label:"关闭代理服务"});
    sub1_5 = new gui.MenuItem({label:"数据库信息"});

    sub2_1 = new gui.MenuItem({label:"所有日志"});
    sub2_2 = new gui.MenuItem({label:"错误日志"});

    sub3_1 = new gui.MenuItem({label:"所有作业"});
    sub3_2 = new gui.MenuItem({label:"正在运行的作业"});
    sub3_3 = new gui.MenuItem({label:"已停止作业"});
    sub3_4 = new gui.MenuItem({label:"未执行作业"});
    sub3_5 = new gui.MenuItem({label:"新建作业"});
    sub3_6 = new gui.MenuItem({label:"修改作业"});
    sub3_7 = new gui.MenuItem({label:"删除作业"});
    sub3_8 = new gui.MenuItem({label:"查询作业"});
    sub3_9 = new gui.MenuItem({label:"异常作业"});

    sub4_1 = new gui.MenuItem({label:"修改用户信息"});
    sub4_2 = new gui.MenuItem({label:"修改登录密码"});

    sub5_1 = new gui.MenuItem({label:"帮助信息"});
    sub5_2 = new gui.MenuItem({label:"关于北电"});
    sub5_3 = new gui.MenuItem({label:"退出软件"});
    sub5_4 = new gui.MenuItem({label:"软件版本"});
    //let menu to the menubar
    menubar.append(new gui.MenuItem({ label: '系统设置', submenu: sub1 }));
    menubar.append(new gui.MenuItem({ label: '日志管理', submenu: sub2 }));
    menubar.append(new gui.MenuItem({ label: '作业管理', submenu: sub3 }));
    menubar.append(new gui.MenuItem({ label: '用户信息', submenu: sub4 }));
    menubar.append(new gui.MenuItem({ label: '帮助', submenu: sub5 }));

     /*//let menuitem to the menu
    sub1.append(new gui.MenuItem({
    label: '导入JS2',
    click: function() {
    var element = document.createElement('div');
    element.appendChild(document.createTextNode('Test 1'));
    document.body.appendChild(element);
    }
    })); */　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　

	//event linsten
    sub1.append(sub1_1);
    sub1.append(sub1_2);
    sub1.append(sub1_3);
    sub1.append(sub1_4);
    sub1.append(sub1_5);

    sub2.append(sub2_1);
    sub2.append(sub2_2);
    sub2_2.on('click', function() {
    console.log('Item is clicked');
    window.open('./html/newTask.html',"newTask");
	});

    sub3.append(sub3_1);
    sub3.append(sub3_2);
    sub3.append(sub3_3);
    sub3.append(sub3_4);
    sub3.append(sub3_5);
    sub3.append(sub3_6);
    sub3.append(sub3_7);
    sub3.append(sub3_8);
    sub3.append(sub3_9);

    sub4.append(sub4_1);
    sub4.append(sub4_2);

    sub5.append(sub5_1);
    sub5.append(sub5_2);
    sub5.append(sub5_3);
    sub5.append(sub5_4);  
    var win = gui.Window.get();//获取当前窗口对象
    win.menu = menubar;//将菜单栏放到该窗口对象中
})




