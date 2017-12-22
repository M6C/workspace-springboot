Ext.define('Workspace.common.window.WindowCombo', {
// Warning : Ext.window.MessageBox is ASYNCHRONOUS. Showing a MessageBox will NOT cause the code to stop.
    extend: 'Ext.window.MessageBox',
    initComponent: function () {
            var me = this;
            me.callParent();

            var index = me.promptContainer.items.indexOf(me.textField);
            me.promptContainer.remove(me.textField); 
            me.textField = me._createComboBoxField(me);
            me.textField.msgButtons = me.msgButtons;
            me.promptContainer.insert(index, me.textField);
    },
    _createComboBoxField: function (me) {
        var data = me.value;

    	var defaultConverter = function(value, record) {
            return record.raw;
        };
        var store = Ext.create('Ext.data.ArrayStore', {
            fields: [
              {name: 'text',  convert: me.textConverter},
              {name: 'data',  convert: me.dataConverter}
            ],
            data: data
        });

        var combo = Ext.create('Ext.form.field.ComboBox', {
            id: me.id + '-combo',
            typeAhead: true,
            editable: true,
    		width:230,
            displayField: 'text',
            valueField: 'data',
            store: store,
            autoSelect: true,
            minChars: 1,
            enableKeyEvents: true,
            editable: false,
            listeners: {
                specialkey: me.onSpecialKey,
                select: me.onSelect
            },
            listConfig: {
                listeners: {
                    itemClick: me.onItemClick
                },
                scope: me
            },
            callback: me.callback
        });

        if (Ext.isDefined(me.comboConfig)) {
            Ext.apply(combo, me.comboConfig);
        }

        return combo;
    }
    ,
    onSelect: function(combo, records, option) {
    	if (!Ext.isEmpty(records)) {
        	combo.idxFocus = records[0].index;
    	} else {
        	combo.idxFocus = undefined;
    	}
    }
    ,
    onItemClick: function(list, record) {
    	var combo = list.scope.textField;
    	if (!Ext.isEmpty(record)) {
        	combo.idxFocus = record.index;
    	} else {
        	combo.idxFocus = undefined;
    	}
    }
    ,
    onSpecialKey: function(field, e) {
    	var key = e.getKey();
    	if (key == e.UP || key == e.DOWN) {

            if (!field.isExpanded && key == e.UP) {
            	// Do Nothing
            } else if (!Ext.isDefined(field.idxFocus)) {
            	field.idxFocus = -1;
            } else {
            	var idx = field.idxFocus;

                if (field.isExpanded) {
                	var length = field.store.data.items.length;
                    if (key == e.UP) {
	                	idx = (idx == 0 ? (length-1) : idx-1);
                    } else if (key == e.DOWN) {
	                	idx = (idx == (length-1) ? 0 : idx+1);
                    }
                }
            	
            	field.idxFocus = idx;
            	field.select(idx, true);
            }
    	} else if (key === e.ENTER) {
        	var idx = field.idxFocus;
        	if (Ext.isDefined(idx)) {
	            var val = field.store.data.items[idx].data.data;
	            var doClick = !Ext.isEmpty(field.lastValue) && !Ext.isEmpty(val) && field.lastValue.classname == val.classname;
	            if (doClick) {
	            	var element = field.msgButtons.ok;
	            	element.fireEvent('click',element.fireHandler());
	            	e.stopEvent();
	            }
        	}
        } else if (e.getKey() === e.ESC) {
            var element = field.msgButtons.cancel;
            element.fireEvent('click',element.fireHandler());
            e.stopEvent();
        }
    }
	,
    listeners: {
		'load' : function(store, records, successful, operation, eOpts) {
			console.info('Workspace.common.window.WindowCombo load');
		}
		,
		'add' : function ( container, component, index, eOpts ) {
			console.info('Workspace.common.window.WindowCombo add');
			component.on('focus', function(event, element, options) {
				console.info('Workspace.common.window.WindowCombo item focus');
			});
		}
    }
    ,
    textConverter: function(value, record) {
        return record.raw;
    }
    ,
    dataConverter: function(value, record) {
        return record.raw;
    }
}, function() {Workspace.tool.Log.defined('Workspace.common.window.WindowCombo');});