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
					layout:'fit',
                    xtype: 'editorjavaComboProject',
                    id: 'comboProject',
					collapsible: false,
					split: false,
					autoHeight: true,
					autoWidth: true,
					border: false
                }
				,
				{
					region: 'center',
                    xtype:'editorjavaTreeFileExplorer',
                    id : 'treeDirectory',
					layout : 'fit',
					collapsible: false,
					split: false,
					autoHeight: true,
					autoWidth: true,
					border: false
				}
				,
                {	//Balise cachee
					region: 'south',
                    xtype: 'hidden',
                    id: 'project',
                    name: 'project'
                }
            ]
        });
	    me.callParent(arguments);
	}

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.PanelWest');});