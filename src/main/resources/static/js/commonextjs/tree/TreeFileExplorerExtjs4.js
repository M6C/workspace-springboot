Ext.define('Workspace.common.tree.TreeFileExplorerExtjs4', {
	requiers: [
        'Workspace.tool.UtilComponent',
        'Workspace.common.draganddrop.ApplyDragAndDrop',
        'Workspace.common.tree.data.StoreFileExplorerExtjs4'
	]
	,
	extend: 'Ext.tree.Panel'
	,
	alias: 'widget.treeFileExplorerExtjs4',
	alternateClassName: 'WorkspaceTreeFileExplorer'
	,
    initComponent : function(){
		var me = this;

		me.applyStore(me);

		me.applyDragAndDrop(me);

        Workspace.tool.UtilComponent.addListener(me, 'render', me.listenerRender);

		me.callParent(arguments);
	}
	,
	applyStore: function(me) {
		Ext.apply(me, {
			store: Ext.create('Workspace.common.tree.data.StoreFileExplorerExtjs4', {
		    	sorters: [
		    	    /**
		    	     * First  Sort by Directory and File
		    	     * Second Sort Alphabetic 'Asc' by Text into Directory ou File
		    	     */
		    	    {sorterFn: function(o1, o2){
		    	        var getRank = function(o){
		    	            if (o.raw.contentType === 'directory') {
		    	                return 1;
		    	            } else {
		    	                return 2;
		    	            }
		    	        },
		    	        rank1 = getRank(o1),
		    	        rank2 = getRank(o2);
		    	
		    	        if (rank1 === rank2) {
		    	            return 0;
		    	        }
		    	
		    	        return rank1 < rank2 ? -1 : 1;
		    	    }}
		    	    ,
		    	    {
                        property: 'text',
                        direction: 'ASC' // or 'DESC'
                    }
		    	]
			})
        });
	},
	// Can be overrided
	listenerRender: function(tree, options) {
        // Hide Title after render
        tree.header.setVisible(false);
	}
    ,
	applyDragAndDrop: function(me) {
		Workspace.common.draganddrop.ApplyDragAndDrop.apply(me, me.onBeforeDrop, me.onDrop);
	}
	,
    useArrows: true,
    autoScroll: false,
    animate: true,
    enableDD: true,
    containerScroll: true,
    border: false,
    collapsible: false,
    rootVisible: false,
    // If no title set an error occure on scroll. Title will be hidden after rendering higher.
    title: 'Title'

}, function() {Workspace.tool.Log.defined('Workspace.common.tree.TreeFileExplorerExtjs4');});