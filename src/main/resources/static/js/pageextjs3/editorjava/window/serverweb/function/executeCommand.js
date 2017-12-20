// NAMESPACE
Ext.ns('Workspace.window.ServerWeb.function');

// Function
Workspace.window.ServerWeb.function.executeCommand = (function(statusbarId, cmd) {
	  Ext.getCmp(statusbarId).showBusy(pleaseWaitMessage);
		var project = Ext.getCmp('project').value;
		var pack = Ext.getCmp('package').value;
		var requestUrl = DOMAIN_NAME_ROOT + '/action.servlet?event=JsonServerWebCommand';

		console.info('url:\''+requestUrl+'\' params:application=\''+project+'\',package:\''+pack+'\',command:\''+cmd+'\'');

		var wndWaiting = showWindowWaiting(); //Ext.MessageBox.wait(runningProcessMessage, pleaseWaitMessage);//wndWaiting.show();
		Ext.Ajax.request({
		   url: requestUrl,
		   params: {application:project,package:pack,command:cmd},
		   success: function(result, request){
			   var jsonData = Ext.util.JSON.decode(result.responseText);
			   var resultStatus = jsonData.status;
			   var resultMessage = jsonData.data[0].message;

			   console.info('Server command \''+cmd+'\' '+resultStatus);
			   console.info(/*submitText + '-'+*/resultStatus+' result', resultMessage);
			   
			   Ext.getCmp(statusbarId).setText('Server command \''+cmd+'\' '+resultStatus);
			   Ext.Msg.alert(/*submitText + '-'+*/resultStatus+' result', resultMessage);
			   wndWaiting.hide();
		   },
		   failure: function (result, request) {
			   var jsonData = Ext.util.JSON.decode(result.responseText);
			   var resultStatus = jsonData.status;
			   var resultMessage = jsonData.data[0].message;

			   console.info('Server command \''+cmd+'\' '+resultStatus);
			   console.info(/*submitText + '-'+*/resultStatus+' result', resultMessage);

			   Ext.getCmp(statusbarId).setText('Server command \''+cmd+'\' '+resultStatus);
			   Ext.Msg.alert(/*submitText + '-'+*/resultStatus+' result', resultMessage);
			   wndWaiting.hide();
		   }
		});
});
