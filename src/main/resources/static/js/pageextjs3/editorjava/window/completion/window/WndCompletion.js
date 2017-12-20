// DEPENDENCE
Ext.Loader.load([DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava/window/completion/tree/TreeCompletion.js']);

// NAMESPACE
Ext.ns('Workspace.window.Completion');

// Window
Workspace.window.Completion.WindowCompletion = Ext.extend(Ext.Window, {
	// private
    initComponent : function(){
	    this.items = [
          	{
        		xtype:'WorkspaceTreeTreeCompletion',
        		id:'treeCompletion',
        		pos: this.pos,
        		txt: this.txt,
        		onSubmitTree: this.callBackSubmit
        	}
	    ]

	    Workspace.window.Completion.WindowCompletion.superclass.initComponent.call(this);
	},
	title: 'Method list',        //titre de la fen�tre
	// el = id du div dans le code html de la page qui contiendra la popup
	//el:windowEl,        
	layout:'fit',
	width:400,
	height:300,
	//autoHeight: true,        //hauteur de la fen�tre
	modal: true,             //Grise automatiquement le fond de la page
	closeAction:'hide',
	plain: true
	//autoScroll:true,
	//hideBorders:true,
	//titleCollapse:true,
	//header:false,
	//items: tCompletion        //On met dans cette fen�tre le panel pr�c�dent
//	,items:  [
//    	{
//    		xtype:'WorkspaceTreeTreeCompletion',
//    		id:'treeCompletion',
//    		pos: pos,
//    		txt: txt,
//    		onSubmitTree: fnOnSubmitTree
//    	}
//    ]
});
//
///**
///**
// * http://www.javascriptfr.com/tutoriaux/EXTJS-MINI-TUTO-INTERRACTION-AVEC-BASE-DONNEES_853.aspx
// */
//
//function create_WindowCompletionAction(windowEl, txt, pos, fnOnSubmitTree) {
//	Ext.QuickTips.init();                //n�cessaire pour initialiser les infobulles d�erreur
//	Ext.form.Field.prototype.msgTarget = 'side';    //n�cessaire pour initialiser les infobulles d�erreur
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
//}