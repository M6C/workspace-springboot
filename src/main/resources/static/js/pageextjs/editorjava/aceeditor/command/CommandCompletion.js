//Parameters :
// - panelId
// - panelEditorId
Ext.define('Workspace.editorjava.aceeditor.command.CommandCompletion',  {

	statics: {
	    addCommand: function(editor) {
		    editor.commands.addCommand({
		        name: 'Completion',
		        bindKey: {win: 'Ctrl-Shift-.',  mac: 'Command-Option-.'},
		        exec: function(container) {
					console.info('Workspace.editorjava.aceeditor.command.CommandCompletion exec');

    				var filename = editor.panelId.toLowerCase();
	                if (!filename.endsWith('.java')) {
					    console.info('Workspace.editorjava.aceeditor.command.CommandCompletion no java file');
	                    return;
	                }

					var selection = editor.selection;
					var col = selection.getCursor().column;
					var row = selection.getCursor().row;
	
					selection.selectFileStart();
	
					var txtRange = editor.session.getTextRange(editor.getSelectionRange());
					selection.selectToPosition({column:col,row:row});
					pos = txtRange.length;
					
					var txt=editor.getValue();//.getRawValue();
					txt=escape(txt);
	
					var fnOnSubmitTree = function(tree, key, e) {
						var sm = tree.getSelectionModel();
						if (sm.getSelection().length>0) {
							var node = sm.getSelection()[0];
							editor.insert('.'+node.data.text);
							this.ownerCt.close();
						}
					};
	
					var wndClasspathDetail = Ext.create('Workspace.editorjava.window.WindowCompletion', {
						pos: pos,
						txt: txt,
						application: editor.application,
						filename: editor.panelId,
						callBackSubmit:fnOnSubmitTree
						,
						panelEditorId:editor
						,
						listeners : {
							'destroy' : function (wnd) {
								console.info('Workspace.editorjava.window.WindowCompletion destroy');
								editor.focus();
							}
						}
					});
					wndClasspathDetail.show();
		        },
		        readOnly: true // false if this command should not apply in readOnly mode
		    });
	    }
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.aceeditor.command.CommandCompletion');});