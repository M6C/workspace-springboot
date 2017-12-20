// NAMESPACE
Ext.ns('Workspace.window.ClasspathDetail.tree');

Workspace.window.ClasspathDetail.tree.TreeClasspathDetail = Ext.extend(Ext.tree.TreePanel, {
    //id:treeId,
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
	loader: new Ext.tree.TreeLoader({
		url: DOMAIN_NAME_ROOT + '/action.servlet?event=JsonClasspathDetail',
		//requestMethod: 'GET',
		//preloadChildren: true,
		clearOnLoad: true,
	    listeners:{
	        //scope: this, //yourScope
	        'beforeload': function(treeLoader, node) {
        		treeLoader.baseParams.pApplication = Ext.getCmp('project').value;
	        }
	   }
	}),
    root: {
	    //nodeType: 'async',
	    text: 'root',//Ext.getCmp('project').value,
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
Ext.reg('WorkspaceTreeTreeClasspathDetail',Workspace.window.ClasspathDetail.tree.TreeClasspathDetail);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//var treeClasspathDetail;
//
//function createTreeClasspathDetail (treeId) {
//	/*  Add the tree object. At this stage it isnt attached to the layout - it is just a stand alone object
//	This section was added to the example
//	*/
//
//	// shorthand reference to (slightly) reduce complexity later
//    //var Tree = Ext.tree;
//
//    var treeLoader = new Ext.tree.TreeLoader({
//		url: DOMAIN_NAME_ROOT + '/action.servlet?event=JsonClasspathDetail',
//		//requestMethod: 'GET',
//		//preloadChildren: true,
//		clearOnLoad: true
//	});
//	treeLoader.baseParams.pApplication = Ext.getCmp('project').value;

//    var root = {
//	        //nodeType: 'async',
//	        text: Ext.getCmp('project').value,
//	        draggable: false,
//			expanded:true,
//	        id: 'root'
//	    };
//
//   treeClasspathDetail = new Ext.tree.TreePanel({
//	    id:treeId,
//		//title:'Directorytitle',
//	    //renderTo: 'west-tree',
//	    useArrows: true,
//	    layout:'fit',
//			autoScroll: true,
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
//   var treeEditorDetail = new Ext.tree.TreeEditor(treeClasspathDetail, {/* fieldconfig here */ }, {
//       allowBlank:false,
//       blankText:'A project is required',
//       selectOnFocus:true
//   });
//
//   // add a tree sorter in folder mode
//   new Ext.tree.TreeSorter(treeClasspathDetail, {folderSort:true});
//
//    return treeClasspathDetail;
//	/* End of tree definition */	
//}
