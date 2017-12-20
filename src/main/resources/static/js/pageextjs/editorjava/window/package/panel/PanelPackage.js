Ext.require([
'Workspace.editorjava.window.package.form.combobox.ComboPackage',
'Workspace.editorjava.window.WindowPackageDetail'
]);
Ext.define('Workspace.editorjava.window.package.panel.PanelPackage', {
	// REQUIRED

	extend: 'Ext.FormPanel'
	,
	alias: 'widget.windowPackagePanelPackage',
	alternateClassName: 'WindowPackagePanelEst'
	,
	frame: true,                 //pour que tous les items soient dans la m�me frame
	autoWidth: true,            //largeur de la fen�tre
	autoHeight: true,            //hauteur de la fen�tre
	labelWidth: 110,             //largeur des labels des champs
	//defaults: {width: 230},         //largeur des champs
	labelAlign: 'right',            //les labels s'aligneront a droite        
	bodyCfg: {tag:'center', cls:'x-panel-body'},        //on aligne tous les champs au milieu de la fen�tre
	bodyStyle: 'padding:5p;margin:0px; '
	,
    initComponent : function(){
		var me = this;
		Ext.apply(me, {
			items : [
	  			{
	  				xtype:'editorjavaWindowPackageComboPackage',
	  				id: this.comboId,
	  				statusbarId: this.statusbarId,
	  				pkgtype:this.pkgtype
	  			}
		  		,
				{
				    xtype: 'hidden',        //Balise cach�e afin de dire qu'il s'agit d'une connexion
				    id: 'package',
				    name: 'package',
				    allowBlank: false
				}
			]
			,
			buttons : [
	    		{
	    			xtype: 'button',
	    			text: 'Detail',
	    			pkgtype : this.pkgtype,
	    			handler: function() {
		    			Ext.create('Workspace.editorjava.window.WindowPackageDetail',
		    			{
							pkgtype : this.pkgtype
						}).show();
	    			}
	    		},
	    		{
	    			xtype: 'button',
	    			id: 'pkgsubmit',
	    			text: this.submitText,
	    			handler: function() {
	    				Ext.create(this.callBackSubmit).call();
					}
	    		}
    		]
	    });
	    me.callParent(arguments);
	}
	,
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.window.package.panel.PanelPackage');});
