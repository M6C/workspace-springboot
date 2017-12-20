// DEPENDENCE
Ext.Loader.load([DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava/window/package/window/WndPackage.js']);

function create_WindowPackageAction(windowEl,formId,comboId,statusbarId,type,submitText,callBackSubmit) {
	Ext.QuickTips.init();                //n�cessaire pour initialiser les infobulles d�erreur
	Ext.form.Field.prototype.msgTarget = 'side';    //n�cessaire pour initialiser les infobulles d�erreur

	var wnd = new Workspace.window.Package.WindowPackage ({
		el:windowEl,
		formId:formId,
		comboId:comboId,
		statusbarId:statusbarId,
		type:type,
		submitText:submitText,
		callBackSubmit:callBackSubmit
	});

	return wnd;
}
//
//	// package_content_panel => login
//	var comboPackageAction = create_ComboPackage(comboId, type);
//	comboPackageAction.fieldLabel = 'Package';
//	// Add a listener to take some action when a node is moved. 
//	comboPackageAction.addListener('select', function (cmb, record, index){
//		Ext.getCmp('package').value=record.data.package;
//		Ext.getCmp(statusbarId).setText('Create package \''+record.data.package+'\'');
//	});
//
//	var package_content_panel = new Ext.FormPanel({
//		id: formId,   //id de la fen�tre
//		frame: true,                 //pour que tous les items soient dans la m�me frame
//		autoWidth: true,            //largeur de la fen�tre
//		autoHeight: true,            //hauteur de la fen�tre
//		labelWidth: 110,             //largeur des labels des champs
//		//defaults: {width: 230},         //largeur des champs
//		labelAlign: 'right',            //les labels s'aligneront a droite        
//		bodyCfg: {tag:'center', cls:'x-panel-body'},        //on aligne tous les champs au milieu de la fen�tre
//		bodyStyle: 'padding:5p;margin:0px; ',
//		items: [
//			comboPackageAction,
//			{
//			    xtype: 'hidden',        //Balise cach�e afin de dire qu'il s'agit d'une connexion
//			    id: 'package',
//			    name: 'package',
//			    allowBlank: false
//			}
//		],
//		buttons: [
//		{
//			xtype: 'button',
//			text: 'Detail',
//			handler: function() {
////				var tPackageDetail = createTreePackageDetail ('treePackageDetail');
////				tPackageDetail.root.reload();
//				new Ext.Window({
//					title: 'Package Detail',        //titre de la fen�tre
//					// el = id du div dans le code html de la page qui contiendra la popup
//					//el:windowEl,        
//					layout:'fit',
//					width:400,
//					height:300,
//					//autoHeight: true,        //hauteur de la fen�tre
//					modal: true,             //Grise automatiquement le fond de la page
//					closeAction:'hide',
//					plain: true,
//					//autoScroll:true,
//					//hideBorders:true,
//					//titleCollapse:true,
//					//header:false,
//					//items: tPackageDetail        //On met dans cette fen�tre le panel pr�c�dent
//					items: [{
//						xtype:'WorkspaceTreeTreePackageDetail',
//						id : 'treePackageDetail',
//						type : type
//					}]
//				}).show();
//			}
//		},
//		{
//			xtype: 'button',
//			text: submitText,
//			handler: callBackSubmit    //fonction � appeler lorsque l�on clique sur le bouton
//		}
//		/*
//		{
//			xtype: 'panel',
//			bodyCfg: {tag:'center'},        //alignement au milieu
//			border: false,
//			items: {
//				xtype: 'button',
//				text: submitText,
//				handler: callBackSubmit    //fonction � appeler lorsque l�on clique sur le bouton
//			}
//		}
//		*/
//		]
//	});
//
//	/**
//	 * Voila notre formulaire cr��. Afin de rendre le design plus attrayant, nous allons ajouter un nouveau panel contenant une status bar. Il s�agit d�une petite ligne en bas � gauche de la fen�tre affichant l��tat de la connexion : � formulaire valide, connexion r�ussie, mot de passe incorrect � �
//	 */
//
//	//Ce panel contiendra le panel pr�c�dent qui est le formulaire, sauf qu'en bas de celui ci figure la status bar, permettant d'afficher le status de la connexion (chargement ....)
//	var package_main_panel = new Ext.Panel({
//		autoWidth: true,             //largeur de la fen�tre
//		autoHeight: true,            //hauteur de la fen�tre
//	    layout: 'fit',
//	    bbar: new Ext.ux.StatusBar({
//	        id: statusbarId,
//	        defaultText: 'Pr�t',
//	        plugins: new Ext.ux.ValidationStatus({form:formId})
//
//	    }),
////	    items: package_content_panel  //On met dans ce panel le panel de login
//		items [
//		   {
//			   xtype:'WorkspaceWindowPackagePanelPanelPackage',
//			   callBackSubmit:this.callBackSubmit
//		   }
//		]
//	});
//
//	/**
//	 * Enfin, cr�ons la fonction qui va instancier la fen�tre contenant ce panel
//	 */
//	//Si la fen�tre de connexion n'existe pas, on la cr�e
//    var package_window = new Ext.Window({
//	    title: 'Package Action',        //titre de la fen�tre
//	    // el = id du div dans le code html de la page qui contiendra la popup
//	    el:windowEl,        
//	    layout:'fit',
//	    width:400,
//	    autoHeight: true,        //hauteur de la fen�tre
//	    modal: true,             //Grise automatiquement le fond de la page
//	    closeAction:'hide',
//	    plain: true,
//	    items: [
//			{
//				xtype:'panel',
//				autoWidth: true,             //largeur de la fen�tre
//				autoHeight: true,            //hauteur de la fen�tre
//			    layout: 'fit',
//			    bbar: new Ext.ux.StatusBar({
//			        id: statusbarId,
//			        defaultText: 'Pr�t'
//			        //,plugins: new Ext.ux.ValidationStatus({form:formId})
//			
//			    }),
//			//    items: package_content_panel  //On met dans ce panel le panel de login
//				items [
//				   {
//					   xtype:'WorkspaceWindowPackagePanelPanelPackage',
//					   callBackSubmit:this.callBackSubmit
//				   }
//				]
//			}
//	    ]
//    });
//
//    return package_window;
//}
