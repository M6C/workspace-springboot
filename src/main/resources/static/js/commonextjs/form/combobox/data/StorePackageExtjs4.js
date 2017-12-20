Ext.define('Workspace.common.form.combobox.data.StorePackageExtjs4', {
	// REQUIRED
	requiers: ['Workspace.data.model.Package']
	,
	extend: 'Ext.data.Store',

   	model: 'Workspace.data.model.Package',
    proxy: {
        type: 'ajax',
        url : DOMAIN_NAME_ROOT + '/action.servlet?event=JsonPackageName',
       	reader : {
			type: 'json',
			idProperty: 'package',
			root: 'data'
	    }
    },
    autoLoad: true
}, function() {Workspace.tool.Log.defined('Workspace.common.form.combobox.data.StorePackageExtjs4');});
