Ext.define('Workspace.common.form.combobox.ComboExtjs4', {
	// REQUIRED

	extend: 'Ext.form.ComboBox'
	,
	alias: 'widget.comboExtjs4',
	alternateClassName: 'ComboExtjs4'
	,
    mode: 'local',
    forceSelection: true,
    triggerAction: 'all',
    typeAhead: true,
    editable: true,
    selectOnFocus:true

}, function() {Workspace.tool.Log.defined('Workspace.common.form.combobox.ComboExtjs4');});
