Ext.define('Workspace.admin.panel.PanelEst', {
	// REQUIRED
	requires: ['Workspace.common.plugin.AddTabPluginExtjs4'],

	extend: 'Workspace.common.panel.TabPanelCollapsible'
	,
	alias: 'widget.panelEst',
	alternateClassName: 'PanelEst'
	,
	id: 'mainEstPanel',
	region: 'east',
	layout: 'border',
	title: 'ClipBoard',
	activeTab: 0,
	width: 200
	,
    initComponent : function(){
		var me = this;
		Ext.apply(me, {
			plugins: [ Ext.create('Workspace.common.plugin.AddTabPluginExtjs4') ]
	    });
	    me.callParent(arguments);
	},
	onAddTabClick : function() {
		var nb = Ext.getCmp('mainEstPanel').items.length+1;
		this.setActiveTab(this.add({
	        title: nb,
			id: 'panelEst'+nb,
			closable:true,
			layout: 'fit',
		    items: [
				{
			        xtype: 'htmleditor',
			        id: 'panelEstEditor'+nb,
			        enableColors: false,
			        enableAlignments: false
				}
		    ]
	    }));
	}

}, function() {Workspace.tool.Log.defined('Workspace.admin.panel.PanelEst');});
