Ext.define('Workspace.filebrowser.grid.trace.OnRendererColumnImage',  {
	// REQUIRED
	requires: [ 'Workspace.filebrowser.constant.ConstantImage']
	,
	statics: {
		width : 20
		,
		call : function (val) {
			var icon = '';
			if (val=='error')
				icon = Workspace.filebrowser.constant.ConstantImage.ICON_ERROR;
			else if (val=='success')
				icon = Workspace.filebrowser.constant.ConstantImage.ICON_SUCCESS;
			else if (val=='info')
				icon = Workspace.filebrowser.constant.ConstantImage.ICON_INFO;
			else if (val=='failure')
				icon = Workspace.filebrowser.constant.ConstantImage.ICON_FAILURE;
			return (icon=='') ? val : '<img height="12px" width="12px" src="' + icon + '">'; 
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.grid.trace.OnRendererColumnImage');});