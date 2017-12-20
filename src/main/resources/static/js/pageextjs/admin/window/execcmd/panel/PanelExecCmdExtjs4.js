Ext.define('Workspace.admin.window.execcmd.panel.PanelExecCmdExtjs4', {

	extend: 'Ext.form.Panel'
	,
	alias: 'workspace.PanelCExecCmd',
	alternateClassName: 'WorkspacePanelExecCmd'
	,
    initComponent : function(){
		var me = this;
		Ext.apply(me, {
			items : [
				{
			        xtype     : 'textareafield',
			        grow      : true,
			        name      : 'commandLine',
			        id        : 'commandLine',
                    fieldCls  : 'console',
			        anchor    : '100%',
			        margin    : '0 0 0 0'
			    }
			],
		    // Reset and Submit buttons
		    buttons : [
			    {
			        text: 'Reset',
			        handler: function() {
			            this.up('form').getForm().reset();
			        }
			    },
			    {
			        text: 'Submit',
			        formBind: true, //only enabled once the form is valid
			        disabled: true
			        ,
			        handler: function() {
			            var form = this.up('form').getForm();
			            if (form.isValid()) {
			                form.submit({
				            	url : DOMAIN_NAME_ROOT + '/action.servlet?event=AdminPageExecCmdValiderExtJs',
			                    success: function(form, action) {
                        	        me.updateResponse(true, action.result);
			                    },
			                    failure: function(form, action) {
                        	        me.updateResponse(false, action.result);
			                    }
			                });
			            }
			        }
			    }
		    ]
	    });
	    me.callParent(arguments);
	}
    ,
    updateResponse: function (success, result) {
    	var field = Ext.getCmp('commandLine');
    	var msg = '';
    	if (Ext.isDefined(result)) {
    		msg = result.msg;
    	}
    	field.setValue(field.getValue() + Workspace.tool.UtilString.decodeUtf8(msg));
    }
	,
    // Fields will be arranged vertically, stretched to full width
    layout: 'fit',
    defaults: {
        anchor: '100%'
    },
	buttonAlign : 'center',
	border:false,
    width: 350,
	margin    : '0 0 0 0',
	bodyPadding: '0 0 0 0'

}, function() {Workspace.tool.Log.defined('Workspace.admin.window.execcmd.panel.PanelExecCmdExtjs4');});