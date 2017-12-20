Ext.require([
'Workspace.editorjava.window.package.panel.PanelPackage',
'Ext.ux.statusbar.StatusBar',
'Ext.ux.statusbar.ValidationStatus'
]);

Ext.define('Workspace.editorjava.window.WindowPackage', {
	// REQUIRED

	extend: 'Ext.Window'
	,
	alias: 'widget.editorjavaWindowPackage',
	alternateClassName: 'WorkspaceEditorJavaWindowPackage'
	,
	// private
	initComponent : function(){
		var me = this;

		Ext.apply(me, {
		    items : [
			 			{
							xtype:'panel',
							autoWidth: true,             //largeur de la fen�tre
							autoHeight: true,            //hauteur de la fen�tre
						    layout: 'fit',
						    bbar: Ext.create('Ext.ux.StatusBar', {
						        id: this.statusbarId,
						        defaultText: 'Pret'
						        ,plugins: Ext.create('Ext.ux.statusbar.ValidationStatus', {form:this.formId})
						
						    }),
							items : [
							   {
								   xtype:'windowPackagePanelPackage',
								   id:this.formId,
								   submitText: this.submitText,
								   comboId:this.comboId,
								   statusbarId:this.statusbarId,
								   pkgtype: this.type,
								   callBackSubmit: this.callBackSubmit
							   }
							]
						}
				    ]
				    ,
				    listeners:{
						//scope: this, //yourScope
				        'show' : function (wnd){
							Ext.getCmp(this.comboId).store.load();
						}
				   }
		});

		me.callParent(arguments);
	}
	,
	title: 'Package Action',        //titre de la fen�tre
	// el = id du div dans le code html de la page qui contiendra la popup
	//el:windowEl,        
	layout:'fit',
	width:400,
	autoHeight: true,        //hauteur de la fen�tre
	modal: true,             //Grise automatiquement le fond de la page
	closeAction:'hide',
	plain: true

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.window.WindowPackage');});