Ext.define('Workspace.editorjava.panel.center.function.AddTabReload',  {
	requires: [
	  'Workspace.common.tool.Pop',
	  'Workspace.editorjava.request.JsonEditLoadFile'
	]
	,
	statics: {

		call : function(editor, callBackSuccess) {
		    console.info('Workspace.editorjava.panel.center.function.AddTabReload.call');
		    var me = this;

// 			var callBackSuccess = function() {

// 			    editor.focus();
// 			    editor.scrollToLine(1, true, false, function(){});
// 				editor.gotoLine(1, 0, false);

// 			    Workspace.common.tool.Pop.info(me, 'Reload success');
// 			}

//            var option = {};
//			var mainCenterPanel=Ext.getCmp('mainCenterPanel');
//            var tab = mainCenterPanel.getActiveTab();
//            if (Ext.isObject(tab)) {
//                option = {
//                    panelId: editor.panelId,
//                    panelEditorId: editor.panelEditorId
//                }
//            } else {
//                option = {
//                    panelId: tab.panelId,
//                    panelEditorId: tab.panelEditorId
//                };
//            }
            var option = {
                panelId: editor.panelId,
                panelEditorId: editor.panelEditorId
            };
    		var loadRequest = Ext.create('Workspace.editorjava.request.JsonEditLoadFile', option).request(callBackSuccess);
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.center.function.AddTabReload');});