Ext.define('Workspace.filebrowser.menu.MenuTool',  {
	requires: ['Workspace.filebrowser.menu.MenuCheck'],

//	statics: {

		upload : function () {
			var me = this;

			var config = {alertSelection: false}; 
			config = Workspace.filebrowser.menu.MenuCheck.check(config);
			if (config.success == false && !Ext.isDefined(config.checkSelection)) {
				return;
			}

			var wnd = Ext.create('Workspace.common.window.WindowUpload', {path: config.tab.id, gridId: 'gridFileExplorer_'+config.tab.id});
			wnd.show();
		}
//	}

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.menu.MenuTool');});