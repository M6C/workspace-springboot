//Parameters :
// - panelId
// - panelEditorId
Ext.define('Workspace.editorjava.aceeditor.command.CommandSave',  {

	statics: {
	    addCommand: function(editor) {
		    editor.commands.addCommand({
		        name: "editorSave",
		        bindKey: {win: "Ctrl-s", mac: "Command-s"},
		        exec: function(container) {
//		            ace.config.loadModule("ace/ext/keybinding_menu", function(module) {
//		                module.init(editor);
//		                editor.showKeyboardShortcuts()
//		            })
		    		Workspace.editorjava.panel.center.function.AddTabSave.call(editor);
		        }
		    });
//		    editor.execCommand("editorSave");
	    }
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.aceeditor.command.CommandSave');});