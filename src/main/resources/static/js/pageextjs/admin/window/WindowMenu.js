function showExecCmd() {
	Ext.create('Workspace.admin.window.execcmd.window.WindowExecCmdExtjs4').show();
}

function showExecReboot() {
	Ext.create('Workspace.admin.window.execcmd.window.WindowExecCmdExtjs4', {
	    listeners: {
			//scope: this, //yourScope
	        'show': function (cmp, eOpts){
				Ext.getCmp('commandLine').setValue('D:/Dev/Travaux/Java/JBuilder8/exe/rebooter_reboot.bat');
			}
	    }
	}).show();
}

function showExecShutdown() {
	Ext.create('Workspace.admin.window.execcmd.window.WindowExecCmdExtjs4', {
	    listeners:{
			//scope: this, //yourScope
	        'show': function (cmp, eOpts){
				Ext.getCmp('commandLine').setValue('D:/Dev/Travaux/Java/JBuilder8/exe/rebooter_shutdown.bat');
			}
	    }
	}).show();
}

function showDBStartup() {
	Ext.create('Workspace.admin.window.execcmd.window.WindowExecCmdExtjs4', {
	    listeners:{
			//scope: this, //yourScope
	        'show': function (cmp, eOpts){
				Ext.getCmp('commandLine').setValue('D:/mysql-5.0.45-win32/mysql_startup.cmd');
			}
	    }
	}).show();
}

function showDBShutdown() {
	Ext.create('Workspace.admin.window.execcmd.window.WindowExecCmdExtjs4', {
	    listeners:{
			//scope: this, //yourScope
	        'show': function (cmp, eOpts){
				Ext.getCmp('commandLine').setValue('D:/mysql-5.0.45-win32/mysql_shutdown.cmd');
			}
	    }
	}).show();
}

function showUserDetail() {
	Ext.create('Workspace.admin.window.userdetail.window.WindowUserDetailExtjs4').show();
}

function showScreenShoot() {
	Ext.create('Workspace.admin.window.screenshoot.window.WindowScreenShootExtjs4').show();
}
