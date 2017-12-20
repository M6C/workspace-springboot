// DOUBLON A MUTUALISER
Ext.define('Workspace.filebrowser.panel.PanelSouth', {
	// REQUIRED

	extend: 'Workspace.common.panel.PanelCollapsible'
	,
	alias: 'widget.panelSouth',
	alternateClassName: 'PanelSouth'
	,
	id: 'mainSouthPanel',
	region: 'south',
	bodyStyle: 'padding:0px',
//	layout: 'fit',
	hideHeaders: true,
	hideCollapseTool: true,
	collapseMode: 'mini',
	collapsed: true,
	maxHeight: 150,
    stateful:false
	,
	// private
    initComponent : function(){
		var me = this;
		Ext.apply(me, {
            items : [
				Ext.create('Workspace.filebrowser.grid.GridTrace', {id: 'filebrowserGridTrace'})
            ]
			,
			listeners: {
				resize: function (cmp, adjWidth, adjHeight, eOpts ) {
					console.info('Workspace.filebrowser.panel.PanelSouth resize!');
				    // Bloque le redimentionnement de la hauteur au max
				    var h = this.getSize().height;
					if (Ext.isDefined(this.maxHeight) && h>this.maxHeight) {
						this.setHeight(this.maxHeight);
					}
				}
			}
        });
	    me.callParent(arguments);
	}
	,
	listeners: {
		beforeexpand: function ( panel, animate, eOpts ) {
			var gridTrace = this.getChildByElement('filebrowserGridTrace');
			gridTrace.store.removeAll();
		}
	}
	,
	log: function (from, type, message) {

		if (this.collapsed)
			this.expand(true);

    	var date = new Date();
    	var gridTrace = this.getChildByElement('filebrowserGridTrace');
    	gridTrace.store.insert(0, {'image':type, 'date':date, 'text':message});
    	gridTrace.getSelectionModel().select(0);
    	gridTrace.doLayout();
    	this.doLayout();
	}
}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.panel.PanelSouth');});