//Parameters :
// - params
// - application
// - build
// - className
Ext.define('Workspace.editorjava.request.JsonEditSaveAndBuild',  {
	requires: [
		'Workspace.common.tool.Pop',
	    'Workspace.editorjava.constant.ConstantState',
		'Workspace.common.window.WindowResultText'
   	]
	,
	extend: 'Workspace.editorjava.request.JsonEditSaveFile'
	,
    constructor: function(config) {
		console.info('Workspace.editorjava.request.JsonEditSaveAndBuild constructor');
        var me = this;

        config.callback = Ext.Function.createSequence (me.callback, me.callbackBuild);

        Ext.apply(me, config);

        me.callParent();
    },
    callbackBuild: function(options, success, response) {
    	var me = this;

		if (me.build == 'true') {
            Workspace.editorjava.constant.ConstantState.inProgressBuild(true);
			Ext.Ajax.request({
				method:'POST',
				url:ACTION_SERVLET_ROOT + '/action.servlet?event=JsonEditCompileProject',
				callback:function(options, success, responseCompile) {
					var jsonData = Ext.JSON.decode(responseCompile.responseText);
					if (!Ext.isDefined(jsonData)) {
                        Workspace.editorjava.constant.ConstantState.inProgressBuild(false);
    					Workspace.common.tool.Pop.info(me, "Building ["+me.application+"] data not found.");
    					return;
					}
					if (jsonData.success) {
                        var msg = "Building '"+me.application+"' complete.";
						if (me.autoDeploy == true) {
                            msg += "<br>Waiting for deploy complet."
    		    			Ext.Ajax.request({
    		    				url:ACTION_SERVLET_ROOT + '/action.servlet?event=JsonAutoDeploy',
    		    				callback:me.callbackAutoDeploy,
    		    				params:{application:me.application}
    		    			});
						} else {
                            Workspace.editorjava.constant.ConstantState.inProgressBuild(false);
						}
    					Workspace.common.tool.Pop.info(me, msg);
					} else {
                        Workspace.editorjava.constant.ConstantState.inProgressBuild(false);
    					Ext.create('Workspace.common.window.WindowTextCompile', {modal:false, data:jsonData}).show();
					}
				},
				params:{application:me.application,target:'compile',className:me.className}
			});
		}
		else if (me.autoDeploy == true) {
		    var params= {};
			if (Ext.isDefined(options) && Ext.isDefined(options.params)) {
			    params['filename'] = options.params.filename;
			}
			if (Ext.isDefined(me.application)) {
			    params['application'] = me.application;
			}
			Ext.Ajax.request({
				url:ACTION_SERVLET_ROOT + '/action.servlet?event=JsonAutoDeploy',
				callback:me.callbackAutoDeploy,
				params:params
			});
		}
	},
    callbackAutoDeploy: function(opts, success, response) {
        Workspace.editorjava.constant.ConstantState.inProgressBuild(false);
        var me = Workspace.editorjava.request.JsonEditSaveAndBuild;
		var jsonData = Ext.JSON.decode(response.responseText);
		var application = opts.params.application;
		if (jsonData.results > 0) {
			var cntSuccess = 0, cntFailure = 0;
			var messageSuccess = '';
			var messageFailure = '';
			for(var i=0 ; i<jsonData.results ; i++) {
				data = jsonData.autodeploy[i];
				if (data.success == false) {
					cntFailure++;
					Workspace.common.tool.Pop.error(me, data.msg, false, true);
					messageFailure += data.msg + "<br>";
				} else {
					cntSuccess++;
					messageSuccess += data.src + "=>" +  data.dst + "<br>";
				}
			}
			me.showMessage('success', cntSuccess, messageSuccess, application);
			me.showMessage('failure', cntFailure, messageFailure, application);
		} else {
			Workspace.common.tool.Pop.info(me, 'AutoDeploy \''+application+'\' No file deployed.');
		}
	},
	statics: {
		showMessage: function(type, cnt, message, application) {
			var me = this;
			if (cnt > 0) {
				Workspace.common.tool.Pop.show(type, me, 'AutoDeploy  \''+application+'\' ' + type + ' ' + cnt + ' file'+(cnt > 1 ? 's' : '')+'.', {detail:message});
			}
		}
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.request.JsonEditSaveAndBuild');});