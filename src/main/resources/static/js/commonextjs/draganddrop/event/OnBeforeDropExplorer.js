Ext.define('Workspace.common.draganddrop.event.OnBeforeDropExplorer',  {
	requires: [
	    'Workspace.common.tool.Pop',
	    'Workspace.common.draganddrop.function.CopyMove'
	]
	,
	statics: {

		call : function(grid, nodeEl, data) {
		    console.info('Workspace.common.draganddrop.event.OnBeforeDropExplorer.call OnBeforeDropExplorer');
		    var me = this;

// 		    if (!Ext.isDefined(nodeEl.viewRecordId)) {
// 				nodeEl.viewRecordId = '[' + Ext.getCmp('project').value + ']';
// 				dataDst = {
// 					internalId : nodeEl.viewRecordId,
// 					data: {
// 						contentType: 'directory'
// 					}
// 				}
// 			} else {
// 				dataDst = grid.store.data.getByKey(nodeEl.viewRecordId);
// 			}
// 			if (!Ext.isDefined(dataDst) || !Ext.isDefined(dataDst.data)) {
// 		        var text = 'No move/copy Destination data defined.';
// 		        Workspace.common.tool.Pop.error(me, text);

// 				return false;
// 			}
// 			if (dataDst.data.contentType != 'directory') {
// 		        var text = 'No move/copy because destination is not a directory.';
// 		        Workspace.common.tool.Pop.error(me, text);

// 				return false;
// 			}

		    var itemPathDst = nodeEl.viewRecordId;//mainCenterTab.id;
		    return Workspace.common.draganddrop.function.CopyMove.check(grid, itemPathDst, data);
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.common.draganddrop.event.OnBeforeDropExplorer');});