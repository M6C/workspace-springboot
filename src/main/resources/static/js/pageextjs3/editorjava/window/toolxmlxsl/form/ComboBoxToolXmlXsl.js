// DEPENDENCE
Ext.Loader.load(fileList=[
DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava/window/toolxmlxsl/data/StoreToolXmlXsl.js',
DOMAIN_NAME_ROOT + '/js/commonextjs/form/combobox/Combo.js'
],
preserveOrder=true);

//NAMESPACE
Ext.ns('Workspace.window.ToolXmlXsl.form');

// Combo Box
Workspace.window.ToolXmlXsl.form.ComboBoxToolXmlXsl = Ext.extend(Ext.form.ComboBox, {
	id:'xmlScope',
	name:'xmlScope',
	store: {
		xtype:'WorkspaceWindowToolXmlXslDataStoreToolXmlXsl'
	},
	displayField:'name',
	mode: 'local',
	triggerAction: 'all',
	emptyText:'Select a scope...',
	fieldLabel:'Scope',
	selectOnFocus:true
});

// REGISTER
Ext.reg('WorkspaceWindowToolXmlXslFormComboBoxToolXmlXsl',Workspace.window.ToolXmlXsl.form.ComboBoxToolXmlXsl);
