Ext.define('Workspace.common.window.WindowWaiting',  {
	// REQUIRED

	statics: {
		pleaseWaitMessage : 'Please Wait...',
		runningProcessMessage : 'Running process...',
		hideWindowWaitingDelay : 2
		,
		current : null
		,
		show : function() {
			if (Ext.isEmpty(this.current)) {
				//Ext.MessageBox.wait(this.runningProcessMessage, this.pleaseWaitMessage);
				this.current = Ext.window.MessageBox.create().wait(this.runningProcessMessage, this.pleaseWaitMessage);
//				this.current.wait(this.runningProcessMessage, this.pleaseWaitMessage);
			}
		}
		,
		/**
		 * TODO Finir la fonction pour affichier un messages sans barre de progression
		 */ 
		showNoProgress : function() {
			if (Ext.isEmpty(this.current)) {
				var config = new Ext.ProgressBar();
				config.setVisible(false);
				config.hide();
//				return Ext.MessageBox.wait(this.runningProcessMessage, this.pleaseWaitMessage, config);
				this.current = Ext.window.MessageBox.create().wait(this.runningProcessMessage, this.pleaseWaitMessage, config);
//				this.current.wait(this.runningProcessMessage, this.pleaseWaitMessage, config);
			}
			return this.current;
		}
		,
		updateText : function(text) {
			if (!Ext.isEmpty(this.current)) {
				this.current.updateText(text);
			}
		}
		,
		hide : function (msg) {
			hide(msg, 1);
		}
		,
		hide : function (msg, sec) {
			if (!Ext.isEmpty(this.current)) {
				this.current.updateProgress(1, '', msg);
				// Fermeture de la fenetre apres x sec seconde
				Ext.callback(function(wnd) {wnd.hide();}, null, [this.current], sec*1000);
				this.current = null;
			}
		},

		showWindowWaiting : function () {
//			return Ext.window.MessageBox.wait(this.runningProcessMessage, this.pleaseWaitMessage);
			var wnd = Ext.window.MessageBox.create();
			wnd.wait(this.runningProcessMessage, this.pleaseWaitMessage);
			return wnd;
		},
		manageWindowWaiting : function(wndWait, message, index, count, grid) {
			if (index < count) {
				Workspace.common.window.WindowWaiting.updateWindowWaiting(wndWait, message);
			} else {
				Workspace.common.window.WindowWaiting.hideWindowWaiting(wndWait, message);
				if (Ext.isDefined(grid) && Ext.isFunction(grid.refresh)) {
					grid.refresh();
				}
			}
		}
		,
		/**
		 * TODO Finir la fonction pour affichier un messages sans barre de progression
		 */ 
		showWindowWaitingNoProgress : function () {
		  var config = new Ext.ProgressBar();
		  config.setVisible(false);
		  config.hide();
//		  return Ext.window.MessageBox.wait(this.runningProcessMessage, this.pleaseWaitMessage, config);
			return Ext.window.MessageBox.create().wait(this.runningProcessMessage, this.pleaseWaitMessage, config);
		},
	
		hideWindowWaiting : function (wnd, msg) {
			this.hideWindowWaiting(wnd, msg, this.hideWindowWaitingDelay);
		},
	
		hideWindowWaiting : function (wnd, msg, sec) {
		   wnd.updateProgress(1, '', msg);
		   // Fermeture de la fen?tre apr?s x sec seconde
		   var x = window.setInterval(function() {wnd.hide();/*wnd.clearInterval(x);*/}, sec*1000);
		},
	
		updateWindowWaiting : function (wnd, msg) {
		   wnd.updateProgress(1, '', msg);
		},
		
		setStatusMessageAndHideWaiting : function (request, statusbarId, defaultMessage) {
			try {
				var resultMessage = '';
				if (defaultMessage == '') {
					var jsonData = Ext.util.JSON.decode(result.responseText);
					resultMessage = jsonData.data[0].message;
				} else {
					resultMessage = defaultMessage;
				}
//				Ext.getCmp(statusbarId).setText(resultMessage);
			}
			finally {
				this.hideWindowWaiting(resultMessage, this.hideWindowWaitingDelay);
			}
		},
	}

}, function() {Workspace.tool.Log.defined('Workspace.common.window.WindowWaiting');});