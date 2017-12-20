// NAMESPACE
Ext.ns('Workspace.window.ToolUpload.function');

// Function
Workspace.window.ToolUpload.function.upload = (function() {
	var build_content_panel = Ext.getCmp('build_content_panel');
    if(build_content_panel.getForm().isValid()){
    	Ext.getCmp('form-statusbar-project').setText('Upload running...');
	     	var resultMessage = '';
		showWindowWaiting();
		try {
            form_action=1;
            var project = Ext.getCmp('project').value;
            build_content_panel.getForm().submit({
                url: DOMAIN_NAME_ROOT + '/action.servlet?event=EditorJavaPageUploadValider',
                params: {application:project},
                waitMsg: 'Uploading file...',
                success: function(form,action) {
                	resultMessage = 'Processed file Successfull on the server';
                },
     		    failure: function (result, request) {
                	resultMessage = 'Processed file Failure on the server';
       		    }
            });
		   }
	   finally {
		   Ext.getCmp('form-statusbar-project').setText(resultMessage);
		   hideWindowWaiting(resultMessage);
	   }
    }
});
