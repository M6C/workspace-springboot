Ext.define('Workspace.editorjava.panel.center.function.AddTabAce',  {
	requires: [ 
	     'Workspace.editorjava.panel.center.function.AddTabSave',
	     'Workspace.editorjava.panel.center.function.AddTabReload'
	]
	,
	statics: {

		/**
		 * raw properties :
		 *  contentType
		 *  application
		 *  id
		 *  text
		 *  autoDeploy
		 *  build
		 */
		call : function(raw) {
		    console.info('Workspace.editorjava.panel.center.function.AddTab.call');
			if (raw.contentType!='directory') {
				var panelId=raw.id.replace(/\\/gi, '/');
				var panelEditorId=panelId+'Editor';
				var mainCenterPanel=Ext.getCmp('mainCenterPanel');

				var initializeEditor = false;
				var panelTab = Ext.getCmp(panelId);
				if (!Ext.isDefined(panelTab)) {

					var panel = Ext.create('Workspace.editorjava.panel.center.PanelCenterEditor', {
						closable:true,
						title: raw.text,
						id: panelId,
						application: raw.application,
						panelEditorId: panelEditorId,
						panelId: panelId,
						build: raw.build,
						autoDeploy: raw.autoDeploy,
						raw: raw
					});

					mainCenterPanel.add(panel);

					panelTab = Ext.getCmp(panelId);
					initializeEditor = true;
				}
				mainCenterPanel.setActiveTab(panelTab);
				var editor = ace.edit(panelEditorId);
				editor.id = panelEditorId;
				editor.panelId = panelId;

				Ext.apply(editor, {
					cursorRow: raw.cursorRow,
					cursorCol: raw.cursorCol,
					changeScrollTop: raw.changeScrollTop,
					changeScrollLeft: raw.changeScrollLeft
				});
				
				if (initializeEditor) {
					Ext.Loader.syncRequire('Workspace.editorjava.aceeditor.command.CommandChangeTab');
				    Workspace.editorjava.aceeditor.command.CommandChangeTab.addCommand(editor, mainCenterPanel);

					Ext.Loader.syncRequire('Workspace.editorjava.aceeditor.command.CommandFindResource');
				    Workspace.editorjava.aceeditor.command.CommandFindResource.addCommand(editor, mainCenterPanel);

					Ext.Loader.syncRequire('Workspace.editorjava.aceeditor.command.CommandReopenLastTab');
				    Workspace.editorjava.aceeditor.command.CommandReopenLastTab.addCommand(editor);

					Ext.Loader.syncRequire('Workspace.editorjava.aceeditor.command.CommandReload');
				    Workspace.editorjava.aceeditor.command.CommandReload.addCommand(editor);

					Ext.Loader.syncRequire('Workspace.editorjava.aceeditor.command.CommandDeploy');
				    Workspace.editorjava.aceeditor.command.CommandDeploy.addCommand(editor);

					Ext.Loader.syncRequire('Workspace.editorjava.aceeditor.command.CommandShortcut');
				    Workspace.editorjava.aceeditor.command.CommandShortcut.addCommand(editor);

					Ext.Loader.syncRequire('Workspace.editorjava.debug.ApplyDebug');
				    Workspace.editorjava.debug.ApplyDebug.apply(editor);
				}

				editor.build = raw.build;
				editor.autoDeploy = raw.autoDeploy;
			    editor.focus();
			    
			    return panelTab;
			}
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.center.function.AddTabAce');});