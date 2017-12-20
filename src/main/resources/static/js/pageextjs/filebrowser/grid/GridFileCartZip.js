Ext.define('Workspace.filebrowser.grid.GridFileCartZip', {
	// REQUIRED

	extend: 'Workspace.filebrowser.grid.GridFileCart'
	,
	alias: 'widget.filebrowserGridFileCartZip',
	alternateClassName: 'WorkspaceFilebrowserGridFileCartZip'
	,
    stateful:false
	,
    initComponent : function(){
		var me = this;

		Ext.apply(me, {
			tbar: [
			  Ext.create('Workspace.filebrowser.button.ButtonFileCartZip')
			]
	    });

		me.callParent(arguments);

//		Ext.apply(this.columns[2].editor, {
//			listeners : {
//				'beforecomplete' : function(editor, value, startValue, eOpts) {
//					console.info('Workspace.filebrowser.grid.GridFileExplorer columns[1].editor beforecomplete \''+value+'\'=>\''+startValue+'\'');
//				}
//			}
//		});
	}
}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.grid.GridFileCartZip');});