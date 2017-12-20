Ext.define('Workspace.tool.Log', {
	// REQUIRED

	statics: {
		// Current pattern logger
		currentPattern : Ext.Date.patterns.UniversalSortableDateTime,

		defined : function (text) {
			var dt = new Date();
			var textOut = Ext.Date.format(dt, Workspace.tool.Log.currentPattern)+' '+text;
			console.info(textOut);
		}
		,
		logAllEvent: function(component, logFn) {
			if (!Ext.isDefined(logFn)) {
				logFn = function(evname) {
		        	console.log(evname, arguments);
		        }
			}
	        Ext.util.Observable.capture(component, logFn);
		}
	}

}, function() {console.info(Ext.Date.format(new Date(), Workspace.tool.Log.currentPattern)+' Workspace.tool.Log');});
