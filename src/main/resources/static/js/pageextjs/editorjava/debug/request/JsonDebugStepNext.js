Ext.define('Workspace.editorjava.debug.request.JsonDebugStepNext',  {

    constructor: function(config) {
        var me = this;

        Ext.apply(me, config);

		me.params  = {application: me.application, step: 'OVER'};

		me.callParent();
    }
	,
    request: function(paramCallBack) { 
        var me = this;
		Ext.Ajax.request({  
			url : ACTION_SERVLET_ROOT + '/action.servlet?event=DebuggerBreakpointStepExtJs',
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
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.debug.request.JsonDebugStepNext');});