Ext.define('Workspace.editorjava.aceeditor.command.CommandFindResource',  {
	requires: [
  	     'Workspace.common.tool.Pop'
  	]
  	,
	statics: {
	    addCommand: function(editor, panelTab) {
			var me = this;
			var commands = editor.commands;
		    commands.addCommand(
                {
    		        name: 'FindResourceName',
    		        bindKey: {win: 'Ctrl-Shift-R',  mac: 'Command-Option-R'},
    		        exec: me.openFindResourceNameFilter,
    		        readOnly: true // false if this command should not apply in readOnly mode
    		    }
		    );
		    commands.addCommand(
		        {
    		        name: 'FindResourceContent',
    		        bindKey: {win: 'Ctrl-Shift-F',  mac: 'Command-Option-F'},
    		        exec: me.openFindResourceContentFilter,
    		        readOnly: true // false if this command should not apply in readOnly mode
    		    }
            );
	    }
	    ,
	    addListener: function(component) {
			var me = this;
		    component.on('keypress', function (field, event) {
    	        if (event.ctrlKey && event.shiftKey) {
            		var key = event.keyCode;//event.charCode
            		switch (key) {
            			case Ext.EventObject.R:
    		                me.openFindResourceNameFilter();
            				break;
            
            			case Ext.EventObject.F:
    		                me.openFindResourceContentFilter();
            				break;
            
            			default:
            				break;
            		}
		        }
		    });
/*		    component.on('specialkey', function(field, event) {
    	        if (event.ctrlKey && event.shiftKey && event.charCode == Ext.EventObject.R) {
    	            me.openFindResourceNameFilter();
                }
            });
*/	    }
	    ,
	    openFindResourceNameFilter: function(container) {
	        Workspace.editorjava.aceeditor.command.CommandFindResource.openFindResource(container, true, false);
	    }
	    ,
	    openFindResourceContentFilter: function(container) {
	        Workspace.editorjava.aceeditor.command.CommandFindResource.openFindResource(container, false, true);
	    }
	    ,
	    // Private
	    openFindResource: function(container, nameFilter, contentFilter) {
			console.info('Workspace.editorjava.aceeditor.command.CommandFindResource exec');

			var me = this;
			var application = Ext.getCmp('project').value;

			if (Ext.isEmpty(application)) {
				Workspace.common.tool.Pop.info(me, 'No application selected');
				return;
			}

			var panelTab=Ext.getCmp('mainCenterPanel');
            var tab = panelTab.getActiveTab();
			var editor = ace.edit(tab.panelEditorId);

//					editor.selection.selectWord();

			var text=editor.getSelectedText();
			var textName = '', textContent = '';
			if (contentFilter) {
			    textContent = text;
			} else {
			    textName = text;
			}
			var fnOnSubmitTree = function(view, record, item, index, event, eOpts) {
				var sm = view.getSelectionModel();
			    Ext.each(sm.getSelection(), function (node) {
					panelTab.onAddTab(node.raw);
			    });
				this.ownerCt.close();
			};

			Ext.create('Workspace.editorjava.window.WindowFindResource', {
				nameFilter: textName,
				contentFilter: textContent,
				showNameFilter:nameFilter,
				showContentFilter:contentFilter,
				application: application,
				onSubmit:fnOnSubmitTree
				,
				listeners : {
					'destroy' : function (wnd) {
						console.info('Workspace.editorjava.window.WindowFindResource destroy');
						editor.focus();
					}
				}
			}).show();
        }
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.aceeditor.command.CommandFindResource');});