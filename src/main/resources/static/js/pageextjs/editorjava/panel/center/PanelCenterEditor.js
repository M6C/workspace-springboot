Ext.define('Workspace.editorjava.panel.center.PanelCenterEditor', {
	requires: [
	  'Workspace.editorjava.panel.center.function.AddTabSave',
	  'Workspace.editorjava.panel.center.function.AddTabSaveAll',
	  'Workspace.editorjava.panel.center.function.AddTabReload',
	  'Workspace.editorjava.debug.ApplyDebug',
	  'Workspace.editorjava.request.JsonEditLoadFile',
	  'Workspace.editorjava.aceeditor.command.CommandShortcut'
	]
	,
	extend: 'Ext.panel.Panel'
	,
	alias: 'widget.panelCenterEditor',
	alternateClassName: 'PanelCenterEditor'
	,
	elements: 'body,tbar',
	layout: 'fit',
	collapsed: false,
    stateful:false,
//	hideCollapseTool: false,
//	hideMode: 'visibility',
    initialized: false,
    initComponent : function(){
		var me = this;

		var panel = Ext.create('Ext.panel.Panel', {
			id: me.panelEditorId
		});

        var titleTech = me.raw.contentType;
        if (me.raw.build == 'true') {
            titleTech += '&nbsp;|&nbsp;build';
        }
        if (me.raw.autoDeploy === true) {
            titleTech += '&nbsp;|&nbsp;autoDeploy';
        }
        var title = me.panelId;
        title = Workspace.tool.UtilString.cuteSplitPath(title, 100);

		Ext.apply(me, {
		    tbar: Ext.create('Ext.toolbar.Toolbar', {
		    	cls: 'x-panel-header',
		    	height: 25,
			        items: [
						'<span style="color:#555555" title="'+titleTech+'">' + '<img src="'+DOMAIN_NAME_ROOT+'/imgExtJs/EditorJava/icon_info.gif" width="12px" height="12px"/>' + 
						'</span>&nbsp;<span style="color:#4067B3" title="'+me.panelId+'">' + title + '</span>',
					    '->'
					    ,
/*
                        {
					    	text: 'Save', 
					    	handler:  function(button, e) {
					            var editor = ace.edit(me.panelEditorId);
					    		Workspace.editorjava.panel.center.function.AddTabSave.call(editor)
				    		}
					    }
					    ,
			            {
					    	text: 'Reload',
					    	handler:  function(button, e) {
					    	    me.reload(true)
					    	}
			            }
					    ,
*/			            {
					    	text: 'S<u>h</u>ortcuts',
					    	tooltip: Workspace.editorjava.aceeditor.command.CommandShortcut.command(),
					    	handler:  function(button, e) {
		    		            var editor = ace.edit(me.panelEditorId);
					    	    editor.execCommand('editorShortcut');
					    	}
			            }
			        ]
		    })
		    ,
		    items: [
		        panel
		    ]
		    ,
		    listeners : {
		    	afterlayout: function(tab, layout, option) {
		            console.debug('Workspace.editorjava.panel.center.PanelCenterEditor afterlayout');

		    		if (!me.initialized) {
                        var editor = ace.edit(me.panelEditorId);
                        Ext.apply(editor, {
                            id: me.panelEditorId,
                            panelId: me.panelId,
                            panelEditorId: me.panelEditorId,
                            application: me.application,
                            build: me.build,
                            autoDeploy: me.autoDeploy,
                            stateful:false,
                            raw: me.raw
                        });

						Ext.Loader.syncRequire('Workspace.editorjava.aceeditor.command.CommandSave');
					    Workspace.editorjava.aceeditor.command.CommandSave.addCommand(editor);

						Ext.Loader.syncRequire('Workspace.editorjava.aceeditor.command.CommandSaveAll');
					    Workspace.editorjava.aceeditor.command.CommandSaveAll.addCommand(editor);

					    Ext.Loader.syncRequire('Workspace.editorjava.aceeditor.command.CommandCompletion');
					    Workspace.editorjava.aceeditor.command.CommandCompletion.addCommand(editor);

						Ext.Loader.syncRequire('Workspace.editorjava.aceeditor.command.CommandOptimizeImport');
					    Workspace.editorjava.aceeditor.command.CommandOptimizeImport.addCommand(editor);

						Ext.Loader.syncRequire('Workspace.editorjava.aceeditor.command.CommandImport');
					    Workspace.editorjava.aceeditor.command.CommandImport.addCommand(editor);

						Ext.Loader.syncRequire('Workspace.editorjava.aceeditor.command.CommandCloseTab');
					    Workspace.editorjava.aceeditor.command.CommandCloseTab.addCommand(editor);

	                    if (Ext.isDefined(me.tab) && Ext.isDefined(editor.raw)) {
	    		            me.tab.setTooltip('encoding:' + editor.raw.encoding);
	                    }

                        me.reload();

		    			me.initialized = true;
		    		}
		    	}
				,
				'show': function(tab, option) {
		    		var editor = ace.edit(me.panelEditorId);
					if (!editor.dirty) {
						me.reload();
					} else {
						me.callBackReloadSuccess(me);
					}
		    	}
				,
				beforeclose: function(tab, option) {
					var editor = ace.edit(tab.panelEditorId);
					if (editor.dirty) {
        	        	Ext.Msg.confirm('Close', 'This file has been modified.<br>Confirm close ?', function(btn, text){
				            var mainCenterPanel=tab.up('tabpanel');
        	        	    if (btn == 'yes') {
        	        	        editor.dirty = false;
				                mainCenterPanel.remove(tab);
        	        	    } else {
				                mainCenterPanel.setActiveTab(tab);
				                editor.focus();
        	        	    }
        	        	});
					}
				    return !editor.dirty;
		    	}
				,
				removed: function(tab, container, option) {
			        // Return 
			        // true:if each method have running to the end (id not find)
			        // integer value (0...): index where id is find
			        if (Ext.isDefined(container.tabRemovedStack)) {
    			        var notFind = Ext.each(container.tabRemovedStack, function(item) {
    				        return item.id != tab.raw.id;
    				    });
    				    if (notFind === true) {
        				    container.tabRemovedStack.push(tab.raw);
    				    }
			        }
				}
		    }
	    });
		me.callParent(arguments);
	}
	,
	reload: function(pop) {
	    var me = this;
        var editor = ace.edit(me.panelEditorId);
		Workspace.editorjava.panel.center.function.AddTabReload.call(editor, function(){me.callBackReloadSuccess(me, pop)})
	}
	,
	callBackReloadSuccess: function(me, pop) {
	    me.editorFocusAndScroll(me);
	    me.expandTree(me);
	    
		var editor = ace.edit(me.panelEditorId);
		if (!editor.dirty) {
	        me.setTitle(me.raw.text);
		}
	    if (pop === true) {
	        Workspace.common.tool.Pop.info(me, 'Reload success');
	    }

	    var application = me.raw.application;
	    var classname = me.raw.className;
	    if (!Ext.isEmpty(application) && !Ext.isEmpty(classname)) {
	        var callback = function(jsonData, success) {
	        	if (!success) {
			        Workspace.common.tool.Pop.error(me, "Initialize Breakpoint Project '" + application + "' Class '" + classname + "' failure.", {toast: false});
			        return;
	        	}
	
	            var detail = 'No breakpoint found.';
	            if (Ext.isDefined(jsonData)) {
	            	var cnt = jsonData.children.length;
	                if (cnt == 1) {
	                    detail = '1 breakpoint found.';
	                } else if (cnt > 1) {
	                    detail = (cnt + ' breakpoints founds.');
	                }
	
	                Ext.Array.each(jsonData.children, function(item) {
//	                    editor.getSession().addGutterDecoration(item.line,"ace_breakpoint");
			            editor.getSession().setBreakpoint(item.line-1);
	                });
	
	            }
		        Workspace.common.tool.Pop.success(me, "Initialize Breakpoint Project '" + application + "' Class '" + classname + "' success.", {toast: false, detail:detail});
	        };
	
	        Ext.create('Workspace.editorjava.debug.request.JsonDebugList', {application: application, className: classname}).request(callback);
	    }
	}
	,
	debugStart: function() {
		Ext.getCmp('mainCenterPanel').debugStart();
	}
	,
	debugStop: function() {
		Ext.getCmp('mainCenterPanel').debugStop();
	}
	,
	expandTree: function(tab) {
		console.debug('Workspace.editorjava.panel.center.PanelCenterEditor expandTree');
		var me = this;
		var cnt = 10;
		var field = 'text';
		var separator = '\\';

		var comboStore = Ext.getCmp('comboProject').getStore();
		var tree = Ext.getCmp('treeDirectory');
		var current = tree.getRootNode();
		var application;
		var task;

		var delayedFnTree = function(){
	        if(current.isLoading() && (cnt-- > 0)) {
				// Waiting...
				console.debug('Workspace.editorjava.panel.center.PanelCenterEditor tab \''+me.panelId+'\' Waiting... ('+field+':'+current.get(field)+',cnt:'+cnt+',loading:'+current.isLoading()+')');
				task.delay(500, delayedFnTree);
	        } else {
				var path = separator + tab.raw.path;

				tree.expandPath(path, field, separator, function(success, node) {
    				var editor = ace.edit(tab.panelEditorId);
	                editor.focus();
	                tab.focus();
				});
	        }
		};

		var delayedFnCombo = function(){
	        if(comboStore.isLoading() && (cnt-- > 0)) {
				// Waiting...
				console.debug('Workspace.editorjava.panel.center.PanelCenterEditor tab \''+me.panelId+'\' Waiting... (Combo Project Loading - Tab project:\'' + tab.raw.application + '\',cnt:'+cnt+',loading:'+comboStore.isLoading()+')');
				task.delay(500, delayedFnCombo);
	        } else {
	        	application = Ext.getCmp('project').value;
				if (Ext.isDefined(tab.raw) && tab.raw.application != application) {
					console.debug('Workspace.editorjava.panel.center.PanelCenterEditor tab \''+me.panelId+'\' is not on current project ! Tab project:\'' + tab.raw.application + '\' Current project:\'' + application + '\'');
					return true;
				} else {
					task.delay(0, delayedFnTree);
				}
	        }
		};

		task = new Ext.util.DelayedTask();
		task.delay(0, delayedFnCombo);
	}
	,
	editorFocusAndScroll: function(me) {
		var editor = ace.edit(me.panelEditorId);
        editor.doListenerChange = false;
	    editor.focus();

	    var cursorRow = (Ext.isDefined(editor.cursorRow) ? editor.cursorRow : 0);
	    var cursorCol = (Ext.isDefined(editor.cursorCol) ? editor.cursorCol : 0);

		editor.gotoLine(cursorRow+1, cursorCol, false);
	    editor.scrollToLine(cursorRow+1, true, false, function(){});

        if (Ext.isDefined(editor.changeScrollTop) && Ext.isDefined(editor.changeScrollLeft)) {
    	    var scrollTop = editor.changeScrollTop;
    	    var scrollLeft = editor.changeScrollLeft;
    
    		editor.getSession().setScrollTop(scrollTop);
    		editor.getSession().setScrollLeft(scrollLeft);
        }

	    new Ext.util.DelayedTask().delay(500, function() {
	        editor.doListenerChange = true;
	        editor.focus();
	    });
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.center.PanelCenterEditor');});