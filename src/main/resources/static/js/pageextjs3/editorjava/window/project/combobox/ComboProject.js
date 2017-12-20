// DEPENDENCE
Ext.Loader.load([DOMAIN_NAME_ROOT + '/js/commonextjs/form/combobox/ComboProject.js']);

// NAMESPACE
Ext.ns('Workspace.window.Project.combobox');

Workspace.window.Project.combobox.ComboProject = Ext.extend(Workspace.common.form.combobox.ComboProject, {
    listeners:{
		//scope: this, //yourScope
        'select': function (cmb, record, index){
			Ext.getCmp('project').value=record.data.project;
			Ext.getCmp(this.statusbarId).setText('Project \''+record.data.project+'\'');
		}
   }
});

// REGISTER
Ext.reg('WorkspaceWindowProjectComboboxComboProject', Workspace.window.Project.combobox.ComboProject);
