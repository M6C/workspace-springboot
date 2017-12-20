// NAMESPACE
Ext.ns('Workspace.tree');

Workspace.tree.TreeCompletion = Ext.extend(Ext.tree.TreePanel, {
//    id:treeId,
	//title:'Directorytitle',
    //renderTo: 'west-tree',
    useArrows: true,
    layout:'fit',
	autoScroll: true,
    animate: true,
    enableDD: true,
    containerScroll: true,
    border: false,
    collapsible: false,
    rootVisible: false,
	//loader: treeLoader,
	loader: new Ext.tree.TreeLoader({
		url: DOMAIN_NAME_ROOT + '/action.servlet?event=JsonCompletion',
		//requestMethod: 'GET',
		//preloadChildren: true,
		clearOnLoad: true,
	    listeners:{
	        //scope: this, //yourScope
	        'beforeload': function(treeLoader, node) {
        		treeLoader.baseParams.caretPos = node.ownerTree.pos;
        		treeLoader.baseParams.source = node.ownerTree.txt;
	        }
	   }
	}),
    //root: root,
    root: {
	    //nodeType: 'async',
	    text: 'root',//Ext.getCmp('project').value,
	    draggable: false,
		expanded:true,
	    id: 'root'
    },
    listeners: {
		'render': function (tree){
	   		this.keys = new Ext.KeyMap(this.getEl(), [
	   		  { 
	            key: Ext.EventObject.ENTER, // code:13
	            scope: this,
	            fn: function(key, e) {
	              var sm = this.getSelectionModel();
	              var node = sm.getSelectedNode();
	              console.log( node );
	              node.ownerTree.onSubmitTree(this, key, e);
	            }}
	          ]);

	   		// add a tree sorter in folder mode
	   	    new Ext.tree.TreeSorter(tree, {folderSort:true});

	   		tree.root.expand(true, true, function(n) {n.firstChild.select();});
		},
		'contextmenu': function(e) {
			// Init your context menu
		}
    },
    onSubmitTree: new function(tree, key, evt) {}
});

// REGISTER
Ext.reg('WorkspaceTreeTreeCompletion',Workspace.tree.TreeCompletion);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//var treeCompletion;

//function createTreeCompletion (treeId, txt, pos, fnOnSubmitTree) {
//	/*  Add the tree object. At this stage it isnt attached to the layout - it is just a stand alone object
//	This section was added to the example
//	*/
//
//	// shorthand reference to (slightly) reduce complexity later
//    //var Tree = Ext.tree;
//
//    var treeLoader = new Ext.tree.TreeLoader({
//		url: DOMAIN_NAME_ROOT + '/action.servlet?event=JsonCompletion',
//		//requestMethod: 'GET',
//		//preloadChildren: true,
//		clearOnLoad: true
//	});
//	//treeLoader.baseParams.pApplication = Ext.getCmp('project').value;
//	treeLoader.baseParams.caretPos = pos;
//	treeLoader.baseParams.source = txt;
//
//    var root = {
//	        //nodeType: 'async',
//	        text: Ext.getCmp('project').value,
//	        draggable: false,
//			expanded:true,
//	        id: 'root'
//	    };
//
//   treeCompletion = new Ext.tree.TreePanel({
//	    id:treeId,
//		//title:'Directorytitle',
//	    //renderTo: 'west-tree',
//	    useArrows: true,
//	    layout:'fit',
//		autoScroll: true,
//	    animate: true,
//	    enableDD: true,
//	    containerScroll: true,
//	    border: false,
//        collapsible: false,
//        rootVisible: false,
//    	loader: treeLoader,
//	    root: root,
//        listeners: {
//          render: function() {
//	   		this.keys = new Ext.KeyMap(this.getEl(), [
//	   		  { 
//	            key: Ext.EventObject.ENTER, // code:13
//	            scope: this,
//	            fn: function(key, e) {
//	              var sm = this.getSelectionModel();
//	              var node = sm.getSelectedNode();
//	              console.log( node );
//	              fnOnSubmitTree(this, key, e);
//	            }}
//	          ]);
//          },
//          contextmenu: function(e) {
//          // Init your context menu
//          }
//	    }
//	});
//
//   /*Element*/ var panelEl = treeCompletion.getElement();
//   
//   /*KeyMap*/ var map = new KeyMap(panelEl, new KeyMapConfig(){
//     {
//       setKey(EventObject.ENTER);
//       setKeyListener(new KeyListener() {
//         public void onKey(/*int*/ key, /*EventObject*/ e) {
//            console.log('ENTER Pressed');
//         }
//     });
//     }
//   });
//
//   treeCompletion.keymap = new Ext.KeyMap(treeCompletion.getEl(), [
//     { 
//       key: Ext.EventObject.ENTER, // code:13
//       scope: treeCompletion,
//       fn: function(key, e) {
//         var sm = treeCompletion.getSelectionModel();
//         var node = sm.getSelectedNode();
//         console.log( node );
//       }}
//]);
//   
//   treeCompletion.root.expand(true, true, function(n) {n.firstChild.select();});
//
///*
//   var treeEditorDetail = new Ext.tree.TreeEditor(treeCompletion, {/ fieldconfig here / }, {
//       allowBlank:false,
//       blankText:'A project is required',
//       selectOnFocus:true
//   });
//*/
//   // add a tree sorter in folder mode
//   new Ext.tree.TreeSorter(treeCompletion, {folderSort:true});
//
//    return treeCompletion;
//	/* End of tree definition */	
//}
