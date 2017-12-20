Ext.define('Workspace.common.tool.Toast', {
	requires: ['Ext.ux.window.Notification']
	,
	statics: {

		show : function(message, closeDelay = 4000) {
		    console.info('Workspace.common.tool.Toast apply');
		    return Ext.create('widget.uxNotification', {
				position: 'tr',
				useXAxis: true,
				cls: 'ux-notification-light',
				iconCls: 'ux-notification-icon-information',
				closable: false,
				title: '',
				html: message,
				slideInDuration: 800,
				slideBackDuration: 1500,
				autoCloseDelay: closeDelay,
				slideInAnimation: 'elasticIn',
				slideBackAnimation: 'elasticIn',
				// Don't close if mouse is over the toast
				stickWhileHover: true
			}).show();
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.common.tool.Toast');});