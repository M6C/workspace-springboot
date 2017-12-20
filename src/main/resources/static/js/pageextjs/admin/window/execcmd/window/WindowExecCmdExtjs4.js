Ext.define('Workspace.admin.window.execcmd.window.WindowExecCmdExtjs4', {
	// REQUIRED

	extend: 'Workspace.common.window.WindowExtjs4'
	,
	alias: 'workspace.WindowExecCmd',
	alternateClassName: 'WorkspaceWindowExecCmd'
	,
	title: 'Console'
	,
    initComponent : function(){
		var me = this;
		Ext.apply(me, {
			items: [
				Ext.create('Workspace.admin.window.execcmd.panel.PanelExecCmdExtjs4', {})
			]
	    });
	    me.callParent(arguments);
	}
	,
	layout: 'fit'

}, function() {Workspace.tool.Log.defined('Workspace.admin.window.execcmd.window.WindowExecCmdExtjs4');});