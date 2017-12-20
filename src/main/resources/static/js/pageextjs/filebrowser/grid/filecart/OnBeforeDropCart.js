Ext.define('Workspace.filebrowser.grid.filecart.OnBeforeDropCart',  {
	requires: [
  	     'Workspace.common.tool.Pop'
  	]
 	,
	statics: {

		call : function(grid, nodeEl, data) {
		    console.info('Workspace.filebrowser.grid.filecart.OnBeforeDropCart.call OnBeforeDropCart');
		    var me = this;
		    var ret = true;

		    if (!Ext.isDefined(grid.data)) {
		    	grid.data = new Ext.util.MixedCollection();
		    }

		    var mainCenterPanel = Ext.getCmp('mainCenterPanel');
		    var mainCenterTab = mainCenterPanel.getActiveTab();
            if (!Ext.isEmpty(mainCenterTab)) {
			    var itemPathDst = mainCenterTab.id;
			    var nb = data.records.length;
	
			    console.info('Workspace.filebrowser.grid.filecart.OnBeforeDropCart.call OnBeforeDropCart itemPathDst:'+itemPathDst+' data.records.length:'+data.records.length);
	
			    for(i=0 ; i<nb ; i++) {
					var rec = data.records[i];
					var recData = rec.data;
					var recRaw = rec.raw;
					var action = data.copy ? 'copy' : 'move';
					var itemPathSrc = recRaw.id;//raw.getKey();
	
					// Always copy
					data.copy = 'copy';
	
			        var text = 'Clipboard \''+itemPathSrc+'\'';
	 		       	Workspace.common.tool.Pop.info(me, text);

				    // Initialisation des donnees
				    rec.data = recRaw;
				    rec.data.dropAction = action;

					grid.data.add(itemPathSrc, recRaw);
				}
            }
            else {
		        var text = 'No move/copy because ne destination panel find.';
 		       	Workspace.common.tool.Pop.error(me, text);
            }

		    return ret;
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.grid.filecart.OnBeforeDropCart');});