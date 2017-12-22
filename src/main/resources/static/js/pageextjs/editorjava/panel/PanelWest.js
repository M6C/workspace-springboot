Ext.define('Workspace.editorjava.panel.PanelWest', {
	// REQUIRED
	requires: [ 'Workspace.editorjava.form.combobox.ComboProject',
                'Workspace.editorjava.tree.TreeFileExplorer'
    ]
	,
	extend: 'Workspace.common.panel.PanelCollapsible'
	,
	alias: 'widget.panelWest',
	alternateClassName: 'PanelWest'
	,
	id: 'mainWestPanel',
	title: 'mainWestPanel',
	region: 'west',
//	bodyStyle: 'padding:5px;background-color:white;',
	width: 200,
	minSize: 200,
	layout: 'border',
	hideCollapseTool: true,
	collapseMode: 'mini',
    stateful:true,
    autoScroll:false,
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
					autoHeight: true,
					autoWidth: true,
					border: false
					,
					items: [
				        {
				        	xtype: 'editorjavaComboProject',
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
  						xtype:'editorjavaTreeFileExplorer',
  						id : 'treeDirectory'
  					}]
				}
            ]
        });
	    me.callParent(arguments);
	}

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.PanelWest');});