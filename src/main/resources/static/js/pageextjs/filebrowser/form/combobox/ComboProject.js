Ext.define('Workspace.filebrowser.form.combobox.ComboProject', {

	extend: 'Workspace.widget.combobox.WidgetComboProject'
	,
	alias: 'widget.filebrowserComboProject',
	alternateClassName: 'WorkspaceFileBrowserComboProject'
	,
	// Overrided
	onActionItem: function(combo, newValue, oldValue, option) {
		var me = this;
		me.manageOldTab(combo, newValue, oldValue, option);
		me.manageNewTab(combo, newValue, oldValue, option);
	}
	,
	manageOldTab : function (combo, newValue, oldValue, option) {
		var application = oldValue;
		console.info('Workspace.filebrowser.form.combobox.ComboProject manageOldTab application:'+application);
		// Check if application change
		if (!Ext.isEmpty(application) && application != newValue) {
			var panelId = '['+application+']';

			var mainCenterPanel=Ext.getCmp('mainCenterPanel');
			var panel=mainCenterPanel.getComponent(panelId);
			var gridId = 'gridFileExplorer_'+panelId;
			// Check if old tab exist
			if (Ext.isDefined(panel)) {
				// Set close button visibility
				panel.tab.closeEl.setVisible(true);
				panel.getComponent(gridId).root=false;
			}
		}
	},
	manageNewTab : function (combo, newValue, oldValue, option) {
		var application = newValue;
		console.info('Workspace.filebrowser.form.combobox.ComboProject manageNewTab application:'+application);

		if (!Ext.isEmpty(application)) {
			Ext.getCmp('project').value=application;
	
			var tree = Ext.getCmp("treeDirectory");
			tree.getRootNode().set('text', '[' + application + ']');
			tree.getStore().getProxy().extraParams.path = '';
			tree.getStore().getProxy().extraParams.application = application;
			tree.getStore().load(
				new Ext.data.Operation({
					action:'read'
				})
			);
	
			// Create new tab with closableless state at 1st position
			var raw = {contentType:'directory', id:'['+application+']', path:'', application:application};

			// Explicit load required library (Mandatory for extending this class)
			Ext.Loader.syncRequire('Workspace.filebrowser.panel.center.function.AddTab');
			Workspace.filebrowser.panel.center.function.AddTab.call(raw, 0, false);
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.form.combobox.ComboProject');});