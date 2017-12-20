Ext.define('Workspace.editorjava.panel.center.function.AddTab',  {
	// REQUIRED
	requires: ['Workspace.editorjava.function.FormatHtml',
	           'Workspace.editorjava.function.Colorize',
	           'Workspace.editorjava.form.textarea.HtmlEditor',
	           'Workspace.editorjava.panel.center.function.AddTabSave',
	           'Workspace.editorjava.panel.center.function.AddTabReload'
	     ]
	,
	statics: {

		call : function(raw) {
		    console.info('Workspace.editorjava.panel.center.function.AddTab.call');
			if (raw.contentType!='directory') {
				var panelId=raw.id;
				var panelEditorId=panelId+'Editor';
				var mainCenterPanel=Ext.getCmp('mainCenterPanel');

				// Explicit load required library (Mandatory for extending this class)
				Ext.Loader.syncRequire('Workspace.editorjava.panel.center.function.AddTabSave');
				Ext.Loader.syncRequire('Workspace.editorjava.panel.center.function.AddTabReload');

				var htmlEditor = Ext.create('Workspace.editorjava.form.textarea.HtmlEditor', {
				    id: panelEditorId,
					className: raw.className,
					contentType: raw.contentType,
					build: raw.build,
					panelId: panelId
				});
		
				mainCenterPanel.add({
					title: raw.text,
					id: panelId,
					elements: 'body,tbar',
					closable:true,
					layout: 'fit',
				    items: [
				          htmlEditor
				    ],
				    tbar: Ext.create('Ext.toolbar.Toolbar', {
				    	cls: 'x-panel-header',
				    	height: 25,
//				        initComponent : function(){
//				    		var me = this;
//
//				    		Ext.apply(me, {
						        items: [
								    '<span style="color:#15428B; font-weight:bold">Title Here</span>',
								    '->',
								    {
								    	text: 'Save', 
								    	handler:  function(button, e) {
								    		// Explicit load required library (Mandatory for extending this class)
								    		Ext.Loader.syncRequire('Workspace.editorjava.panel.center.function.AddTabSave');

								    		Workspace.editorjava.panel.center.function.AddTabSave.call(panelId, panelEditorId)
							    		}
								    },
						            {
								    	text: 'Reload',
								    	handler:  function(button, e) {
								    		// Explicit load required library (Mandatory for extending this class)
								    		Ext.Loader.syncRequire('Workspace.editorjava.panel.center.function.AddTabReload');

								    		Workspace.editorjava.panel.center.function.AddTabReload.call(panelId, panelEditorId)
								    	}
						            }
						        ]
//				    	    });
//				    	    me.callParent(arguments);
//				    	}
				    })
				});
			
				var filePanel = mainCenterPanel.getComponent(panelId);
				mainCenterPanel.setActiveTab(filePanel);
			
				var filePanelEditor = filePanel.getComponent(panelEditorId);
			
				Ext.Ajax.request({
					url : DOMAIN_NAME_ROOT + '/action.servlet?event=JsonEditLoadFile',
					method: 'GET',
					params :{filename:panelId},
					success: function ( result, request ) {
			    		// Explicit load required library (Mandatory for extending this class)
			    		Ext.Loader.syncRequire('Workspace.editorjava.function.FormatHtml');
			    		Ext.Loader.syncRequire('Workspace.editorjava.function.Colorize');

			    		var jsonData = Ext.decode(result.responseText);
						var results = jsonData.results;
						var resultMessage = '';
						for(i=0 ; i<results ; i++) {
							resultMessage += jsonData.data[i].text + '<br>';//'\r\n';
						}
			
						resultMessage = Workspace.editorjava.function.FormatHtml.call(resultMessage);
						resultMessage = Workspace.editorjava.function.Colorize.call(resultMessage);
			
						filePanelEditor.setValue(resultMessage);
						filePanelEditor.syncValue();
						
						filePanelEditor.focus();
					},
					failure: function ( result, request ) {
						alert('failure');
					}
				});
			}
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.center.function.AddTab');});