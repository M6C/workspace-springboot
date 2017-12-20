// DEPENDENCE
Ext.Loader.load([DOMAIN_NAME_ROOT + '/js/commonextjs/form/combobox/ComboPackage.js']);

// NAMESPACE
Ext.ns('Workspace.window.Package.combobox');

Workspace.window.Package.combobox.ComboPackage = Ext.extend(Workspace.common.form.combobox.ComboPackage, {
    listeners:{
		//scope: this, //yourScope
        'select': function (cmb, record, index){
			Ext.getCmp('package').value=record.data.package;
			Ext.getCmp(this.statusbarId).setText('Package \''+record.data.package+'\'');
		}
   }
});

// REGISTER
Ext.reg('WorkspaceWindowPackageComboboxComboPackage', Workspace.window.Package.combobox.ComboPackage);
