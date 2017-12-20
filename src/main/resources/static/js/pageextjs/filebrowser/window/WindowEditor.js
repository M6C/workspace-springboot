Ext.define('Workspace.filebrowser.window.WindowEditor', {
	requires: [
	    'Workspace.editorjava.panel.center.PanelCenterEditor'
 	]
 	,
	extend: 'Ext.Window'
	,
	alias: 'widget.filebrowserWindowEditor',
	alternateClassName: 'WorkspaceFileBrowserWindowEditor'
	,
	// private
	initComponent : function(){
		var me = this;

        var raw = me.raw;
		var panelId=me.panelId;
		var panelEditorId=panelId+'Editor';

		var panel = Ext.create('Workspace.editorjava.panel.center.PanelCenterEditor', {
			panelEditorId: panelEditorId,
			panelId: panelId,
			application: raw.application,
			build: raw.build,
			autoDeploy: raw.autoDeploy,
			raw: raw
		});

		Ext.apply(me, {
		    items : [
		       panel
		    ]
			,
			listeners : {
				'show' : function (wnd) {
                    panel.fireEvent('show');
				}
			}
		});

		me.callParent(arguments);
	}
	,
	title: 'File Editor',        //titre de la fen�tre
	layout:'fit',
	width:400,
	height:300,
	modal: true,             //Grise automatiquement le fond de la page
	closeAction:'destroy',
	plain: true

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.window.WindowEditor');});