Ext.define('Workspace.editorjava.window.WindowCompletion', {
	// REQUIRED

	extend: 'Ext.Window'
	,
	alias: 'widget.editorjavaWindowCompletion',
	alternateClassName: 'WorkspaceEditorJavaWindowCompletion'
	,
	// private
	initComponent : function(){
		var me = this;

		Ext.apply(me, {
		    items : [
		        Ext.create('Workspace.editorjava.window.completion.tree.TreeCompletion',
		          	{
		        		id:'treeCompletion',
		        		pos: me.pos,
		        		txt: me.txt,
		        		application: me.application,
		        		filename: me.filename,
		        		onSubmitTree: me.callBackSubmit
		        	}
	          	)
		    ]
			,
			listeners : {
				'show' : function (wnd) {
					console.info('Workspace.editorjava.window.WindowCompletion activate');
					Ext.getCmp('treeCompletion').focus();
				}
				,
				'destroy' : me.listeners.destroy
			}
		});

		me.callParent(arguments);
	}
	,
	title: 'Method list',        //titre de la fen�tre
	// el = id du div dans le code html de la page qui contiendra la popup
	//el:windowEl,        
	layout:'fit',
	width:400,
	height:300,
	//autoHeight: true,        //hauteur de la fen�tre
	modal: true
	/*,             //Grise automatiquement le fond de la page
	closeAction:'hide',
	plain: true
	*/

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.window.WindowCompletion');});