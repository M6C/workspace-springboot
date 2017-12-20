Ext.define('Workspace.editorjava.debug.request.JsonDebugCheck',  {

	constructor: function(config) {
	    var me = this;
	
	    Ext.apply(me, config);
	
		me.params  = {application: me.application};

		me.callParent();
	}
	,
	request: function(paramCallBack) {
	    var me = this;
		Ext.Ajax.request({  
			url : ACTION_SERVLET_ROOT + '/action.servlet?event=DebuggerBreakpointCheckExtJs',
			headers: {'Content-Type': 'application/json; charset=UTF-8'},
			method: 'GET',
			params : me.params,
			callback:function(opts, success, response) {
	            if (Ext.isDefined(paramCallBack)) {
	            	var jsonData;
		    		if (success) {
		    			jsonData = Ext.decode(response.responseText);
		    		}
	            	paramCallBack(jsonData);
	            }
			}
		});
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.debug.request.JsonDebugCheck');});