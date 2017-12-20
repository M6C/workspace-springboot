Ext.define('Workspace.filebrowser.panel.center.function.AddTab',  {

	statics: {

		call : function(raw, index = 0, closable = true, setActiveTab = true, loadData = true) {
		    console.info('Workspace.filebrowser.panel.center.function.AddTab.call');

			if (raw.contentType=='directory') {

				var mainCenterPanel=Ext.getCmp('mainCenterPanel');
				var panelId=raw.id;//raw.getKey();
				var gridId = 'gridFileExplorer_'+panelId;

				console.info('Workspace.filebrowser.panel.center.function.AddTab.call panelId:'+panelId);

				var panel=mainCenterPanel.getComponent(panelId);
				if (Ext.isDefined(panel)) {
					// Set close button visibility
					panel.tab.closeEl.setVisible(closable);

					// Refresh data grid
					var grid = panel.getComponent(gridId);
					var gridStore = grid.getStore();
					grid.refresh();
				} else {
					var grid = Ext.create('Workspace.filebrowser.grid.GridFileExplorer', {
						id: gridId,
						root: false
					});

					mainCenterPanel.insert(
					index,
					{
						xtype:'panel',
						title: panelId,
						id: panelId,
						//elements: 'body,tbar',
						closable:true, // Always create close button. Closable will be set soon.
						layout: 'fit',
						defaults: { flex : 1 },//auto stretch
						stateful:false,
					    items: [
							grid
					    ],
					    listeners : {
							'added': function(tab, container, position, option) {
								new Ext.util.DelayedTask(function(){
								    console.debug('Workspace.filebrowser.panel.center.function.AddTab Panel added DelayedTask');
									var application = Ext.getCmp('project').value;
									var tree = Ext.getCmp('treeDirectory');
									if (tab.raw.application == application) {
										var field = 'text';
										var separator = '\\';
										var path = separator + tab.raw.path;

										tree.expandPath(path, field, separator);
									}
								}).delay(500);
							}
					    },
						raw: raw
					});

					panel=mainCenterPanel.getComponent(panelId);
					if (Ext.isDefined(panel.tab.closeEl)) {
						// Set close button visibility
						panel.tab.closeEl.setVisible(closable);
					}

					var gridStore = grid.getStore();
					gridStore.getProxy().extraParams.path = raw.path;
					gridStore.getProxy().extraParams.application = raw.application;
					if (loadData) {
						// Chargement des donnees
						grid.refresh();
					}
				}
				grid.root = !closable;

				if (setActiveTab) {
					mainCenterPanel.setActiveTab(panel);
				}
			}
			else {
			}
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.panel.center.function.AddTab');});