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
    //create menuitem
    sub3 = new gui.MenuItem({label:"关于北电仪表"});

    //let menu to the menubar
    menubar.append(new gui.MenuItem({ label: '菜单', submenu: sub1 }));
    menubar.append(new gui.MenuItem({ label: '帮助', submenu: sub2 }));
    //let menuitem to the menu
    sub1.append(new gui.MenuItem({
    label: '子菜单1',
    click: function() {
    var element = document.createElement('div');
    element.appendChild(document.createTextNode('Test 1'));
    document.body.appendChild(element);
    }
    }));
	//event linsten
    sub2.append(sub3);
    sub3.on('click', function() {
    console.log('Item is clicked');
	});

    var win = gui.Window.get();//获取当前窗口对象
    win.menu = menubar;//将菜单栏放到该窗口对象中
})




