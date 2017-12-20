Ext.define('Workspace.filebrowser.tree.TreeDirectoryExplorer', {

	requiers: ['Workspace.common.tree.data.StoreDirectoryExplorerExtjs4']
	,
	extend: 'Workspace.widget.tree.WidgetTreeExplorer'
	,
	alias: 'widget.filebrowserTreeDirectoryExplorer',
	alternateClassName: 'WorkspaceFilebrowserTreeDirectoryExplorer'
	,
	// Overrided
	onActionOpen(view, record, item, index, event, eOpts) {
		console.info('Workspace.editorjava.tree.TreeFileExplorer actionItem');

		// Explicit load required library (Mandatory for extending this class)
		Ext.Loader.syncRequire('Workspace.filebrowser.panel.center.function.AddTab');
		Workspace.filebrowser.panel.center.function.AddTab.call(record.raw);
	}
	,
	applyStore: function(me) {
		Ext.apply(me, {
			store: Ext.create('Workspace.common.tree.data.StoreDirectoryExplorerExtjs4')
	    });
	}

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.tree.TreeDirectoryExplorer');});