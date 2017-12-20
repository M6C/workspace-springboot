Ext.define('Workspace.editorjava.form.combobox.ComboProject', {
	requires: [
	    'Workspace.common.tool.Pop',
	    'Workspace.tool.UtilComponent',
	    'Workspace.editorjava.constant.ConstantState',
        'Workspace.editorjava.aceeditor.command.CommandFindResource'
  	]
  	,
	extend: 'Workspace.widget.combobox.WidgetComboProject'
	,
	alias: 'widget.editorjavaComboProject',
	alternateClassName: 'WorkspaceEditorJavaComboProject'
	,
    enableKeyEvents: true,
    editable: false
 	,
	// Overrided
	onActionItem: function(cmb, newValue, oldValue, option) {
	    var me = this;
		var application = newValue;
		console.info('Workspace.editorjava.form.combobox.ComboProject select:'+application);

		Ext.getCmp('project').value=application;

        if (!Ext.isEmpty(application)) {
            Workspace.common.tool.Pop.info(me, "Initialize Project '" + application + "'.", {detail: 'Waiting for complet.'});
            Workspace.editorjava.constant.ConstantState.inProgressInitialize(true);
            Ext.Ajax.request({
                url: DOMAIN_NAME_ROOT + '/action.servlet?event=JsonInitializeProject',
                method: 'GET',
                params: {application: application},
                success: function() {
    		        Workspace.common.tool.Pop.info(me, "Initialize Project '" + application + "' success.", {detail: 'Waiting for Debug initialization..'});
    		        var callback = function(jsonData, success) {
                    	Workspace.editorjava.constant.ConstantState.inProgressInitialize(false);
    		        	if (!success) {
    				        Workspace.common.tool.Pop.error(me, "Initialize Debug Project '" + application + "' failure.");
    				        return;
    		        	}
                        var detail = 'No breakpoint found.';
                        if (Ext.isDefined(jsonData)) {
                        	var cnt = jsonData.children.length;
            				var mainCenterPanel=Ext.getCmp('mainCenterPanel');
            				mainCenterPanel.setDebugBreakpoint(jsonData.children);
                            if (cnt == 1) {
                                detail = '1 breakpoint found.';
                            } else if (cnt > 1) {
                                detail = (cnt + ' breakpoints founds.');
                            }
                        }
        		        Workspace.common.tool.Pop.success(me, "Initialize Debug Project '" + application + "' success.", {detail:detail});
    		        };

    		        Ext.create('Workspace.editorjava.debug.request.JsonDebugList', {application: application}).request(callback);
                },
                failure: function() {
                	Workspace.editorjava.constant.ConstantState.inProgressInitialize(false);
    		        Workspace.common.tool.Pop.error(me, "Initialize Project '" + application + "' failure.");
                }
            });
        } else {
            console.warn('Initialize Project. No application Selected.');
        }

		var tree = Ext.getCmp("treeDirectory");
		tree.getRootNode().set('text', '[' + application + ']');
		tree.getStore().getProxy().extraParams.path = '';
		tree.getStore().getProxy().extraParams.application = application;
		tree.getStore().load(
			new Ext.data.Operation({
				action:'read',
				callback: function() {
//				    me.manageTab(application);
				}
			})
		);
	}
	,
    initComponent : function(){
		var me = this;

        Workspace.editorjava.aceeditor.command.CommandFindResource.addListener(me);
        
        Workspace.tool.UtilComponent.addListener(me, 'beforeselect', me.listenerBeforeSelect);

		me.callParent(arguments);
	},
	listenerBeforeSelect: function (combo, record, index, option) {
	    var me = this;
	    me.doActionItem = !Workspace.editorjava.constant.ConstantState.inProgressBuild();
	    if (!me.doActionItem) {
	        Workspace.editorjava.constant.ConstantState.inProgressBuildMessage();
	    }
	    return me.doActionItem;
	}
	,
	manageTab: function(key) {
		var me = this;
		var regex = '^\\[' + key + '\\]';
		var tabPanel=Ext.getCmp('mainCenterPanel');
		var tabs = tabPanel.items;

		var listShow = me.listTabHide.filterBy(function(tab) {
			var id = tab.id;
			return (id.search('^\\[' + key + '\\]') == 0);
		});

		var listHide = tabs.filterBy(function(tab) {
			var id = tab.id;
			return !(id.search('^\\[' + key + '\\]') == 0);
		});

		var tabShow = null;
		listShow.each(function(tab) {
//			tabPanel.add(tab);

			tabPanel.setActiveTab(tab);
			tabShow = tab;

			tab.tab.show();
//			tab.expand(true);

//			tab.ownerCt.setVisible(true);

			me.listTabHide.remove(tab);
		});

		var tabHide = null;
		listHide.each(function(tab) {
//			tabPanel.remove(tab, true);

			tabHide = tab;
			tab.tab.hide();
//			tab.collapse();

//			tab.ownerCt.setVisible(false);

			me.listTabHide.add(tab);
		});

		if (tabShow != null) {
			tabShow.expand();
		} else if (tabHide != null) {
			tabHide.collapse();
		}
	}
	,
	listTabHide: new Ext.util.MixedCollection()
	,
	manageTab2: function(key) {
		var me = this;
		var nbActive = 0;
		var tabPanel=Ext.getCmp('mainCenterPanel');
		var tabs = tabPanel.items;
		var tabActive = null;
		var check = false;
		tabs.each(function(tab) {
			var id = tab.id;
			var find = id.search('^\\[' + key + '\\]') == 0;

			if (find) {
				if (nbActive == 0) {
					tabPanel.setActiveTab(tab);
					tabActive = tab;
					nbActive++;
					check = true;
				}
			}
			tabActive = (tabActive == null) ? tab : tabActive;

			// Hide/Show Tab Header
		    tab.tab.setVisible(find);
		});

		if (tabActive != null) {
			me.manageVisibilityTab(tabActive, check);
			me.manageVisibilityTabToolBar(tabActive, check);
		}
		else if (nbActive == 0 && tabs.getCount() >= 0) {
			var tab = tabs.getAt(0);
			me.manageVisibilityTabToolBar(tab, false);
		}
	}
	,
	manageVisibilityTab: function (tab, check) {
//		// Hide/Show Tab Header
//	    tab.tab.setVisible(check);

	    // Hide/Show Content
		if (Ext.isDefined(tab.items)) {
		    tab.items.each(function(item) {
			    item.setVisible(check);
		    });
		}

//	    // Hide/Show ToolBar
//		manageVisibilityTabToolBar(tab, check);
	}
	,
    // Hide/Show Tab ToolBar
	manageVisibilityTabToolBar(tab, check) {
		if (Ext.isDefined(tab.dockedItems)) {
		    tab.dockedItems.each(function(item) {
//		    	item.ownerCt.setVisible(check);
		    	if (item.container.id = tab.id) {
		    		item.setVisible(check);
		    	}
		    });
		}
	}
	,
	copyTab: function(tabPanel, tab) {
    	var serial = '{' + 
			'title:\'' + tab.title + '\', ' +
			'id:\'' + tab.id + '\', ' +
			'panelEditorId:\'' + tab.panelEditorId + ', ' +
			'panelId:\'' + tab.panelEditorId + '\', ' +
			'autoDeploy:' + tab.autoDeploy + 
		'}';
		var tabId = tab.id + '_Tab';
		tabPanel.add({
			xtype:'tab',
	        title: tab.title,
	        html: serial,
	        itemId: tabId
	    });
		var tabSerial = tabPanel.getComponent(tabId);
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.form.combobox.ComboProject');});