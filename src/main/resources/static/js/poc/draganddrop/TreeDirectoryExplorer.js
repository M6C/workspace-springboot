Ext.define('Workspace.poc.draganddrop.TreeDirectoryExplorer', {
	// REQUIRED
	requiers: ['Workspace.filebrowser.panel.center.function.AddTab']
	,
	extend: 'Workspace.poc.draganddrop.common.tree.TreeDirectoryExplorerExtjs4'
	,
	alias: 'widget.filebrowserTreeDirectoryExplorer',
	alternateClassName: 'WorkspaceFilebrowserTreeDirectoryExplorer'
	,
	listeners: {
		//scope: this, //yourScope
		'itemdblclick' : function(view, record, item, index, event, eOpts ) {
			if (record.raw.contentType=='directory') {
				// Explicit load required library (Mandatory for extending this class)
				Ext.Loader.syncRequire('Workspace.filebrowser.panel.center.function.AddTab');
	
				Workspace.filebrowser.panel.center.function.AddTab.call(record.raw);
			}
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.poc.draganddrop.TreeDirectoryExplorer');});
