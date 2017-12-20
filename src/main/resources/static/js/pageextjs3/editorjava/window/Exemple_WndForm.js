/**
 * http://www.javascriptfr.com/tutoriaux/EXTJS-MINI-TUTO-INTERRACTION-AVEC-BASE-DONNEES_853.aspx
 */
Ext.QuickTips.init();                //nécessaire pour initialiser les infobulles d’erreur
Ext.form.Field.prototype.msgTarget = 'side';    //nécessaire pour initialiser les infobulles d’erreur


function fct_inscription(btn){
    //Fonction pour rediriger l’utilisateur sur la même page où il se trouve.
	location.replace = location.href ;
}

//Fonction appelée en cliquant sur submit du formulaire
function fct_submit() {
	var sb = Ext.getCmp('form-statusbar');    //on instancie la statusbar en bas a gauche de la fenêtre
	sb.showBusy('connexion ...');            //on y affiche un message de chargement
	build_content_panel.getEl().mask();                //on applique un masque gris sur la fenêtre nommée login

	if (build_content_panel.form.isValid()) {            //si le formulaire dans login est valide
		build_content_panel.form.submit({            //similaire à la méthode post
		    url: 'log_post.php',        //URL de la page sur laquelle on effectue la méthode post
		    method: 'POST',
		    reset: false,            //pour ne pas reseter les formulaires en cas d'échec
		    //Si une erreur est survenue lors du POST
		    failure: function(result, action) {
			//L'objet JSON vas rechercher dans lire le résultat du POST et le décoder
		    obj = Ext.util.JSON.decode(action.response.responseText);
		    //S'il s'agit d'une phrase générale on l'affiche(errors = type d'action ; reason : nom de l'action, on peut nommer cela comme on veut dans le formulaire post)
		    var message = obj.errors.reason;    
		    //si le message n'inclue pas un ID précis d'un champ de notre formulaire, on affiche simplement un message d'erreur général dans notre status bar, et non a droite du champ concerné
		    if (message == undefined) message = obj.errors[0].msg;        
		        sb.setStatus({        //On modifie le texte de notre status bar
		            text:'Erreur : '+ message,
		            iconCls:'',
		            clear: true
		        });
		    }, //fin de la fonction failure
		    //S'il n'y a pas eu d'erreur dans notre POST...
		    success: function(result, action) {
		        //Message de bienvenue
		        obj = Ext.util.JSON.decode(action.response.responseText);
		        var message = obj.msg.reason;        //on recherche le message à afficher
		        sb.setStatus({
		            text:'Authentification réussie : '+ message,
		            iconCls:'',
		            clear: true
		        });
		        //msgbox affichant le message de connexion, puis redirige l'utilisateur s'il clique sur ok
		        Ext.MessageBox.alert('Bienvenue', message, fct_inscription);
		    }    //fin de la fonction success
		});    //fin du submit
	} else {        //Si le formulaire n'est pas valide, on change la phrase dans notre status bar
	    sb.setStatus({
	        text:'Erreur : Formulaire non valide.',
	        iconCls:'',
	        clear: true
	    });
	}
	build_content_panel.getEl().unmask();
}





var build_content_panel;
var build_main_panel;
var build_window;
function show_build_window(){

	// build_content_panel => login
	if (!build_content_panel) {
		build_content_panel = new Ext.FormPanel({
			id: 'build_content_panel',   //id de la fenêtre
			frame: true,                 //pour que tous les items soient dans la même frame
			autoWidth: true,            //largeur de la fenêtre
			autoHeight: true,            //hauteur de la fenêtre
			labelWidth: 110,             //largeur des labels des champs
			defaults: {width: 230},         //largeur des champs
			labelAlign: 'right',            //les labels s'aligneront a droite        
			bodyCfg: {tag:'center', cls:'x-panel-body'},        //on aligne tous les champs au milieu de la fenêtre
			bodyStyle: 'padding:5p;margin:0px; ',
			
			items: [{        //Ici, on affiche à la suite tous les champs que l'on veut mettre
				xtype: 'textfield',            // = champ de texte
			    fieldLabel: 'Adresse Email',         // = label de description du champ
			    id: 'email',
			    name: 'email',
			    vtype: 'email',     //Vérification type : met un masque d'adresse email sur ce champ
			    vtypeText: 'Votre adresse email doit être de la forme de "user@domain.com"',
			    //message si email non valide
			    allowBlank: false,                //champ obligatoire pour poster le formulaire
			    blankText:"Veuillez saisir votre adresse email."    //message si le champ n'est pas rempli
			},{
			    xtype: 'textfield',
			    fieldLabel: 'Mot de passe',
			    id: 'pass',
			    name: 'pass',
			    allowBlank: false,
			    inputType: 'password',
			    blankText:"Veuillez saisir votre mot de passe."
			},{
			    xtype:'checkbox',
			    boxLabel : ' ',
			    fieldLabel: 'Se souvenir de moi',
			    checked: true,
			    style: 'position:relative;',
			    name: 'save'
			},{
			    xtype: 'button',
			    text: 'Se connecter',
			    handler: fct_submit    //fonction à appeler lorsque l’on clique sur le bouton
			},{
			    xtype: 'hidden',        //Balise cachée afin de dire qu'il s'agit d'une connexion
			    id: 'connexion',
			    name: 'connexion'
			},{
			    html: '<a class="lien" href="recup.php">Mot de passe oublié?</a>',    
			    //dans les balises html: on peut mettre n'importe quel code html
			    bodyStyle:
			    {
			        paddingTop: '20px'
			    }
			},{
			    html: '<a class="lien" href="inscrip.php">Créer un nouveau compte</a>'
			}]
		});
	}

	/**
	 * Voila notre formulaire créé. Afin de rendre le design plus attrayant, nous allons ajouter un nouveau panel contenant une status bar. Il s’agit d’une petite ligne en bas à gauche de la fenêtre affichant l’état de la connexion : « formulaire valide, connexion réussie, mot de passe incorrect … »
	 */

	//Ce panel contiendra le panel précédent qui est le formulaire, sauf qu'en bas de celui ci figure la status bar, permettant d'afficher le status de la connexion (chargement ....)
	if (!build_main_panel) {
		build_main_panel = new Ext.Panel({
			autoWidth: true,             //largeur de la fenêtre
			autoHeight: true,            //hauteur de la fenêtre
		    layout: 'fit',
		    items: build_content_panel,  //On met dans ce panel le panel de login
		    bbar: new Ext.ux.StatusBar({
		        id: 'form-statusbar',
		        defaultText: 'Prêt',
		        plugins: new Ext.ux.ValidationStatus({form:'build_content_panel'})
		    })
		});
	}

	/**
	 * Enfin, créons la fonction qui va instancier la fenêtre contenant ce panel
	 */
	if(!build_window){
		//Si la fenêtre de connexion n'existe pas, on la crée
	    build_window = new Ext.Window({
		    title: 'Authentification',        //titre de la fenêtre
		    el:'popup_log_window',        
		
		    //********* el = id du div dans le code html de la page qui contiendra la popup ! ************//
		    layout:'fit',
		    width:400,
		    autoHeight: true,        //hauteur de la fenêtre
		    modal: true,             //Grise automatiquement le fond de la page
		    closeAction:'hide',
		    plain: true,
		    items: build_main_panel        //On met dans cette fenêtre le panel précédent
	    });
	}

    build_window.show();
}

