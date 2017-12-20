Ext.define('Workspace.editorjava.tree.TreeFileExplorer', {
	requires: [
  	     'Workspace.editorjava.aceeditor.command.CommandFindResource',
  	     'Workspace.editorjava.panel.center.function.AddTabAce'
  	]
	,
	extend: 'Workspace.widget.tree.WidgetTreeExplorer'
	,
	alias: 'widget.editorjavaTreeFileExplorer',
	alternateClassName: 'WorkspaceEditorJavaTreeFileExplorer'
	,
    enableKeyEvents: true
	,
	// Overrided
	onActionOpen(view, record, item, index, event, eOpts) {
		console.info('Workspace.editorjava.tree.TreeFileExplorer actionItem');

		Workspace.editorjava.panel.center.function.AddTabAce.call(record.raw);
	},
	// Override
	onItemKeyDown: function(view, record, item, index, event, eOpts) {
		console.info('Workspace.editorjava.tree.TreeFileExplorer onItemKeyDown');
		var superMethod = this.superclass.onItemKeyDown;
		if (event.ctrlKey && event.shiftKey && event.keyCode == Ext.EventObject.R) {
		    Workspace.editorjava.aceeditor.command.CommandFindResource.openFindResourceNameFilter(view);
		    event.stopEvent();
		} else if (event.ctrlKey && event.shiftKey && event.keyCode == Ext.EventObject.F) {
		    Workspace.editorjava.aceeditor.command.CommandFindResource.openFindResourceContentFilter(view);
		    event.stopEvent();
		} else {
		    var parent = Workspace.widget.tree.WidgetTreeExplorer;
		  //  parent.prototype.onItemKeyDown.call(this, view, record, item, index, event, eOpts);
		    parent.prototype.onItemKeyDown(view, record, item, index, event, eOpts);
		}
    }
//     ,
// 	tools: [
//         {
//         	xtype: 'editorjavaComboProject',
//   		    id: 'comboProject'
//         },
//           {	//Balise cachee
//   		    xtype: 'hidden',
//   		    id: 'project',
//   		    name: 'project'
//   		}
// 	]
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.tree.TreeFileExplorer');});