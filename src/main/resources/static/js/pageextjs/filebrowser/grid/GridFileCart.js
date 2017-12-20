Ext.define('Workspace.filebrowser.grid.GridFileCart', {
	// REQUIRED
	requires: ['Workspace.filebrowser.grid.filecart.OnBeforeDropCart',
	           'Workspace.filebrowser.grid.filecart.OnDropCart',
	           'Workspace.common.grid.fileexplorer.OnRendererColumnImageType'
	           ]
	,
	extend: 'Workspace.common.grid.GridDragDropExtjs4'
	,
	alias: 'widget.filebrowserGridFileCart',
	alternateClassName: 'WorkspaceFilebrowserGridFileCart'
	,
	closable: true,
	layout: 'fit',
    defaults: { flex : 1 },//auto stretch
	hideHeaders: true,
    stateful:false
	,
	bodyStyle: 'background:#ffc;'
	,
    initComponent : function(){
		var me = this;

		// Explicit load required library (Mandatory for extending this class)
		Ext.Loader.syncRequire('Workspace.common.grid.fileexplorer.OnRendererColumnImageType');

		me.buildComponent(me);

		me.callParent(arguments);
	}
	,
    buildComponent : function(me){
		Ext.apply(me, {
			columns: [
			  Ext.create('Ext.grid.column.Column', {dataIndex: 'contentType',
				  width: Workspace.common.grid.fileexplorer.OnRendererColumnImageType.width
				  ,
				  renderer: Workspace.common.grid.fileexplorer.OnRendererColumnImageType.call
			  }),
			  Ext.create('Ext.grid.column.Column', {header: 'Filename',  dataIndex: 'id', flex: 1})
		  	]
			,
			store: Ext.create('Ext.data.ArrayStore', {
				fields:['contentType', 'text', 'dropAction']
			})
	    });
	}
	,
	onDrop : function(node, data, overModel, dropPosition, eOpts) {
		var me = this;
	    me.callParent(arguments);

	    return Workspace.filebrowser.grid.filecart.OnDropCart.call(node, data, overModel, dropPosition, eOpts);
	}
	,
	onBeforeDrop : function(nodeEl, data) {
		var me = this;
	    me.callParent(arguments);

	    return Workspace.filebrowser.grid.filecart.OnBeforeDropCart.call(me, nodeEl, data);
	}
}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.grid.GridFileCart');});