
function onMenuCVSAdd(item, event) {
	var parent = item.parentMenu.parentMenu;
	var filename = parent.data.attributes.id;
	Ext.Msg.prompt('CVS Add File', 'Comment:', function(btn, text){
	    if (btn == 'ok' && text != ''){
	    	showWindowWaiting();
	    	console.info('onMenuCVSAddFile fileName:'+filename+' messageStr:'+text);
	    	var project = Ext.getCmp('project').value;
	    	var requestUrl = DOMAIN_NAME_ROOT + '/action.servlet?event=AjaxCVSAddFile';
  			Ext.Ajax.request({
  			   url: requestUrl,
  			   params: {application:project,fileName:filename,messageStr:text,autocommit:true},
  			   success: function(result, request){
  				   hideWindowWaiting('Successfull.');
  				   parent.data.parentNode.reload();
  			   },
  			   failure: function (result, request) {
  				   hideWindowWaiting('Failed.');
  			   }
  			});
	    }
	});
}

function onMenuCVSCommit(item, event) {
	var parent = item.parentMenu.parentMenu;
	var filename = parent.data.attributes.id;
	Ext.Msg.prompt('CVS Commit', 'Comment:', function(btn, text){
	    if (btn == 'ok' && text != ''){
	    	showWindowWaiting();
	    	console.info('onMenuCVSCommit fileName:'+filename);
	    	var project = Ext.getCmp('project').value;
	    	var requestUrl = DOMAIN_NAME_ROOT + '/action.servlet?event=AjaxCVSCommit';
  			Ext.Ajax.request({
  			   url: requestUrl,
  			   params: {application:project,fileName:filename,messageStr:text},
  			   success: function(result, request){
  				   hideWindowWaiting('Successfull.');
  				   parent.data.parentNode.reload();
  			   },
  			   failure: function (result, request) {
  				   hideWindowWaiting('Failed.');
  			   }
  			});
	    }
	});
}

function onMenuCVSUpdateFile(item, event) {
	var parent = item.parentMenu.parentMenu;
	var filename = parent.data.attributes.id;
	Ext.Msg.confirm('Confirm', 'Update File ?', function(btn, text){
	    if (btn == 'yes'){
	    	showWindowWaiting();
	    	console.info('onMenuCVSUpdateFile fileName:'+filename);
	    	var project = Ext.getCmp('project').value;
	    	var requestUrl = DOMAIN_NAME_ROOT + '/action.servlet?event=AjaxCVSUpdateFile';
  			Ext.Ajax.request({
  			   url: requestUrl,
  			   params: {application:project,fileName:filename},
  			   success: function(result, request){
  				   hideWindowWaiting('Successfull.');
  				   parent.data.parentNode.reload();
  			   },
  			   failure: function (result, request) {
  				   hideWindowWaiting('Failed.');
  			   }
  			});
	    }
	});
}

function onMenuCVSUpdateDirectory(item, event) {
	var parent = item.parentMenu.parentMenu;
	var filename = parent.data.attributes.id;
	Ext.Msg.confirm('Confirm', 'Update Directory ?', function(btn, text){
	    if (btn == 'yes'){
	    	showWindowWaiting();
	    	console.info('onMenuCVSUpdateDirectory fileName:'+filename);
	    	var project = Ext.getCmp('project').value;
	    	var requestUrl = DOMAIN_NAME_ROOT + '/action.servlet?event=AjaxCVSUpdateDirectory';
  			Ext.Ajax.request({
  			   url: requestUrl,
  			   params: {application:project,fileName:filename,recursive:true},
  			   success: function(result, request){
  				   hideWindowWaiting('Successfull.');
  				   parent.data.parentNode.reload();
  			   },
  			   failure: function (result, request) {
  				   hideWindowWaiting('Failed.');
  			   }
  			});
	    }
	});
}
