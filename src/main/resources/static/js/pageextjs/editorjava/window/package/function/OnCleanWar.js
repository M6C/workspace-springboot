//Ext.Loader.syncRequire('Workspace.editorjava.window.package.function.OnSubmit');

Ext.define('Workspace.editorjava.window.package.function.OnCleanWar',  {

	statics: {

		call : function () {
			config = {
				resultMessageSuccess : 'Clean War successfull',
				resultMessageFailure : 'Clean War failed',
				type : 'War',
				statusbarId : 'package_statusbar_clean_war',
				requestUrl : DOMAIN_NAME_ROOT + '/action.servlet?event=JsonCleanWar'
		   	};
			Ext.create('Workspace.editorjava.window.package.function.OnSubmit').call(config);
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.window.package.function.OnCleanWar');});