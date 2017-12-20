// DEPENDENCE
Ext.Loader.load(fileList=[
DOMAIN_NAME_ROOT + '/js/commonextjs/form/combobox/Combo.js'
],
preserveOrder=true);

// NAMESPACE
Ext.ns('Workspace.common.form.combobox');

Workspace.common.form.combobox.ComboProject = Ext.extend(Workspace.form.ComboBox, {
    store: new Ext.data.Store({
	    proxy: new Ext.data.HttpProxy({
	        url: DOMAIN_NAME_ROOT + '/action.servlet?event=JsonProjectName'
	    }),
	    reader: new Ext.data.JsonReader({
			idProperty: 'project',
			root: 'data',
			fields: [
				{ name: 'project', mapping: 'project' }
			]
	    }),
	    autoLoad: true
	}),
    displayField:'project',
    emptyText:'Select a project...'
//    , listeners:{
//		//scope: this, //yourScope
//        'select': function (cmb, record, index){
//			//comboRecord = record;
//			//comboRecordIndex = index;
//			Ext.getCmp('project').value=record.data.project;
//		
//			var tree = Ext.getCmp("treeDirectory");
//			tree.loader.baseParams.path = '';
//			tree.loader.baseParams.application = Ext.getCmp('project').value;//record.data.project;
//			tree.root.reload();
//		}
//   }
});

// REGISTER
Ext.reg('WorkspaceCommonFormComboboxComboProject', Workspace.common.form.combobox.ComboProject);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////var comboRecord;
////var comboRecordIndex;
//
//function create_ComboProject(comboId) {
//
//	/*  Add the tree object. At this stage it isnt attached to the layout - it is just a stand alone object
//	This section was added to the example
//	*/
//	var store = new Ext.data.Store({
//	    proxy: new Ext.data.HttpProxy({
//	        url: DOMAIN_NAME_ROOT + '/action.servlet?event=JsonProjectName'
//	    }),
//	    reader: new Ext.data.JsonReader({
//			idProperty: 'project',
//			root: 'data',
//			fields: [
//						{ name: 'project', mapping: 'project' }
//			]
//	    }),
//	    autoLoad: true
//	 
//	});
//
//	var combo = new Ext.form.ComboBox({
//		id:comboId,
//        store: store,
//        //url: DOMAIN_NAME_ROOT + '/action.servlet?event=JsonProjectName',
//        //autoLoad: true,
//        displayField:'project',
//        typeAhead: true,
//        mode: 'local',
//        forceSelection: true,
//        triggerAction: 'all',
//        emptyText:'Select a project...',
//        selectOnFocus:true
//    });
//
////	// Add a listener to take some action when a node is moved. 
////	combo.addListener('select', function (cmb, record, index){
////		//comboRecord = record;
////		//comboRecordIndex = index;
////		Ext.getCmp('project').value=record.data.project;
////
////		var tree = Ext.getCmp("treeDirectory");
////		tree.loader.baseParams.path = '';
////		tree.loader.baseParams.application = Ext.getCmp('project').value;//record.data.project;
////		tree.root.reload();
////	});
//
//	return combo;
//}