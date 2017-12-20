Ext.define('Workspace.editorjava.panel.south.PanelConsole', {
	requires: [
	     'Workspace.tool.UtilString',
	     'Workspace.tool.UtilTextfield',
  	     'Workspace.common.constant.ConstantKeyboard'
  	]
	,
	extend: 'Ext.form.Panel'
	,
	alias: 'widget.panelDebugConsole',
	alternateClassName: 'WorkspacePanelDebugConsole',
	id: 'PanelDebugConsole',
	title: 'Console',
	bodyPadding:0
	,
    initComponent : function() {
		var me = this;

        Workspace.tool.UtilComponent.addListener(me, 'show', me.listenerShow);

		me.callParent(arguments);
	},
	layout: {type:'vbox', align: 'stretch'},
    items: [
        {
            xtype: 'hiddenfield',
            id: 'application',
            name: 'application',
            marging: 0
        }
        ,
        {
            xtype     : 'textareafield',
            id        : 'outConsole',
            readOnly  : true,
            // autoScroll: true,
            style     : 'margin: 0px',
            fieldStyle: 'background-color: #000; color: #fff; background-image: none; width: 100%; border: 0px;',
            enableKeyEvents : true,
            listeners : {
                keydown: function(me, event, eOpts) {
                    var fieldConsole = Ext.getCmp('fieldConsole');
                    fieldConsole.focus(false, true);
                    fieldConsole.fireEvent('keyup', fieldConsole, event, eOpts);

                    return false;
                }
            }
        }
        ,
        {
            xtype     : 'textfield',
            id        : 'fieldConsole',
            name      : 'commandLine',
            style     : 'margin: 0px',
            fieldStyle: 'background-color: #000; color: #fff; background-image: none; width: 100%; border: 0px;',
            enableKeyEvents : true,
            listeners : {
                keydown: function(me, event, eOpts) {
                    var i = 0;
                },
                keyup: function(me, event, eOpts) {
            		var key = event.getKey();
            	    if (key == event.ENTER) {
            	        me.exec(me);
            	    }
    //        	    else if (key == event.LEFT) {
    //        	    } else if (key == event.RIGHT) {
    //        	   // } else if ((64 <= key && key <= 90 /*ALPHA*/) || (48 <= key && key <= 57 /*NUMBER*/) || (96 <= key && key <= 105 /*NUMBER PAD*/) || (key == 32 /*SPACE*/)) {
    //        	    } else if (!Ext.isEmpty(Workspace.common.constant.ConstantKeyboard.keyboardMapChar[key])) {
    //        	        var char = event.browserEvent.key;
    //                    field.setRawValue(field.getRawValue() + char);
    //        	    }
                }
            }
            ,
            exec: function(me) {
                var form = me.up('form').getForm();

                var fieldConsole = Ext.getCmp('fieldConsole');
            	var fieldValue = fieldConsole.getRawValue();
            	if (!Ext.isEmpty(fieldValue)) {
                	me.updateResponse(me, true, {msg: fieldValue + '\r\n'});
                	fieldConsole.setRawValue('');
            	}

                form.submit({
                    url : DOMAIN_NAME_ROOT + '/action.servlet?event=AdminPageExecCmdValiderExtJs',
                    success: function(form, action) {
                    	me.updateResponse(me, true, action.result);
                    },
                    failure: function(form, action) {
                    	me.updateResponse(me, false, action.result);
                    }
                });
            }
            ,
            updateResponse: function (me, success, result) {
            	var msg = '';
            	if (Ext.isDefined(result)) {
            		msg = result.msg;
            	}
            	if (!Ext.isEmpty(msg)) {
                    var fieldConsole = Ext.getCmp('fieldConsole');
                	var outConsole = Ext.getCmp('outConsole');
                	var outValue = outConsole.getValue();
                    var pos = outValue.length + msg.length;

                	outConsole.setValue(outValue + Workspace.tool.UtilString.decodeUtf8(msg));

                	Workspace.tool.UtilTextfield.setCaretTo(outConsole.inputId, pos);

                    fieldConsole.focus(false, true);
            	}
    //        	Ext.Msg.alert(success ? 'Success' : 'Failed', msg);
            }
        }
    ]
    ,
    listenerShow: function(me, options) {
        me.getComponent('application').setValue(Ext.getCmp('comboProject').value);

        var fieldConsole = Ext.getCmp('fieldConsole');
        fieldConsole.exec(fieldConsole);
    }
	,
    useArrows: true,
    autoScroll: true,
    containerScroll: true,
    border: false,
    collapsible: false

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.south.PanelConsole');});