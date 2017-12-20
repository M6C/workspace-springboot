Ext.define('Workspace.common.grid.fileexplorer.OnRendererColumnImageType',  {
	// REQUIRED
	requires: ['Workspace.common.constant.ConstantImage']
	,
	statics: {
		width : 20
		,
		call : function (val) {
			var icon = '';
			if (val=='directory')
				icon = Workspace.common.constant.ConstantImage.ICON_FOLDER;
			else
				icon = Workspace.common.constant.ConstantImage.ICON_FILE;
			return (icon=='') ? val : '<img height="12px" width="12px" src="' + icon + '">'; 
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.common.grid.fileexplorer.OnRendererColumnImageType');});