Ext.define('Workspace.common.plugin.AddTabPluginExtjs4', {
    extend: 'Ext.AbstractPlugin',

//    alias: 'plugin.addTabPlugin',
//	alternateClassName: 'widget.addTabPlugin',

    init: function(tp) {
	    if (tp instanceof Ext.TabPanel) {
	        tp.onRender = Ext.Function.createSequence(tp.onRender, this.onTabPanelRender(this, tp));
	    }
    }
	,
	onTabPanelRender : function(plugin, tp) {

    	// Check if function 'onAddTabClick' is set
		if (!this.check(tp))
			return;

		tp.addTab = this.createTab(tp);

		// Init tab
		this.initTab(tp, tp.addTab);

        // I'm not sure about adding the tab to the tab bar with a massive index.  Seems to work though.
        this.insertTab(tp, tp.getTabBar(), tp.addTab);
	}
	,
	check : function(tp) {
    	// Check if function 'onAddTabClick' is set
        if (!Ext.isFunction(tp.onAddTabClick)) {
        	console.error('No function \'onAddTabClick\' set in tabpanel class:\'' + tp.$className+ '\' id:\'' + tp.id+ '\'');
        	return false;
        }
        return true;
	}
	,
	createTab : function(tp) {
		return new Ext.tab.Tab({
            text: '&#160',
            //icon: 'add.gif',
            closable: false
        });
	}
	,
	initTab : function(tp, tab) {
		if (!Ext.isDefined(tab))
			return;

		tab.on({
            click: tp.onAddTabClick,
            scope: tp
        });
	}
	,
	insertTab : function(tp, bar, tab) {
		bar.insert(999, tab);
	}
}, function() {Workspace.tool.Log.defined('Workspace.common.plugin.AddTabPluginExtjs4');});
