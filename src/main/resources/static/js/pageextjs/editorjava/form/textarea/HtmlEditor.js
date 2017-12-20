Ext.define('Workspace.editorjava.form.textarea.HtmlEditor', {
	// REQUIRED
	requiers: ['Workspace.editorjava.panel.center.function.AddTab']
	,
	extend: 'Workspace.common.form.textarea.HtmlEditor'
	,
	alias: 'widget.editorJavaHtmlEditor',
	alternateClassName: 'WorkspaceEditorJavaHtmlEditor'
	,
//
    initComponent : function(){
		var me = this;

		Ext.apply(me, {
//
			cleanHtml: function(html) {
		        var bd = this.getEditorBody();
		        html = bd.innerText;
				return html;
			}
			, onKeydown : function (e, cmp) {
//				var me = this;
				if (e.ctrlKey && Ext.EventObject.SPACE == e.keyCode) {
					e.preventDefault();
					e.stopPropagation();
	
					var editor = this.htmlEditor;
					var view = e.currentTarget.defaultView;
					var selection = view.getSelection();
					// Selection du d�but de la ligne jusqu'au curseur
					//selection.extend(selection.focusNode,0)
					// Selection du d�but de textarea jusqu'au curseur
					selection.extend(view.document.firstChild,0);
					var txt = selection.toString();
					var pos = txt.length;
					selection.collapseToEnd();
	
					editor.syncValue();
					var txt=editor.getValue();//.getRawValue();
					txt=escape(txt);
	
					var fnOnSubmitTree = function(tree, key, e) {
						var sm = tree.getSelectionModel();
						if (sm.getSelection().length>0) {
							var node = sm.getSelection()[0];
							editor.insertAtCursor('.'+node.data.text);
							this.ownerCt.close();
						}
					};
	
					var wndClasspathDetail = Ext.create('Workspace.editorjava.window.WindowCompletion', {
						pos: pos,
						txt: txt,
						filename: me.panelId,
						callBackSubmit:fnOnSubmitTree
					});
					wndClasspathDetail.show();
				}
				else if (Ext.EventObject.ENTER == e.keyCode) {
					console.info('Workspace.editorjava.form.textarea.HtmlEditor ENTER');
					e.preventDefault();
					e.stopPropagation();
	
					var editor = this.htmlEditor;
					editor.syncValue();
					// CR et BACKSPACE
					editor.insertAtCursor('<br>\b');
				}
			}
		});
		me.callParent(arguments);
	}
//
	,
	enableColors: false,
	enableAlignments: false

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.form.textarea.HtmlEditor');});