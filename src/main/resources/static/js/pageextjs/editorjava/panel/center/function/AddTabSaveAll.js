Ext.define('Workspace.editorjava.panel.center.function.AddTabSaveAll',  {
	requires: [
	    'Workspace.common.tool.Pop',
	    'Workspace.editorjava.request.JsonEditSaveAndBuild']
	,
	statics: {

		call : function(editor) {
		    console.info('Workspace.editorjava.panel.center.function.AddTabSaveAll.call');
		    var me = this;

            var mainCenterPanel = Ext.getCmp('mainCenterPanel');
	        var items = mainCenterPanel.items;
	        var size = items.length;
	        var requestList = {};
	        var fileSavedList = [];
	        var list = [];
	        var showMessageSavingAll = true;

            mainCenterPanel.items.each(function(tab, index, len) {
				var editor = ace.edit(tab.panelEditorId);
                var panelId = editor.panelId;
        		var filename=panelId;
    			if (editor.dirty) {
    			    if (showMessageSavingAll === true) {
    			        Workspace.common.tool.Pop.info(me, 'Saving all modified files.');
    			        showMessageSavingAll = false;
    			    }
        			if (Ext.isDefined(editor.syncValue)) {
        				editor.syncValue();
        			}
        			var value=editor.getValue();//pnlEdit.getRawValue();
        			//value=value.replace(/&\w+;/g,"");
                    var panelEditorId = editor.id;
        			var application = editor.application;
        			var build = editor.build;
        			var autoDeploy = editor.autoDeploy;

                    /**
                     * Prepare Build/Deploy Request
                     */
                    var request = requestList[application];
                    if (!Ext.isDefined(request)) {
                        if ((build == 'true') || (autoDeploy == true)) {
                			request = Ext.create('Workspace.editorjava.request.JsonEditSaveAndBuild', {
                				application:application,
                				build:build,
                				autoDeploy:autoDeploy,
        				        showMessage: false
                			});
    
                			requestList[application] = request;
                        }
                    } else {
                        request.build = (build == 'true') ? build : request.build;
                        request.autoDeploy = (autoDeploy == true) ? autoDeploy : request.autoDeploy;
                    }

                    /**
                     * Execute Save file
                     */
        			var requestSave = Ext.create('Workspace.editorjava.request.JsonEditSaveFile', {
        				params:{filename:filename,content:value},
        				panelEditorId:panelEditorId,
        				showMessage: false
        			});
                    var callback = Ext.Function.createSequence (requestSave.callback, function(options, success, response) {
            			console.debug('Workspace.editorjava.panel.center.function.AddTabSaveAll tab \''+filename+'\' Saved.');
                        fileSavedList.push(filename);
    			        list.push(filename);
                    });
                    Ext.apply(requestSave, {callback: callback});

                    requestSave.request();
    			} else {
    			    list.push(filename);
    			}
			});

            var fnWaiting = function() {
                if (list.length < size) {
    				// Waiting...
    				console.debug('Workspace.editorjava.panel.center.function.AddTabSaveAll all tab \''+list.length+'\' Save in progress. Waiting...');
			        task.delay(500);
                } else {
                    var filSize = fileSavedList.length;
        			if (filSize == 0) {
        			    Workspace.common.tool.Pop.info(me, 'No&nbsp;need&nbsp;Save');
        				return;
        			}
                    var reqValue = Ext.Object.getValues(requestList);
                    var reqSize = reqValue.length;

                    /**
                     * Show Message
                     */
                    var msg = "Saving all complete. " + filSize + " file" + (filSize > 1 ? "s" : "") + ".";
                    var detail = (filSize > 0) ? fileSavedList.join('<br>') : undefined;
                    if (reqSize > 0) {
                        msg += "<br>Waiting for build/deploy " + reqSize + " project" + (reqSize > 1 ? "s" : "") + " complet.";
                    }
            		Workspace.common.tool.Pop.info(me, msg, {detail:detail});

                    /**
                     * Execute Build/Deploy Request
                     */
                     Ext.Array.each(reqValue, function(request, index, len) {
                        request.callbackBuild(undefined, true, undefined);
        			});
                }
			};
            var task = new Ext.util.DelayedTask(fnWaiting);
		    task.delay(0);
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.center.function.AddTabSaveAll');});