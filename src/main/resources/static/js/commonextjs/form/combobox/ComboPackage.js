// DEPENDENCE
Ext.Loader.load(fileList=[
DOMAIN_NAME_ROOT + '/js/commonextjs/form/combobox/Combo.js',
DOMAIN_NAME_ROOT + '/js/commonextjs/form/combobox/data/StorePackage.js'
],
preserveOrder=true);

// NAMESPACE
Ext.ns('Workspace.common.form.combobox');

Workspace.common.form.combobox.ComboPackage = Ext.extend(Workspace.form.ComboBox, {
	// private
	initComponent : function(){
		this.store = {
				xtype:'WorkspaceCommonFormComboboxDataStorePackage',
				pkgtype:this.pkgtype
			};
		Workspace.common.form.combobox.ComboPackage.superclass.initComponent.call(this);
	},
//    onRender : function() {
//		this.store.load();
//        Workspace.common.form.combobox.ComboPackage.superclass.onRender.apply(this, arguments);
//    },
	displayField:'package',
	emptyText:'Select a package...'
});

// REGISTER
Ext.reg('WorkspaceCommonFormComboboxComboPackage', Workspace.common.form.combobox.ComboPackage);
//
////var comboRecord;
////var comboRecordIndex;
//
//function create_ComboPackage(comboIdPackage,type) {
//
//	var project = Ext.getCmp('project').value;
//
//	/*  Add the tree object. At this stage it isnt attached to the layout - it is just a stand alone object
//	This section was added to the example
//	*/
//	var storePackage = new Ext.data.Store({
//	    proxy: new Ext.data.HttpProxy({
//	        url: DOMAIN_NAME_ROOT + '/action.servlet?event=JsonPackageName'+
//	        	'&xslParamName=pApplication;pType'+
//	        	'&pApplication='+project+
//	        	'&pType='+type
//	    }),
//	    reader: new Ext.data.JsonReader({
//			idProperty: 'package',
//			root: 'data',
//			fields: [
//						{ name: 'package', mapping: 'package' }
//			]
//	    }),
//	    autoLoad: true
//	 
//	});                                
//
//	var comboPackage = new Ext.form.ComboBox({
//		    id:comboIdPackage,
//        store: storePackage,
//        displayField:'package',
//        typeAhead: true,
//        mode: 'local',
//        forceSelection: true,
//        triggerAction: 'all',
//        emptyText:'Select a package...',
//        selectOnFocus:true
//    });
//
//	return comboPackage;
//}