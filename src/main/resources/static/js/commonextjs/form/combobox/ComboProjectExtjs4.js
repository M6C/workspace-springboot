Ext.define('Workspace.common.form.combobox.ComboProjectExtjs4', {
	// REQUIRED
	requiers: ['Workspace.common.form.combobox.data.StoreProjectExtjs4']
	,
	extend: 'Workspace.common.form.combobox.ComboExtjs4'
	,
	alias: 'widget.comboProjectExtjs4',
	alternateClassName: 'ComboProjectExtjs4'
	,
    initComponent : function(){
		var me = this;
		Ext.apply(me, {
		    store: Ext.create('Workspace.common.form.combobox.data.StoreProjectExtjs4', {
				listeners:{
				    'load': function(view, records, successful, operation) {
						console.info('Workspace.common.form.combobox.data.StoreProjectExtjs4 load');
						// TODO 1st parameter of focus() method can be used to select default item
						me.focus();
					}
				}
			})
	    });
	    me.callParent(arguments);
	},
    displayField:'project',
    emptyText:'Select a project...',
    editable: false

}, function() {Workspace.tool.Log.defined('Workspace.common.form.combobox.ComboProjectExtjs4');});