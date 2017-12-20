Ext.define('Workspace.admin.window.screenshoot.window.WindowScreenShootExtjs4', {
	// REQUIRED

	extend: 'Workspace.common.window.WindowExtjs4'
	,
	alias: 'workspace.WindowScreenShoot',
	alternateClassName: 'WorkspaceWindowScreenShoot'
	,
	layout: 'border',
    initComponent : function(){
		var me = this;
		Ext.apply(me, {
			items: [
				Ext.create('Workspace.admin.window.screenshoot.panel.PanelScreenShootExtjs4', {
					region: 'north',
					width : '100%',
	  				collapseMode: 'mini',
					collapsible: true,
	  				collapsed: true,
	      			split: true
				})
				,
				Ext.create('Ext.Img', {
					id: 'screenshoot',
				    src: DOMAIN_NAME_ROOT + '/Actionscreenshoot?qualityRate=25&screenHeight=600&screenWidth=800&time='
				    ,
					region: 'center',
	  				collapseMode: 'mini',
					collapsible: true,
	  				collapsed: true,
	      			split: true,
				    height: 480,
				    width: 640
				})
			]
	    });
	    me.callParent(arguments);
	}
	,
	title: 'Screen shoot',        //titre de la fen�tre
	layout:'fit',
	modal: true,             //Grise automatiquement le fond de la page
	closeAction:'hide',
	plain: true

}, function() {Workspace.tool.Log.defined('Workspace.admin.window.screenshoot.window.WindowScreenShootExtjs4');});
