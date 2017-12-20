// DEPENDENCE
Ext.Loader.load(fileList=[
DOMAIN_NAME_ROOT + '/js/commonextjs/form/combobox/ComboProject.js',
DOMAIN_NAME_ROOT + '/js/commonextjs/form/combobox/Combo.js'
],
preserveOrder=true);

// NAMESPACE
Ext.ns('Workspace.debugger');

Workspace.debugger.ComboBox = Ext.extend(Workspace.common.form.combobox.ComboProject, {
    listeners:{
		//scope: this, //yourScope
        'select': function (cmb, record, index){
			//comboRecord = record;
			//comboRecordIndex = index;
			Ext.getCmp('project').value=record.data.project;
		
			var tree = Ext.getCmp("treeDirectory");
			tree.loader.baseParams.path = '';
			tree.loader.baseParams.application = Ext.getCmp('project').value;//record.data.project;
			tree.root.reload();
		}
   }
});

// REGISTER
Ext.reg('WorkspaceDebuggerComboBox',Workspace.debugger.ComboBox);
