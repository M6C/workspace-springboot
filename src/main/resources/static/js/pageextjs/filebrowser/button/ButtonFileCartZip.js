Ext.define('Workspace.filebrowser.button.ButtonFileCartZip', {
	requires: [
	     'Workspace.common.tool.Pop',
	     'Workspace.filebrowser.constant.ConstantImage'
	]
	,
	extend: 'Ext.button.Button'
	,
	alias: 'widget.buttonFileCartZip',
	alternateClassName: 'WorkspaceFilebrowserButtonFileCartZip'
	,
    initComponent : function(){
		var me = this;
		Ext.apply(me, {
			icon: Workspace.filebrowser.constant.ConstantImage.BUTTON_CART_ZIP_URL
		});
	},
    handler: function(button, e) {
		var me = this;
        var mainCenterPanel = Ext.getCmp('mainCenterPanel');
        var mainCenterTab = mainCenterPanel.getActiveTab();

        var mainEstPanel = Ext.getCmp('mainEstPanel');
        var mainEstTab = mainEstPanel.getActiveTab();

        if (!Ext.isEmpty(mainCenterTab)) {
            var itemPathDst = mainCenterTab.id;

            var items = Ext.isDefined(mainEstTab.data) ? mainEstTab.data.getRange() : null;
        	var len = (items==null) ? 0 : items.length;
        	if (len>0) {
	        	Ext.Msg.prompt('Zip '+len+' item(s) to \''+itemPathDst+'\'', 'Please enter a name:', function(btn, text){
	        	    if (btn == 'ok' && text != ''){

	    		        var itemPathSrc = "";
	    		        for(var i=0;i<len; itemPathSrc += (itemPathSrc=="" ? "" : ";") + items[i++].id);

	    		        var fileName = text;
	    		    	var requestUrl = DOMAIN_NAME_ROOT + '/action.servlet?event=FileBrowserZip';
	    	  			Ext.Ajax.request({
	    	  			   url: requestUrl,
	    	  			   params: {pathSrc:itemPathSrc,pathDst:itemPathDst,fileName:fileName},
	    	  			   success: function(result, request){
	    	  	 		       Workspace.common.tool.Pop.success(me, 'Success creating Zip \''+text+'\' in \''+itemPathDst+'\'');

	    	  				   // Rechargement de la grid
	    	  				   var grid = mainCenterTab.items.items[0];
	    	  				   grid.refresh();
	    	  			   },
	    	  			   failure: function (result, request) {
	    		  			   var jsonData = Ext.decode(result.responseText);
	    		  			   var message = jsonData.message;
	    	  	 		       Workspace.common.tool.Pop.failure(me, 'Error creating Zip reason:\''+message+'\'');
	    	  			   }
	    	  			});

	        	    }
	        	});
            }
            else {
    	        var text = 'No Zip because no item to compress.';
 		        Workspace.common.tool.Pop.error(me, text);
            }
        }
        else {
	        var text = 'No Zip because no destination panel find.';
	        Workspace.common.tool.Pop.error(me, text);
        }
    }

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.button.ButtonFileCartZip');});