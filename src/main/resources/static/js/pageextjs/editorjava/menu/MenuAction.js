Ext.require([
	'Workspace.common.window.WindowText',
	'Workspace.editorjava.window.WindowAutoDeploy',
	'Workspace.common.tool.Pop'
]);

var pleaseWaitMessage = 'Please Wait ...';
var hideWindowWaitingDelay = 2;

function cleanBuild() {
	Ext.Msg.confirm('Confirm', 'Clean ?', function(btn, text) {
      if (btn == 'yes'){
    	var project = Ext.getCmp('project').value;
    	var requestUrl = ACTION_SERVLET_ROOT + '/action.servlet?event=JsonCleanBuild';
		var wndWait = Workspace.common.window.WindowWaiting.showWindowWaiting();
		Ext.Ajax.request({
		   url: requestUrl,
		   params: {application:project},
		   success: function(result, request){
			   Workspace.common.window.WindowWaiting.hideWindowWaiting(wndWait, 'Clean successfull.', hideWindowWaitingDelay);
		   },
		   failure: function (result, request) {
			   Workspace.common.window.WindowWaiting.hideWindowWaiting(wndWait, 'Clean failed.', hideWindowWaitingDelay);
		   }
		});
      }
    });
}

function build() {
	Ext.Msg.confirm('Confirm', 'Build ?', function(btn, text) {
	      if (btn == 'yes'){
	    	var project = Ext.getCmp('project').value;
	    	var requestUrl = ACTION_SERVLET_ROOT + '/action.servlet?event=JsonEditCompileProject';
	    	var wndWait = Workspace.common.window.WindowWaiting.showWindowWaiting();
			Ext.Ajax.request({
			   url: requestUrl,
			   params: {application:project,target:'compile'},
			   callback:function(options, success, response) { 
					Workspace.common.window.WindowWaiting.hideWindowWaiting(wndWait, "");

					var option = {response: response};
					Ext.create('Workspace.common.window.WindowTextCompile', {modal:false, data:option}).show();
				}
			});
	      }
	    });
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

	if (!wndToolUpload) {
		wndToolUpload = create_WindowToolUpload(
			Ext.getCmp('el_wnd_menu_tool_upload'),
			'server_web_command_content_upload',
			'server_web_command_combo_upload',
			'server_web_command_statusbar_upload',
			'Upload'
		);
	}

	wndToolUpload.show();
}


var wndToolXmlXsl;
function showToolXmlXsl() {
	
	if (!wndToolXmlXsl) {
	  	function onSubmit () {
	  		if(Ext.getCmp('xml_xsl_content_panel').getForm().isValid()){
	  			var wndWait = Workspace.common.window.WindowWaiting.showWindowWaiting();
				var values = Ext.getCmp('xml_xsl_content_panel').getForm().getValues(false);
				Ext.Ajax.request({
				   url: ACTION_SERVLET_ROOT + '/action.servlet?event=JsonXmlXsl',
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
								Workspace.common.window.WindowWaiting.hideWindowWaiting(wndWait, resultMessage, hideWindowWaitingDelay);
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
									Workspace.common.window.WindowWaiting.hideWindowWaiting(wndWait, resultMessage, hideWindowWaitingDelay);
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

function autoDeploy() {
	var me = this;
	Ext.Msg.confirm('Confirm', 'Auto Deploy ?', function(btn, text) {
      if (btn == 'yes'){
    	var application = Ext.getCmp('project').value;

		Workspace.common.tool.Pop.info(me, 'AutoDeploy \''+application+'\' in progress.<br>Waiting to building complet.');
		Ext.create('Workspace.editorjava.request.JsonEditSaveAndBuild',
		{
			application:application,
			build:'true',
			autoDeploy:true
		}).callbackBuild(undefined, true, undefined);
      }
    });
}

function autoDeployProject() {
	var me = this;
	var onItemSelected = function(combo, newValue, oldValue, option) {
    	var application = newValue;
    
    	Workspace.common.tool.Pop.info(me, 'AutoDeploy \''+application+'\' in progress.<br>Waiting to building complet.');
    	Ext.create('Workspace.editorjava.request.JsonEditSaveAndBuild',
    	{
    		application:application,
    		build:'true',
    		autoDeploy:true
    	}).callbackBuild(undefined, true, undefined);
    };

	var application = Ext.getCmp('project').value;
	Ext.create('Workspace.editorjava.window.WindowAutoDeploy', {
	    application : application,
	    onItemSelected : onItemSelected
	}).show();

}

function managerConsoleVisibility() {
    var mainEstPanel = Ext.getCmp('mainSouthPanel');
    var tabPanelConsole = mainEstPanel.getComponent('editorjavaConsole');//mainEstPanel.down('#editorjavaConsole').tab;
    var tabPanelTrace = mainEstPanel.getComponent('editorjavaGridTrace');//mainEstPanel.down('#editorjavaGridTrace').tab;
    var visibility = tabPanelConsole.isVisible();

    var tp = mainEstPanel;
    var tabA, tabI;
    if (visibility) {
        tabA = tabPanelTrace;
        tabPanelConsole.tab.hide();
    } else {
        tabA = tabPanelConsole;
        tabPanelConsole.tab.show();
    }

    tabA.closeRequest = false;
    tp.setActiveTab(tabA);
    tabA.fireEvent('activate');
    Ext.get(tabA.tab.el).frame();
}

//function formatFont(str) {
//   var fontStart = "";
//   var fontEnd = "";
//   if (str.indexOf(": warning:") >= 0 ) {
//	   fontStart = "<font color='orange'>";
//	   fontEnd = "</font>";
//   } else if (str.indexOf(": error:") >= 0 ) {
//	   fontStart = "<font color='red'>";
//	   fontEnd = "</font>";
//   }
//   return fontStart + str + fontEnd + '<br>';
//}