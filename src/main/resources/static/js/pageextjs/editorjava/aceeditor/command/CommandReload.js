Ext.define('Workspace.editorjava.aceeditor.command.CommandReload',  {

	statics: {
	    addCommand: function(editor) {
		    editor.commands.addCommand({
		        name: "editorReload",
		        bindKey: {win: "Ctrl-Shift-L", mac: "Command-Option-L"},
		        exec: function(container) {
	                Ext.getCmp(editor.panelId).reload(true);
		        }
		    });
	    }
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.aceeditor.command.CommandReoload');});