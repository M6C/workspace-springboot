Ext.define('Workspace.editorjava.panel.est.PanelDebugBreakpoint', {

	extend: 'Ext.tree.Panel'
	,
	alias: 'widget.panelDebugVariable',
	alternateClassName: 'WorkspacePanelDebugBreakpoint',
	id: 'PanelDebugBreakpoint',
	title: 'Breakpoint'
	,
    initComponent : function() {
		var me = this;

        me.store = Ext.create('Ext.data.TreeStore', {
        	root: {
        	    nodeType: 'async',
        	    draggable: false,
        	    id: 'root',
        	    expanded: true,
        	    text: 'Current'
        	}    
        });

        Workspace.tool.UtilComponent.addListener(me, 'itemdblclick', me.listenerItemdblclick);

        me._manageEmptyNode();

		me.callParent(arguments);
	}
	,
	/**
	 * @param data : object/array of format : {application:, line:, classname:, filename:}
	 */
	setDebugBreakpoint: function(data) {
		var me = this;
        var root = me.getRootNode();
        root.removeAll(true);
	    if (!Ext.isEmpty(data)) {
    	    if (!Ext.isArray(data)) {
    	        data = [data];
    	    }
    	    Ext.each(data, function(item) {
    	        me.addDebugBreakpoint(item, {manageEmptyNode:false});
    	    });
	    }
        me._manageEmptyNode();
	}
	,
	listenerItemdblclick: function(view, record, item, index, event, eOpts) {
	    var me = this;
        var root = view.node;
        var node = root.childNodes[index];
	    var data = node.data.data;

	    if (!Ext.isDefined(data)) {
	        return;
	    }

        var mainCenterPanel=Ext.getCmp('mainCenterPanel');

        if (mainCenterPanel.waiterDebug.classname == data.className) {
            mainCenterPanel.waiterDebug.classname = undefined;
            mainCenterPanel.waiterDebug.row = undefined;
        }

        mainCenterPanel.callbackDebugStart(data);
	}
	,
	/**
	 * @param data : format : {application:, line:, classname:, filename:}
	 */
	addDebugBreakpoint: function(data, option) {
	    var me = this;
	    if (!Ext.isDefined(option)) {
	        option = {manageEmptyNode:true};
	    }

        var root = me.getRootNode();
        var id = '[' + data.application + ']' + data.filename + ':' + data.line;
        var text = '[' + data.application + ']&nbsp;<span style="color:#4067B3">' + data.classname + '</span>&nbsp;' + data.line;
        var qtip = data.filename;
        var node = root.findChild('id', id);

        if (Ext.isEmpty(node)) {
            var jsonData = {
                application:data.application,
                line:data.line,
                className:data.classname,
                sourceName:data.filename
            };
            console.log("addDebugBreakpoint jsonData:" + jsonData)
    	    root.appendChild([{leaf:true, text:text, id:id, qtip:qtip, data: jsonData}]);
        }
	    if (Ext.isDefined(option.manageEmptyNode) && option.manageEmptyNode) {
            me._manageEmptyNode();
	    }
	}
	,
	/**
	 * @param data : format : {application:, line:, classname:, filename:}
	 */
	removeDebugBreakpoint: function(data, option) {
	    var me = this;
	    if (!Ext.isDefined(option)) {
	        option = {manageEmptyNode:true};
	    }

        var root = me.getRootNode();
        var id = '[' + data.application + ']' + data.filename + ':' + data.line;
        var node = root.findChild('id', id);

        if (!Ext.isEmpty(node)) {
            root.removeChild(node);
        }
	    if (Ext.isDefined(option.manageEmptyNode) && option.manageEmptyNode) {
            me._manageEmptyNode();
	    }
	}
	,
	/**
	 * @private
	 */
	_manageEmptyNode: function() {
	    var me = this;
        var root = me.getRootNode();
        var id = 0;
        var node = root.findChild('id', id);
        var cnt = (!Ext.isEmpty(root.childNodes)) ? root.childNodes.length : 0;

        if (Ext.isEmpty(node) && cnt==0) {
            var text = id;
    	    root.appendChild([{leaf:true, text:'No breakpoint.', id:id}]);
        } else if (!Ext.isEmpty(node) && cnt>0) {
            root.removeChild(node);
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

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.est.PanelDebugBreakpoint');});