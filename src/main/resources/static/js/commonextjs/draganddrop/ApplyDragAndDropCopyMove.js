Ext.define('Workspace.common.draganddrop.ApplyDragAndDropCopyMove', {
	requires: [
  	     'Workspace.common.draganddrop.event.OnBeforeDropExplorer',
  	     'Workspace.common.draganddrop.event.OnDropExplorer'
  	]
  	,
	extend: 'Workspace.common.draganddrop.ApplyDragAndDrop'
	,
	statics: {

		apply : function(cmp) {
		    console.info('Workspace.common.draganddrop.ApplyDragAndDropCopyMove apply');

		    var me = Workspace.common.draganddrop.ApplyDragAndDropCopyMove;

			Workspace.common.draganddrop.ApplyDragAndDrop.apply(cmp, me.onBeforeDrop, me.onDrop);
		}
		,
		onBeforeDrop : function(cmp, node, data) {
			console.info('Workspace.common.draganddrop.ApplyDragAndDropCopyMove onBeforeDrop');

		    return Workspace.common.draganddrop.event.OnBeforeDropExplorer.call(cmp, node, data);
		}
		,
		onDrop : function(cmp, node, data, overModel, dropPosition, option) {
			console.info('Workspace.common.draganddrop.ApplyDragAndDropCopyMove onDrop');

			Ext.apply(overModel.data, overModel.raw);

		    return Workspace.common.draganddrop.event.OnDropExplorer.call(cmp, node, data, overModel, dropPosition, option);
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.common.draganddrop.ApplyDragAndDropCopyMove');});