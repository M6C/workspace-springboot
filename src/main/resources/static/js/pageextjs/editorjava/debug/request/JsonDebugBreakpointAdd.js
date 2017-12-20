Ext.define('Workspace.editorjava.debug.request.JsonDebugBreakpointAdd',  {
	requires: [
	     'Workspace.tool.UtilString'
  	]
  	,
    constructor: function(config) {
        var me = this;

        Ext.apply(me, config);

		me.params  = {application: me.application, FileName:me.filename, breakpointLine:me.line, className: me.classname};

        me.callParent();
    }
	,
    request: function(paramCallBack) { 
        var me = this;
		Ext.Ajax.request({  
			url : DOMAIN_NAME_ROOT + '/action.servlet?event=DebuggerBreakpointAddExtJs',
			headers: {'Content-Type': 'application/json; charset=UTF-8'},
			method: 'GET',
			params : me.params,
			callback:function(opts, success, response) {
                if (Ext.isDefined(paramCallBack)) {
                	var jsonData;
    	    		if (success) {
    	    			jsonData = Ext.decode(response.responseText);
    	    			jsonData.text = Workspace.tool.UtilString.decodeUtf8(jsonData.text);
    	    		}
                	paramCallBack(jsonData, me.params);
                }
			}
		});
    }
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.debug.request.JsonDebugBreakpointAdd');});