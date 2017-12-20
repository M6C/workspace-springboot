//Parameters :
// - panelId
// - panelEditorId
Ext.define('Workspace.editorjava.aceeditor.command.CommandSaveAll',  {

	statics: {
	    addCommand: function(editor) {
		    editor.commands.addCommand({
		        name: "editorSaveAll",
		        bindKey: {win: "Ctrl-Shift-s", mac: "Command-Option-s"},
		        exec: function(container) {
		    		Workspace.editorjava.panel.center.function.AddTabSaveAll.call(editor);
		        }
		    });
//		    editor.execCommand("editorSave");
	    }
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.aceeditor.command.CommandSaveAll');});