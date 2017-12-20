Ext.define('Workspace.widget.combobox.WidgetComboProject', {
	requires: [
  	     'Workspace.common.form.combobox.function.ApplySessionStateCombo'
  	]
  	,
	extend: 'Workspace.common.form.combobox.ComboProjectExtjs4'
	,
	alias: 'widget.widgetComboProject',
	alternateClassName: 'WorkspaceWidgetComboProject'
	,
	doActionItem: true
	,
	// Must be override
	onActionItem(tabPanel, newCard, oldCard, option) {
		console.info('Workspace.widget.combobox.WidgetComboProject onActionItem do nothing');
	}
	,
    initComponent : function(){
		var me = this;

        Workspace.tool.UtilComponent.addListener(me, 'change', me.listenerChange);

		var stateId = Ext.getClassName(me);
		Workspace.common.form.combobox.function.ApplySessionStateCombo.apply(me, stateId);

		me.callParent(arguments);
	}
	,
	listenerChange: function (combo, newValue, oldValue, option) {
	    var me = this;
	    if (me.doActionItem) {
	    	me.onActionItem(combo, newValue, oldValue, option);
	    } else {
	    	me.setRawValue(oldValue);
	    }
	}
}, function() {Workspace.tool.Log.defined('Workspace.widget.combobox.WidgetComboProject');});