Ext.define('Workspace.poc.draganddrop.function.ApplyDragAndDropCopyMove', {
	extend: 'Workspace.poc.draganddrop.common.function.ApplyDragAndDrop'
	,
	statics: {

		apply : function(cmp) {
		    console.info('Workspace.poc.draganddrop.function.ApplyDragAndDropCopyMove apply');

		    var me = Workspace.poc.draganddrop.function.ApplyDragAndDropCopyMove;

		    Ext.Loader.syncRequire('Workspace.poc.draganddrop.common.function.ApplyDragAndDrop');
			Workspace.poc.draganddrop.common.function.ApplyDragAndDrop.apply(cmp, me.onBeforeDrop, me.onDrop);
		}
		,
		onBeforeDrop : function(cmp, node, data) {
			console.info('Workspace.poc.draganddrop.function.ApplyDragAndDropCopyMove onBeforeDrop');

			Ext.Loader.syncRequire('Workspace.filebrowser.grid.fileexplorer.OnBeforeDropExplorer');
		    return Workspace.filebrowser.grid.fileexplorer.OnBeforeDropExplorer.call(cmp, node, data);
		}
		,
		onDrop : function(cmp, node, data, overModel, dropPosition, option) {
			console.info('Workspace.poc.draganddrop.function.ApplyDragAndDropCopyMove onDrop');

			Ext.apply(overModel.data, overModel.raw);

		    Ext.Loader.syncRequire('Workspace.filebrowser.grid.fileexplorer.OnDropExplorer');
		    return Workspace.filebrowser.grid.fileexplorer.OnDropExplorer.call(cmp, node, data, overModel, dropPosition, option);
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.poc.draganddrop.function.ApplyDragAndDropCopyMove');});