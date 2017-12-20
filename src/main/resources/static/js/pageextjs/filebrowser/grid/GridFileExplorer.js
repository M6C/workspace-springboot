Ext.define('Workspace.filebrowser.grid.GridFileExplorer', {
	extend: 'Workspace.common.grid.GridFileExplorerExtjs4'
	,
	alias: 'widget.filebrowserGridFileExplorer',
	alternateClassName: 'WorkspaceFilebrowserGridFileExplorer'
	,
    stateful:false
	,
	initComponent : function(){
		var me = this;

		var sm = new Ext.selection.RowModel({
			mode: 'MULTI'
		});

		Ext.apply(me, {
		    selModel: sm
		    ,
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
			,
			listeners: {
				'itemdblclick': function(grid, record, item, index, e, eOpts ) {
					console.info('Workspace.common.grid.GridFileExplorer itemdblclick');
				}
				,
				'celldblclick': function(iView, iCellEl, iColIdx, iStore, iRowEl, iRowIdx, iEvent) {
					console.info('Workspace.common.grid.GridFileExplorer celldblclick iColIdx:' + iColIdx);
					if (iColIdx == 0) {
						var zRec = iView.getRecord(iRowEl);
						me.onActionOpen(iView, null, zRec, iRowIdx, iEvent, null);
					}
			    }
				,
				'add' : function ( container, component, index, eOpts ) {
					console.info('Workspace.widget.tree.TreeExplorer add');
					component.on('itemkeydown', function(view, record, item, index, event, eOpts) {
						var key = event.keyCode;
						switch (key) {
							case Ext.EventObject.ENTER: 	// code:13
								me.onActionOpen(view, record, item, index, event, eOpts);
								break;
			
							case Ext.EventObject.DELETE: 	// code:46
							case Ext.EventObject.BACKSPACE: // code:8
								me.onActionDelete(view, record, item, index, event, eOpts);
								break;

							default:
								break;
						}
					});
				}
			}
	    });

	    me.callParent(arguments);
	}
	,
	onActionOpen(view, record, item, index, event, eOpts) {
		var me = view.up('panel');
		var raw = item.raw;
		if (raw.contentType != 'directory') {
			Ext.create('Workspace.filebrowser.window.WindowEditor', {
				title:raw.path,
				panelId:raw.path,
				width:1000,
				height:600,
				raw:raw
			}).show();
		} else {
			if (me.root) {
				// Explicit load required library (Mandatory for extending this class)
				Ext.Loader.syncRequire('Workspace.filebrowser.panel.center.function.AddTab');
	
				Workspace.filebrowser.panel.center.function.AddTab.call(raw);
			} else {
				var gridStore = me.getStore();
				gridStore.getProxy().extraParams.path = raw.path;
				me.refresh();
				me.up('panel').setTitle(raw.path);
			}
		}
	},
	onActionDelete(view, record, item, index, event, eOpts) {
		console.info('Workspace.widget.tree.TreeExplorer onActionDelete');
		Workspace.common.tool.Delete.doRequest(view.getSelectionModel());
	},
	applyDragAndDrop: function(me) {
		// Explicit load required library (Mandatory for extending this class)
		Ext.Loader.syncRequire('Workspace.common.draganddrop.ApplyDragAndDropCopyMove');
		Workspace.common.draganddrop.ApplyDragAndDropCopyMove.apply(me);
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
}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.grid.GridFileExplorer');});