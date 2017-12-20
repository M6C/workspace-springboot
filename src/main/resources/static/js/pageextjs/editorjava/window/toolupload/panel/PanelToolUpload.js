Ext.require([
	'Workspace.editorjava.window.serverweb.function.upload'
]);

Ext.define('Workspace.editorjava.window.toolupload.panel.PanelToolUpload', {

	extend: 'Ext.FormPanel',

	alias: 'widget.windowTooluploadPanelToolUpload',
	alternateClassName: 'WindowTooluploadPanelToolUpload',

	id: 'build_content_panel',
    fileUpload: true,
    width: 500,
    autoHeight: true,
    bodyStyle: 'padding: 10px 10px 10px 10px;',
    labelWidth: 50,
    defaults: {
        anchor: '95%',
        allowBlank: false,
        msgTarget: 'side'
    },

    initComponent : function(){
		var me = this;
		Ext.apply(me, {
			items : [
	          {
	              xtype: 'fileuploadfield',
	              id: 'filedata',
	              emptyText: 'Select a document to upload...',
	              fieldLabel: 'File',
	              buttonText: 'Browse'
	          },
	          {
	  		    xtype: 'hidden',        //Balise cach�e afin de dire qu'il s'agit d'une connexion
	  		    id: 'application',
	  		    name: 'application'
	  	      }
	        ]
			,
			buttons : [
	    		{
		            text: 'Upload',
		            handler: Workspace.editorjava.window.serverweb.function.upload.upload
		        }
    		]
	    });
	    me.callParent(arguments);
	}
	,
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.window.toolupload.panel.PanelToolUpload');});