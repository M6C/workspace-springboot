Ext.define('Workspace.tool.UtilTree', {

	statics: {
		/**
	     * Reload parent node
	     * @param node
	     * @static
	     */
		reloadParent : function(node) {
		    var me = Workspace.tool.UtilTree;
			var parent = node.parentNode;
			me.reloadNode(parent);
		}
		,
		/**
	     * Reload parent node
	     * @param node
	     * @static
	     */
		reloadNode : function(node) {
			new Ext.util.DelayedTask().delay(0, function() {
                node.set('loaded', false);
    			new Ext.util.DelayedTask().delay(100, function() {
    			    node.collapse();
    				new Ext.util.DelayedTask().delay(200, function() {
    				    node.expand();
    				});
    			});
			});
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.tool.UtilTree');});