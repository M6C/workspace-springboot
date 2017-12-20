var pleaseWaitMessage = 'Please Wait ...';
var hideWindowWaitingDelay = 2;

function cleanBuild() {
	Ext.Msg.confirm('Confirm', 'Clean ?', function(btn, text) {
      if (btn == 'yes'){
    	var project = Ext.getCmp('project').value;
    	var requestUrl = DOMAIN_NAME_ROOT + '/action.servlet?event=JsonCleanBuild';
    	showWindowWaiting();
		Ext.Ajax.request({
		   url: requestUrl,
		   params: {application:project},
		   success: function(result, request){
  		   hideWindowWaiting('Clean successfull.', hideWindowWaitingDelay);
		   },
		   failure: function (result, request) {
    	   hideWindowWaiting('Clean failed.', hideWindowWaitingDelay);
		   }
		});
      }
    });
}

function build() {
	Ext.Msg.confirm('Confirm', 'Build ?', function(btn, text) {
	      if (btn == 'yes'){
	    	var project = Ext.getCmp('project').value;
	    	var requestUrl = DOMAIN_NAME_ROOT + '/action.servlet?event=JsonEditCompileProject';
	    	showWindowWaiting();
			Ext.Ajax.request({
			   url: requestUrl,
			   params: {application:project,target:'compile'},
			   callback:function(options, success, response) { 
				   var data = '';
				   try {
					   var jsonData = Ext.util.JSON.decode(response.responseText);
					   var results = jsonData.results;
					   console.log(data);
					   var max=30;
					   for(i=0 ; i<max ; i++) {
						   data += jsonData.data[i].text + '<br>';
					}
					if (results>max)
						data += "...";
					}
					catch (ex) {
						data = "Error ex:"+ex;
					}
					finally {
						console.log(data);
					    Ext.Msg.alert('Trace', data, function(btn, text){
					    	hideWindowWaiting("");
						});
					}
				}
			});
	      }
	    });
}

var wndPackageJar;
function showPackageJar() {
	
	if (!wndPackageJar) {
	  	function onSubmit () {
	  	  Ext.getCmp('package_statusbar_jar').showBusy(pleaseWaitMessage);
	  		var project = Ext.getCmp('project').value;
	  		var pack = Ext.getCmp('package').value;
	  		var requestUrl = DOMAIN_NAME_ROOT + '/action.servlet?event=JsonEditPackage';
	  		try {
				showWindowWaiting();
		  		Ext.Ajax.request({
		  		   url: requestUrl,
		  		   params: {application:project,package:pack,type:'Jar'},
		  		   success: function(result, request){
		  		     var resultMessage = '';
		  		     try {
		  			    var jsonData = Ext.util.JSON.decode(result.responseText);
		  			    resultMessage = jsonData.data[0].message;
		  			   }
		  			   finally {
	  	  		     try {
	    	  			   Ext.getCmp('package_statusbar_clean_jar').setText(resultMessage);
	  	  			   }
	  	  			   finally {
	  				      hideWindowWaiting(resultMessage, hideWindowWaitingDelay);
	  				     }
					     }
		  		   },
		  		   failure: function (result, request) {
		  		     var resultMessage = '';
		  		     try {
		  			    var jsonData = Ext.util.JSON.decode(result.responseText);
		  			    resultMessage = jsonData.data[0].message;
		  			   }
		  			   finally {
		  	  		     try {
		    	  		   Ext.getCmp('package_statusbar_clean_jar').setText(resultMessage);
		  	  			 }
		  	  			 finally {
		  				   hideWindowWaiting(resultMessage, hideWindowWaitingDelay);
	  				     }
					  }
		  		   }
		  		});
	  		}
		    finally {
		      hideWindowWaiting('Ext.Ajax.request Error', hideWindowWaitingDelay);
		    }
		};

		wndPackageJar = create_WindowPackageAction(
			Ext.getCmp('el_wnd_menu_pkg_jar'),
			'package_content_jar',
			'package_combo_jar',
			'package_statusbar_jar',
			'Jar',
			'Create Jar',
			onSubmit);
	}

	wndPackageJar.show();
}

var wndPackageWar;
function showPackageWar() {
	
	if (!wndPackageWar) {
	  	function onSubmit () {
	  	  Ext.getCmp('package_statusbar_war').showBusy(pleaseWaitMessage);
	  		var project = Ext.getCmp('project').value;
	  		var pack = Ext.getCmp('package').value;
	  		var requestUrl = DOMAIN_NAME_ROOT + '/action.servlet?event=JsonEditPackage';
			showWindowWaiting();
	  		Ext.Ajax.request({
	  		   url: requestUrl,
	  		   params: {application:project,package:pack,type:'War'},
	  		   success: function(result, request){
	  		     var resultMessage = '';
	  		     try {
	  			    var jsonData = Ext.util.JSON.decode(result.responseText);
	  			    resultMessage = jsonData.data[0].message;
	  			   }
	  			   finally {
	  			    Ext.getCmp('package_statusbar_war').setText(resultMessage);
				      hideWindowWaiting(resultMessage, hideWindowWaitingDelay);
				     }
	  		   },
	  		   failure: function (result, request) {
	  		     var resultMessage = '';
	  		     try {
	  			    var jsonData = Ext.util.JSON.decode(result.responseText);
	  			    resultMessage = jsonData.data[0].message;
	  			   }
	  			   finally {
	  			    Ext.getCmp('package_statusbar_war').setText(resultMessage);
				      hideWindowWaiting(resultMessage, hideWindowWaitingDelay);
				     }
	  		   }
	  		});
	  	};

		wndPackageWar = create_WindowPackageAction(
			Ext.getCmp('el_wnd_menu_pkg_war'),
			'package_content_war',
			'package_combo_war',
			'package_statusbar_war',
			'War',
			'Create War',
			onSubmit);
	}

	wndPackageWar.show();
}

var wndCleanWar;
function showCleanWar() {
	
	if (!wndCleanWar) {
	  	function onSubmit () {
	  	  Ext.getCmp('package_statusbar_clean_war').showBusy(pleaseWaitMessage);
	  		var project = Ext.getCmp('project').value;
	  		var pack = Ext.getCmp('package').value;
	  		var requestUrl = DOMAIN_NAME_ROOT + '/action.servlet?event=JsonCleanWar';
	  		showWindowWaiting();
	  		Ext.Ajax.request({
	  		   url: requestUrl,
	  		   params: {application:project,package:pack,type:'War'},
	  		   success: function(result, request){
	  		     var resultMessage = 'Clean War successfull';
	  		     try {
  	  			   Ext.getCmp('package_statusbar_clean_war').setText(resultMessage);
	  			   }
	  			   finally {
				      hideWindowWaiting(resultMessage, hideWindowWaitingDelay);
				     }
	  		   },
	  		   failure: function (result, request) {
	  		     var resultMessage = 'Clean War failed';
	  		     try {
  	  			   Ext.getCmp('package_statusbar_clean_war').setText(resultMessage);
	  			   }
	  			   finally {
				      hideWindowWaiting(resultMessage, hideWindowWaitingDelay);
				     }
	  		   }
	  		});
	  	};

		wndCleanWar = create_WindowPackageAction(
			Ext.getCmp('el_wnd_menu_pkg_clean_war'),
			'package_content_clean_war',
			'package_combo_clean_war',
			'package_statusbar_clean_war',
			'War',
			'Clean War',
			onSubmit);
	}

	wndCleanWar.show();
}

var wndServerWebCommandDeploy;
function showServerWebCommandDeploy() {
	
	if (!wndServerWebCommandDeploy) {
		wndServerWebCommandDeploy = create_WindowServerWebCommand(
			Ext.getCmp('el_wnd_menu_srv_web_command_deploy'),
			'server_web_command_content_deploy',
			'server_web_command_combo_deploy',
			'server_web_command_statusbar_deploy',
			'Deploy'
		);
	}

	wndServerWebCommandDeploy.show();
}

var wndServerWebCommandRedeploy;
function showServerWebCommandRedeploy() {
	
	if (!wndServerWebCommandRedeploy) {
		wndServerWebCommandRedeploy = create_WindowServerWebCommand(
			Ext.getCmp('el_wnd_menu_srv_web_command_redeploy'),
			'server_web_command_content_redeploy',
			'server_web_command_combo_redeploy',
			'server_web_command_statusbar_redeploy',
			'Redeploy'
		);
	}

	wndServerWebCommandRedeploy.show();
}

var wndServerWebCommandUndeploy;
function showServerWebCommandUndeploy() {
	
	if (!wndServerWebCommandUndeploy) {
		wndServerWebCommandUndeploy = create_WindowServerWebCommand(
			Ext.getCmp('el_wnd_menu_srv_web_command_undeploy'),
			'server_web_command_content_undeploy',
			'server_web_command_combo_undeploy',
			'server_web_command_statusbar_undeploy',
			'Undeploy'
		);
	}

	wndServerWebCommandUndeploy.show();
}

var wndToolUpload;
function showToolUpload() {
	
	//if (!wndToolUpload) {
		wndToolUpload = create_WindowToolUpload(
			Ext.getCmp('el_wnd_menu_tool_upload')
		);
	//}

	wndToolUpload.show();
}


var wndToolXmlXsl;
function showToolXmlXsl() {
	
	if (!wndToolXmlXsl) {
	  	function onSubmit () {
	  		if(Ext.getCmp('xml_xsl_content_panel').getForm().isValid()){
	  			showWindowWaiting();
				var values = Ext.getCmp('xml_xsl_content_panel').getForm().getValues(false);
				Ext.Ajax.request({
				   url: DOMAIN_NAME_ROOT + '/action.servlet?event=JsonXmlXsl',
				   params: values,
					success: function(result, request) {
						var resultMessage = '';
						try {
							var jsonData = Ext.util.JSON.decode(result.responseText);
							if (jsonData.data.length>0)
								resultMessage = jsonData.data[0].message;
							else
								resultMessage = 'Empty result';
							Ext.getCmp('xml_xsl_form_panel').collapse();
							Ext.getCmp('xml_xsl_viewer_panel').expand();
							Ext.getCmp('form-statusbar-xml_xsl').setText(resultMessage);
							Ext.getCmp('xml_viewer').setValue(resultMessage);
							Ext.getCmp('xml_viewer').syncValue();
						}
						finally {
							try {
								console.info(resultMessage);
							}
							finally {
								hideWindowWaiting(resultMessage, hideWindowWaitingDelay);
							}
						}
					},
					failure: function (result, request) {
						var resultMessage = 'Failure-';
						try {
							switch (result.failureType) {
								case Ext.form.Action.CLIENT_INVALID:
									resultMessage += 'Form fields may not be submitted with invalid values';
									break;
								case Ext.form.Action.CONNECT_FAILURE:
									resultMessage += 'Ajax communication failed';
									break;
								case Ext.form.Action.SERVER_INVALID:
								   resultMessage += action.result.msg;
						   }
						}
						finally {
							try {
								Ext.getCmp('form-statusbar-xml_xsl').setText(resultMessage);
							}
							finally {
								try {
									console.info(resultMessage);
								}
								finally {
									hideWindowWaiting(resultMessage, hideWindowWaitingDelay);
								}
							}
						}
				  }
				});
			}
	  	};

	  	wndToolXmlXsl = create_WindowToolXmlXsl(
			Ext.getCmp('el_wnd_menu_tool_xml_xsl'),
			onSubmit);
	}

	wndToolXmlXsl.show();
}


var wndClasspathDetail;
function showClasspathDetail() {
	wndClasspathDetail = create_WindowClasspathAction (
			Ext.getCmp('el_wnd_menu_build_classpath')
	);
	wndClasspathDetail.show();
}
