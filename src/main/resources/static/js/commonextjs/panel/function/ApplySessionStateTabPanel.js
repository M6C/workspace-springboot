Ext.define('Workspace.common.panel.function.ApplySessionStateTabPanel', {
	singleton : true,
	options : {}
	,
	apply: function(panel, stateId) {
	    console.debug('Workspace.common.panel.function.ApplySessionStateTabPanel apply stateId:' + stateId);

		Ext.apply(panel, {
			stateful: true,
			stateId: stateId,
			stateEvents: ['add', 'remove', 'tabchange', 'updatestate'], 
			stateData: undefined,
		    getState: function() { 
			    console.debug('Workspace.common.panel.function.ApplySessionStateTabPanel apply getState');
		        var s = {raw: []}; 
		        if (!Ext.isEmpty(panel.getActiveTab())) {
		            var tab = panel.getActiveTab();
                    var raw = panel.getRawFromTab(tab);
					s.activeTab = raw;
		        }
		        if (!Ext.isEmpty(panel.items)) {
					var i = 0;
			        panel.items.each(function(tab) {
                        var raw = panel.getRawFromTab(tab);
						s.raw[i++] = raw;
					});
		        }
		        return s; 
		    }
			, 
		    applyState: function(s) { 
			    console.debug('Workspace.common.panel.function.ApplySessionStateTabPanel apply applyState');
		        panel.stateData = s;
		    }
		    ,
		    getRawFromTab: function(tab) {
                var raw = tab.raw;
    			if (!Ext.isDefined(raw)) {
    				raw = {};
    			}
    			var editor = ace.edit(tab.panelEditorId);
    			if (Ext.isDefined(editor)) {
			        // console.info('getRawFromTab - cursorCol:' + editor.cursorCol + ' cursorRow:' + editor.cursorRow + ' ScrollTop:' + editor.changeScrollTop + ' ScrollLeft:' + editor.changeScrollLeft + ' id:' + editor.id);
	    			raw.cursorRow = editor.cursorRow;
	    			raw.cursorCol = editor.cursorCol;
	    			//raw.changeScrollTop = editor.changeScrollTop;
	    			//raw.changeScrollLeft = editor.changeScrollLeft;
    			}
    			return raw;
		    }
	    });

		panel.on('render', function(component, option) {
		    console.debug('Workspace.common.panel.function.ApplySessionStateTabPanel apply render');
		    var stateData = panel.stateData;
			if (!Ext.isEmpty(stateData)) {
			    if(!Ext.isEmpty(stateData.raw)) {
    		    	Ext.Array.each(stateData.raw, function(tab) {
    		    		if (tab != null) {
    		    			panel.onAddTab(tab);
    		    		}
    				});
    			}

			    if(!Ext.isEmpty(stateData.activeTab)) {
			        panel.setActiveTab(stateData.activeTab.id);
			    }

    			panel.stateData = undefined;
			}
		});
	}
}, function() {Workspace.tool.Log.defined('Workspace.common.panel.function.ApplySessionStateTabPanel');});