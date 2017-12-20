Ext.define('Workspace.editorjava.window.package.function.OnSubmitJar',  {
	// REQUIRED

	statics: {

		call : function () {
var pleaseWaitMessage = 'Please Wait ...';
var hideWindowWaitingDelay = 2;

			Ext.getCmp('package_statusbar_jar').showBusy(pleaseWaitMessage);
			var project = Ext.getCmp('project').value;
			var pack = Ext.getCmp('package').value;
			var requestUrl = DOMAIN_NAME_ROOT + '/action.servlet?event=JsonEditPackage';
			try {
				showWindowWaiting();
		  		Ext.Ajax.request({
		  		   url: requestUrl,
		  		   params: {application:project,package:pack,type:'Jar'},
		  		   success: function(result, request){
		  		     var resultMessage = '';
		  		     try {
		  			    var jsonData = Ext.util.JSON.decode(result.responseText);
		  			    resultMessage = jsonData.data[0].message;
		  			   }
		  			   finally {
		  		     try {
	  	  			   Ext.getCmp('package_statusbar_clean_jar').setText(resultMessage);
		  			   }
		  			   finally {
					      hideWindowWaiting(resultMessage, hideWindowWaitingDelay);
					     }
					     }
		  		   },
		  		   failure: function (result, request) {
		  		     var resultMessage = '';
		  		     try {
		  			    var jsonData = Ext.util.JSON.decode(result.responseText);
		  			    resultMessage = jsonData.data[0].message;
		  			   }
		  			   finally {
		  	  		     try {
		    	  		   Ext.getCmp('package_statusbar_clean_jar').setText(resultMessage);
		  	  			 }
		  	  			 finally {
		  				   hideWindowWaiting(resultMessage, hideWindowWaitingDelay);
					     }
					  }
		  		   }
		  		});
			}
		    finally {
		      hideWindowWaiting('Ext.Ajax.request Error', hideWindowWaitingDelay);
		    }
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.window.package.function.OnSubmitJar');});