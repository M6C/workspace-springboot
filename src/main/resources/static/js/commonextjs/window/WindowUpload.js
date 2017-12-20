Ext.define('Workspace.common.window.WindowUpload', {

	extend: 'Workspace.common.window.WindowExtjs4'
	,
	alias: 'widget.commonWindowText',
	alternateClassName: 'CommonWindowWindowText'
	,
	// private
	initComponent : function(){
		var me = this;

		Ext.applyIf(me, {
		    items : [
	 			{
					xtype:'form',
				    bodyPadding: 10,
					items : [
					   {
					        xtype: 'filefield',
					        name: 'file',
					        fieldLabel: 'File',
					        labelWidth: 50,
					        msgTarget: 'side',
					        allowBlank: false,
					        anchor: '100%',
					        buttonText: 'Select File...'
					   }
//					   ,
//					   {
//						   xtype: 'hidden',
//						   name: 'path',
//						   value: me.path
//					   }
					]
					,
				    buttons: [{
				        text: 'Upload',
				        name: 'uploadservlet',
				        handler: function() {
				            var form = this.up('form').getForm();
				            if(form.isValid()){
				                form.submit({
				                    url: 'action.servlet?event=EditorJavaPageUploadValider',
				                    method: 'POST',
				                    headers: {'Content-Type':'multipart/form-data'},
							        params: {path: me.path},
				                    waitMsg: 'Uploading...',
				                    success: function(/*fp, o*/) {
				                    	if (Ext.isDefined(me.gridId)) {
				                    		Ext.getCmp(me.gridId).refresh();
				                    	}
				                    },
				                    handleResponse: function(response) {
				                    	if (Ext.isDefined(me.gridId)) {
				                    		Ext.getCmp(me.gridId).refresh();
				                    	}
				                    	me.close();
				                    	return {success:true};
				                    }
				                });
				            }
				        }
				    }]
				}
		    ]
		});

		me.callParent(arguments);
	}
	,
    title: 'Upload a File',
	layout:'fit',
	width:450,
	height:150,
//	autoHeight: true,        //hauteur de la fen�tre
	modal: true,             //Grise automatiquement le fond de la page
	plain: true

}, function() {Workspace.tool.Log.defined('Workspace.common.window.WindowUpload');});