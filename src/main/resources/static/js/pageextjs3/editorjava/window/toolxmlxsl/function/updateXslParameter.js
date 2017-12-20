// NAMESPACE
Ext.ns('Workspace.window.ToolXmlXsl.function');

// Function
Workspace.window.ToolXmlXsl.function.updateXslParameter = (function() {
  	var project = Ext.getCmp('project').value;
		var pathXsl = Ext.getCmp('xsl_filename_id').getValue();//Ext.getCmp('xsl_filename_id').value;
		var requestUrl = DOMAIN_NAME_ROOT + '/action.servlet?event=JsonXmlXslParameter';
		console.info('updateXslParameter pathXsl:'+pathXsl);
		showWindowWaiting();
		Ext.Ajax.request({
		   url: requestUrl,
		   params: {pathXml:pathXsl},
		   success: function(result, request){
		     var resultMessage = '';
		     try {
		    	console.info('updateXslParameter success:'+result.responseText);
			var container = Ext.getCmp('xml_xsl_content_panel');//xml_xsl_container_param');
			    var jsonData = Ext.util.JSON.decode(result.responseText);
			var items = jsonData.data;
		    	console.info('updateXslParameter success: container.items.length:'+container.items.length);
		    	//container.removeAll();
			for (var i = 0 ; i < container.items.length ; i++) {
			  var item = container.get(i);
			  if (item!=undefined) {
				  console.info('updateXslParameter item('+i+') xtype:'+item.xtype+' id:'+item.id);
				  if (item.xtype=='textfield' && item.id.match('^xsp')=='xsp') {
					console.info('updateXslParameter remove item('+i+').id:'+item.id);
					container.remove(item);
					i--;
				  }
			  }
			}
		    console.info('updateXslParameter add items.length:'+items.length);
			var paramName = '';
			for (var i = 0 ; i < items.length ; i++) {
			    console.info('updateXslParameter add items['+i+'].param:'+items[i].param);
			    if (items[i].param!='') {
				  container.add(
					{
						xtype:'textfield',
						id:'xsp'+items[i].param,
						name:items[i].param,
				      	fieldLabel:items[i].param
					}
				  );
				  paramName += items[i].param+';';
				}
			}
			container.doLayout();
			Ext.getCmp('xml_xsl_param_name').setValue(paramName);
			console.info('updateXslParameter xml_xsl_param_name.getValue():'+Ext.getCmp('xml_xsl_param_name').getValue());
			   }
			   finally {
		      hideWindowWaiting(resultMessage);
		   }
		   },
		   failure: function (result, request) {
		     var resultMessage = '';
		     try {
		    	 alert('updateXslParameter failure:'+result.responseText);
//			    var jsonData = Ext.util.JSON.decode(result.responseText);
//			    resultMessage = jsonData.data[0].message;
			 }
			 finally {
				 hideWindowWaiting(resultMessage);
			 }
		   }
		});
});
