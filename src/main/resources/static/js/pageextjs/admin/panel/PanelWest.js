Ext.define('Workspace.admin.panel.PanelWest', {
	// REQUIRED
	requires: [ 'Workspace.admin.form.combobox.AdminComboProjectExtjs4']
	,
	extend: 'Workspace.common.panel.PanelCollapsible'
	,
	alias: 'widget.panelWest',
	alternateClassName: 'PanelWest'
	,
	id: 'mainWestPanel',
	region: 'west',
	bodyStyle: 'padding:5px;background-color:white;',
	width: 200,
	minSize: 200,
	layout: 'border'
	,
	// private
    initComponent : function(){
		var me = this;
		Ext.apply(me, {
            items : [
				{
					region: 'north',
					xtype: 'panel',
					layout:'fit',
					collapsible: false,
					split: false,
					autoHeight: true,
					items: [
				        {
				        	xtype: 'adminComboProjectExtjs4'
				        }
					]
				},
				{
					region: 'center',
					xtype: 'panel',
					collapsible: false,
					split: false,
					autoHeight: true,
					autoWidth: true,
					border: false
				}
            ]
        });
	    me.callParent(arguments);
	}

}, function() {Workspace.tool.Log.defined('Workspace.admin.panel.PanelWest');});
