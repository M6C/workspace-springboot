Ext.define('Workspace.editorjava.panel.PanelCenter', {
	requires: [
	     'Workspace.common.tool.Pop',
	     'Workspace.tool.UtilString',
	     'Workspace.editorjava.constant.ConstantState',
	     'Workspace.editorjava.debug.WaiterDebug',
  	     'Workspace.editorjava.panel.center.function.AddTabAce',
  	     'Workspace.editorjava.debug.request.JsonDebugVariable'
  	]
  	,
	extend: 'Workspace.widget.panel.WidgetPanelCenter'
	,
	alias: 'widget.panelCenter',
	alternateClassName: 'PanelCenter',
    stateful:false
    ,
    initComponent : function(){
		var me = this;
		
		me.waiterDebug = Ext.create('Workspace.editorjava.debug.WaiterDebug');


	    me.callParent(arguments);
	}
	,
    listeners : {
    	'render': function(panel, option) {
		    var me = panel;
    		me.initializeButtonDebug();
		}
    }
	,
	// Overrided
	onAddTab(raw) {
		Workspace.editorjava.panel.center.function.AddTabAce.call(raw);
	}
	,
	getSelectedItem: function() {
		var ret = null;
	    var treeDirectory = Ext.getCmp('treeDirectory');
        var selection = treeDirectory.getSelectionModel().selected;
        if (selection.getCount() == 1) {
        	ret = selection.get(0);
        }
        return ret;
	}
	,
	debugStart: function() {
		var me = this;
		if (Workspace.editorjava.constant.ConstantState.inProgressInitialize()) {
	        Workspace.editorjava.constant.ConstantState.inProgressInitializeMessage();
		    return;
		}
		me.waiterDebug.start(me.callbackDebugStart);
		me.initializeButtonDebug();
	}
	,
	debugStop: function() {
		var me = this;
		me.waiterDebug.stop(me.callbackDebugStop);
		me.initializeButtonDebug();
        me.setDebugVariable();
	}
	,
	isDebugging: function() {
		var me = this;
		return me.waiterDebug.debugging;
	}
	,
	callbackDebugStart: function(jsonData) {
		if (!Ext.isDefined(jsonData)) {
    		Workspace.common.tool.Pop.failure(me, 'Debug callback with empty json data', {toast: false});
			return;
		}

		var me = this;
		var row = jsonData.line - 1;
		var classname = Workspace.tool.UtilString.decodeUtf8(jsonData.className);
		var mainCenterPanel=Ext.getCmp('mainCenterPanel');

		if (mainCenterPanel.waiterDebug.classname == classname && mainCenterPanel.waiterDebug.row == row) {
    // 		Workspace.common.tool.Pop.info(me, "No debug change class:'" + classname + "' line:" + (row+1), {toast: false});
    		return;
		}
		mainCenterPanel.waiterDebug.classname = classname;
		mainCenterPanel.waiterDebug.row = row;

		var application = Workspace.tool.UtilString.decodeUtf8(jsonData.application);
		var sourceName = jsonData.sourceName;
		if (Ext.isEmpty(sourceName)) {
    		Workspace.common.tool.Pop.info(me, "No Source found for class:'" + classname + "' line:" + (row+1), {toast: false});
            mainCenterPanel.updateDebugVariable();
			return;
		}

        // Find the source name for the application. Or keap the last.
		Ext.each(jsonData.sourceName, function(item, index, all) {
            sourceName = Workspace.tool.UtilString.decodeUtf8(item);
            // Continue (return false) if application is not find on sourceName start
		    return sourceName.indexOf('[' + application + ']') != 0;
		});

		var editor;
		var isFind = false;
		var panelId = sourceName;
		var panel = mainCenterPanel.getActiveTab();

        if (!Ext.isEmpty(panel)) {
            panelId = Workspace.tool.UtilString.makeSamePathSeparator(panelId, panel.id);
            isFind = (panel.id == panelId);
        }

		if (isFind) {
			editor = ace.edit(panel.panelEditorId);
	    	Ext.apply(editor, {
	    		cursorRow: row,
	    		cursorCol: 0,
	    		changeScrollTop: undefined,
	    		changeScrollLeft: undefined
    		});
	    	panel.editorFocusAndScroll(panel);
		} else {
		    var sep = Workspace.tool.UtilString.getSeparator(panelId);
		    var text = panelId.substring(panelId.lastIndexOf(sep) + 1);
			var raw = {
				'text':text,
				'id':panelId,
				'application':application,
				'path':sourceName,
				'className':classname,
				'contentType':'text/java',
				'build':'true',
				'leaf':false,
				'autoDeploy':true,
				'cursorRow': row,
				'cursorCol': 0
			};
	
			// Explicit load required library (Mandatory for extending this class)
			Ext.Loader.syncRequire('Workspace.editorjava.panel.center.function.AddTabAce');
			panel = Workspace.editorjava.panel.center.function.AddTabAce.call(raw);

			editor = ace.edit(panel.panelEditorId);
		}

//		var session = editor.getSession();
//		Ext.each(session.getMarkers(), function(marker) {
//			session.removeMarker(marker);
//		});
//		session.addMarker(new Range(row,0,row,200),"ace_active-line","background");

        mainCenterPanel.updateDebugVariable();
	}
	,
	updateDebugVariable: function() {
		var me = this;
		var mainCenterPanel=Ext.getCmp('mainCenterPanel');
		var callbackVariable = function(jsonData) {
		    if (!Ext.isEmpty(jsonData)) {
    		    mainCenterPanel.setDebugVariable(jsonData);
		    }
		};
        Ext.create('Workspace.editorjava.debug.request.JsonDebugVariable').request(callbackVariable);
	}
	,
	setDebugVariable: function(jsonData) {
	    Ext.getCmp('mainEstPanel').setDebugVariable(jsonData);
	}
	,
	setDebugBreakpoint: function(jsonData) {
	    Ext.getCmp('mainEstPanel').setDebugBreakpoint(jsonData);
	}
	,
	addDebugBreakpoint: function(jsonData) {
	    Ext.getCmp('mainEstPanel').addDebugBreakpoint(jsonData);
	}
	,
	removeDebugBreakpoint: function(jsonData) {
	    Ext.getCmp('mainEstPanel').removeDebugBreakpoint(jsonData);
	}
	,
	initializeButtonDebug: function() {
		Ext.getCmp('mainEstPanel').initializeButtonDebug();
	}
	,
	callbackDebugStop: function(jsonData) {
		var mainCenterPanel = Ext.getCmp('mainCenterPanel');
		mainCenterPanel.waiterDebug.classname = undefined;
		mainCenterPanel.waiterDebug.row = undefined;
		mainCenterPanel.initializeButtonDebug();
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.PanelCenter');});