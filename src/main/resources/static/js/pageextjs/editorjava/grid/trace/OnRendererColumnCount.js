Ext.define('Workspace.editorjava.grid.trace.OnRendererColumnCount',  {

	statics: {
		width : 30
		,
		call : function (val) {
			return "<font style='color:rgb(0, 102, 255)'>" + val + "</font>"; 
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.grid.trace.OnRendererColumnCount');});