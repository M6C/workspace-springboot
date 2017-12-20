Ext.define('Workspace.editorjava.panel.center.function.AddTabSave',  {
	requires: [
	    'Workspace.common.tool.Pop',
	    'Workspace.editorjava.request.JsonEditSaveAndBuild']
	,
	statics: {

		call : function(editor) {
		    console.info('Workspace.editorjava.panel.center.function.AddTabSave.call');
		    var me = this;

            var panelId = editor.panelId;
			if (!editor.dirty) {
			    Workspace.common.tool.Pop.info(me, 'No&nbsp;need&nbsp;Save', {detail:panelId});
				return;
			}
			if (Ext.isDefined(editor.syncValue)) {
				editor.syncValue();
			}
			var value=editor.getValue();//pnlEdit.getRawValue();
			//value=value.replace(/&\w+;/g,"");
            var panelEditorId = editor.id;
			var application = editor.application;
			var className = editor.className;
			var autoDeploy = editor.autoDeploy;

			Ext.create('Workspace.editorjava.request.JsonEditSaveFile',
			{
				params:{filename:panelId,content:value},
				application:application,
				panelEditorId:panelEditorId
			}).request();
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.center.function.AddTabSave');});