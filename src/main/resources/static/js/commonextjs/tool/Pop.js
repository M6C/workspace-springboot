Ext.define('Workspace.common.tool.Pop', {
	requires: ['Workspace.common.tool.Toast']
	,
	statics: {

		show : function(type, from, message, option) {
		    var me = Workspace.common.tool.Pop;
			return me.doPop(type, from, message, option);
		}
		,
		info : function(from, message, option) {
			var me = Workspace.common.tool.Pop;
			// By default no toast for info message
			if (!Ext.isDefined(option)) {
			    option = {toast: false};
			} else if (!Ext.isDefined(option.toast)) {
			    Ext.apply(option, {toast: false});
			}
			return me.doPop('info', from, message, option);
		}
		,
		success : function(from, message, option) {
			var me = Workspace.common.tool.Pop;
			return me.doPop('success', from, message, option);
		}
		,
		error : function(from, message, option) {
			var me = Workspace.common.tool.Pop;
			return me.doPop('error', from, message, option);
		}
		,
		failure : function(from, message, option) {
			var me = Workspace.common.tool.Pop;
			return me.doPop('failure', from, message, option);
		}
		,
		// Private
		doPop : function(type, from, message, option) {
			var ret = {};
			var opt = {toast: true, panelSouth: true, console: true}

			if (Ext.isDefined(option)) {
			    Ext.apply(opt, option);
			}

			var className = from;
			if (!Ext.isString(from)) {
				className = Ext.getClassName(from);
			}

			if (opt.toast) {
				ret.toast = Workspace.common.tool.Toast.show(Ext.util.Format.htmlDecode(message));
    			if (Ext.isDefined(opt.detail)) {
			        var msg = message + "<br>" + opt.detail;
				    var toast = ret.toast;
    				Ext.fly(toast.body.dom).on('click', function () {
    					toast.doClose();
    					Workspace.common.tool.Pop.show(type, from, msg, {toast: true, panelSouth: false, console: false});
    				}, from);
    			}
			}

			if (opt.panelSouth) {
			    var msg = message;
    			if (Ext.isDefined(opt.detail)) {
				    msg += "<br>" + opt.detail;
    			}
				Ext.getCmp('mainSouthPanel').log(className, type, msg);
				ret.panelSouth = true;
			}

			if (opt.logConsole) {
			    var msg = message;
    			if (Ext.isDefined(opt.detail)) {
				    msg += "<br>" + opt.detail;
    			}
		        console.info(className + ' ' + type + ':' + msg);
				ret.logConsole = true;
			}

			return ret;
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.common.tool.Pop');});