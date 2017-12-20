
function onMenuTreeZip(item, event) {
	var parent = item.parentMenu.parentMenu;
	var pathSrc = parent.data.attributes.id;
	var pathDst = pathSrc.substr(0, pathSrc.lastIndexOf('\\')+1);
	Ext.Msg.prompt('Name', 'Please enter a name:', function(btn, text){
	    if (btn == 'ok' && text != ''){
	    	showWindowWaiting();
	    	console.info('onMenuTreeZip pathSrc:'+pathSrc+' pathDst:'+pathDst);
	    	var project = Ext.getCmp('project').value;
	    	var fileName = text;
	    	var requestUrl = DOMAIN_NAME_ROOT + '/action.servlet?event=JsonEditZip';
  			Ext.Ajax.request({
  			   url: requestUrl,
  			   params: {application:project,pathSrc:pathSrc,pathDst:pathDst,fileName:fileName},
  			   success: function(result, request){
  				   //Ext.Msg.alert('Zip', 'Zip successfull.', function () {
  					//   parent.data.parentNode.reload();
  				   //});
  				   hideWindowWaiting('Zip successfull.');
  				   parent.data.parentNode.reload();
  			   },
  			   failure: function (result, request) {
  				   //Ext.Msg.alert('Zip', 'Zip failed.');
  				   hideWindowWaiting('Zip failed.');
  			   }
  			});
	    }
	});
}

function onMenuTreeCopy(item, event) {
	showWindowWaitingNoProgress();
	var parent = item.parentMenu;
	var root = Ext.getCmp('treeDirectory').getRootNode();
	root.attributes.node = parent.data;
	root.attributes.nodeaction = 'copy';
	hideWindowWaiting('Copy successfull.');
}

function onMenuTreeMove(item, event) {
	showWindowWaitingNoProgress();
	var parent = item.parentMenu;
	var root = Ext.getCmp('treeDirectory').getRootNode();
	root.attributes.node = parent.data;
	root.attributes.nodeaction = 'move';
	hideWindowWaiting('Move successfull.');
}

function onMenuTreePaste(item, event) {
	Ext.Msg.confirm('Paste', 'Confirm ?', function(btn, text){
	    if (btn == 'yes'){
	    	var parent = item.parentMenu.parentMenu;
	    	var root = Ext.getCmp('treeDirectory').getRootNode();

	    	var requestUrl = DOMAIN_NAME_ROOT + '/action.servlet?event=JsonEditPaste';
	    	var operation = root.attributes.nodeaction;
	    	var project = Ext.getCmp('project').value;
	    	var pathSrc = root.attributes.node.attributes.id;
	    	var pathDst = parent.data.attributes.id;
	    	var fileName = pathSrc.substr(pathSrc.lastIndexOf('\\')+1);

	    	console.info('onMenuTreePaste project:'+project
		    		+' pathSrc:'+pathSrc
		    		+' pathDst:'+pathDst
		    		+' fileName:'+fileName);

	    	Ext.Ajax.request({
  			   url: requestUrl,
  			   params: {application:project,pathSrc:pathSrc,pathDst:pathDst,nameDst:fileName,operation:operation},
  			   success: function(result, request){
  				   //Ext.Msg.alert('Zip', 'Zip successfull.', function () {
  					//   parent.data.parentNode.reload();
  				   //});
  				   hideWindowWaiting('Paste successfull.');
  				   parent.data.reload();
  			   },
  			   failure: function (result, request) {
  				   hideWindowWaiting('Paste failed.');
  			   }
  			});
	    }
	});
}

function onMenuTreeNewDir(item, event) {
	onMenuTreeNew(item, event, 'dir');
}
function onMenuTreeNewFile(item, event) {
	onMenuTreeNew(item, event, 'file');
}

function onMenuTreeNew(item, event, type) {
	Ext.Msg.prompt('New '+type, 'Please enter a name:', function(btn, text){
	    if (btn == 'ok' && text != ''){
	    	var parent = item.parentMenu;

	    	var requestUrl = DOMAIN_NAME_ROOT + '/action.servlet?event=JsonEditNew';
	    	var project = Ext.getCmp('project').value;
	    	var path = parent.data.attributes.id;
	    	var name = text;

	    	console.info('onMenuTreeNew project:'+project
	    	    	+' path:'+path
	    	    	+' name:'+name
              +' type:'+type);

	    	Ext.Ajax.request({
  			   url: requestUrl,
  			   params: {application:project,Path:path,Name:name,Type:type},
  			   success: function(result, request){
  				   //Ext.Msg.alert('Zip', 'Zip successfull.', function () {
  					//   parent.data.parentNode.reload();
  				   //});
  				   hideWindowWaiting('New '+type+' successfull.');
  				   parent.data.reload();
  			   },
  			   failure: function (result, request) {
  				   hideWindowWaiting('New '+type+' failed.');
  			   }
  			});
	    }
	});
}

function onMenuTreeDelete(item, event) {
	Ext.Msg.confirm('Delete', 'Confirm ?', function(btn, text){
	    if (btn == 'yes') {
	    	var parent = item.parentMenu.parentMenu;

	    	console.info('onMenuTreeDelete parent.data:'+parent.data);

	    	var requestUrl = DOMAIN_NAME_ROOT + '/action.servlet?event=JsonEditDelete';
	    	var project = Ext.getCmp('project').value;
	    	var fileName = parent.data.attributes.id;

	    	console.info('onMenuTreeDelete project:'+project
		    		+' project:'+project
		    		+' fileName:'+fileName);

  			Ext.Ajax.request({
  			   url: requestUrl,
  			   params: {application:project,fileName:fileName},
  			   success: function(result, request){
  				   //Ext.Msg.alert('Zip', 'Zip successfull.', function () {
  					//   parent.data.parentNode.reload();
  				   //});
  				   hideWindowWaiting('Delete successfull.', 1);
  				   parent.data.parentNode.reload();
  			   },
  			   failure: function (result, request) {
  				   hideWindowWaiting('Delete failed.', 2);
  			   }
  			});
	    }
	});
}

function onMenuTreeRename(item, event) {
 	var parent = item.parentMenu.parentMenu;
 	var oldName = parent.data.attributes.id;

	Ext.Msg.prompt('Rename', 'Please enter a name:', function(btn, text){
	    if (btn == 'ok' && text != ''){

	    	var requestUrl = DOMAIN_NAME_ROOT + '/action.servlet?event=JsonEditRename';
	    	var project = Ext.getCmp('project').value;
	    	var path = oldName.substr(0, oldName.lastIndexOf('\\')+1);
	    	var newName = path+text;

	    	console.info('onMenuTreeRename project:'+project
	    	    	+' oldName:'+oldName
	    	    	+' newName:'+newName);

	    	Ext.Ajax.request({
  			   url: requestUrl,
  			   params: {application:project,oldName:oldName,newName:newName},
  			   success: function(result, request){
  				   //Ext.Msg.alert('Zip', 'Zip successfull.', function () {
  					//   parent.data.parentNode.reload();
  				   //});
  				   hideWindowWaiting('Rename successfull.');
  				   parent.data.parentNode.reload();
  			   },
  			   failure: function (result, request) {
  				   hideWindowWaiting('Rename failed.');
  			   }
  			});
	    }
	}, this, false, oldName.substr(oldName.lastIndexOf('\\')+1));
}

function onMenuTreeSplit(item, event) {
	var parent = item.parentMenu.parentMenu;
	var pathSrc = parent.data.attributes.id;
	var pathDst = pathSrc.substr(0, pathSrc.lastIndexOf('\\')+1);
	Ext.Msg.prompt('Split', 'Please enter max line number by splited file:', function(btn, text){
	    if (btn == 'ok' && text != ''){
	    	showWindowWaiting();
	    	console.info('onMenuTreeSplit pathSrc:'+pathSrc+' pathDst:'+pathDst);
	    	var project = Ext.getCmp('project').value;
	    	var lineNumber = text;
	    	var requestUrl = DOMAIN_NAME_ROOT + '/action.servlet?event=JsonEditSplit';
  			Ext.Ajax.request({
  			   url: requestUrl,
  			   params: {application:project,pathFile:pathSrc,pathDestination:pathDst,lineNumber:lineNumber},
  			   success: function(result, request){
  				   //Ext.Msg.alert('Split', 'Split successfull.', function () {
  					//   parent.data.parentNode.reload();
  				   //});
  				   hideWindowWaiting('Split successfull.');
  				   parent.data.parentNode.reload();
  			   },
  			   failure: function (result, request) {
  				   //Ext.Msg.alert('Split', 'Split failed.');
  				   hideWindowWaiting('Split failed.');
  			   }
  			});
	    }
	});
}
