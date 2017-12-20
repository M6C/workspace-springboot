// NAMESPACE
Ext.ns('Workspace.tree');

Workspace.tree.TreeDirectory = Ext.extend(Ext.tree.TreePanel, {
    //id:treeId,
	//title:'Directorytitle',
    //renderTo: 'west-tree',
    useArrows: true,
    autoScroll: false,
    animate: true,
    enableDD: true,
    containerScroll: true,
    border: false,
    collapsible: false,
    rootVisible: false,
	loader: new Ext.tree.TreeLoader({
		url: DOMAIN_NAME_ROOT + '/action.servlet?event=JsonTreeDirectory',
		requestMethod: 'GET',
		preloadChildren: true,
		clearOnLoad: true,
	    listeners:{
	        //scope: this, //yourScope
	        'beforeload': function(treeLoader, node) {
	        	if (node.attributes.id!='root') {
	        		treeLoader.baseParams.path = node.attributes.id;
	        	}
	        }
	   }
	}),
    root: {
        nodeType: 'async',
        text: 'Directoryroot',
        draggable: false,
		expanded:true,
        id: 'root'
    },
	listeners:{
	    //scope: this, //yourScope
		'movenode': function (tree, node, oldParent, newParent, index){
			 alert('moved. Old parent node id='+ oldParent.id+'. new parent node id='+newParent.id);
		},
		'render': function (tree){
			new Ext.tree.TreeSorter(tree, {folderSort:true});
		}
    }
});

// REGISTER
Ext.reg('WorkspaceTreeTreeDirectory',Workspace.tree.TreeDirectory);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//var tree;
//
//function createTreeDirectory (treeId) {
//	/*  Add the tree object. At this stage it isnt attached to the layout - it is just a stand alone object
//	This section was added to the example
//	*/
//
//	// shorthand reference to (slightly) reduce complexity later
//    //var Tree = Ext.tree;
//
//    var treeLoader = new Ext.tree.TreeLoader({
//		url: DOMAIN_NAME_ROOT + '/action.servlet?event=JsonTreeDirectory',
//		requestMethod: 'GET',
//		preloadChildren: true,
//		clearOnLoad: true
//	});
//
//    treeLoader.on("beforeload", function(treeLoader, node) {
//    	if (node.attributes.id!='root') {
//    		treeLoader.baseParams.path = node.attributes.id;
//    	}
//    }, this);
//
//    var root = {
//	        nodeType: 'async',
//	        text: 'Directoryroot',
//	        draggable: false,
//			expanded:true,
//	        id: 'root'
//	    };
//
//   tree = new Ext.tree.TreePanel({
//	    id:treeId,
//		//title:'Directorytitle',
//	    //renderTo: 'west-tree',
//	    useArrows: true,
//	    autoScroll: false,
//	    animate: true,
//	    enableDD: true,
//	    containerScroll: true,
//	    border: false,
//        collapsible: false,
//        rootVisible: false,
//    	loader: treeLoader,
//	    root: root
//	});
//
//   // add a tree sorter in folder mode
//   new Ext.tree.TreeSorter(tree, {folderSort:true});
//
//    return tree;
//	/* End of tree definition */	
//}
