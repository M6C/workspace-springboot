// NAMESPACE
Ext.ns('Workspace.common.form.combobox.data');

// DataStore
Workspace.common.form.combobox.data.StorePackage = Ext.extend(Ext.data.Store, {
    reader : new Ext.data.JsonReader({
		idProperty: 'package',
		root: 'data',
		fields: [
					{ name: 'package', mapping: 'package' }
		]
    }),
	listeners : {
		//scope: this, //yourScope
        'beforeload' : function(dataProxy, params){
			this.proxy = new Ext.data.HttpProxy({
		        url: DOMAIN_NAME_ROOT + '/action.servlet?event=JsonPackageName'+
		        	'&xslParamName=pApplication;pType'+
		        	'&pApplication='+Ext.getCmp('project').value+
		        	'&pType='+this.pkgtype
		    });
		}
	}
//    ,autoLoad: true
});

// REGISTER
Ext.reg('WorkspaceCommonFormComboboxDataStorePackage',Workspace.common.form.combobox.data.StorePackage);
