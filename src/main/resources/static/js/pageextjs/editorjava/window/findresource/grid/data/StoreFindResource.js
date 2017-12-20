Ext.define('Workspace.editorjava.window.findresource.grid.data.StoreFindResource', {

	extend: 'Ext.data.Store'
	,
    clearOnLoad: true,
	autoLoad: true,
	autoSync: true
	,
    constructor: function(config) {
		console.info('Workspace.editorjava.window.findresource.grid.data.StoreFindResource constructor');
		var me = this;

		config.proxy = Ext.create('Ext.data.proxy.Ajax', {
	        url: DOMAIN_NAME_ROOT + '/action.servlet?event=JsonFileExplorer',
			method: 'GET',
	        reader: {
	            type: 'json'
	        },
	        extraParams: {
	        	application: config.application,
	        	nameFilter: config.nameFilter,
	        	contentFilter: config.contentFilter,
	        	extentionFilter: config.extentionFilter,
	        	recursive: 'true',
	        	withSubDirectory: 'false'
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

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.window.findresource.grid.data.StoreFindResource');});