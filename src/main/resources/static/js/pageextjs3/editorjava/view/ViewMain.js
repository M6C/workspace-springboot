// DEPENDENCE
Ext.Loader.load(fileList=[
DOMAIN_NAME_ROOT + '/js/commonextjs/view/ViewPort.js',
DOMAIN_NAME_ROOT + '/js/commonextjs/form/combobox/Combo.js',
DOMAIN_NAME_ROOT + '/js/commonextjs/form/combobox/ComboProject.js',
DOMAIN_NAME_ROOT + '/js/commonextjs/form/combobox/ComboPackage.js',
DOMAIN_NAME_ROOT + '/js/commonextjs/tree/TreeDirectory.js',
DOMAIN_NAME_ROOT + '/js/commonextjs/plugin/AddTabPanel.js',
DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava/tree/TreeDirectory.js',
DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava/form/combobox/ComboProject.js'
],
preserveOrder=true);

//Ext.Loader.loadFileIndex(1);
//Ext.Loader.loadFileIndex(2);
//Ext.Loader.loadFileIndex(3);
//Ext.Loader.loadFileIndex(4);
//Ext.Loader.loadFileIndex(5);
//Ext.Loader.loadFileIndex(6);

// NAMESPACE
Ext.ns('Workspace.editorjava');

Workspace.editorjava.ViewMain = Ext.extend(Workspace.common.view.ViewPort, {
	// private
    initComponent : function(){
		this.items = [
      		{
      			region: 'north',
      			xtype: 'panel',
      			//html: 'North'
      			height: 38,
      			contentEl:'menuTable',
      			bodyStyle:'background-color:#EFEFEF'
      		},
      		{
      			region: 'west',
      			xtype: 'panel',
      			split: true,
      			//collapsible: true,
      			collapseMode: 'mini',
      			titleCollapse : true,
      			bodyStyle:'padding:5px;background-color:white;',
      		    autoScroll: true,
      			width: 200,
      			minSize: 200,
      			//html: 'West',
      			layout: 'border',
      			items: [
      				{
      					region: 'north',
      					xtype: 'panel',
      					layout:'fit',
      					collapsible: false,
      					split: false,
      					autoHeight: true,
      					//autoWidth: true,
      				    items: [
      			        	{
      			        		xtype:'WorkspaceEditorjavaComboProject',
      			        		id:'comboProject'
      			        	},
      				        {	//Balise cach�e
      						    xtype: 'hidden',
      						    id: 'project',
      						    name: 'project'
      						}
      				    ]
      					//html: 'north'
      				},
      				{
      					region: 'center',
      					xtype: 'panel',
      					collapsible: false,
      					split: false,
      					autoHeight: true,
      					autoWidth: true,
      					border: false,
      					//,items: tree
      					items: [{
      						xtype:'WorkspaceEditorjavaTreeDirectory',
      						id : 'treeDirectory'
      					}]
      					//html: 'center'
      				}
      			]
      		},
      		{
      			id: 'mainCenterPanel',
      			region: 'center',
      			xtype: 'tabpanel',
      			activeTab: 0,
      			plugins: [Workspace.plugin.AddTabButton],
      			items: [
      			]
      		},
      		{
      			id: 'mainEstPanel',
      			region: 'east',
      			xtype: 'tabpanel',
      			title: 'ClipBoard',
      			activeTab: 0,
      			plugins: [Workspace.plugin.AddTabButton2],
      			width: 200,
      			split: true,
      			collapsed:true,
      			collapseMode: 'mini',
      			items: [
      			]
      		},
      		{
      			region: 'south',
      			xtype: 'panel',
      			html: 'South',
      			collapseMode: 'mini',
      			collapsed:true
      		}
		];

		Workspace.editorjava.ViewMain.superclass.initComponent.call(this);

		Ext.getCmp('mainEstPanel').collapse();
	},
	id: 'mainView',
	layout: 'border' 
});

// REGISTER
Ext.reg('WorkspaceEditorjavaViewMain',Workspace.editorjava.ViewMain);
