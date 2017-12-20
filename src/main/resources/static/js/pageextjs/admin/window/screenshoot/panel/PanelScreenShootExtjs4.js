Ext.define('Workspace.admin.window.screenshoot.panel.PanelScreenShootExtjs4', {
	// REQUIRED

	extend: 'Ext.form.Panel'
	,
	alias: 'workspace.PanelCScreenShoot',
	alternateClassName: 'WorkspacePanelScreenShoot',
	layout: {
		type: 'table',       // Arrange child items vertically
		columns: 3,
        //type: 'hbox',       // Arrange child items vertically
        //align: 'stretch',    // Each takes up full width
        padding: 5
    },
//	,
//  layout: 'anchor',
//  defaults: {
//      anchor: '100%'
//  },
    initComponent : function(){
		var me = this;
		Ext.apply(me, {
			items : [
						{
						    xtype: 'textfield',
							name: 'qualityRate',
							id: 'qualityRate',
							fieldLabel: 'Quality Rate',
							width: '30%',
							allowBlank: false,
							value: '25'
						},
						{
						    xtype: 'textfield',
							name: 'screenHeight',
							id: 'screenHeight',
							fieldLabel: 'Height',
							width: '30%',
							allowBlank: false,
							value: '600'
						},
						{
						    xtype: 'textfield',
							name: 'screenWidth',
							id: 'screenWidth',
							fieldLabel: 'Width',
							width: '30%',
							allowBlank: false,
							value: '800'
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
			        text: 'Refresh',
			        formBind: true, //only enabled once the form is valid
			        disabled: true
			        ,
			        handler: function() {
			            var form = this.up('form').getForm();
			            if (form.isValid()) {
			            	// change the src of the image programmatically
			            	var url = DOMAIN_NAME_ROOT + '/Actionscreenshoot';
			            	url += '?qualityRate='+Ext.getCmp('qualityRate').value;
			            	url += '&screenHeight='+Ext.getCmp('screenHeight').value;
			            	url += '&screenWidth='+Ext.getCmp('screenWidth').value;
			            	url += '&time='+new Date().getTime();
			            	console.info('Workspace.admin.window.screenshoot.panel.PanelScreenShootExtjs4 Refresh url:'+url);
			            	Ext.getCmp('screenshoot').setSrc(url);
			            }
			        }
			    }
		    ]
	    });
	    me.callParent(arguments);
	}
	,
    // Fields will be arranged vertically, stretched to full width
	buttonAlign : 'center',
    bodyPadding: 5,
	border:false,
    width: 350

}, function() {Workspace.tool.Log.defined('Workspace.admin.window.screenshoot.panel.PanelScreenShootExtjs4');});
