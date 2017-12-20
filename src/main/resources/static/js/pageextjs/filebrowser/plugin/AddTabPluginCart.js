Ext.define('Workspace.filebrowser.plugin.AddTabPluginCart', {
	// REQUIRED
	requires: [ 'Workspace.filebrowser.constant.ConstantImage']
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
					    	icon: Workspace.filebrowser.constant.ConstantImage.BUTTON_CART_COPY_MOVE_URL,
					        text: 'Copy/Move',
					        handler: function(button, e) {
					    		tp.onAddTabClick('copymove');
					    	}
					    },{
					    	icon: Workspace.filebrowser.constant.ConstantImage.BUTTON_CART_ZIP_URL,
					        text: 'Zip',
					        handler: function(button, e) {
				    			tp.onAddTabClick('zip');
					    	}
					    },{
					    	icon: Workspace.filebrowser.constant.ConstantImage.BUTTON_CART_DELETE_URL,
					        text: 'Delete',
					        handler: function(button, e) {
					    		tp.onAddTabClick('delete');
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

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.plugin.AddTabPluginCart');});
