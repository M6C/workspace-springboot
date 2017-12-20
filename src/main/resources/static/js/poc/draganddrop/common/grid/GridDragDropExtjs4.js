Ext.define('Workspace.poc.draganddrop.common.grid.GridDragDropExtjs4', {

	extend: 'Ext.grid.Panel'
	,
	alias: 'widget.commonGridDragDrop',
	alternateClassName: 'WorkspaceCommonGridDragDrop'
	,
	initComponent : function(){
		var me = this;
		
		me.applyDragAndDrop(me);

		Ext.apply(me, {
		    listeners : {
		    	'render': function() {
		    		if (Ext.isDefined(me.getRowClass)) {
		    			me.view.getRowClass = me.getRowClass;
		    		}
		    	}
		    }
	    });

	    me.callParent(arguments);
	}
	,
	applyDragAndDrop: function(me) {
		// Explicit load required library (Mandatory for extending this class)
		Ext.Loader.syncRequire('Workspace.poc.draganddrop.common.function.ApplyDragAndDrop');
		Workspace.poc.draganddrop.common.function.ApplyDragAndDrop.apply(me, me.onBeforeDrop, me.onDrop);
	}
	,
	hideHeaders : false
	,
	layout: {
        type: 'hbox',
        align: 'stretch'
    },
    defaults     : { flex : 1 },//auto stretch
	multiSelect: true
}, function() {Workspace.tool.Log.defined('Workspace.poc.draganddrop.common.grid.GridDragDropExtjs4');});