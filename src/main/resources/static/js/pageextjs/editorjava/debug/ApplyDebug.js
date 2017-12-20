Ext.define('Workspace.editorjava.debug.ApplyDebug', {
	requires: [
	  'Workspace.common.tool.Pop',
	  'Workspace.editorjava.debug.request.JsonDebugBreakpointAdd'
	]
    ,
	statics: {
    	apply: function(editor) {
    	    var me = Workspace.editorjava.debug.ApplyDebug;

			Ext.Loader.syncRequire('Workspace.editorjava.aceeditor.command.CommandDebugStepNext');
			Workspace.editorjava.aceeditor.command.CommandDebugStepNext.addCommand(editor);

		    Ext.Loader.syncRequire('Workspace.editorjava.aceeditor.command.CommandDebugStepOut');
		    Workspace.editorjava.aceeditor.command.CommandDebugStepOut.addCommand(editor);

		    Ext.Loader.syncRequire('Workspace.editorjava.aceeditor.command.CommandDebugResume');
		    Workspace.editorjava.aceeditor.command.CommandDebugResume.addCommand(editor);

		    editor.on('guttermousedown', function(e) {
                var row = e.getDocumentPosition().row;
                e.stop();

                var editor = e.editor;
                var target = e.domEvent.target;
                if (target.className.indexOf("ace_gutter-cell") == -1)
                    return;
                if (!editor.isFocused()) 
                    return; 
                if (e.clientX > 25 + target.getBoundingClientRect().left) 
                    return; 

                var callback = function (jsonData, params) {
                	me.callbackAdd(jsonData, params, editor, row)
                };
                me.add(editor.raw, row, callback);
            })
        }
		,
		callbackAdd: function (jsonData, params, editor, row) {
    	    var me = Workspace.editorjava.debug.ApplyDebug;

    	    if (!Ext.isDefined(jsonData) || !Ext.isDefined(jsonData.success || !jsonData.success)) {
				return;
			}

		    var mainCenterPanel=Ext.getCmp('mainCenterPanel');
		    var raw = editor.raw;
		    var brkData = {application:raw.application, filename: raw.path, classname:raw.className, line:row+1};
		    var breakpoints = editor.session.getBreakpoints();
		    if(typeof breakpoints[row] === typeof undefined) {
		    	if (jsonData.text == 'added') {
		            editor.session.setBreakpoint(row);

		            mainCenterPanel.addDebugBreakpoint(brkData);
		    	} else {
		    		Workspace.common.tool.Pop.failure(me, 'Breakpoint has not be added', {toast: false, detail: Ext.encode(jsonData)});
		    	}
		    }
		    else {
		    	if (jsonData.text != 'deleted') {
		    		Workspace.common.tool.Pop.failure(me, 'Breakpoint has not be removed', {toast: false, detail: Ext.encode(jsonData)});
		    	}
		    	// Clear Breakpoint Anyway
	    		editor.session.clearBreakpoint(row);

	    		mainCenterPanel.removeDebugBreakpoint(brkData);
		    }
		}
        ,
        add: function(raw, row, callback) {
            Ext.create('Workspace.editorjava.debug.request.JsonDebugBreakpointAdd', {
                application: raw.application, filename:raw.path, line:row + 1, classname: raw.className
            }).request(callback);
        }
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.debug.ApplyDebug');});