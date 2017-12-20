// NAMESPACE
Ext.ns('Workspace.form');

Workspace.form.ComboBox = Ext.extend(Ext.form.ComboBox, {
//	constructor: function(comboId){
//		this.id = comboId
//	},
    //autoLoad: true,
    typeAhead: true,
    mode: 'local',
    forceSelection: true,
    triggerAction: 'all',
    selectOnFocus:true
});

// REGISTER
Ext.reg('WorkspaceFormComboBox',Workspace.form.ComboBox);
