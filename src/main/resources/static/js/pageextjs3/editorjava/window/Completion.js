// DEPENDENCE
Ext.Loader.load([DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava/window/completion/window/WndCompletion.js']);

function create_WindowCompletionAction(windowEl, txt, pos, callBackSubmitTree) {
	Ext.QuickTips.init();                //n�cessaire pour initialiser les infobulles d�erreur
	Ext.form.Field.prototype.msgTarget = 'side';    //n�cessaire pour initialiser les infobulles d�erreur

	var wnd = new Workspace.window.Completion.WindowCompletion ({
		el:windowEl,
		pos: pos,
		txt: txt,
		callBackSubmit:callBackSubmitTree
	});

	return wnd;
//
////	var tCompletion = createTreeCompletion ('treeCompletion', txt, pos, fnOnSubmitTree);
////	/*
////	* @event keyup
////    * Fires when a keyup is detected within the element.
////    * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
////    * @param {HtmlElement} t The target of the event.
////    * @param {Object} o The options configuration passed to the {@link #addListener} call.
////    */
////	tCompletion.addListener('keyup', function (event, element, option){
////		console.log('create_WindowCompletionAction tCompletion keyup');
////	});
////	
////	tCompletion.on('dbclick', function(node){ // tree is the created ExtJS tree object  
////		console.log('create_WindowCompletionAction tCompletion click');
////	});
////	
////	tCompletion.root.reload();
//
//	var classpath_window = new Ext.Window({
//		title: 'Method list',        //titre de la fen�tre
//		// el = id du div dans le code html de la page qui contiendra la popup
//		//el:windowEl,        
//		layout:'fit',
//		width:400,
//		height:300,
//		//autoHeight: true,        //hauteur de la fen�tre
//		modal: true,             //Grise automatiquement le fond de la page
//		closeAction:'hide',
//		plain: true,
//		//autoScroll:true,
//		//hideBorders:true,
//		//titleCollapse:true,
//		//header:false,
//		//items: tCompletion        //On met dans cette fen�tre le panel pr�c�dent
//		items:  [
//        	{
//        		xtype:'WorkspaceTreeTreeCompletion',
//        		id:'treeCompletion',
//        		pos: pos,
//        		txt: txt,
//        		onSubmitTree: fnOnSubmitTree
//        	}
//	    ]
//	});
//
//	return classpath_window;
}