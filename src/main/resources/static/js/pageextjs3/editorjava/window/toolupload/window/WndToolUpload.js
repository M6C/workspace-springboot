// DEPENDENCE
Ext.Loader.load([DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava/window/toolupload/panel/PanelToolUpload.js']);

//NAMESPACE
Ext.ns('Workspace.window.ToolUpload');

// Window
Workspace.window.ToolUpload.WindowToolUpload = Ext.extend(Ext.Window, {
	// private
    initComponent : function(){
	    this.items = [
			{
				xtype:'panel',
				autoWidth: true,             //largeur de la fen�tre
				autoHeight: true,            //hauteur de la fen�tre
			    layout: 'fit',
			    bbar: new Ext.ux.StatusBar({
			        id: 'form-statusbar-project',
			        defaultText: 'Pr�t'
			        //,plugins: new Ext.ux.ValidationStatus({form:formId})
			    }),
				items : [
				   {
					   xtype:'WorkspaceWindowToolUploadPanelPanelToolUpload'
				   }
				]
			}
	    ]

	    Workspace.window.ToolUpload.WindowToolUpload.superclass.initComponent.call(this);
	},
	title: 'ToolUpload Action',        //titre de la fen�tre
    // el = id du div dans le code html de la page qui contiendra la popup
//    el:windowEl,        
    layout:'fit',
    width:400,
    autoHeight: true,        //hauteur de la fen�tre
    modal: true,             //Grise automatiquement le fond de la page
    closeAction:'hide',
    plain: true
});
