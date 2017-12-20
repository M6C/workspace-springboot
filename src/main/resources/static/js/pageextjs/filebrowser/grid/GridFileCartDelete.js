Ext.define('Workspace.filebrowser.grid.GridFileCartDelete', {
	// REQUIRED

	extend: 'Workspace.filebrowser.grid.GridFileCart'
	,
	alias: 'widget.filebrowserGridFileCartDelete',
	alternateClassName: 'WorkspaceFilebrowserGridFileCartDelete'
	,
    stateful:false
	,
    initComponent : function(){
		var me = this;

		Ext.apply(me, {
			tbar: [
			  Ext.create('Workspace.filebrowser.button.ButtonFileCartDelete')
			]
	    });

		me.callParent(arguments);
	}
}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.grid.GridFileCartDelete');});