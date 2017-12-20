Ext.define('Workspace.widget.panel.WidgetPanelCenter', {
	requires: [
	     'Workspace.common.panel.function.ApplySessionStateTabPanel'
	]
	,
	extend: 'Ext.tab.Panel'
	,
	alias: 'widget.panelCenter',
	alternateClassName: 'WorkspaceWidgetPanelCenter'
	,
	region: 'center',
	id: 'mainCenterPanel',
	activeTab: 0,
	tabRemovedStack: []
    ,
	// Must be override
	onTabChange: function(tabPanel, newCard, oldCard, option) {
		console.info('Workspace.widget.panel.WidgetPanelCenter onTabChange do nothing');
	},
	onAddTab: function(raw) {
		console.info('Workspace.widget.panel.WidgetPanelCenter onAddTab do nothing');
	},
	getSelectedItem: function() {
		console.info('Workspace.widget.panel.WidgetPanelCenter getSelectedItem do nothing');
		return null;
	}
	,
    initComponent : function(){
		var me = this;
		Ext.apply(me, {
			plugins: [ Ext.create('Workspace.common.plugin.AddTabPluginNew') ]
			,
			listeners: {
				'tabchange' : function (tabPanel, newCard, oldCard, option) {
					me.onTabChange(tabPanel, newCard, oldCard, option);
				}
			}
	    });

		var stateId = Ext.getClassName(me);
	    Workspace.common.panel.function.ApplySessionStateTabPanel.apply(me, stateId);

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

}, function() {Workspace.tool.Log.defined('Workspace.widget.panel.WidgetPanelCenter');});