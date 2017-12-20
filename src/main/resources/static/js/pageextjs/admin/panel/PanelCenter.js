Ext.define('Workspace.admin.panel.PanelCenter', {
	// REQUIRED
	requires: ['Workspace.common.plugin.AddTabPluginExtjs4'],

	extend: 'Ext.tab.Panel'
	,
	alias: 'widget.panelCenter',
	alternateClassName: 'PanelCenter'
	,
	id: 'mainCenterPanel',
	region: 'center',
	activeTab: 0
	,
    initComponent : function(){
		var me = this;
		Ext.apply(me, {
			plugins: [ Ext.create('Workspace.common.plugin.AddTabPluginExtjs4') ]
	    });
	    me.callParent(arguments);
	},
	onAddTabClick : function() {
		this.setActiveTab(this.add(
			{
        	closable:true,
            title: 'New Tab'
        }
		));
	}

}, function() {Workspace.tool.Log.defined('Workspace.admin.panel.PanelCenter');});
