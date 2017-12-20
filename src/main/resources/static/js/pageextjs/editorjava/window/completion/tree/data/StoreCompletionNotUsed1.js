Ext.define('Workspace.editorjava.window.completion.tree.data.StoreCompletionNotUsed1', {

	extend: 'Ext.data.TreeStore'
	,
    clearOnLoad: true,
	autoLoad: true,
	autoSync: true
	,
    proxy: {
        type: 'ajax',
        url: DOMAIN_NAME_ROOT + '/action.servlet?event=JsonEditSaveFile',
//		method: 'POST',
        actionMethods: {
            create: 'POST',
            read: 'POST',
            update: 'POST',
            destroy: 'POST'
        }
		,
		reader: {
            type: 'json'
        }
    }
	,
    listeners:{
	    'beforeload': function(store, operation, options) {
			console.info('Workspace.editorjava.window.completion.tree.data.StoreCompletion beforeload');//:'+operation.node.internalId);
			store.filename = store.filename + "." + Date.now() + ".tmp";
			store.getProxy().extraParams.filename = store.filename;
			store.getProxy().extraParams.content = store.txt;

			store.jsonData = JSON.stringify({
				filename : store.filename,
				content : store.txt
			});
			store.txt = "";
	    }
		,
	    'load': function(store, records, successful) {
			console.info('Workspace.editorjava.window.completion.tree.data.StoreCompletion load');
	    	var me = this;
			var application = Ext.getCmp('project').value;

			Ext.create('Workspace.editorjava.request.JsonEditSaveAndCompletion',
			{
				params:{application:application,filename:store.filename,caretPos:store.pos,deleteFile:'true'},
				application:application,
				store:me,
    			callback:function(opts, success, response) {
    				console.info('Workspace.editorjava.window.completion.tree.data.StoreCompletion load callback');
    				var data = response.responseText;
					store.data = data;
					store.sync();
					me.saveDone = true;
				}
			}).request();
	    }
    }
	,
	root: {
        nodeType: 'async',
        draggable: false,
        id: 'root',
	    expanded: true,
	    text: 'root'
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.window.completion.tree.data.StoreCompletionNotUsed1');});
