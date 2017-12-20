Ext.define('Workspace.editorjava.aceeditor.command.CommandReopenLastTab',  {

	statics: {
	    addCommand: function(editor) {
		    editor.commands.addCommand({
		        name: "editorReopenLastTab",
		        bindKey: {win: "Ctrl-Shift-B", mac: "Command-Option-B"},
		        exec: function(container) {
	                var mainCenterPanel = Ext.getCmp('mainCenterPanel');
	                if (!Ext.isEmpty(mainCenterPanel.tabRemovedStack)) {
    	                var raw = mainCenterPanel.tabRemovedStack.pop();
    	                mainCenterPanel.onAddTab(raw);
	                } else {
			            console.info('Workspace.editorjava.aceeditor.command.CommandReopenLastTab Tab removed stack is empty');
	                }
		        }
		    });
	    }
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.aceeditor.command.CommandReopenLastTab');});