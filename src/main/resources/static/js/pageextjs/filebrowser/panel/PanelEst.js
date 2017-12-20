Ext.define('Workspace.filebrowser.panel.PanelEst', {
	// REQUIRED
	requires: [
	     'Workspace.filebrowser.plugin.AddTabPluginCart'
	],

	extend: 'Workspace.common.panel.TabPanelCollapsible'
	,
	alias: 'widget.panelEst',
	alternateClassName: 'PanelEst'
	,
	id: 'mainEstPanel',
	region: 'east',
	layout: 'fit',
//	title: 'ClipBoard',
	hideCollapseTool: true,
	collapseMode: 'mini',
	collapsed: true,
	activeTab: 0,
	scroll: false,
	autoscroll: false,
	width: 200,
    stateful:false
	,
    initComponent : function(){
		var me = this;
		Ext.apply(me, {
			plugins: [ Ext.create('Workspace.filebrowser.plugin.AddTabPluginCart') ]
	    });
	    me.callParent(arguments);

	    me.onAddTabClick('delete');
	}
	,
	onAddTabClick : function(type) {
//		var nb = this.items.length+1;
		if (type=='zip') {
			this.createTab('Workspace.filebrowser.grid.GridFileCartZip', 'Zip', 'filebrowserGridZip'/*NE FONCTIONNE PAS, Workspace.filebrowser.constant.ConstantImage.BUTTON_CART_ZIP_URL*/);
		}
		else if (type=='delete') {
			this.createTab('Workspace.filebrowser.grid.GridFileCartDelete', 'Delete', 'filebrowserGridDelete'/*NE FONCTIONNE PAS, Workspace.filebrowser.constant.ConstantImage.BUTTON_CART_DELETE_URL*/);
		}
		else {
			this.createTab('Workspace.filebrowser.grid.GridFileCartCopyMove', 'Copy/Move', 'filebrowserGridCopyMove'/*NE FONCTIONNE PAS, Workspace.filebrowser.constant.ConstantImage.BUTTON_CART_COPY_MOVE_URL*/);
		}
	}
	,
	createTab : function(pType, pTitle, pId, pIcon) {
		var tab = this.getComponent(pId);

		if (!Ext.isDefined(tab))
			tab = this.add(Ext.create(pType, {title: pTitle, id: pId/*NE FONCTIONNE PAS, icon: pIcon, cls:'x-btn-text-icon'*/}));

		this.setActiveTab(tab);
	}

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.panel.PanelEst');});
