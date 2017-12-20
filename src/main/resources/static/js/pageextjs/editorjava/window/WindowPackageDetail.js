Ext.require([
'Workspace.editorjava.window.packagedetail.tree.TreePackageDetail'
]);

Ext.define('Workspace.editorjava.window.WindowPackageDetail', {

	extend: 'Ext.Window',

	alias: 'widget.editorjavaWindowPackageDetail',
	alternateClassName: 'WorkspaceEditorJavaWindowPackageDetail',

	initComponent : function(){
		var me = this;

		Ext.apply(me, {
		    items : [
				{
					xtype:'editorjavaTreePackageDetail',
					id : 'treePackageDetail',
					pkgtype : this.pkgtype
				},
				{
				    xtype: 'hidden',
				    id: 'pkgtype',
				    name: 'pkgtype',
				    value: this.pkgtype
				}
			]
		});

		me.callParent(arguments);
	}
	,
	title: 'Package Detail',        //titre de la fen�tre
	// el = id du div dans le code html de la page qui contiendra la popup
	//el:windowEl,        
	layout:'fit',
	width:400,
	height:300,
	//autoHeight: true,        //hauteur de la fen�tre
	modal: true,             //Grise automatiquement le fond de la page
	closeAction:'hide',
	plain: true,
	//autoScroll:true,
	//hideBorders:true,
	//titleCollapse:true,
	//header:false,
	//items: tPackageDetail        //On met dans cette fen�tre le panel pr�c�dent

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.window.WindowPackageDetail');});