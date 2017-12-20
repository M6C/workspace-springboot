Ext.define('Workspace.common.plugin.AddTabPluginNew', {
	// REQUIRED
	requires: ['Workspace.common.constant.ConstantImage',
	           'Workspace.common.plugin.addTabNew.function.New']
	,
    extend: 'Workspace.common.plugin.AddTabPluginExtjs4'
	,
	createTab : function(tp) {
		return new Ext.tab.Tab({
	        text: '&#160',
	        //icon: 'add.gif',
	        closable: false
	    	,
	        initComponent : function(){
	    		var me = this;
	    		Ext.apply(me, {
			        menu: Ext.create('Ext.menu.Menu', {
					    items: [{
					    	icon: Workspace.common.constant.ConstantImage.ICON_FOLDER,
					        text: 'Directory',
					        handler: function(button, e) {
				 				Workspace.common.plugin.addTabNew.function.New.call('directory');
					    	}
					    },{
					    	icon: Workspace.common.constant.ConstantImage.ICON_FILE,
					        text: 'File',
					        handler: function(button, e) {
				 				Workspace.common.plugin.addTabNew.function.New.call('file');
					    	}
					    }]
					})
	    		});
	    	    me.callParent(arguments);
			}
	    });
	}
	,
	initTab : function(tp, tab) {
	}

}, function() {Workspace.tool.Log.defined('Workspace.common.plugin.AddTabPluginNew');});