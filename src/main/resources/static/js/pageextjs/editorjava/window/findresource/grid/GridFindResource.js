Ext.define('Workspace.editorjava.window.findresource.grid.GridFindResource', {
	requires: [
	    'Workspace.common.grid.fileexplorer.OnRendererColumnImageType'
	]
	,
	extend: 'Ext.grid.Panel'
	,
	alias: 'widget.editorjavaGridFindResource',
	alternateClassName: 'WorkspaceEditorJavaGridFindResource'
	,
	hideHeaders : false,
	layout: {type:'hbox', align:'stretch'},
    defaults: {flex:1},//auto stretch
	multiSelect: true
	,
	initComponent : function(){
		var me = this;

		var column1 = Ext.create('Ext.grid.column.Column', {dataIndex: 'contentType',
			width: Workspace.common.grid.fileexplorer.OnRendererColumnImageType.width,
			renderer: Workspace.common.grid.fileexplorer.OnRendererColumnImageType.call
		});

		var column2 = Ext.create('Ext.grid.column.Column', {
			header: 'Filename',  dataIndex: 'path', flex: 1, 
			editor: {xtype: 'textfield', allowBlank: false}
		});

		var store = Ext.create('Workspace.editorjava.window.findresource.grid.data.StoreFindResource', {
	    	fields:['contentType', 'path'],
	    	application: me.application,
	    	nameFilter: me.nameFilter
	    	,
	    	sorters: [
	    	    {property: 'path', direction : 'ASC' }
	    	]
	    	,
			listeners: {
				'beforeload': function(store, operation, option) {
					var ret = false;
					if (!Ext.isDefined(operation.params)) {
						ret = !Ext.isEmpty(store.getProxy().extraParams.nameFilter) || !Ext.isEmpty(store.getProxy().extraParams.contentFilter);
					} else {
						ret = !Ext.isEmpty(operation.params.nameFilter) || !Ext.isEmpty(operation.params.contentFilter);
					}
					return ret;
				}
				,
	 			'load' : function(store, records, successful, operation, eOpts) {
	 				console.info('Workspace.editorjava.window.findresource.grid.GridFindResource load successful:'+successful);
	 				if (successful && (records.length > 0)) {
 						me.getSelectionModel().select(records[0]);
	 					me.focus();
	 					me.getView().focus();
	 				}
	 			}
			}
		});

		Ext.apply(me, {
			store: store
			,
			columns: [ column1, column2 ]
			,
			listeners: {
				'celldblclick': function(iView, iCellEl, iColIdx, iStore, iRowEl, iRowIdx, iEvent) {
					console.info('Workspace.editorjava.window.findresource.grid.GridFindResource celldblclick');
					var zRec = iView.getRecord(iRowEl);
					me.onSubmit(iView, null, zRec, iRowIdx, iEvent, null);
			    }
				,
				'add' : function (container, component, index, eOpts) {
					console.info('Workspace.editorjava.window.findresource.grid.GridFindResource add');
					component.on('itemkeydown', function(view, record, item, index, event, eOpts) {
						var key = event.keyCode;
						switch (key) {
							case Ext.EventObject.ENTER: 	// code:13
								me.onSubmit(view, record, item, index, event, eOpts);
								break;
			
							case Ext.EventObject.DELETE: 	// code:46
							case Ext.EventObject.BACKSPACE: // code:8
								me.onSubmit(view, record, item, index, event, eOpts);
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
    sort: function(o1, o2){
        var getRank = function(o){
	        if (o.data.contentType === 'directory') {
	            return 1;
	        } else {
	            return 2;
	        }
	    },
	    rank1 = getRank(o1),
	    rank2 = getRank(o2);
	
	    if (rank1 === rank2) {
	        return 0;
	    }
	
	    return rank1 < rank2 ? -1 : 1;
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.window.findresource.grid.GridFindResource');});