Ext.define('Workspace.admin.window.userdetail.window.WindowUserDetailExtjs4', {
	// REQUIRED

	extend: 'Workspace.common.window.WindowExtjs4'
	,
	alias: 'workspace.WindowUserDetail',
	alternateClassName: 'WorkspaceWindowUserDetail'
	,
    initComponent : function(){
		var me = this;
		Ext.apply(me, {
			items: [
				Ext.create('Workspace.admin.window.userdetail.tree.TreeUserDetailExtjs4', {
				    height: 350,
				    width: 450
				})
			]
	    });
	    me.callParent(arguments);
	}
	,
	title: 'User Detail',        //titre de la fenêtre
	layout:'fit',
	modal: true,             //Grise automatiquement le fond de la page
	closeAction:'hide',
	plain: true

}, function() {Workspace.tool.Log.defined('Workspace.admin.window.userdetail.window.WindowUserDetailExtjs4');});
