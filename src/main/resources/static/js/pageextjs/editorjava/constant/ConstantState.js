Ext.define('Workspace.editorjava.constant.ConstantState', {

	statics: {
	    _inProgressInitialize: false,
	    _inProgressBuild: false,

        _inProgressInitializeMessage: "Can't start debug during initialization.",
        _inProgressBuildMessage: "Can't change Project during building process.",

        inProgressInitializeMessage: function() {
	        var me = Workspace.editorjava.constant.ConstantState;
            Workspace.common.tool.Pop.failure(me, Workspace.editorjava.constant.ConstantState._inProgressInitializeMessage, {toast:false});
        },
        inProgressBuildMessage: function() {
	        var me = Workspace.editorjava.constant.ConstantState;
            Workspace.common.tool.Pop.failure(me, Workspace.editorjava.constant.ConstantState._inProgressInitializeBuild, {toast:false});
        },

	    inProgressInitialize: function(value) {
	        var me = Workspace.editorjava.constant.ConstantState;
		    if (Ext.isDefined(value)) {
		        me._inProgressInitialize = value;
		    }
		    return me._inProgressInitialize;
		},
		inProgressBuild: function(value) {
	        var me = Workspace.editorjava.constant.ConstantState;
		    if (Ext.isDefined(value)) {
		        me._inProgressBuild = value;
		    }
		    return me._inProgressBuild;
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.constant.ConstantState');});