// DEPENDENCE
Ext.Loader.load([DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava/window/project/combobox/ComboProject.js']);

//NAMESPACE
Ext.ns('Workspace.window.Project.panel');

// Panel
Workspace.window.Project.panel.PanelProject = Ext.extend(Ext.FormPanel, {
	// private
    initComponent : function(){
		this.items = [
  			{
  				xtype:'WorkspaceWindowProjectComboboxComboProject',
  				id: this.comboId,
  				statusbarId: this.statusbarId,
  				pkgtype:this.pkgtype
  			},
			{
			    xtype: 'hidden',        //Balise cach�e afin de dire qu'il s'agit d'une connexion
			    id: 'project',
			    name: 'project',
			    allowBlank: false
			}
		];

		this.buttons = [
    		{
    			xtype: 'button',
    			text: 'Detail',
    			pkgtype : this.pkgtype,
    			handler: function() {
//		        				var tProjectDetail = createTreeProjectDetail ('treeProjectDetail');
//		        				tProjectDetail.root.reload();
    				new Ext.Window({
    					title: 'Project Detail',        //titre de la fen�tre
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
    					//items: tProjectDetail        //On met dans cette fen�tre le panel pr�c�dent
    					pkgtype : this.pkgtype,
    					items: [
	    					{
	    						xtype:'WorkspaceTreeTreeProjectDetail',
	    						id : 'treeProjectDetail'
	    					},
	    					{
	    					    xtype: 'hidden',
	    					    id: 'pkgtype',
	    					    name: 'pkgtype',
	    					    value: this.pkgtype
	    					}
    					]
    				}).show();
    			}
    		},
    		{
    			xtype: 'button',
    			text: this.submitText,
    			handler: this.callBackSubmit
    		}
    		/*
    		{
    			xtype: 'panel',
    			bodyCfg: {tag:'center'},        //alignement au milieu
    			border: false,
    			items: {
    				xtype: 'button',
    				text: submitText,
    				handler: submitFunction    //fonction � appeler lorsque l�on clique sur le bouton
    			}
    		}
    		*/
	   	];

		Workspace.window.Project.panel.PanelProject.superclass.initComponent.call(this);
	},
//	id: formId,   //id de la fen�tre
	frame: true,                 //pour que tous les items soient dans la m�me frame
	autoWidth: true,            //largeur de la fen�tre
	autoHeight: true,            //hauteur de la fen�tre
	labelWidth: 110,             //largeur des labels des champs
	//defaults: {width: 230},         //largeur des champs
	labelAlign: 'right',            //les labels s'aligneront a droite        
	bodyCfg: {tag:'center', cls:'x-panel-body'},        //on aligne tous les champs au milieu de la fen�tre
	bodyStyle: 'padding:5p;margin:0px; '
});

// REGISTER
Ext.reg('WorkspaceWindowProjectPanelPanelProject', Workspace.window.Project.panel.PanelProject);
