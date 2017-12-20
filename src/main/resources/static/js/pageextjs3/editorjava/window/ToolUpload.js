// DEPENDENCE
Ext.Loader.load([DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava/window/toolupload/window/WndToolUpload.js']);

function create_WindowToolUpload(windowEl) {
	Ext.QuickTips.init();                //n�cessaire pour initialiser les infobulles d�erreur
	Ext.form.Field.prototype.msgTarget = 'side';    //n�cessaire pour initialiser les infobulles d�erreur

	var wnd = new Workspace.window.ToolUpload.WindowToolUpload ({
		el:windowEl
	});

	return wnd;
}
//
///**
// * http://www.javascriptfr.com/tutoriaux/EXTJS-MINI-TUTO-INTERRACTION-AVEC-BASE-DONNEES_853.aspx
// */
//
//function create_WindowToolUpload(windowEl) {
//	Ext.QuickTips.init();                //n�cessaire pour initialiser les infobulles d�erreur
//	Ext.form.Field.prototype.msgTarget = 'side';    //n�cessaire pour initialiser les infobulles d�erreur
///*
//	var build_content_panel = new Ext.FormPanel({
//		id: 'build_content_panel',   //id de la fen�tre
//		frame: true,                 //pour que tous les items soient dans la m�me frame
//		autoWidth: true,            //largeur de la fen�tre
//		autoHeight: true,            //hauteur de la fen�tre
//		labelWidth: 110,             //largeur des labels des champs
//		defaults: {width: 230},         //largeur des champs
//		labelAlign: 'right',            //les labels s'aligneront a droite        
//		bodyCfg: {tag:'center', cls:'x-panel-body'},        //on aligne tous les champs au milieu de la fen�tre
//		bodyStyle: 'padding:5p;margin:0px; ',
//		fileUpload: true,
//		items: [
//		comboProjectAction,
//		{
//		    xtype: 'button',
//		    text: submitText,
//		    handler: submitFunction    //fonction � appeler lorsque l�on clique sur le bouton
//		}
//		]
//	});
//*/
//	var build_content_panel = new Ext.FormPanel({
//		id: 'build_content_panel',
//        fileUpload: true,
//        width: 500,
//        autoHeight: true,
//        bodyStyle: 'padding: 10px 10px 10px 10px;',
//        labelWidth: 50,
//        defaults: {
//            anchor: '95%',
//            allowBlank: false,
//            msgTarget: 'side'
//        },
//        items:[
//        {
//            xtype: 'fileuploadfield',
//            id: 'filedata',
//            emptyText: 'Select a document to upload...',
//            fieldLabel: 'File',
//            buttonText: 'Browse'
//        },{
//		    xtype: 'hidden',        //Balise cach�e afin de dire qu'il s'agit d'une connexion
//		    id: 'application',
//		    name: 'application'
//		}],
//        buttons: [{
//            text: 'Upload',
//            handler: function(){
//                if(build_content_panel.getForm().isValid()){
//                    form_action=1;
//                    var project = Ext.getCmp('project').value;
//                    build_content_panel.getForm().submit({
//                        url: DOMAIN_NAME_ROOT + '/action.servlet?event=EditorJavaPageUploadValider',
//                        params: {application:project},
//                        waitMsg: 'Uploading file...',
//                        success: function(form,action){
//                            msg('Success', 'Processed file on the server');
//                        }
//                    });
//                }
//            }
//        }]
//    });
//
//	/**
//	 * Voila notre formulaire cr��. Afin de rendre le design plus attrayant, nous allons ajouter un nouveau panel contenant une status bar. Il s�agit d�une petite ligne en bas � gauche de la fen�tre affichant l��tat de la connexion : � formulaire valide, connexion r�ussie, mot de passe incorrect � �
//	 */
//
//	//Ce panel contiendra le panel pr�c�dent qui est le formulaire, sauf qu'en bas de celui ci figure la status bar, permettant d'afficher le status de la connexion (chargement ....)
//	var build_main_panel = new Ext.Panel({
//		autoWidth: true,             //largeur de la fen�tre
//		autoHeight: true,            //hauteur de la fen�tre
//	    layout: 'fit',
//	    bbar: new Ext.ux.StatusBar({
//	        id: 'form-statusbar-project',
//	        defaultText: 'Pr�t'
//	        //,plugins: new Ext.ux.ValidationStatus({form:'build_content_panel'})
//
//	    }),
//	    items: build_content_panel  //On met dans ce panel le panel de login
//	});
//
//	/**
//	 * Enfin, cr�ons la fonction qui va instancier la fen�tre contenant ce panel
//	 */
//	//Si la fen�tre de connexion n'existe pas, on la cr�e
//    var build_window = new Ext.Window({
//	    title: 'Project Action',        //titre de la fen�tre
//	    // el = id du div dans le code html de la page qui contiendra la popup
//	    el:windowEl,        
//	    layout:'fit',
//	    width:400,
//	    autoHeight: true,        //hauteur de la fen�tre
//	    modal: true,             //Grise automatiquement le fond de la page
//	    closeAction:'hide',
//	    plain: true,
//	    items: build_main_panel        //On met dans cette fen�tre le panel pr�c�dent
//    });
//
//    return build_window;
//}