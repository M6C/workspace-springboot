Ext.define('Workspace.common.form.combobox.ComboExtjs4', {
	// REQUIRED

	extend: 'Ext.form.ComboBox'
	,
	alias: 'widget.comboExtjs4',
	alternateClassName: 'ComboExtjs4'
	,
    typeAhead: true,
    mode: 'local',
    forceSelection: true,
    triggerAction: 'all',
    selectOnFocus:true

}, function() {Workspace.tool.Log.defined('Workspace.common.form.combobox.ComboExtjs4');});
