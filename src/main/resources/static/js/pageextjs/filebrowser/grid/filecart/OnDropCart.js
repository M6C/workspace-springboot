Ext.define('Workspace.filebrowser.grid.filecart.OnDropCart',  {
	// REQUIRED

	statics: {

		call : function(node, data, overModel, dropPosition, eOpts) {
		    console.info('Workspace.filebrowser.grid.filecart.OnDropCart.call OnDropCart');

		    var ret = true;
	    	var mainEstPanel = Ext.getCmp('mainEstPanel');
	        var mainEstTab = mainEstPanel.getActiveTab();
	        var mainEstGrid = mainEstTab.items.items[0].panel;

	        /**
	         * TODO Trouver la solution pour ne selectionner que la première ligne
	         */
	        mainEstGrid.getSelectionModel().select(0);

            var mainCenterPanel = Ext.getCmp('mainCenterPanel');
            var mainCenterTab = mainCenterPanel.getActiveTab();
	        var mainCenterGrid = mainCenterTab.getChildByElement('gridFileExplorer_'+mainCenterTab.id);

	        /**
	         * TODO Trouver la solution pour ne selectionner que la première ligne
	         */
	        mainCenterGrid.getSelectionModel().select(0);

	        return ret;
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.grid.filecart.OnDropCart');});