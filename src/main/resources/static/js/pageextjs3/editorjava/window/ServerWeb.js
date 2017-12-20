// DEPENDENCE
Ext.Loader.load([DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava/window/serverweb/window/WndServerWeb.js']);

function create_WindowServerWebCommand(windowEl,formId,comboId,statusbarId,cmd) {
	Ext.QuickTips.init();                //n�cessaire pour initialiser les infobulles d�erreur
	Ext.form.Field.prototype.msgTarget = 'side';    //n�cessaire pour initialiser les infobulles d�erreur

	var submitText = 'Execute \''+cmd+'\'';
	var type = 'War';

	var wnd = new Workspace.window.ServerWeb.WindowServerWeb ({
		el:windowEl,
		formId:formId,
		comboId:comboId,
		statusbarId:statusbarId,
		type:type,
		submitText:submitText,
		cmd:cmd
	});

	return wnd;
}
//
//var pleaseWaitMessage = 'Please Wait ...';
//
//function create_WindowServerWebCommand(windowEl,formId,comboId,statusbarId,cmd) {
//	Ext.QuickTips.init();                //n�cessaire pour initialiser les infobulles d�erreur
//	Ext.form.Field.prototype.msgTarget = 'side';    //n�cessaire pour initialiser les infobulles d�erreur
//
//	var submitText = 'Execute \''+cmd+'\'';
//	var type = 'War';
//
//  	function submitFunction () {
//  	  Ext.getCmp(statusbarId).showBusy(pleaseWaitMessage);
//  		var project = Ext.getCmp('project').value;
//  		var pack = Ext.getCmp('package').value;
//  		var requestUrl = DOMAIN_NAME_ROOT + '/action.servlet?event=JsonServerWebCommand';
//  		var wndWaiting = showWindowWaiting(); //Ext.MessageBox.wait(runningProcessMessage, pleaseWaitMessage);//wndWaiting.show();
//  		Ext.Ajax.request({
//  		   url: requestUrl,
//  		   params: {application:project,package:pack,command:cmd},
//  		   success: function(result, request){
//  			   var jsonData = Ext.util.JSON.decode(result.responseText);
//  			   var resultStatus = jsonData.status;
//  			   var resultMessage = jsonData.data[0].message;
//  			   Ext.getCmp(statusbarId).setText('Server command \''+cmd+'\' '+resultStatus);
//  			   Ext.Msg.alert(submitText + '-'+resultStatus+' result', resultMessage);
//			   wndWaiting.hide();
//  		   },
//  		   failure: function (result, request) {
//  			   var jsonData = Ext.util.JSON.decode(result.responseText);
//  			   var resultStatus = jsonData.status;
//  			   var resultMessage = jsonData.data[0].message;
//  			   Ext.getCmp(statusbarId).setText('Server command \''+cmd+'\' '+resultStatus);
//  			   Ext.Msg.alert(submitText + '-'+resultStatus+' result', resultMessage);
//			   wndWaiting.hide();
//  		   }
//  		});
//  	};
//
//	return create_WindowPackageAction(
//		windowEl,
//		formId,
//		comboId,
//		statusbarId,
//		type,
//		submitText,
//		submitFunction
//    );
//}