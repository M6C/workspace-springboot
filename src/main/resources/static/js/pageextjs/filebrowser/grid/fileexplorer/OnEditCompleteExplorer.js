Ext.define('Workspace.filebrowser.grid.fileexplorer.OnEditCompleteExplorer',  {
	requires: [
  	     'Workspace.common.tool.Pop'
  	]
   	,
	statics: {

		call : function(editor, value, startValue, eOpts) {
		    console.info('Workspace.filebrowser.grid.fileexplorer.OnEditCompleteExplorer.call');
		    var me = this;
    	 	if (value!=startValue) {
	        	Ext.Msg.confirm('Renaming \''+startValue+'\' to \''+value+'\' ?', 'Rename', function(btn, text){
	        	    if (btn == 'yes'){
			            var mainCenterPanel = Ext.getCmp('mainCenterPanel');
			            var mainCenterTab = mainCenterPanel.getActiveTab();
		
			            var oldValue = mainCenterTab.id+'/'+startValue, newValue = mainCenterTab.id+'/'+value;
		            	var requestUrl = DOMAIN_NAME_ROOT + '/action.servlet?event=FileBrowserRename';
			  			Ext.Ajax.request({
			  			   url: requestUrl,
			  			   params: {oldName:oldValue, newName:newValue},
			  			   success: function(result, request){
			  				   Workspace.common.tool.Pop.success(me, 'Success Renaming \''+oldValue+'\'->\''+newValue+'\'');
		
			  				   // Rechargement de la grid
			  				   var grid = mainCenterTab.items.items[0];
			  				   grid.refresh();
			  			   },
			  			   failure: function (result, request) {
				  			   var jsonData = Ext.decode(result.responseText);
				  			   var message = jsonData.message;
			  				   Workspace.common.tool.Pop.failure(me, 'failure', 'Error Renaming reason:\''+message+'\'');
			  			   }
			  			});
	        	    }
		        });
    	 	}
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.grid.fileexplorer.OnEditCompleteExplorer');});