// NAMESPACE
Ext.ns('Workspace.tree');

Workspace.tree.TreePackageDetail = Ext.extend(Ext.tree.TreePanel, {
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
		url: DOMAIN_NAME_ROOT + '/action.servlet?event=JsonPackageDetail',
		//requestMethod: 'GET',
		//preloadChildren: true,
		clearOnLoad: true,
	    listeners:{
	        //scope: this, //yourScope
	        'beforeload': function(treeLoader, node) {
        		treeLoader.baseParams.pApplication = Ext.getCmp('project').value;
        		treeLoader.baseParams.pType = Ext.getCmp('pkgtype').value;//'War';
        		treeLoader.baseParams.pName = Ext.getCmp('package').value;
	        }
	   }
	}),
    root: {
	    //nodeType: 'async',
	    text: 'root',//Ext.getCmp('package').value,
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
			new Ext.tree.TreeEditor(tree, {/* fieldconfig here */ }, {
				allowBlank:false,
				blankText:'A name is required',
				selectOnFocus:true
			});
			new Ext.tree.TreeSorter(tree, {folderSort:true});
		}
    }
});

// REGISTER
Ext.reg('WorkspaceTreeTreePackageDetail',Workspace.tree.TreePackageDetail);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//var treePackageDetail;
//
//function createTreePackageDetail (treeId) {
//	/*  Add the tree object. At this stage it isnt attached to the layout - it is just a stand alone object
//	This section was added to the example
//	*/
//
//	// shorthand reference to (slightly) reduce complexity later
//    //var Tree = Ext.tree;
//
//    var treeLoader = new Ext.tree.TreeLoader({
//		url: DOMAIN_NAME_ROOT + '/action.servlet?event=JsonPackageDetail',
//		//requestMethod: 'GET',
//		//preloadChildren: true,
//		clearOnLoad: true
//	});
//	treeLoader.baseParams.pApplication = Ext.getCmp('project').value;
//	treeLoader.baseParams.pType = 'War';
//	treeLoader.baseParams.pName = Ext.getCmp('package').value;
//
//    var root = {
//	        //nodeType: 'async',
//	        text: Ext.getCmp('package').value,
//	        draggable: false,
//			expanded:true,
//	        id: 'root'
//	    };
//
//   treePackageDetail = new Ext.tree.TreePanel({
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
//   var treeEditorDetail = new Ext.tree.TreeEditor(treePackageDetail, {/* fieldconfig here */ }, {
//       allowBlank:false,
//       blankText:'A name is required',
//       selectOnFocus:true
//   });
//
//   // add a tree sorter in folder mode
//   new Ext.tree.TreeSorter(treePackageDetail, {folderSort:true});
//
//    return treePackageDetail;
//	/* End of tree definition */	
//}
