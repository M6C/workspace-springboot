Ext.define('Workspace.editorjava.panel.est.PanelDebugVariable', {

	extend: 'Ext.tree.Panel'
	,
	alias: 'widget.panelDebugVariable',
	alternateClassName: 'WorkspacePanelDebugVariable',
	id: 'PanelDebugVariable',
	title: 'Variable'
	,
    initComponent : function() {
		var me = this;

        var store = Ext.create('Ext.data.TreeStore', {
        	root: {
        	   // nodeType: 'async',
        	    draggable: false,
        	    id: 'root',
        	    expanded: true,
        	    text: 'Current',
        	    children: [
        	        {leaf:true, text:'No variable.'}
        	    ]
        	}
        	,
        	autoLoad: true,
        	autoSync: true
        	,
            proxy: {
                type: 'ajax',
    			url : DOMAIN_NAME_ROOT + '/action.servlet?event=DebuggerBreakpointVariableIdExtJs',
    			headers: {'Content-Type': 'application/json; charset=UTF-8'},
    			method: 'GET',
                reader: {
                    type: 'json'
                }
                ,
                afterRequest: function(response, success) {
                    var i=0;
                    i++;
                }
            }
            ,
            listeners:{
        	    //scope: this, //yourScope
        	    'beforeload': function(store, operation, options) {
        	    	var raw = Ext.isDefined(operation.node.raw) ? operation.node.raw : operation.node.data;
        	    	if (operation.node.isRoot() || !Ext.isDefined(raw) || 
        	    		!Ext.isDefined(raw.data) || Ext.isEmpty(raw.data.id)) {
        	    		return false;
        	    	}
    			    var id = raw.data.id;
    				console.info('Workspace.editor.panel.est.data.StoreDebugVariable beforeload id:'+id);
    				store.getProxy().extraParams.variableId = id;
        	    }
        	}
        });
        
		store.onProxyLoad = Ext.Function.createSequence(me.onProxyLoad, store.onProxyLoad);;

        me.store = store;

		me.callParent(arguments);
	}
	,
    onProxyLoad: function(result) {
        var me = this;
    	if (!Ext.isDefined(result.response)) {
    		return;
    	}
    	var text = result.response.responseText;
    	if (!Ext.isEmpty(text)) {
		    var node = result.node;
    		var jsonData = Ext.decode(text);
            var records = Workspace.editorjava.debug.data.DataVariable.formatFromRequest(jsonData);
            
            var data = [];
            if (!Ext.isEmpty(records.children)) {
	            data = records.children[0].children;
            } else {
            	records = {};
            }

            result.resultSet = new Ext.data.ResultSet({
                records: data,
                count: data.length,
                loaded: true,
                success: records.success,
                total: data.length
            });

	        result.response.responseText = Ext.encode(records);
    	}
    }
    ,
    useArrows: true,
    autoScroll: false,
    animate: true,
    enableDD: true,
    containerScroll: true,
    border: false,
    collapsible: false,
    rootVisible: false

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.est.PanelDebugVariable');});