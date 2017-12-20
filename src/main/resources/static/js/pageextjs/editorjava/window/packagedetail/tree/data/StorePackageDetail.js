Ext.define('Workspace.editorjava.window.packagedetail.tree.data.StorePackageDetail', {

	extend: 'Ext.data.TreeStore',

    clearOnLoad: true,
	autoLoad: true,
	autoSync: true,

    proxy: {
        type: 'ajax',
        url: DOMAIN_NAME_ROOT + '/action.servlet?event=JsonPackageDetail',
		method: 'GET',
        reader: {
            type: 'json'
        }
    }
	,
    listeners:{
	    //scope: this, //yourScope
	    'beforeload': function(store, operation, options) {
			console.info('Workspace.editorjava.window.packagedetail.tree.data.StorePackageDetail beforeload:'+operation.node.internalId);
			store.getProxy().extraParams.pApplication = Ext.getCmp('project').value;
			store.getProxy().extraParams.pType = 'War';//Ext.getCmp('pkgtype').value;
			store.getProxy().extraParams.pName = Ext.getCmp('package').value;
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
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.window.packagedetail.tree.data.StorePackageDetail');});
