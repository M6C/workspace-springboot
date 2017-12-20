
function onMenuSVNTestCommit(item, event) {
	var parent = item.parentMenu.parentMenu;
	Ext.Msg.confirm('Confirm', 'Test Commit ?', function(btn, text){
	    if (btn == 'yes'){
	    	showWindowWaiting();
	    	console.info('onMenuSVNTestCommit');
	    	var requestUrl = DOMAIN_NAME_ROOT + '/action.servlet?event=AjaxSVNTestCommit';
  			Ext.Ajax.request({
  			   url: requestUrl,
  			   params: {},
  			   success: function(result, request){
  				   hideWindowWaiting('Successfull.');
  			   },
  			   failure: function (result, request) {
  				   hideWindowWaiting('Failed.');
  			   }
  			});
	    }
	});
}

function onMenuSVNCommit(item, event) {
	var parent = item.parentMenu.parentMenu;
	Ext.Msg.prompt('Commit', 'Comment:', function(btn, text){
	    if (btn == 'ok'){
	    	showWindowWaiting();
	    	console.info('onMenuSVNCommit');
	  		var project = Ext.getCmp('project').value;
	    	var requestUrl = DOMAIN_NAME_ROOT + '/action.servlet?event=AjaxSVNCommit';
  			Ext.Ajax.request({
  			   url: requestUrl,
  			   params: {application:project,messageStr:text},
  			   success: function(result, request){
  				   hideWindowWaiting('Successfull.');
  			   },
  			   failure: function (result, request) {
  				   hideWindowWaiting('Failed.');
  			   }
  			});
	    }
	});
}

function onMenuSVNImport(item, event) {
	var parent = item.parentMenu.parentMenu;
	Ext.Msg.prompt('Commit', 'Comment:', function(btn, text){
	    if (btn == 'ok'){
	    	showWindowWaiting();
	    	console.info('onMenuSVNCommit');
	  		var project = Ext.getCmp('project').value;
	    	var requestUrl = DOMAIN_NAME_ROOT + '/action.servlet?event=AjaxSVNImport';
  			Ext.Ajax.request({
  			   url: requestUrl,
  			   params: {application:project,messageStr:text},
  			   success: function(result, request){
  				   hideWindowWaiting('Successfull.');
  			   },
  			   failure: function (result, request) {
  				   hideWindowWaiting('Failed.');
  			   }
  			});
	    }
	});
}
