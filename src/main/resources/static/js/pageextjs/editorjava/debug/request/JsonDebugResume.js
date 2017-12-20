Ext.define('Workspace.editorjava.debug.request.JsonDebugResume',  {

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
			url : DOMAIN_NAME_ROOT + '/action.servlet?event=DebuggerBreakpointResume',
			headers: {'Content-Type': 'application/json; charset=UTF-8'},
			method: 'GET',
			params : me.params,
			callback:function(opts, success, response) {
                if (Ext.isDefined(paramCallBack)) {
                	paramCallBack();
                }
			}
		});
    }
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.debug.request.JsonDebugResume');});