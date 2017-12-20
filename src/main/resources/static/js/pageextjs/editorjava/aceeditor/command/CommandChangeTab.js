//Parameters :
// - panelId
// - panelEditorId
Ext.define('Workspace.editorjava.aceeditor.command.CommandChangeTab',  {

	statics: {
	    addCommand: function(editor, panelTab) {
		    editor.commands.addCommand({
		        name: "editorChangeTabUp",
		        bindKey: {win: "Ctrl-PageUp", mac: "Command-PageUp"},
		        exec: function(container) {
		            var tab = panelTab.getActiveTab();
		        	var idx = panelTab.items.findIndexBy(function(o, k) {
		        	    return k == tab.id;
		        	});
		        	if (idx > 0) {
		        		tab = panelTab.items.getAt(idx-1);
		        	    panelTab.setActiveTab(tab);
						ace.edit(tab.panelEditorId).focus();
		        	}
		        }
		    });
		    editor.commands.addCommand({
		        name: "editorChangeTabDown",
		        bindKey: {win: "Ctrl-PageDown", mac: "Command-PageDown"},
		        exec: function(container) {
		            var tab = panelTab.getActiveTab();
		        	var idx = panelTab.items.findIndexBy(function(o, k) {
		        	    return k == tab.id;
		        	});
		        	var len = panelTab.items.getCount();

		        	if (idx < (len-1)) {
		        		tab = panelTab.items.getAt(idx+1);
		        	    panelTab.setActiveTab(tab);
						ace.edit(tab.panelEditorId).focus();
		        	}
		        }
		    });
	    }
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.aceeditor.command.CommandChangeTab');});