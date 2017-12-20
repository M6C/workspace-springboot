Ext.define('Workspace.editorjava.aceeditor.command.CommandDebugStepNext',  {
	requires: [
	     'Workspace.common.tool.Pop',
	]
	,
	statics: {
	    addCommand: function(editor) {
		    editor.commands.addCommand({
		        name: "editorDebugStepNext",
		        bindKey: {win: "Ctrl-F6", mac: "'Command-F6"},
		        exec: function(container) {
	                var mainCenterPanel = Ext.getCmp('mainCenterPanel');
	                if (mainCenterPanel.isDebugging()) {
	        			Ext.create('Workspace.editorjava.debug.request.JsonDebugStepNext', {application: editor.raw.application}).request(mainCenterPanel.callbackDebugStart);
	                } else {
	            		Workspace.common.tool.Pop.failure(me, 'Debuger is disabled', {toast: false});
	                }
		        }
		    });
	    }
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.aceeditor.command.CommandDebugStepNext');});