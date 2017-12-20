Ext.define('Workspace.editorjava.aceeditor.command.CommandDeploy',  {
	requires: [
	]
	,
	statics: {
	    addCommand: function(editor) {
		    editor.commands.addCommand({
		        name: "editorDeploy",
		        bindKey: {win: "Ctrl-Shift-D", mac: "'Command-Option-D"},
		        exec: function(container) {
		        	var me = Workspace.editorjava.aceeditor.command.CommandDeploy;

                    autoDeployProject();
		        }
		    });
	    }
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.aceeditor.command.CommandDeploy');});