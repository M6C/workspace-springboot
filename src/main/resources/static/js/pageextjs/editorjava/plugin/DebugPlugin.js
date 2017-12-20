Ext.define('Workspace.editorjava.plugin.DebugPlugin', {
    extend: 'Ext.AbstractPlugin'
    ,
    init: function(tp) {
        var me = this;
        me.mainCenterPanel = Ext.getCmp('mainCenterPanel');
        me.mainEstPanel = Ext.getCmp('mainEstPanel');

	    if (tp instanceof Ext.TabPanel) {
	        tp.onRender = Ext.Function.createSequence(tp.onRender, this.onTabPanelRender(this, tp));
	    }
    }
	,
	onTabPanelRender : function(plugin, tp) {
	    var me = this;
        var bar = tp.getTabBar();

        var btnDebugStart = Ext.create('Ext.Button', {
            xtype: 'button',
            text: 'Debug',
            cls: 'btn_debug_start',
	    	id: 'btnDebugStart',
	    	handler:  function(button, e) {
	            me.debugStart();
	    	}
        });

        var btnDebugStop = Ext.create('Ext.Button', {
            xtype: 'button',
            text: 'Debug',
            cls: 'btn_debug_stop',
	    	id: 'btnDebugStop',
	    	hidden: true,
	    	handler:  function(button, e) {
	            me.debugStop();
	    	}
        });

        bar.insert(0, btnDebugStart);
        bar.insert(1, btnDebugStop);
	}
	,
	debugStart: function() {
		this.mainCenterPanel.debugStart();
	}
	,
	debugStop: function() {
		this.mainCenterPanel.debugStop();
		this.mainEstPanel.collapse(Ext.Component.DIRECTION_RIGHT, true);
	}
	,
	initializeButtonDebug: function() {
		var me = this;
		var debugging = me.mainCenterPanel.isDebugging();
		Ext.getCmp('btnDebugStart').setVisible(!debugging);
		Ext.getCmp('btnDebugStop').setVisible(debugging);
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.plugin.DebugPlugin');});