Ext.define('Workspace.common.form.combobox.data.StoreProjectExtjs4', {
	// REQUIRED
	requiers: ['Workspace.data.model.Project']
	,
	extend: 'Ext.data.Store'
	,
   	model: 'Workspace.data.model.Project'
	,
	autoLoad: true
	,
    proxy: {
        type: 'ajax',
        url : DOMAIN_NAME_ROOT + '/action.servlet?event=JsonProjectName',
       	reader : {
			type: 'json',
			idProperty: 'project',
			root: 'data'
	    }
    }
}, function() {Workspace.tool.Log.defined('Workspace.common.form.combobox.data.StoreProjectExtjs4');});
