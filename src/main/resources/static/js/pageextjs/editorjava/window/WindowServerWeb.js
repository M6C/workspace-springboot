Ext.require([
	'Workspace.editorjava.window.WindowPackage',
	'Workspace.editorjava.window.serverweb.function.executeCommand'
]);

Ext.define('Workspace.editorjava.window.WindowServerWeb', {
	// REQUIRED

	extend: 'Workspace.editorjava.window.WindowPackage',

	alias: 'widget.editorjavaWindowServerWeb',
	alternateClassName: 'WorkspaceEditorJavaWindowServerWeb',

	// private
	initComponent : function(){
		var me = this;

		Ext.apply(me, {
			// Positionne des param�tres sur le bouton Submit de la window
//			Ext.getCmp('pkgsubmit').statusbarId = this.statusbarId;
//			Ext.getCmp('pkgsubmit').cmd = this.cmd;
		});

		me.callParent(arguments);
	}
	,
	callBackSubmit : function() {
		Workspace.editorjava.window.ServerWeb.function.executeCommand.execute(this.statusbarId,this.cmd);
	}
	,
	title: 'Server Web'

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.window.WindowServerWeb');});