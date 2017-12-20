// DEPENDENCE
Ext.Loader.load([DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava/window/toolxmlxsl/form/ComboBoxToolXmlXsl.js']);
Ext.Loader.load([DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava/window/toolxmlxsl/function/updateXslParameter.js']);

//NAMESPACE
Ext.ns('Workspace.window.ToolXmlXsl.panel');

// Panel
Workspace.window.ToolXmlXsl.panel.PanelToolXmlXsl = Ext.extend(Ext.FormPanel, {
	// private
    initComponent : function(){
		this.items = [
			{
				xtype:'WorkspaceFormTextFieldFileChose',
				id:'xml_filename_id',
				fieldLabel:'Filename',
				name:'pathXml'
			}
			,{
				xtype:'WorkspaceFormTextFieldFileChose',
				id:'xml_name_id',
				fieldLabel:'Name',
				name:'xmlName'
			},
			{
				xtype:'WorkspaceWindowToolXmlXslFormComboBoxToolXmlXsl'
			}
			,{
				xtype:'WorkspaceFormTextFieldFileChose',
				id:'xsl_filename_id',
				fieldLabel:'Filename',
				name:'pathXsl'
			},
			{
				xtype:'hidden',
				id:'xml_xsl_param_name',
				name:'xslParamName'
			}
		];

		this.buttons = [
	   		{
	   			xtype: 'button',
	   			text: 'Init Default',
	   			handler: function () {
	   				if (Ext.getCmp('xml_name_id'))
	   					Ext.getCmp('xml_name_id').setValue('resultDom');
	   				if (Ext.getCmp('xsl_filename_id'))
	   					Ext.getCmp('xsl_filename_id').setValue('[WorkSpace_Dev]/WorkSpace/XslExtjs/Json/TreePackageDetail.xsl');
	   				if (Ext.getCmp('xmlScope'))
	   					Ext.getCmp('xmlScope').setValue('Session');

	   				if (Ext.getCmp('xsppApplication'))
	   					Ext.getCmp('xsppApplication').setValue('WorkSpace_Dev');
	   				if (Ext.getCmp('xsppType'))
	   					Ext.getCmp('xsppType').setValue('War');
	   				if (Ext.getCmp('xsppName'))
	   					Ext.getCmp('xsppName').setValue('Deploy_Dev');
	   			}
	   		},
	   		{
	   			xtype: 'button',
	   			text: 'Upate Xsl parameter',
	   			handler: Workspace.window.ToolXmlXsl.function.updateXslParameter
	   		},
	   		{
	   			xtype: 'button',
	   			text: 'Transform',
	   			handler: this.callBackSubmit
	   		}
	   	];

		Workspace.window.ToolXmlXsl.panel.PanelToolXmlXsl.superclass.initComponent.call(this);
	},
	id: 'xml_xsl_content_panel',   //id du formulaire
	frame: true,                 //pour que tous les items soient dans la m�me frame
	autoWidth: true,            //largeur de la fen�tre
	autoHeight: true,            //hauteur de la fen�tre
	labelWidth: 110,             //largeur des labels des champs
	defaults: {width: 230},         //largeur des champs
	labelAlign: 'right',            //les labels s'aligneront a droite        
	bodyCfg: {tag:'center', cls:'x-panel-body'},        //on aligne tous les champs au milieu de la fen�tre
	bodyStyle: 'padding:5p;margin:0px; '
});

// REGISTER
Ext.reg('WorkspaceWindowToolXmlXslPanelPanelToolXmlXsl', Workspace.window.ToolXmlXsl.panel.PanelToolXmlXsl);
