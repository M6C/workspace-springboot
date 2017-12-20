//Parameters :
// - params
// - application
// - build
// - className
Ext.define('Workspace.editorjava.request.JsonEditSaveAndCompletion',  {
	requires: [
	    'Workspace.common.window.WindowWaiting'
   	]
   	,
	extend: 'Workspace.editorjava.request.JsonEditSaveFile'
	,
	constructor: function(config) {
		console.info('Workspace.editorjava.request.JsonEditSaveAndCompletion constructor');
        var me = this;
        me.showMessage = false;

        config.params.filename += "." + Date.now() + ".tmp";
        config.callback = function(options, success, response) {
			console.info('Workspace.editorjava.request.JsonEditSaveAndCompletion JsonEditSaveFile callback');

    		Ext.Ajax.request({
    			method:'GET',
    			url:DOMAIN_NAME_ROOT + '/action.servlet?event=JsonCompletion',
    			callback:function(opts, success, response) {
    				config.callbackCompletion(opts, success, response);
    			},
    			params:{filename:config.params.filename,caretPos:config.params.caretPos,deleteFile:'true'}
    		});
    	};

        Ext.apply(me, config);

        me.callParent();
    }
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.request.JsonEditSaveAndCompletion');});