Ext.define('Workspace.filebrowser.panel.PanelWest', {
	requires: [
	   'Workspace.filebrowser.form.combobox.ComboProject',
       'Workspace.filebrowser.tree.TreeDirectoryExplorer'
	]
	,
	extend: 'Workspace.common.panel.PanelCollapsible'
	,
	alias: 'widget.panelWest',
	alternateClassName: 'PanelWest'
	,
	id: 'mainWestPanel',
	region: 'west',
	//bodyStyle: 'padding:5px;background-color:white;',
	width: 200,
	minSize: 200,
	layout: 'border',
	hideCollapseTool: true,
	collapseMode: 'mini',
    stateful:true,
    stateId:'Workspace.filebrowser.panel.PanelWest'
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
					autoHeight: true
					,
					items: [
				        {
				        	xtype: 'filebrowserComboProject',
  						    id: 'comboProject'
				        },
  				        {	//Balise cachee
  						    xtype: 'hidden',
  						    id: 'project',
  						    name: 'project'
  						}
					]
				}
				,
				{
					region: 'center',
					xtype: 'panel',
					layout : 'fit',
					collapsible: false,
					split: false,
					autoHeight: true,
					autoWidth: true,
					border: false
					,
  					items: [{
  						xtype:'filebrowserTreeDirectoryExplorer',
  						id : 'treeDirectory'
  					}]
				}
            ]
        });
	    me.callParent(arguments);
	}

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.panel.PanelWest');});
