Ext.define('Workspace.filebrowser.grid.GridTrace', {
	// REQUIRED
	requires: ['Workspace.filebrowser.grid.trace.OnRendererColumnImage']
	,
	extend: 'Ext.grid.Panel'
	,
	alias: 'widget.filebrowserGridTrace',
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
		Ext.Loader.syncRequire('Workspace.filebrowser.grid.trace.OnRendererColumnImage');

		Ext.apply(me, {
			columns: [
			  Ext.create('Ext.grid.column.Column', {dataIndex: 'image',
				  width: Workspace.filebrowser.grid.trace.OnRendererColumnImage.width
				  ,
				  renderer:Workspace.filebrowser.grid.trace.OnRendererColumnImage.call
			  }),
	          Ext.create('Ext.grid.column.Column', {dataIndex: 'date',
	            width: 115,
	            renderer: Ext.util.Format.dateRenderer('Y-m-d G:i:s')
	          }),
	          Ext.create('Ext.grid.column.Column', {dataIndex: 'text', flex: 1})
		  	]
			,
			store: Ext.create('Ext.data.ArrayStore', {
				fields: ['image', 'date', 'text']
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
}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.grid.GridTrace');});