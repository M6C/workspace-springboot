// DEPENDENCE
Ext.Loader.load([DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava/window/toolupload/function/upload.js']);

//NAMESPACE
Ext.ns('Workspace.window.ToolUpload.panel');

// Panel
Workspace.window.ToolUpload.panel.PanelToolUpload = Ext.extend(Ext.FormPanel, {
	// private
    initComponent : function() {
		this.items = [
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
        ];

		this.buttons = [
    		{
	            text: 'Upload',
	            handler: Workspace.window.ToolUpload.function.upload
//	            handler: function() {
//    				var build_content_panel = Ext.getCmp('build_content_panel');
//	                if(build_content_panel.getForm().isValid()){
//	                	Ext.getCmp('form-statusbar-project').setText('Upload running...');
//	       		     	var resultMessage = '';
//	            		showWindowWaiting();
//	            		try {
//		                    form_action=1;
//		                    var project = Ext.getCmp('project').value;
//		                    build_content_panel.getForm().submit({
//		                        url: DOMAIN_NAME_ROOT + '/action.servlet?event=EditorJavaPageUploadValider',
//		                        params: {application:project},
//		                        waitMsg: 'Uploading file...',
//		                        success: function(form,action) {
//		                        	resultMessage = 'Processed file Successfull on the server';
//		                        },
//		             		    failure: function (result, request) {
//		                        	resultMessage = 'Processed file Failure on the server';
//		               		    }
//		                    });
//	     			   }
//	            	   finally {
//	            		   Ext.getCmp('form-statusbar-project').setText(resultMessage);
//	            		   hideWindowWaiting(resultMessage);
//	            	   }
//	                }
//	            }
	        }
	   	];

		Workspace.window.ToolUpload.panel.PanelToolUpload.superclass.initComponent.call(this);
	},
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
    }
});

// REGISTER
Ext.reg('WorkspaceWindowToolUploadPanelPanelToolUpload', Workspace.window.ToolUpload.panel.PanelToolUpload);
