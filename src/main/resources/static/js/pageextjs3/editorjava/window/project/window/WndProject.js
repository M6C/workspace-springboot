// DEPENDENCE
Ext.Loader.load([DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava/window/project/panel/PanelProject.js']);

//NAMESPACE
Ext.ns('Workspace.window.Project');

// Window
Workspace.window.Project.WindowProject = Ext.extend(Ext.Window, {
	// private
    initComponent : function(){
	    this.items = [
			{
				xtype:'panel',
				autoWidth: true,             //largeur de la fen�tre
				autoHeight: true,            //hauteur de la fen�tre
			    layout: 'fit',
			    bbar: new Ext.ux.StatusBar({
			        id: this.statusbarId,
			        defaultText: 'Pr�t'
			        //,plugins: new Ext.ux.ValidationStatus({form:formId})
			
			    }),
				items : [
				   {
					   xtype:'WorkspaceWindowProjectPanelPanelProject',
					   id: this.formId,
					   submitText: this.submitText,
					   comboId: this.comboId,
					   statusbarId: this.statusbarId,
					   pkgtype: this.type,
					   callBackSubmit: this.callBackSubmit
				   }
				]
			}
	    ]
	
	    Workspace.window.Project.WindowProject.superclass.initComponent.call(this);
	},
    listeners:{
		//scope: this, //yourScope
        'show' : function (wnd){
			Ext.getCmp(this.comboId).store.load();
		}
   },

	title: 'Project Action',        //titre de la fen�tre
    // el = id du div dans le code html de la page qui contiendra la popup
//    el:windowEl,        
    layout:'fit',
    width:400,
    autoHeight: true,        //hauteur de la fen�tre
    modal: true,             //Grise automatiquement le fond de la page
    closeAction:'hide',
    plain: true
});
