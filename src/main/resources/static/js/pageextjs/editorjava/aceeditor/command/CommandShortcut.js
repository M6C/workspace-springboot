Ext.define('Workspace.editorjava.aceeditor.command.CommandShortcut',  {
	requires: [
	]
	,
	statics: {
	    win: 'Ctrl-Alt-H',
	    mac: 'Command-Alt-H',
	    command: function() {
    	    var me = Workspace.editorjava.aceeditor.command.CommandShortcut;
        	return me.win
	    },
	    addCommand: function(editor) {
        	var me = Workspace.editorjava.aceeditor.command.CommandShortcut;
		    editor.commands.addCommand({
		        name: "editorShortcut",
		        bindKey: {win: me.win, mac: me.mac},
		        exec: function(container) {

                    ace.config.loadModule("ace/ext/keybinding_menu", function(module) {
                        module.init(editor);
                        editor.showKeyboardShortcuts()
                    })
		        }
		    });
	    }
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.aceeditor.command.CommandShortcut');});