Ext.define('Workspace.common.tree.data.StoreDirectoryExplorerExtjs4', {

	extend: 'Ext.data.TreeStore'
	,
    clearOnLoad: true,
	autoLoad: true,
	autoSync: true
	,
    proxy: {
        type: 'ajax',
        url: DOMAIN_NAME_ROOT + '/action.servlet?event=JsonFileExplorer',
		method: 'GET',
        reader: {
            type: 'json'
        }
		,
	    extraParams: {
	    	contentType: 'directory',
        	path: ''
	    }
    }
	,
	root: {
        nodeType: 'async',
        draggable: false,
        id: 'root',
	    expanded: true,
	    text: 'Current'
	}
	,
    listeners:{
	    //scope: this, //yourScope
	    'beforeload': function(store, operation, options) {
			if (!operation.node.isRoot()) {
				console.info('Workspace.common.tree.data.StoreDirectoryExplorer beforeload:'+operation.node.internalId);
				store.getProxy().extraParams.path = operation.node.internalId;
			}
	    }
		,
		'load': function(store, node, records, successful, options) {
			var size = records.length;
			for(var i=0 ; i<size ; i++) {
				record = records[i];
				Ext.apply(record.data, record.raw);
			}

		}
	}
}, function() {Workspace.tool.Log.defined('Workspace.common.tree.data.StoreDirectoryExplorerExtjs4');});
