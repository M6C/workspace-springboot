Ext.define('Workspace.editorjava.aceeditor.command.CommandDebugStepOut',  {
	requires: [
  	     'Workspace.common.tool.Pop',
  	]
  	,
	statics: {
	    addCommand: function(editor) {
		    editor.commands.addCommand({
		        name: "editorDebugStepOut",
		        bindKey: {win: "Ctrl-F7", mac: "'Command-F7"},
		        exec: function(container) {
	                var mainCenterPanel = Ext.getCmp('mainCenterPanel');
	                if (mainCenterPanel.isDebugging()) {
	        			Ext.create('Workspace.editorjava.debug.request.JsonDebugStepOut', {application: editor.raw.application}).request(mainCenterPanel.callbackDebugStart);
	                } else {
	            		Workspace.common.tool.Pop.failure(me, 'Debuger is disabled', {toast: false});
	                }
		        }
		    });
	    }
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.aceeditor.command.CommandDebugStepOut');});