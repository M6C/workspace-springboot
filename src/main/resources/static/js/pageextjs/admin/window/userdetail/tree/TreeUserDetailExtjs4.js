Ext.define('Workspace.admin.window.userdetail.tree.TreeUserDetailExtjs4', {
	// REQUIRED

	extend: 'Ext.tree.Panel'
	,
	alias: 'workspace.TreeUserDetailExtjs4',
	alternateClassName: 'WorkspaceTreeUserDetailExtjs4'
	,
    initComponent : function(){
		var me = this;
		Ext.apply(me, {
			store: Ext.create('Ext.data.TreeStore', {
			    proxy: {
			        type: 'ajax',
			        url : DOMAIN_NAME_ROOT + '/action.servlet?event=JsonUserDetail',
			        reader: {
			            type: 'json'
			        }
			    }
				,
				root: {
				    expanded: true,
				    text: "Current user"
				}
				,
			    clearOnLoad: true
			})
			,
	    	listeners:{
	        }
	    });
	    me.callParent(arguments);
	}
	,
    useArrows: true,
    layout:'fit',
	autoScroll: true,
    animate: true,
    enableDD: true,
    containerScroll: true,
    border: false,
    collapsible: false,
    rootVisible: true
}, function() {Workspace.tool.Log.defined('Workspace.admin.window.userdetail.tree.TreeUserDetailExtjs4');});
