Ext.define('Workspace.editorjava.window.package.form.combobox.ComboPackage', {
	// REQUIRED

	extend: 'Workspace.common.form.combobox.ComboPackageExtjs4'
	,
	alias: 'widget.editorjavaWindowPackageComboPackage',
	alternateClassName: 'WorkspaceEditorJavaWindowPackageComboPackage'
	,
    initComponent : function(){
		var me = this;

		Ext.apply(me, {
			listeners: {
				//scope: this, //yourScope
				'select': function (cmb, record, index){
					Ext.getCmp('package').value=record.data.package;
					Ext.getCmp(this.statusbarId).setText('Package \''+record.data.package+'\'');
				}
			}
		});
		me.callParent(arguments);
	}

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.window.package.form.combobox.ComboPackage');});