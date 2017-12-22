Ext.define('Workspace.editorjava.view.ViewMain', {
	requires: [
		'Workspace.editorjava.panel.PanelWest',
		'Workspace.editorjava.panel.PanelEst',
		'Workspace.editorjava.panel.PanelCenter',
		'Workspace.editorjava.panel.PanelSouth'
    ]
	,
	extend:'Workspace.common.view.ViewPortExtjs4'
	,
    stateful:false,
	layout: 'border'
    ,
	items: [
    		{
  				region: 'north',
  				xtype: 'panel',
  				height: 38,
  				contentEl:'menuTable',
  				bodyStyle:'background-color:#EFEFEF',
  				stateful:false
  			}
    		,
			{
	            region: 'west',
				xtype: 'panelWest',
				items: []
			}
    		,
			{
	            region: 'center',
				xtype: 'panelCenter',
	  			items: []
			}
    		,
			{
	            region: 'est',
				xtype: 'panelEst',
				items: []
			}
    		,
			{
	            region: 'south',
				xtype: 'panelSouth',
				items: []
			}
    ]

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.view.ViewMain');});