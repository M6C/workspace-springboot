// DEPENDENCE
Ext.Loader.load([DOMAIN_NAME_ROOT + '/js/commonextjs/form/textarea/HtmlEditor.js']);

// NAMESPACE
Ext.ns('Workspace.editorjava.form.textarea');

Workspace.editorjava.form.textarea.HtmlEditor = Ext.extend(Workspace.common.form.textarea.HtmlEditor, {
    enableColors: false,
    enableAlignments: false,
    cleanHtml: function(html) {
        var bd = this.getEditorBody();
        html = bd.innerText;
		return html;
	}
	, onKeydown : function (e, cmp) {
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
			var txt=editor.getRawValue();
			txt=escape(txt);

			var fnOnSubmitTree = function(tree, key, e) {
	          var sm = tree.getSelectionModel();
	          var node = sm.getSelectedNode();
	          editor.insertAtCursor('.'+node.text);
	          wndClasspathDetail.close();
			};

			var wndClasspathDetail = create_WindowCompletionAction (
				Ext.getCmp('el_wnd_hot_key_completion'),
				txt,
				pos,
				fnOnSubmitTree
			);
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

//REGISTER
Ext.reg('WorkspaceEditorjavaFormTextareaHtmlEditor', Workspace.editorjava.form.textarea.HtmlEditor);