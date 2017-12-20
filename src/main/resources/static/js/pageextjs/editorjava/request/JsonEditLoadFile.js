//Parameters :
// - panelId
// - panelEditorId
Ext.define('Workspace.editorjava.request.JsonEditLoadFile',  {
	requires: [
	    'Workspace.common.tool.Toast',
	    'Workspace.tool.UtilString'
	]
	,
    constructor: function(config) {
		console.info('Workspace.editorjava.request.JsonEditLoadFile constructor');
        var me = this;

        Ext.apply(me, config);

        me.callParent();
    },

    request: function(callBackSuccess) { 
        var me = this;
        var updateEditorState = function(editor) {
			var cursor = editor.selection.getCursor();
			editor.cursorCol = cursor.column;
			editor.cursorRow = cursor.row;
    		editor.changeScrollTop = editor.getSession().getScrollTop();
    		editor.changeScrollLeft = editor.getSession().getScrollLeft();
        };
		Ext.Ajax.request({  
			url : ACTION_SERVLET_ROOT + '/action.servlet?event=JsonEditLoadFile',
			headers: {'Content-Type': 'application/json; charset=UTF-8'},
			method: 'GET',
			params :{filename:me.panelId},
			success: function (result, request) {
	    		var jsonData = Ext.decode(result.responseText);
				var results = jsonData.results;
				var resultMessage = '';
				for(i=0 ; i<results ; i++) {
					resultMessage += Workspace.tool.UtilString.decodeUtf8(jsonData.data[i].text) + '\r\n';
				}

                var panel = Ext.getCmp(me.panelId);
				var filename = me.panelId.toLowerCase();
				var editor = ace.edit(me.panelEditorId);
		        var mode = 'text';
				ace.require("ace/ext/language_tools");
				if (filename.endsWith('.js')) {
					mode = 'javascript';
				} else if (filename.endsWith('.htm') || filename.endsWith('.xhtml')) {
					mode = 'html';
				} else if (filename.endsWith('.pxhtml')) {
					mode = 'php';
				} else if (filename.endsWith('.dtd') || filename.endsWith('.xsd') || filename.endsWith('.xsl')) {
					mode = 'xml';
				} else {
				    var idx=filename.lastIndexOf('.');
				    if (idx > 0) {
				        var mode = filename.substring(idx+1);
				    }
				}
		        editor.getSession().setMode({path: "ace/mode/" + mode, pure:true, /*other options here*/})
			    editor.setOptions({
			        enableBasicAutocompletion: true,
			        enableSnippets: true,
			        enableLiveAutocompletion: false
			    });

		        editor.doListenerChange = false;
				editor.setValue(resultMessage);
				Ext.apply(editor.raw, {
				    encoding: jsonData.encoding
				});

		    	editor.dirty = false;
		    	editor.getSession().on('change', function(e){
	    	        if (editor.doListenerChange) {
    			        if (!editor.dirty) {
    					    var panelTab = Ext.getCmp(editor.panelId);
    					    panelTab.setTitle('*' + panelTab.title);
    		    	    }
    		    	    editor.dirty = true
	    	        }
		    	});
		    	editor.getSession().on('changeScrollTop', function(number){
		    		if (!editor.doListenerChange) {return;}
		    		updateEditorState(editor);
		    		editor.changeScrollTop = number;
					panel.up('tabpanel').fireEvent('updatestate');
		    	});
		    	editor.getSession().on('changeScrollLeft', function(number){
		    		if (!editor.doListenerChange) {return;}
		    		updateEditorState(editor);
		    		editor.changeScrollLeft = number;
					panel.up('tabpanel').fireEvent('updatestate');
		    	});
		    	editor.getSelection().on('changeCursor', function(number){
		    		if (!editor.doListenerChange) {return;}
		    		updateEditorState(editor);
					panel.up('tabpanel').fireEvent('updatestate');
		    	});
		    	if (Ext.isDefined(callBackSuccess)) {
		    		callBackSuccess();
		    	}
		    	editor.doListenerChange = true;
			},
			failure: function ( result, request ) {
				alert('failure');
			}
		});
    }
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.request.JsonEditLoadFile');});