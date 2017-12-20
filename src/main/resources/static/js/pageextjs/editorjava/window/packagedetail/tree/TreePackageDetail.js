Ext.define('Workspace.editorjava.window.packagedetail.tree.TreePackageDetail', {
	// REQUIRED

	extend: 'Ext.tree.Panel'
	,
	alias: 'widget.editorjavaTreePackageDetail',
	alternateClassName: 'WorkspaceEditorJavaTreePackageDetail'
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
			store: Ext.create('Workspace.editorjava.window.packagedetail.tree.data.StorePackageDetail', {pkgtype : this.pkgtype})
		});
	    me.callParent(arguments);
	}
	,
	root: {
	    //nodeType: 'async',
	    text: 'root',//Ext.getCmp('package').value,
	    draggable: false,
		expanded:true,
	    id: 'root'
	}

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.window.packagedetail.tree.TreePackageDetail');});