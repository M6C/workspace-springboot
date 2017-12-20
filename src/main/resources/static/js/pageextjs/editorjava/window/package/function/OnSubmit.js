Ext.define('Workspace.editorjava.window.package.function.OnSubmit',  {
	// REQUIRED

//	statics: {

	/**
	 * Config :
	 * resultMessageSuccess
	 * resultMessageFailure
	 * type : Jar,War...
	 * statusbarId
	 * requestUrl
	 */
	call : function (config) {
			var pleaseWaitMessage = 'Please Wait ...';
			var hideWindowWaitingDelay = 2;

//			Ext.getCmp(this.statusbarId).showBusy(pleaseWaitMessage);
			var project = Ext.getCmp('project').value;
			var pack = Ext.getCmp('package').value;
			var wndWait = Workspace.common.window.WindowWaiting.showWindowWaiting();
			try {
		  		Ext.Ajax.request({
		  		   url: config.requestUrl,
		  		   params: {application:project,package:pack,type:config.type},
		  		   success: function(result, request) {
		  			 Workspace.common.window.WindowWaiting.setStatusMessageAndHideWaiting(request, config.statusbarId, config.resultMessageSuccess);
		  		   },
		  		   failure: function (result, request) {
		  			 Workspace.common.window.WindowWaiting.setStatusMessageAndHideWaiting(request, config.statusbarId, config.resultMessageFailure);
		  		   }
		  		});
			}
		    finally {
		    	Workspace.common.window.WindowWaiting.hideWindowWaiting(wndWait, config.statusbarId, hideWindowWaitingDelay);
		    }
		}
//	}

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.window.package.function.OnSubmit');});