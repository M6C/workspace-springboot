Ext.define('Workspace.editorjava.grid.GridTrace', {
	requires: [
        'Workspace.editorjava.grid.trace.OnRendererColumnImage',
        'Workspace.editorjava.grid.trace.OnRendererColumnCount'
    ]
	,
	extend: 'Ext.grid.Panel'
	,
	alias: 'widget.editorjavaGridTrace',
	alternateClassName: 'WorkspaceFilebrowserGridTrace'
	,
//	layout: 'fit',
	hideHeaders: true,
    stateful:false,
//	maxHeight: 150
//	,
    initComponent : function(){
		var me = this;

		// Explicit load required library (Mandatory for extending this class)
		Ext.Loader.syncRequire('Workspace.editorjava.grid.trace.OnRendererColumnImage');

		Ext.apply(me, {
			columns: [
			  Ext.create('Ext.grid.column.Column', {dataIndex: 'image',
				  width: Workspace.editorjava.grid.trace.OnRendererColumnImage.width
				  ,
				  renderer:Workspace.editorjava.grid.trace.OnRendererColumnImage.call
			  }),
	          Ext.create('Ext.grid.column.Column', {dataIndex: 'date',
	            width: 115,
	            renderer: Ext.util.Format.dateRenderer('Y-m-d G:i:s')
	          }),
	          Ext.create('Ext.grid.column.Column', {dataIndex: 'text', flex: 1}),
	          Ext.create('Ext.grid.column.Column', {dataIndex: 'count',
				  width: Workspace.editorjava.grid.trace.OnRendererColumnCount.width
				  ,
				  renderer:Workspace.editorjava.grid.trace.OnRendererColumnCount.call
	          })
		  	]
			,
			store: Ext.create('Ext.data.ArrayStore', {
				fields: ['image', 'date', 'text', 'count']
				,
			    proxy: {
			        type: 'memory',
			        reader: {
			            type: 'json'
			        }
			    }
			})
//			,
//			listeners: {
//				resize: function (cmp, adjWidth, adjHeight, eOpts ) {
//				    // Bloque le redimentionnement de la hauteur au max
//				    var h = this.getSize().height;
//					if (Ext.isDefined(this.maxHeight) && h>this.maxHeight) {
//						this.setHeight(this.maxHeight);
//					}
//				}
//			}
	    });

		me.callParent(arguments);
	}
	,
	viewConfig: {
	    getRowClass: function (record, rowIndex, p, store) {
			if (record.data.image=='error')
				return 'trace_error';
			else if (record.data.image=='info')
				return 'trace_info';
			else
				return this.callParent(arguments);
		}
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.grid.GridTrace');});