// NAMESPACE
Ext.ns('Workspace.editorjava');

Workspace.editorjava.TreeMenuContext = Ext.extend(Ext.menu.Menu, {
	id : 'treeMenuContext'
//	,constructor:function(config) {
//		Workspace.editorjava.TreeMenuContext.superclass.constructor.call(this, config);
//	  }
//	,initComponent: function() {
//		Workspace.editorjava.TreeMenuContext.superclass.initComponent.apply(this, arguments)
//	}

	// private
	,onRender : function(ct, position){
		this.addItem(new Ext.menu.Item({text: 'New File', handler: onMenuTreeNewFile}));
		this.addItem(new Ext.menu.Item({text: 'New Directory', handler: onMenuTreeNewDir}));
		this.addItem(new Ext.menu.Separator());
		this.addItem(new Ext.menu.Item({text: 'File', menu: new Ext.menu.Menu({
		   items: [
			   new Ext.menu.Item({text: 'Copy', handler: onMenuTreeCopy}),
			   new Ext.menu.Item({text: 'Paste', handler: onMenuTreePaste}),
			   new Ext.menu.Item({text: 'Rename', handler: onMenuTreeRename}),
			   new Ext.menu.Item({text: 'Delete', handler: onMenuTreeDelete}),
			   new Ext.menu.Separator(),
			   new Ext.menu.Item({text: 'Zip', handler: onMenuTreeZip}),
			   new Ext.menu.Item({text: 'Split', handler: onMenuTreeSplit})
    	   ]
   		})}));
		this.addItem(new Ext.menu.Separator());
		this.addItem(new Ext.menu.Item({text: 'Team', menu: new Ext.menu.Menu({
		   items: [
	    	   new Ext.menu.Item({text: 'SVN', menu: new Ext.menu.Menu({
	    		   items: [
	       		    	   new Ext.menu.Item({text: 'SVN Import', handler: onMenuSVNImport}),
	       		    	   new Ext.menu.Item({text: 'SVN Commit', handler: onMenuSVNCommit}),
	    				   new Ext.menu.Separator(),
	    		    	   new Ext.menu.Item({text: 'SVN Test Commit', handler: onMenuSVNTestCommit})
		    	   ]
	    	   	 })
	    	   }),
	    	   new Ext.menu.Separator(),
	    	   new Ext.menu.Item({text: 'CVS', menu: new Ext.menu.Menu({
	    		   items: [
			    	   new Ext.menu.Item({text: 'CVS Add', handler: onMenuCVSAdd}),
			    	   new Ext.menu.Item({text: 'CVS Update File', handler: onMenuCVSUpdateFile}),
			    	   new Ext.menu.Item({text: 'CVS Update Directory', handler: onMenuCVSUpdateDirectory}),
			    	   new Ext.menu.Item({text: 'CVS Commit', handler: onMenuCVSCommit})
		    	   ]
	    	   	 })
	    	   })
    	   ]
   		})}));

		Workspace.editorjava.TreeMenuContext.superclass.onRender.call(this, ct, position);
	}
});

// REGISTER
Ext.reg('WorkspaceEditorjavaTreeMenuContext', Workspace.editorjava.TreeMenuContext);

//function createTreeDirectoryMenuContext (tree) {
//
//    var menuC = new Ext.menu.Menu({
//    	items: [
//    	   new Ext.menu.Item({text: 'New File', handler: onMenuTreeNewFile}),
//    	   new Ext.menu.Item({text: 'New Directory', handler: onMenuTreeNewDir}),
//    	   new Ext.menu.Separator(),
//    	   new Ext.menu.Item({text: 'File', menu: new Ext.menu.Menu({
//    		   items: [
//				   new Ext.menu.Item({text: 'Copy', handler: onMenuTreeCopy}),
//				   new Ext.menu.Item({text: 'Paste', handler: onMenuTreePaste}),
//				   new Ext.menu.Item({text: 'Rename', handler: onMenuTreeRename}),
//				   new Ext.menu.Item({text: 'Delete', handler: onMenuTreeDelete}),
//				   new Ext.menu.Separator(),
//				   new Ext.menu.Item({text: 'Zip', handler: onMenuTreeZip}),
//				   new Ext.menu.Item({text: 'Split', handler: onMenuTreeSplit})
//	    	   ]
//    	   	 })
//    	   }),
//    	   new Ext.menu.Separator(),
//    	   new Ext.menu.Item({text: 'Team', menu: new Ext.menu.Menu({
//    		   items: [
//		    	   new Ext.menu.Item({text: 'SVN', menu: new Ext.menu.Menu({
//		    		   items: [
//		       		    	   new Ext.menu.Item({text: 'SVN Import', handler: onMenuSVNImport}),
//		       		    	   new Ext.menu.Item({text: 'SVN Commit', handler: onMenuSVNCommit}),
//		    				   new Ext.menu.Separator(),
//		    		    	   new Ext.menu.Item({text: 'SVN Test Commit', handler: onMenuSVNTestCommit})
//			    	   ]
//		    	   	 })
//		    	   }),
//		    	   new Ext.menu.Separator(),
//		    	   new Ext.menu.Item({text: 'CVS', menu: new Ext.menu.Menu({
//		    		   items: [
//				    	   new Ext.menu.Item({text: 'CVS Add', handler: onMenuCVSAdd}),
//				    	   new Ext.menu.Item({text: 'CVS Update File', handler: onMenuCVSUpdateFile}),
//				    	   new Ext.menu.Item({text: 'CVS Update Directory', handler: onMenuCVSUpdateDirectory}),
//				    	   new Ext.menu.Item({text: 'CVS Commit', handler: onMenuCVSCommit})
//			    	   ]
//		    	   	 })
//		    	   })
//	    	   ]
//    	   	 })
//    	   })
//      ]
//    });
//
//    function menuShow( node ) {
//       console.info('Beforeshow node.id: '+ node.id + ' node.getPath(): '+ node.getPath());
//       // TODO Tester ICI si il s'agit d'une repertoire ou d'un fichier
//       // pour personnaliser le menu Contextuel
//
//       // Stock le noeud selectionné dans le menu contextuel
//       menuC.data = node;
//       menuC.show(node.ui.getAnchor());
//    }
//
//    tree.on('contextmenu', menuShow, this);
//
//    return menuC;
//}