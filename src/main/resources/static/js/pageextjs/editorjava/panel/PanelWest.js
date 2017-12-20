Ext.define('Workspace.editorjava.panel.PanelWest', {
	// REQUIRED
	requires: ['Workspace.editorjava.form.combobox.ComboProject'
	           ,
	           'Workspace.editorjava.tree.TreeFileExplorer'
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
    stateId:'Workspace.editorjava.panel.PanelWest'
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
				        	xtype: 'editorjavaComboProject',
  						    id: 'comboProject'
				        },
  				        {	//Balise cach�e
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
  						xtype:'editorjavaTreeFileExplorer',
  						id : 'treeDirectory'
  					}]
				}
            ]
        });
	    me.callParent(arguments);
	}

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.PanelWest');});