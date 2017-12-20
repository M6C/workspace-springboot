// DEPENDENCE
Ext.Loader.load([DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava/window/toolxmlxsl/panel/PanelToolXmlXsl.js']);

//NAMESPACE
Ext.ns('Workspace.window.ToolXmlXsl');

// Window
Workspace.window.ToolXmlXsl.WindowToolXmlXsl = Ext.extend(Ext.Window, {
	// private
    initComponent : function(){
	    this.items = [
    		{
    			//Ce panel contiendra le panel pr�c�dent qui est le formulaire, sauf qu'en bas de celui ci figure la status bar, permettant d'afficher le status de la connexion (chargement ....)
    			xtype:'panel',
    			id:'xml_xsl_form_panel',        
    			autoWidth: true,             //largeur de la fen�tre
    			autoHeight: true,            //hauteur de la fen�tre
    			animCollapse:false,
    			layout: 'fit',
    			bbar: new Ext.ux.StatusBar({
    				id: 'form-statusbar-xml_xsl',
    				defaultText: 'Pr�t'
    				//,plugins: new Ext.ux.ValidationStatus({form:'xml_xsl_content_panel'})
    			}),
    			items: [
    				{	//On met dans ce panel le panel de login
    					xtype:'WorkspaceWindowToolXmlXslPanelPanelToolXmlXsl',
    					callBackSubmit:this.callBackSubmit
    				}
    			]
    		},
    		{
    			xtype:'panel',
    			id:'xml_xsl_viewer_panel',        
    			autoWidth: true,             //largeur de la fen�tre
    			autoHeight: true,            //hauteur de la fen�tre
    			animCollapse:false,
        		layout:'fit',
    			collapseFirst:true,
    			collapsed:true,
    			items: [
    				{
    					xtype: 'htmleditor',
    					id: 'xml_viewer',
    					enableColors: true,
    					enableAlignments: true,
    					autoWidth: true,
    					autoHeight: true,
    					boxMinHeight: 150
    				}
    			],
    			buttons: [
    				{
    					xtype: 'button',
    					text: 'Back',
    					handler: function () {
    						Ext.getCmp('xml_xsl_form_panel').expand();
    						Ext.getCmp('xml_xsl_viewer_panel').collapse();
    				    }
    				}
    			]
    		}
    	]

    	Workspace.window.ToolXmlXsl.WindowToolXmlXsl.superclass.initComponent.call(this);
	},

	title: 'Xml/Xsl Tranformation',        //titre de la fen�tre
    // el = id du div dans le code html de la page qui contiendra la popup
    //el:windowEl,        
    layout:'fit',//'accordion',
	animCollapse:false,
	defaults: {
		// applied to each contained panel
		//bodyStyle: 'padding:15px'
	},
	layoutConfig: {
		// layout-specific configs go here
		titleCollapse: false,
		animate: true,
		activeOnTop: true
	},
    width:400,
    autoHeight: true,        //hauteur de la fen�tre
    modal: true,             //Grise automatiquement le fond de la page
    closeAction:'hide',
    plain: true
});
