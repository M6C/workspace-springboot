Ext.define('Workspace.editorjava.window.completion.tree.data.StoreCompletionNotUsed2', {

	extend: 'Ext.data.TreeStore'
	,
    clearOnLoad: true,
	autoLoad: true,
	autoSync: true
	,
    proxy: {
        type: 'ajax',
        url: DOMAIN_NAME_ROOT + '/action.servlet?event=JsonCompletion',
		method: 'GET',
        reader: {
            type: 'json'
        }
    }
	,
    listeners:{
	    //scope: this, //yourScope
	    'beforeload': function(store, operation, options) {
	    	var me = this;
			console.info('Workspace.editorjava.window.completion.tree.data.StoreCompletion beforeload');//:'+operation.node.internalId);
			var filename = store.filename + "." + Date.now() + ".tmp";

			store.getProxy().extraParams.application = Ext.getCmp('project').value;
			store.getProxy().extraParams.filename = filename;
			store.getProxy().extraParams.caretPos = store.pos;
			store.getProxy().extraParams.deleteFile = 'true';

			var application = Ext.getCmp('project').value;
			Ext.create('Workspace.editorjava.request.JsonEditSaveFile',
			{
				params:{filename:filename,content:store.txt},
				application:application,
    			callback:function(opts, success, response) {
    				store.txt = "";
    				var data = response.responseText;
					store.data = data;
					store.sync();
					me.saveDone = true;
				}
			}).request(this);
			this.checkSaveDone();
	    }
		,
	    'load': function(store, records, successful) {
			console.info('Workspace.editorjava.window.completion.tree.data.StoreCompletion load saveDone:' + this.saveDone);
	    }
    }
	,
	saveDone: false
	,
	checkSaveDone : function() {
		console.info('Workspace.editorjava.window.completion.tree.data.StoreCompletion checkSaveDone saveDone:' + this.saveDone);
		if (!this.saveDone) {
			this.sleep(100);
			setTimeout(this.checkSaveDone, 100);
		} else {
			this.saveDone = false;
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
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.window.completion.tree.data.StoreCompletionNotUsed2');});
