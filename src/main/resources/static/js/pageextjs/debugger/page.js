function init_page() {
	Ext.QuickTips.init();

    // NOTE: This is an example showing simple state management. During development,
    // it is generally best to disable state management as dynamically-generated ids
    // can change across page loads, leading to unpredictable results.  The developer
    // should ensure that stable state ids are set for stateful components in real apps.
    Ext.state.Manager.setProvider(new Ext.state.CookieProvider());

    var viewport = new Workspace.debugger.ViewMain();
//	var viewport = new Ext.Viewport({
//		id: 'mainView',
//		layout: 'border', 
//		renderTo: Ext.getBody(), 
//		items: [
//			{
//				region: 'north',
//				xtype: 'panel',
//				//html: 'North'
//				height: 38,
//				contentEl:'menuTable',
//				bodyStyle:'background-color:#EFEFEF'
//			},
//			{
//				region: 'west',
//				xtype: 'panel',
//				split: true,
//				//collapsible: true,
//				collapseMode: 'mini',
//				titleCollapse : true,
//				bodyStyle:'padding:5px;background-color:white;',
//			    autoScroll: true,
//				width: 200,
//				minSize: 200,
//				//html: 'West',
//				layout: 'border',
//				items: [
//					{
//						region: 'north',
//						xtype: 'panel',
//						layout:'fit',
//						collapsible: false,
//						split: false,
//						autoHeight: true,
//						//autoWidth: true,
//					    items: [
//				        	{
//				        		xtype:'WorkspaceDebuggerComboBox',
//				        		id:'comboProject'
//				        	},
//					        {	//Balise cachée
//							    xtype: 'hidden',
//							    id: 'project',
//							    name: 'project'
//							}
//					    ]
//						//html: 'north'
//					},
//					{
//						region: 'center',
//						xtype: 'panel',
//						collapsible: false,
//						split: false,
//						autoHeight: true,
//						autoWidth: true,
//						border: false,
//						items: [{
//							xtype:'WorkspaceDebuggerTreeDirectory',
//							id : 'treeDirectory'
//						}]
//						//html: 'center'
//					}
//				]
//			},
//			{
//				id: 'mainCenterPanel',
//				region: 'center',
//				xtype: 'tabpanel',
//				activeTab: 0,
//				plugins: [ Workspace.plugin.AddTabButton ],
//				items: []
//			},
//			{
//				id: 'mainEstPanel',
//				region: 'east',
//				xtype: 'tabpanel',
//				title: 'ClipBoard',
//				activeTab: 0,
//				plugins: [ Workspace.plugin.AddTabButton2 ],
//				width: 200,
//				split: true,
//				collapsed:true,
//				collapseMode: 'mini',
//				items: []
//			},
//			{
//				region: 'south',
//				xtype: 'panel',
//				html: 'South',
//				collapseMode: 'mini',
//				collapsed:true
//			}
//		]
//	});
//
//	Ext.getCmp('mainEstPanel').collapse();
}
