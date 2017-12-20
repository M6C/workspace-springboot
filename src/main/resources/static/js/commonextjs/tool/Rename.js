Ext.define('Workspace.common.tool.Rename', {
	requires: [
	     'Workspace.common.tool.Pop',
	     'Workspace.common.window.WindowWaiting'
	]
	,
	statics: {

		doRequest : function(selectionModel, component) {

            var me = this;
            var oldFileName = selectionModel.getSelection()[0].internalId;
			var nb = selectionModel.getCount();
			if (nb == 0) {
				   Workspace.common.tool.Pop.error(me, 'Selection is empty.');
				   return;
			} else if (nb > 1) {
				   Workspace.common.tool.Pop.error(me, 'Only one element can be rename.');
				   return;
			}
        	Ext.Msg.show({
    			prompt:true, 
    			width: 400,
    			buttons: Ext.Msg.YESNO,
    			title:'Rename',
    			value: oldFileName,
    			msg:'New file name:', 
    			fn:function(btn, fileName) {
	        	    if (btn == 'yes' && fileName != ''){

        				var wndWait = Workspace.common.window.WindowWaiting.showWindowWaiting();
        		    	Ext.Array.each(selectionModel.getSelection(), function(item, index, allItems) {
        		        	var requestUrl = DOMAIN_NAME_ROOT + '/action.servlet?event=FileBrowserRename';
        		    		Ext.Ajax.request({
        		    		   url: requestUrl,
        		    		   params: {oldName:oldFileName, newName:fileName},
        		    		   success: function(result, request){
                                    Workspace.common.window.WindowWaiting.manageWindowWaiting(wndWait, 'Rename successfull.', index, allItems.length-1, component);
                                    Workspace.common.tool.Pop.info(me, 'Rename successfull.');
                                    // Reload Parent Node
                                    Workspace.tool.UtilTree.reloadParent(item);
        		    		   },
        		    		   failure: function (result, request) {
                                    Workspace.common.window.WindowWaiting.manageWindowWaiting(wndWait, 'Rename failed.', index, allItems.length-1, component);
				                    Workspace.common.tool.Pop.error(me, 'Rename failed.');
        		    		   }
        		    		});
        		    	});
	        	    }
    			}
		    });
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.common.tool.Rename');});