Ext.define('Workspace.common.draganddrop.function.CopyMove',  {
	requires: [
  	     'Workspace.common.tool.Pop'
  	]
   	,
	statics: {

		call : function(grid, itemPathDst, data) {
		    console.info('Workspace.common.draganddrop.function.CopyMove.call CopyMove');

		    var me = this;
		    var ret = me.check(grid, itemPathDst, data);
		    if (ret) {
		    	me.request(grid, itemPathDst, data);
		    }
	    	
	    	return ret;
		}
		,
		check : function(grid, itemPathDst, data) {
		    console.info('Workspace.common.draganddrop.function.CopyMove.check CopyMove');

		    var ret = true;

			var dropAction = data.copy ? 'copy' : 'move';
		    if (!Ext.isEmpty(itemPathDst)) {
			    var nb = data.records.length;
			
			    console.info('Workspace.common.draganddrop.function.CopyMove.check CopyMove to:'+itemPathDst+' data.records.length:'+data.records.length);

			 //   for(i=0 ; i<nb ; i++) {
				// 	var raw = data.records[i].raw;//data.records[i].data;
				// 	var itemPathSrc = raw.id;//raw.getKey();
	
				// 	console.info('Workspace.common.draganddrop.function.CopyMove.check CopyMove itemPathSrc:'+itemPathSrc+' itemPathDst:'+itemPathDst);
			
				//     if (Workspace.tool.UtilString.isNotEqualPath(itemPathDst, itemPathSrc)) {
				//     	// TODO Check if file do not already exist on server at destination path
				    	
				//     	console.info('Workspace.common.draganddrop.function.CopyMove.check success ' + dropAction + ' from:'+itemPathSrc+ ' to:'+itemPathDst);
				//     }
				//     else {
				//     	var text = 'No ' + dropAction + ' because destination path and source path can not be same. from:'+itemPathSrc + ' to:'+itemPathDst;
				//         Workspace.common.tool.Pop.error('Workspace.common.draganddrop.function.CopyMove.check', text);
				//         ret = false;
				//     }
				// }
            }
            else {
		        var text = 'No ' + dropAction + ' because ne destination panel find.';
		        Workspace.common.tool.Pop.error('Workspace.common.draganddrop.function.CopyMove.check', text);
            }
	    	
	    	return ret;
		}
		,
		request : function(grid, node, itemPathDst, data, callBackSuccess = null, callBackFailure = null) {
		    var nb = data.records.length;
			
			var dropAction = data.copy ? 'copy' : 'move';
		    console.info('Workspace.common.draganddrop.function.CopyMove.request ' + dropAction + ' to:'+itemPathDst+' data.records.length:'+data.records.length);

		    for(i=0 ; i<nb ; i++) {
				var raw = data.records[i];//data.records[i].raw;//data.records[i].data;
				var itemPathSrc = raw.id;//raw.internalId;//raw.getKey();

		        Ext.Ajax.request({
		        	url: ACTION_SERVLET_ROOT + '/action.servlet?event=FileBrowserCopyMove',
	    		    params: {
	        			pathSrc:itemPathSrc, pathDst:itemPathDst, operation:dropAction
	    		    },
	    		    success: function(response){
	    		        if (callBackSuccess != null) {
	    		        	callBackSuccess(grid, node, data);
	    		        }

	    		        var text = 'Success ' + dropAction+' from:'+itemPathSrc + ' to:'+itemPathDst;
	    		        Workspace.common.tool.Pop.success('Workspace.common.draganddrop.function.CopyMove.request', text);
	    		    },
	    		    failure: function(response){
	    		    	if (callBackSuccess != null) {
	    		    		callBackFailure(grid, node, data);
	    		    	}

	    		    	raw.bodyStyle='background:#fcc;';

	    		    	var text = 'Failure ' + dropAction + ' item:'+raw.id+' cause:'+response.responseText;
	    		        Workspace.common.tool.Pop.failure('Workspace.common.draganddrop.function.CopyMove.check', text);

	    		    }
	    		});
		    }
		}
		,
		getData: function(grid, nodeEl) {
		    var me = Workspace.common.draganddrop.function.CopyMove;
            var dataDst = {};
		    if (!Ext.isDefined(nodeEl) || !Ext.isDefined(nodeEl.viewRecordId)) {
		        var application = Ext.getCmp('project').value;
				nodeEl.viewRecordId = '[' + application + ']';
				dataDst.internalId = nodeEl.viewRecordId;
				dataDst.data = {
					contentType: 'directory'
				};
			} else {
				dataDst = grid.store.data.getByKey(nodeEl.viewRecordId);
    			if (!Ext.isDefined(dataDst) || !Ext.isDefined(dataDst.data)) {
    		        return null;
    			}
			}
			if (dataDst.data.contentType != 'directory') {
			    var node = undefined;

			    var path = nodeEl.viewRecordId;
			    var idx = path.lastIndexOf('/');
			    if (idx < 0) {
			        idx = path.lastIndexOf('\\');
			    }
			    if (idx >= 0) {
			        node = {viewRecordId:path.substring(0, idx)};
			    }

		        return me.getData(grid, node);
			}
	        return dataDst;
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.common.draganddrop.function.CopyMove');});