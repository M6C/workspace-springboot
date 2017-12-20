Ext.define('Workspace.tool.UtilComponent', {

	statics: {
		addListener : function(component, event, fn, option) {
		    var me = Workspace.tool.UtilComponent;
		    if (!Ext.isDefined(option)) {
		        option = {preserve:true};
		    }
		    if (Ext.isDefined(option.preserve) && option.preserve) {
		        // Preserve previous event listener if defined
		        var listener = me.getListener(component, event);
		        if (Ext.isDefined(listener) && Ext.isFunction(listener)) {
		            fn = Ext.Function.createSequence(listener, fn);
		        }
		    }
		    component.on(event, fn);
		}
		,
        getListener: function (component, event) {
            return component.events[event];
    	}
		,
        getListeners: function (component) {
    		var listeners = {};
    
    		for (var event in component.hasListeners) {
    			listeners[event] = [];
    
    			if (component.events[event]) {
    				var listenersList = component.events[event].listeners;
    				for (var i in listenersList) {
    					listeners[event].push (listenersList[i].fn); 
    				}
    			}
    			else delete listeners[event];
    		}
    
    		return listeners;
    	}

	}

}, function() {Workspace.tool.Log.defined('Workspace.tool.UtilComponent');});