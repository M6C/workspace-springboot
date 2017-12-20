Ext.define('Workspace.filebrowser.menu.MenuCheck',  {
	requires: [
  	     'Workspace.common.tool.Pop',
  	]
  	,
	statics: {

		check : function(ret) {
			var me = this;
			if (!Ext.isDefined(ret)) {
				ret = {};
			}
			ret.success = true;

			if (!me.checkApplication(ret)) {
				ret.success = false;
				return ret;
			}
		
			if (!me.checkTab(ret)) {
				ret.success = false;
				return ret;
			}
		
			if (!me.checkGrid(ret)) {
				ret.success = false;
				return ret;
			}

			if (!me.checkSelection(ret)) {
				ret.success = false;
				return ret;
			}

			return ret;
		}
		,
		checkApplication : function(config) {
			var ret = true;
			config.application = Ext.getCmp('project').value;
			if (!Ext.isDefined(config.application)) {
				if (!Ext.isDefined(config.alertApplication) || config.alertApplication == true) {
					Workspace.common.tool.Pop.info('Workspace.filebrowser.menu.MenuCheck', 'No application selected');
					Ext.getCmp('project').focus();
				}
				ret = false;
			}
			return (config.checkApplication = ret);
		}
		,
		checkTab : function(config) {
			var ret = true;
			config.tab = Ext.getCmp('mainCenterPanel').getActiveTab();
			if (!Ext.isDefined(config.tab)) {
				if (!Ext.isDefined(config.alertTab) || config.alertTab == true) {
					Workspace.common.tool.Pop.info('Workspace.filebrowser.menu.MenuCheck', 'No active tab');
				}
				ret = false;
			}
			return (config.checkTab = ret);
		}
		,
		checkGrid : function(config) {
			var ret = true;
			config.grid = config.tab.getComponent('gridFileExplorer_'+config.tab.id);
			if (!Ext.isDefined(config.grid)) {
				if (!Ext.isDefined(config.alertGrid) || config.alertGrid == true) {
					Workspace.common.tool.Pop.info('Workspace.filebrowser.menu.MenuCheck', 'No active grid');
				}
				ret = false;
			}
			return (config.checkGrid = ret);
		}
		,
		checkSelection : function(config) {
			var ret = true;
			config.sm = config.grid.getSelectionModel();
			if (config.sm.getCount() == 0) {
				if (!Ext.isDefined(config.alertSelection) || config.alertSelection== true) {
					Workspace.common.tool.Pop.info('Workspace.filebrowser.menu.MenuCheck', 'No row selected');
				}
				ret = false;
			}
			return (config.checkSelection = ret);
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.menu.MenuCheck');});