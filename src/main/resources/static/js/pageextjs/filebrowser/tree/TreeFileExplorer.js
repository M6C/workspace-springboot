Ext.define('Workspace.filebrowser.tree.TreeFileExplorer', {

	extend: 'Workspace.widget.tree.WidgetTreeExplorer'
	,
	alias: 'widget.filebrowserTreeFileExplorer',
	alternateClassName: 'WorkspaceFilebrowserTreeFileExplorer'
	,
	// Override
	onActionOpen(view, record, item, index, event, eOpts) {
		console.info('Workspace.filebrowser.tree.TreeFileExplorer actionItem');

		// Explicit load required library (Mandatory for extending this class)
		Ext.Loader.syncRequire('Workspace.filebrowser.panel.center.function.AddTab');
		Workspace.filebrowser.panel.center.function.AddTab.call(record.raw);
	}

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.tree.TreeFileExplorer');});