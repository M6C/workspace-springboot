Ext.define('Workspace.admin.view.ViewMain', {
	// REQUIRED
	requires: [ 'Workspace.admin.panel.PanelWest',
		        'Workspace.admin.panel.PanelEst',
		        'Workspace.admin.panel.PanelCenter']
	,
	extend:'Workspace.common.view.ViewPortExtjs4'
	,
	// private
    initComponent : function(){
		var me = this;
		Ext.apply(me, {
            items : me.buildItems()
        });
	    me.callParent(arguments);
	},
	buildItems : function(){
		return [
    		{
  				region: 'north',
  				xtype: 'panel',
  				height: 38,
  				contentEl:'menuTable',
  				bodyStyle:'background-color:#EFEFEF'
  			},
			{
					xtype: 'panelWest',
					items: []
			},
			{
				xtype: 'panelCenter',
	  			items: []
			},
			{
				xtype: 'panelEst',
				items: []
			},
  			{
  				region: 'south',
  				xtype: 'panel',
  				html: 'South',
  				collapseMode: 'mini',
  				collapsed: true
  			}
  		];
	},
	layout: 'border'

}, function() {Workspace.tool.Log.defined('Workspace.admin.view.ViewMain');});
