Ext.define('Workspace.editorjava.panel.est.PanelEstDebug', {

	extend: 'Ext.panel.Panel'
	,
	id: 'PanelEstDebug',
	alias: 'widget.panelEstDebug',
	alternateClassName: 'PanelEstDebug'
	,
	elements: 'body,tbar',
	layout: 'fit',
	collapsed: false,
    stateful:false,
//	hideCollapseTool: false,
//	hideMode: 'visibility',
    initialized: false,
    initComponent : function(){
		var me = this;

		Ext.apply(me, {
		    items: [
		    ]
		    ,
		    listeners : {
				beforeclose: function(tab, option) {
					return false;
		    	}
		    }
	    });
		me.callParent(arguments);
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.est.PanelEstDebug');});