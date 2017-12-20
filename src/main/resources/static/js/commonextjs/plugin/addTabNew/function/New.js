Ext.define('Workspace.common.plugin.addTabNew.function.New',  {
	requires: [
	     'Workspace.common.tool.Pop',
	     'Workspace.tool.UtilTree'
	]
   	,
	statics: {

		call : function(typeNew) {
		    console.info('Workspace.common.plugin.addTabNew.function.New.call');

		    var me = this;
		    var mainCenterPanel = Ext.getCmp('mainCenterPanel');
		    var item = mainCenterPanel.getSelectedItem();

		    if (Ext.isEmpty(item) || Ext.isEmpty(item.raw)) {
    	        var text = 'No item find.';
				Workspace.common.tool.Pop.error(me, text);
		        return;
		    }
		    var itemRaw = item.raw;
        	if (itemRaw.contentType != 'directory') {
    	        var text = 'Selected item is not a directory.';
				Workspace.common.tool.Pop.error(me, text);
		        return;
        	}

	        var itemPathDst = null;
	        if (!Ext.isEmpty(itemRaw.path)) {
	            itemPathDst = itemRaw.path;
	        } else if (!Ext.isEmpty(itemRaw.application)) {
	            itemPathDst = '[' + itemRaw.application + ']';
	        } else {
    	        var text = 'No destination panel find.';
				Workspace.common.tool.Pop.error(me, text);
		        return;
            }

            var callBack = function(btn, fileName) {
        	    if (btn == 'yes' && fileName != ''){
    		    	var requestUrl = ACTION_SERVLET_ROOT + '/action.servlet?event=FileBrowserNew';
    	  			Ext.Ajax.request({
    	  			   url: requestUrl,
    	  			   params: {type:typeNew, pathDst:itemPathDst, name:fileName},
    	  			   success: function(result, request){
                            var text = 'Success creating.'
                            var detail = '\''+fileName+'\' in \''+itemPathDst+'\'';
                            Workspace.common.tool.Pop.success(me, text, {detail:detail});

                            if (typeNew == 'file') {
                                var path = Ext.String.escape(itemPathDst + '\\' + fileName);
                                var raw = Ext.JSON.decode('{' + 
                                    '\'text\':\'' + fileName + '\',' +
                                    '\'id\':\'' + path + '\',' +
                                    '\'application\':\'' + itemRaw.application + '\',' +
                                    '\'path\':\'' + path + '\',' +
                                    '\'className\':\'\',' +
                                    '\'contentType\':\'' + typeNew + '\',' +
                                    '\'build\':\'false\',' +
                                    '\'leaf\':true,' +
                                    '\'autoDeploy\':' + itemRaw.autoDeploy +
                                '}');

                                mainCenterPanel.onAddTab(raw);
                            }

                			// Reload Parent Node
                            Workspace.tool.UtilTree.reloadNode(item);
/*
    	  				   // Rechargement du tree si besoin
    	  				   var application = Ext.getCmp('project').value;
    	  				   if ('['+application+']'==itemPathDst) {
    	  						var tree = Ext.getCmp("treeDirectory");
    	  						tree.getStore().load(
	  								new Ext.data.Operation({
	  									action:'read'
	  								})
	  							);
    	  				   }
*/
    	  			   },
    	  			   failure: function (result, request) {
    		  			   var jsonData = Ext.decode(result.responseText);
    		  			   var message = jsonData.message;
    		  			   var text = 'Error creating.';
    		  			   var detail = '\''+fileName+'\' reason:\''+message+'\'';
    						Workspace.common.tool.Pop.failure(me, text, {detail:detail});
    	  			   }
    	  			});
        	    }
			};

        	Ext.Msg.show({
    			prompt:true, 
    			width: 400,
    			buttons: Ext.Msg.YESNO,
    			title:'Create directory in \''+itemPathDst+'\'', 
    			msg:'Please enter a name:', 
    			fn:callBack
        	});
        }
	}
}, function() {Workspace.tool.Log.defined('Workspace.common.plugin.addTabNew.function.New');});