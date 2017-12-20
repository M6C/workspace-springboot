Ext.define('Workspace.editorjava.window.classpath.tree.TreeClasspath', {
	// REQUIRED

	extend: 'Ext.tree.Panel'
	,
	alias: 'widget.editorjavaTreeClasspath',
	alternateClassName: 'WorkspaceEditorJavaTreeClasspath'
	,

    useArrows: true,
    layout:'fit',
	autoScroll: true,
    animate: true,
    enableDD: true,
    containerScroll: true,
    border: false,
    collapsible: false,
    rootVisible: false,
    initComponent : function(){
		var me = this;
		Ext.apply(me, {
			store: Ext.create('Workspace.editorjava.window.classpath.tree.data.StoreClasspath')
//			,
//			loader: Ext.create('Workspace.editorjava.window.classpath.tree.loader.LoaderClasspath')
//			,
//			listeners:{
//				'render': function (tree){
//					new Ext.tree.TreeSorter(tree, {folderSort:true});
//				}
//		    }
		});
	    me.callParent(arguments);
	}
	,
    root: {
	    //nodeType: 'async',
	    text: 'root',
	    draggable: false,
		expanded:true,
	    id: 'root'
    }

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.window.classpath.tree.TreeClasspath');});