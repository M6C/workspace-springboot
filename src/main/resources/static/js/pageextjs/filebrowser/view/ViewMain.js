Ext.define('Workspace.filebrowser.view.ViewMain', {
	// REQUIRED
	requires: [ 'Workspace.filebrowser.panel.PanelWest',
		        'Workspace.filebrowser.panel.PanelEst',
		        'Workspace.filebrowser.panel.PanelCenter',
		        'Workspace.filebrowser.panel.PanelSouth']
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
				xtype: 'panelWest',
				items: []
			}
    		,
			{
				xtype: 'panelCenter',
	  			items: []
			}
    		,
			{
				xtype: 'panelEst',
				items: []
			}
    		,
			{
				xtype: 'panelSouth',
				items: []
			}
    ]

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.view.ViewMain');});