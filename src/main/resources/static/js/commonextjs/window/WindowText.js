Ext.require([
	'Workspace.common.window.WindowExtjs4',
	'Workspace.common.form.textarea.HtmlEditor'
]);

Ext.define('Workspace.common.window.WindowText', {

	extend: 'Workspace.common.window.WindowExtjs4'
	,
	alias: 'widget.commonWindowText',
	alternateClassName: 'CommonWindowWindowText'
	,
	// private
	initComponent : function(){
		var me = this;

		Ext.applyIf(me, {
		    items : [
	 			{
					xtype:'panel',
					autoWidth: true,             //largeur de la fen�tre
					autoHeight: true,            //hauteur de la fen�tre
				    layout: 'fit'
				    ,
					items : [
					   {
						   xtype:'commonHtmlEditor',
//						   xtype:'htmleditor',
						   id:'editorText'
					   }
					]
				}
		    ]
	    	,
		    listeners:{
		        'show' : function (wnd){
		        	var editor = Ext.getCmp('editorText');
		        	editor.setValue(this.text);
		        	editor.syncValue();
				}
		   }
		});

		me.callParent(arguments);
	}
	,
	title: 'Message',        //titre de la fen�tre
	// el = id du div dans le code html de la page qui contiendra la popup
	//el:windowEl,        
	layout:'fit',
	width:850,
	height:450,
//	autoHeight: true,        //hauteur de la fen�tre
	modal: true,             //Grise automatiquement le fond de la page
	closeAction:'hide',
	plain: true

}, function() {Workspace.tool.Log.defined('Workspace.common.window.WindowText');});