// DEPENDENCE
Ext.Loader.load([DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava/window/toolxmlxsl/window/WndToolXmlXsl.js']);

function create_WindowToolXmlXsl(windowEl,submitFunction) {
	Ext.QuickTips.init();                //n�cessaire pour initialiser les infobulles d�erreur
	Ext.form.Field.prototype.msgTarget = 'side';    //n�cessaire pour initialiser les infobulles d�erreur

	var wnd = new Workspace.window.ToolXmlXsl.WindowToolXmlXsl ({
		el:windowEl,
		callBackSubmit:submitFunction
	});

	return wnd;
}

///**
// * http://www.javascriptfr.com/tutoriaux/EXTJS-MINI-TUTO-INTERRACTION-AVEC-BASE-DONNEES_853.aspx
// */

//function create_WindowToolXmlXsl(windowEl,submitFunction) {
//	Ext.QuickTips.init();                //n�cessaire pour initialiser les infobulles d�erreur
//	Ext.form.Field.prototype.msgTarget = 'side';    //n�cessaire pour initialiser les infobulles d�erreur
//
//	// Textfields
//	var txtXmlFilename = create_TextFieldFileChose('xml_filename_id', 'Filename', 'pathXml');
//	var txtXmlName = create_TextFieldFileChose('xml_name_id', 'Name', 'xmlName');
//	var txtXslFilename = create_TextFieldFileChose('xsl_filename_id', 'Filename', 'pathXsl');
//
//	var scopeData = [
//         ['request', 'Request'],
//         ['session', 'Session']
//	];
//	var storeScope = new Ext.data.ArrayStore({
//	    fields: ['id', 'name'],
//		autoload:true,
//	    data : scopeData
//	});
//	var comboScope = new Ext.form.ComboBox({
//		id:'xmlScope',
//		name:'xmlScope',
//		store: storeScope,
//		displayField:'name',
//		mode: 'local',
//		triggerAction: 'all',
//		emptyText:'Select a scope...',
//		fieldLabel:'Scope',
//		selectOnFocus:true
//	});
//
//	var build_content_panel = new Ext.FormPanel({
//		id: 'xml_xsl_content_panel',   //id du formulaire
//		frame: true,                 //pour que tous les items soient dans la m�me frame
//		autoWidth: true,            //largeur de la fen�tre
//		autoHeight: true,            //hauteur de la fen�tre
//		labelWidth: 110,             //largeur des labels des champs
//		defaults: {width: 230},         //largeur des champs
//		labelAlign: 'right',            //les labels s'aligneront a droite        
//		bodyCfg: {tag:'center', cls:'x-panel-body'},        //on aligne tous les champs au milieu de la fen�tre
//		bodyStyle: 'padding:5p;margin:0px; ',
//		items: [
//			txtXmlFilename,
//			txtXmlName,
//			comboScope,
//			txtXslFilename,
//			{
//				xtype:'hidden',
//				id:'xml_xsl_param_name',
//				name:'xslParamName'
//			}
//		],
//		buttons: [
//			{
//				xtype: 'button',
//				text: 'Init Default',
//				handler: function () {
////					Ext.getCmp('xml_name_id').setValue('resultDom');
////					Ext.getCmp('xsl_filename_id').setValue('[WorkSpace_Dev]/WorkSpace/Xsl/WorkSpace_Security.xsl');
////					Ext.getCmp('xmlScope').setValue('Session');
////
////					Ext.getCmp('xspmyPWD').setValue('jesuis2con');
////					Ext.getCmp('xspmyID').setValue('droca');
//
//					if (Ext.getCmp('xml_name_id'))
//						Ext.getCmp('xml_name_id').setValue('resultDom');
//					if (Ext.getCmp('xsl_filename_id'))
//						Ext.getCmp('xsl_filename_id').setValue('[WorkSpace_Dev]/WorkSpace/XslExtjs/Json/TreePackageDetail.xsl');
//					if (Ext.getCmp('xmlScope'))
//						Ext.getCmp('xmlScope').setValue('Session');
//
//					if (Ext.getCmp('xsppApplication'))
//						Ext.getCmp('xsppApplication').setValue('WorkSpace_Dev');
//					if (Ext.getCmp('xsppType'))
//						Ext.getCmp('xsppType').setValue('War');
//					if (Ext.getCmp('xsppName'))
//						Ext.getCmp('xsppName').setValue('Deploy_Dev');
//				}
//			},
//			{
//				xtype: 'button',
//				text: 'Upate Xsl parameter',
//				handler: updateXslParameter
//			},
//			{
//				xtype: 'button',
//				text: 'Transform',
//				handler: submitFunction    //fonction � appeler lorsque l�on clique sur le bouton
//			}
//		]
//	});
//	
//	function updateXslParameter() {
//	  	var project = Ext.getCmp('project').value;
//  		var pathXsl = Ext.getCmp('xsl_filename_id').getValue();//Ext.getCmp('xsl_filename_id').value;
//  		var requestUrl = DOMAIN_NAME_ROOT + '/action.servlet?event=JsonXmlXslParameter';
//  		console.info('updateXslParameter pathXsl:'+pathXsl);
//		showWindowWaiting();
//  		Ext.Ajax.request({
//  		   url: requestUrl,
//  		   params: {pathXml:pathXsl},
//  		   success: function(result, request){
//  		     var resultMessage = '';
//  		     try {
//  		    	console.info('updateXslParameter success:'+result.responseText);
//				var container = Ext.getCmp('xml_xsl_content_panel');//xml_xsl_container_param');
//  			    var jsonData = Ext.util.JSON.decode(result.responseText);
//				var items = jsonData.data;
//  		    	console.info('updateXslParameter success: container.items.length:'+container.items.length);
//  		    	//container.removeAll();
//				for (var i = 0 ; i < container.items.length ; i++) {
//				  var item = container.get(i);
//				  if (item!=undefined) {
//					  console.info('updateXslParameter item('+i+') xtype:'+item.xtype+' id:'+item.id);
//					  if (item.xtype=='textfield' && item.id.match('^xsp')=='xsp') {
//						console.info('updateXslParameter remove item('+i+').id:'+item.id);
//						container.remove(item);
//						i--;
//					  }
//				  }
//				}
//			    console.info('updateXslParameter add items.length:'+items.length);
//				var paramName = '';
//				for (var i = 0 ; i < items.length ; i++) {
//				    console.info('updateXslParameter add items['+i+'].param:'+items[i].param);
//				    if (items[i].param!='') {
//					  container.add(
//						{
//							xtype:'textfield',
//							id:'xsp'+items[i].param,
//							name:items[i].param,
//					      	fieldLabel:items[i].param
//						}
//					  );
//					  paramName += items[i].param+';';
//					}
//				}
//				container.doLayout();
//				Ext.getCmp('xml_xsl_param_name').setValue(paramName);
//				console.info('updateXslParameter xml_xsl_param_name.getValue():'+Ext.getCmp('xml_xsl_param_name').getValue());
//  			   }
//  			   finally {
//			      hideWindowWaiting(resultMessage);
//			   }
//  		   },
//  		   failure: function (result, request) {
//  		     var resultMessage = '';
//  		     try {
//  		    	 alert('updateXslParameter failure:'+result.responseText);
////  			    var jsonData = Ext.util.JSON.decode(result.responseText);
////  			    resultMessage = jsonData.data[0].message;
//  			   }
//  			   finally {
//			      hideWindowWaiting(resultMessage);
//			   }
//  		   }
//  		});
//	}
//
//	/**
//	 * Voila notre formulaire cr��. Afin de rendre le design plus attrayant, nous allons ajouter un nouveau panel contenant une status bar. Il s�agit d�une petite ligne en bas � gauche de la fen�tre affichant l��tat de la connexion : � formulaire valide, connexion r�ussie, mot de passe incorrect � �
//	 */
//
//	/**
//	 * Enfin, cr�ons la fonction qui va instancier la fen�tre contenant ce panel
//	 */
//	//Si la fen�tre n'existe pas, on la cr�e
//    var xml_xsl_window = new Ext.Window({
//	    title: 'Xml/Xsl Tranformation',        //titre de la fen�tre
//	    // el = id du div dans le code html de la page qui contiendra la popup
//	    el:windowEl,        
//	    layout:'fit',//'accordion',
//		animCollapse:false,
//		defaults: {
//			// applied to each contained panel
//			//bodyStyle: 'padding:15px'
//		},
//		layoutConfig: {
//			// layout-specific configs go here
//			titleCollapse: false,
//			animate: true,
//			activeOnTop: true
//		},
//	    width:400,
//	    autoHeight: true,        //hauteur de la fen�tre
//	    modal: true,             //Grise automatiquement le fond de la page
//	    closeAction:'hide',
//	    plain: true,
//	    items: [
//			{
//				//Ce panel contiendra le panel pr�c�dent qui est le formulaire, sauf qu'en bas de celui ci figure la status bar, permettant d'afficher le status de la connexion (chargement ....)
//				xtype:'panel',
//				id:'xml_xsl_form_panel',        
//				autoWidth: true,             //largeur de la fen�tre
//				autoHeight: true,            //hauteur de la fen�tre
//				animCollapse:false,
//				layout: 'fit',
//				bbar: new Ext.ux.StatusBar({
//					id: 'form-statusbar-xml_xsl',
//					defaultText: 'Pr�t',
//					plugins: new Ext.ux.ValidationStatus({form:'xml_xsl_content_panel'})
//		
//				}),
//				items: [
//					build_content_panel  //On met dans ce panel le panel de login
//				]
//			},
//			{
//				xtype:'panel',
//				id:'xml_xsl_viewer_panel',        
//				autoWidth: true,             //largeur de la fen�tre
//				autoHeight: true,            //hauteur de la fen�tre
//				animCollapse:false,
//	    		layout:'fit',
//				collapseFirst:true,
//				collapsed:true,
//				items: [
//					{
//						xtype: 'htmleditor',
//						id: 'xml_viewer',
//						enableColors: true,
//						enableAlignments: true,
//						autoWidth: true,
//						autoHeight: true,
//						boxMinHeight: 150
//					}
//				],
//				buttons: [
//					{
//						xtype: 'button',
//						text: 'Back',
//						handler: function () {
//							Ext.getCmp('xml_xsl_form_panel').expand();
//							Ext.getCmp('xml_xsl_viewer_panel').collapse();
//					    }
//					}
//				]
//			}
//		]
//    });
//
//    return xml_xsl_window;
//}