Ext.define('Workspace.editorjava.aceeditor.command.CommandCloseTab',  {

	statics: {
	    addCommand: function(editor) {
		    editor.commands.addCommand({
		        name: "editorCloseTab",
		        bindKey: {win: "Ctrl-Shift-F4", mac: "Command-Option-F4"},
		        exec: function(container) {
                    Ext.getCmp(editor.panelId).close();
		        }
		    });
	    }
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.aceeditor.command.CommandCloseTab');});