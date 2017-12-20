Ext.define('Workspace.poc.draganddrop.GridFileExplorer', {

	extend: 'Workspace.poc.draganddrop.common.grid.GridFileExplorerExtjs4'
	,
	alias: 'widget.filebrowserGridFileExplorer',
	alternateClassName: 'WorkspaceFilebrowserGridFileExplorer'
	,
	initComponent : function(){
		var me = this;


		Ext.apply(me, {
			plugins: [
		 	     Ext.create('Ext.grid.plugin.CellEditing', {
		 	    	clicksToEdit: 2
		 			,
		 	    	onEditComplete : function(editor, value, startValue, eOpts) {
		 				// Explicit load required library (Mandatory for extending this class)
		 				Ext.Loader.syncRequire('Workspace.filebrowser.grid.fileexplorer.OnEditCompleteExplorer');

		 	    	 	Workspace.filebrowser.grid.fileexplorer.OnEditCompleteExplorer.call(editor, value, startValue, eOpts);
		 	     	}
		         })
			]
	    });

	    me.callParent(arguments);
	}
//	,
//	getRowClass: function (view, record) {
//		var mainEstPanel = Ext.getCmp('mainEstPanel');
//		mainEstPanel.items.each(function (item, index, length) {
//	        var mainEstTab = item;
//	        var mainEstGrid = mainEstTab.items.items[0].panel;
//	        if (Ext.isDefined(mainEstGrid.data) &&
//	        	mainEstGrid.data.containsKey(record.data.id)) {
//		        return 'background-color:red';
//	        }
//	        return 'background-color:green';
//		});
//		
//		return 'x-grid3-row-collapsed';
//	}
	,
	hideHeaders : false
}, function() {Workspace.tool.Log.defined('Workspace.poc.draganddrop.GridFileExplorer');});