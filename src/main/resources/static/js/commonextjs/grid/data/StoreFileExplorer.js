Ext.define('Workspace.common.grid.data.StoreFileExplorer', {

	extend: 'Ext.data.Store'
	,
    clearOnLoad: true,
	autoLoad: true,
	autoSync: true
	,
    constructor: function(config) {
		console.info('Workspace.common.grid.data.StoreFileExplorer constructor');
		var me = this;

		config.proxy = Ext.create('Ext.data.proxy.Ajax', {
	        url: DOMAIN_NAME_ROOT + '/action.servlet?event=JsonFileExplorer',
			method: 'GET',
	        reader: {
	            type: 'json'
	        },
	        extraParams: {
	        	application: '',
	        	path: ''
	        }
	    });

        Ext.apply(me, config);

        me.callParent();
    },
	root: {
        nodeType: 'async',
        draggable: false,
        id: 'root',
	    expanded: true,
	    text: 'Current'
	}

}, function() {Workspace.tool.Log.defined('Workspace.common.grid.data.StoreFileExplorer');});
