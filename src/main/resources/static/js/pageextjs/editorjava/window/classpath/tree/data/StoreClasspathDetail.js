Ext.define('Workspace.editorjava.window.classpath.tree.data.StoreClasspathDetail', {
	// NOT USED

	extend: 'Ext.data.TreeStore'
	,
    clearOnLoad: true,
	autoLoad: true,
	autoSync: true
	,
    proxy: {
        type: 'ajax',
        url: DOMAIN_NAME_ROOT + '/action.servlet?event=JsonClasspathDetail',
		method: 'GET',
        reader: {
            type: 'json'
        }
    }
	,
    listeners:{
	    //scope: this, //yourScope
	    'beforeload': function(store, operation, options) {
			console.info('Workspace.editorjava.window.classpath.tree.data.StoreClasspath beforeload:'+operation.node.internalId);
			store.getProxy().extraParams.pApplication = Ext.getCmp('project').value;
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
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.window.classpath.tree.data.StoreClasspathDetail');});
