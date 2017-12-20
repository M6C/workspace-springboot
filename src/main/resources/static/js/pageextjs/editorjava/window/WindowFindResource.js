Ext.define('Workspace.editorjava.window.WindowFindResource', {
	requires: [
   	    'Workspace.common.tool.Pop'
   	]
   	,
	extend: 'Ext.Window'
	,
	alias: 'widget.editorjavaWindowFindResource',
	alternateClassName: 'WorkspaceEditorJavaWindowFindResource'
	,
	// private
	initComponent : function(){
		var me = this;

        var gridHeight = 100;
		if(!Ext.isDefined(me.showNameFilter) || me.showNameFilter == true) {
		    gridHeight -= 10;
		}
	    if(!Ext.isDefined(me.showContentFilter) || me.showContentFilter == true) {
		    gridHeight -= 20;
	    }

		var grid = Ext.create('Workspace.editorjava.window.findresource.grid.GridFindResource', {
		    anchor: '100% ' + gridHeight + '%',
    		id:'gridFindResource',
    		nameFilter: me.nameFilter,
    		application: me.application,
    		onSubmit: me.onSubmit
    	});

		Ext.apply(me, {
			layout: {
			    type: 'anchor',
                align: 'stretch'
			}
			,
		    items : [
				{
				    anchor: '100% 10%',
					xtype: 'combo',
				    id: 'nameFilter',
				    name: 'nameFilter',
				    fieldLabel: '',
				    allowBlank: false,
				    enableKeyEvents: true,
				    emptyText: 'Name Filter',
				    value: me.nameFilter,
        		    store: Ext.create('Workspace.common.form.combobox.data.StoreProjectExtjs4', {autoload: true, buffered: true,
                        listeners: {
    				    	load : function(store, records, successful, operation, options) {
                                me.data = store.data;
    				    	}
    				    }
    				    ,
    				    getCount: function() {
			    		    var me = this;
    				        return me.data.getCount();//!Ext.isDefined(me.data) ? 0 : me.data.getCount();
    				    }
        		    }),
                    displayField:'project',
                    // isExpanded: true // true means block, false auto
                    // ,
				    listeners: {
				    	keyup : me.onKeyUp,
			    		beforeselect: me.onBeforeSelect,
			    		beforequery: function() {return Ext.isEmpty(this.store.data);}
				    }
				    ,
                    setCaretPosition: function(pos) {
                        var el = this.inputEl.dom;
                        if (typeof(el.selectionStart) === "number") {
                            el.focus();
                            el.setSelectionRange(pos, pos);
                        } else if (el.createTextRange) {
                            var range = el.createTextRange();
                            range.move("character", pos);
                            range.select();
                        } else {
                            throw 'setCaretPosition() not supported';
                        }
                    }
                    ,
                    getCaretPosition: function() {
                        var el = this.inputEl.dom;
                        if (typeof(el.selectionStart) === "number") {
                            return el.selectionStart;
                        } else if (document.selection && el.createTextRange){
                            var range = document.selection.createRange();
                            range.collapse(true);
                            range.moveStart("character", -el.value.length);
                            return range.text.length;
                        } else {
                            throw 'getCaretPosition() not supported';
                        }
                    }
				}
				,
				{
				    anchor: '100% 10%',
					xtype: 'textfield',
				    id: 'contentFilter',
				    name: 'contentFilter',
				    fieldLabel: '',
				    allowBlank: false,
				    enableKeyEvents: true,
				    emptyText: 'Content Filter',
				    value: me.contentFilter,
				    listeners: {
				    	keypress : me.onKeyPress
				    }
				}
				,
				{
				    anchor: '100% 10%',
					xtype: 'textfield',
				    id: 'extentionFilter',
				    name: 'extentionFilter',
				    fieldLabel: '',
				    allowBlank: true,
				    enableKeyEvents: true,
				    emptyText: 'Extention Filter (Separator=\';\')',
				    value: me.extentionFilter,
				    listeners: {
				    	keypress : me.onKeyPress
				    }
				}
				,
				grid
		    ]
			,
			listeners : {
				'show' : function (wnd) {
					console.info('Workspace.editorjava.window.WindowFindResource show');
					if (me.showContentFilter) {
					    Ext.getCmp('contentFilter').focus(false, 200);
					} else if (me.showNameFilter) {
					    Ext.getCmp('nameFilter').focus(false, 200);
					}

				    Ext.getCmp('nameFilter').setVisible(!Ext.isDefined(me.showNameFilter) || me.showNameFilter == true);
				    Ext.getCmp('contentFilter').setVisible(!Ext.isDefined(me.showContentFilter) || me.showContentFilter == true);
				    Ext.getCmp('extentionFilter').setVisible(!Ext.isDefined(me.showContentFilter) || me.showContentFilter == true);
				}
				,
				'destroy' : me.listeners.destroy
			}
		});

		me.callParent(arguments);
	}
	,
	onBeforeSelect: function(combo, records, index, option) {
        var me = combo;
    	var value = records.data.project;
        var text = me.getValue();
        if (!Ext.isEmpty(text)) {
            var idx1 = text.indexOf('[');
            var idx2 = text.indexOf(']');
            var pos = me.getCaretPosition();

            if (idx1 >= 0 && idx2 > 0 && pos <= idx2) {
                text = text.substring(0, idx1) + "[" + value + "]" + text.substring(idx2 + 1);
            } else if (idx1 >= 0 && pos > idx1) {
                text = text.substring(0, idx1) + "[" + value + "]" + text.substring(pos);
            }
        } else {
            text = "[" + value + "]";
        }
        me.setValue(text);
        
        var pos = text.indexOf(']');
        if (pos >= 0) {
            me.setCaretPosition(pos + 1);
        }
        if (Ext.isDefined(me.getPicker())) {
            me.collapse();
        }
        me.fromSelect = true;
        return false;
    }
	,
	onKeyPress: function (field, event, option) {
        var me = field;
        var wnd = me.up('window');
		var key = event.getKey();
	    if (key == event.ENTER) {
            wnd.loadGrid();
	    }
	    return true;
    }
	,
	onKeyUp: function (field, event, option) {
        var me = field;
        var wnd = me.up('window');
		var key = event.getKey();
		if (key == event.UP || key == event.DOWN) {
		    return true;
		}
		else if (key == event.ENTER) {
            if (me.fromSelect === true) {
                me.fromSelect = false;
                return false;
            }
            wnd.loadGrid();
		} else {
            var text = me.getValue();
            if (!Ext.isEmpty(text)) {
                var idx1 = text.indexOf('[');
                var idx2 = text.indexOf(']');
                var pos = me.getCaretPosition();

                if (idx1 >= 0 && pos > idx1 && (pos <= idx2 || idx2 < 0)) {
                    idx2 = (idx2 > idx1) ? idx2 : pos;
                    var txtFilter = text.substring(idx1+1, idx2).toLowerCase();
                    me.store.data = wnd.data.clone();
                    me.store.data.sort({direction:"ASC",property:"project",root:"data"});
                    me.store.filters.clear();
                    var filter = new Ext.util.Filter({
                        filterFn: function(item) {
                            return Ext.isEmpty(txtFilter) || item.data.project.toLowerCase().indexOf(txtFilter) >= 0;
                        }
                    });
                    me.store.filter(filter);
                    me.expand();
                    me.getPicker().show();
                    return;
                }
            }
            if (Ext.isDefined(me.getPicker())) {
                me.collapse();
            }
		}
	}
	,
	loadGrid() {
	    var nameFilter = Ext.getCmp('nameFilter').getValue();
	    var contentFilter = Ext.getCmp('contentFilter').getValue();
	    var extentionFilter = Ext.getCmp('extentionFilter').getValue();
		var grid=Ext.getCmp('gridFindResource');
		var store = grid.getStore();
		if (store.isLoading()) {
			Workspace.common.tool.Pop.info(me, 'Find resource loading in progress.');
		} else {
			grid.getStore().load(new Ext.data.Operation({
	    		action : 'read',
	    		params: {
	    			nameFilter: nameFilter,
	    			contentFilter: contentFilter,
	    			extentionFilter: extentionFilter
	    		}
	    	}));
		}
	}
	,
	title: 'Find Resource',
	layout:'fit',
	width:730,
	height:300,
	//autoHeight: true,        //hauteur de la fen?tre
	modal: true
	/*,             //Grise automatiquement le fond de la page
	closeAction:'hide',
	plain: true
	*/

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.window.WindowFindResource');});