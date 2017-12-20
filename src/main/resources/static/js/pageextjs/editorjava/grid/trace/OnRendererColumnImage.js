Ext.define('Workspace.editorjava.grid.trace.OnRendererColumnImage',  {
	// REQUIRED
	requires: [ 'Workspace.editorjava.constant.ConstantImage']
	,
	statics: {
		width : 20
		,
		call : function (val) {
			var icon = '';
			if (val=='error')
				icon = Workspace.editorjava.constant.ConstantImage.ICON_ERROR;
			else if (val=='success')
				icon = Workspace.editorjava.constant.ConstantImage.ICON_SUCCESS;
			else if (val=='info')
				icon = Workspace.editorjava.constant.ConstantImage.ICON_INFO;
			else if (val=='failure')
				icon = Workspace.editorjava.constant.ConstantImage.ICON_FAILURE;
			return (icon=='') ? val : '<img height="12px" width="12px" src="' + icon + '">'; 
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.grid.trace.OnRendererColumnImage');});