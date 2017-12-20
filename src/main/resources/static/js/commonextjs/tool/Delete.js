Ext.define('Workspace.common.tool.Delete', {
	requires: [
	     'Workspace.common.tool.Pop',
	     'Workspace.tool.UtilTree',
	     'Workspace.common.window.WindowWaiting'
	]
	,
	statics: {

		doRequest : function(selectionModel, component) {

			var nb = selectionModel.getCount();
			var msg = 'Confirm delete ';
			switch (nb) {
				case 0:
					Workspace.common.tool.Pop("No element selected.");
					return;

				case 1:
				    msg += "'" + selectionModel.getSelection()[0].internalId + "' element ?";
				    break;

				default:
				    msg += nb + ' elements ?';
				    break;
			}

			Ext.Msg.confirm('Delete File', msg, function(btn, text) {
		      if (btn == 'yes'){
				var wndWait = Workspace.common.window.WindowWaiting.showWindowWaiting();
		    	Ext.Array.each(selectionModel.getSelection(), function(item, index, allItems) {
		        	var requestUrl = DOMAIN_NAME_ROOT + '/action.servlet?event=EditorJavaPageDeleteValider';
		    		Ext.Ajax.request({
		    		   url: requestUrl,
		    		   params: {fileName:item.internalId},
		    		   success: function(result, request){
		    			   Ext.Array.each(selectionModel.getSelection(), function(node, index) {
		    			       Workspace.tool.UtilTree.reloadParent(node);
		    			   });
		    			   Workspace.common.window.WindowWaiting.manageWindowWaiting(wndWait, 'Delete successfull.', index, allItems.length-1, component);
		    		   },
		    		   failure: function (result, request) {
		    			   Workspace.common.window.WindowWaiting.manageWindowWaiting(wndWait, 'Delete failed.', index, allItems.length-1, component);
		    		   }
		    		});
		    	});
		      }
		    });
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.common.tool.Delete');});