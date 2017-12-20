Ext.define('Workspace.poc.draganddrop.common.tree.TreeDirectoryExplorerExtjs4', {
	// REQUIRED
	requiers: ['Workspace.poc.draganddrop.common.tree.data.StoreDirectoryExplorer']
	,
	extend: 'Ext.tree.Panel'
		,
		alias: 'widget.CommonTreeDirectoryExplorer',
		alternateClassName: 'WorkspaceCommonTreeDirectoryExplorer'
	,
    initComponent : function(){
		var me = this;
		Ext.apply(me, {
			store: Ext.create('Workspace.poc.draganddrop.common.tree.data.StoreDirectoryExplorer')
        });

		// Explicit load required library (Mandatory for extending this class)
		Ext.Loader.syncRequire('Workspace.poc.draganddrop.function.ApplyDragAndDropCopyMove');
		Workspace.poc.draganddrop.function.ApplyDragAndDropCopyMove.apply(me, me.onBeforeDrop, me.onDrop);

		me.callParent(arguments);
	}
	,
    useArrows: true,
    autoScroll: false,
    animate: true,
    enableDD: true,
    containerScroll: true,
    border: false,
    collapsible: false,
    rootVisible: false

}, function() {Workspace.tool.Log.defined('Workspace.poc.draganddrop.common.tree.TreeDirectoryExplorerExtjs4');});