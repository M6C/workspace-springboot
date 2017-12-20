Ext.define('Workspace.filebrowser.grid.GridFileCartCopyMove', {
	// REQUIRED

	extend: 'Workspace.filebrowser.grid.GridFileCart'
	,
	alias: 'widget.filebrowserGridFileCartCopyMove',
	alternateClassName: 'WorkspaceFilebrowserGridFileCartCopyMove'
	,
    stateful:false
	,
	buildComponent : function(me){

		me.callParent(arguments);

		// Ajout de la colonne 'Action'
		me.columns[me.columns.length] = Ext.create('Ext.grid.column.Column', {header: 'Action',  dataIndex: 'dropAction'});

		// Ajout du bouton
		Ext.apply(me, {
			tbar: [
			  Ext.create('Workspace.filebrowser.button.ButtonFileCartCopyMove')
			]
	    });
	}
}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.grid.GridFileCartCopyMove');});