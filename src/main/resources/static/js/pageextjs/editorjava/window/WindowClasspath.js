Ext.define('Workspace.editorjava.window.WindowClasspath', {
	// REQUIRED

	extend: 'Ext.Window'
	,
	alias: 'widget.editorjavaWindowClasspath',
	alternateClassName: 'WorkspaceEditorJavaWindowClasspath'
	,
	// private
	initComponent : function(){
		var me = this;

		Ext.apply(me, {
		    items : [
		        Ext.create('Workspace.editorjava.window.classpath.tree.TreeClasspath',
		          	{
		        		id:'treeClasspath'
		        	}
	          	)
		    ]
		});

		me.callParent(arguments);
	}
,
	title: 'Classpath',        //titre de la fenêtre
	// el = id du div dans le code html de la page qui contiendra la popup
	//el:windowEl,        
	layout:'fit',
	width:400,
	height:300,
	//autoHeight: true,        //hauteur de la fenêtre
	modal: true
	/*,             //Grise automatiquement le fond de la page
	closeAction:'hide',
	plain: true
	*/

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.window.WindowCompletion');});