Ext.define('Workspace.editorjava.debug.request.JsonDebugList',  {
	requires: [
	     'Workspace.tool.UtilString'
  	]
  	,
	constructor: function(config) {
	    var me = this;
	
	    Ext.apply(me, config);
	
		me.params  = {application: me.application, className: me.className};

		me.callParent();
	}
	,
	request: function(paramCallBack) {
	    var me = this;
		Ext.Ajax.request({  
            url: ACTION_SERVLET_ROOT + '/action.servlet?event=DebuggerBreakpointListExtJs',
			headers: {'Content-Type': 'application/json; charset=UTF-8'},
			method: 'GET',
			params : me.params,
			callback:function(opts, success, response) {
	            if (Ext.isDefined(paramCallBack)) {
	            	var jsonData;
		    		if (success) {
		    			jsonData = Ext.decode(response.responseText);

		    		    var data = jsonData.children;
                	    if (!Ext.isEmpty(data)) {
                    	    if (!Ext.isArray(data)) {
                    	        data = [data];
                    	    }
                    	    Ext.each(data, function(item) {
            	    			item.application = Workspace.tool.UtilString.decodeUtf8(item.application);
            	    			item.classname = Workspace.tool.UtilString.decodeUtf8(item.classname);
            	    			item.filename = Workspace.tool.UtilString.decodeUtf8(item.filename);
                    	    });
                	    }
		    		}
	            	paramCallBack(jsonData, success);
	            }
			}
		});
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.debug.request.JsonDebugList');});