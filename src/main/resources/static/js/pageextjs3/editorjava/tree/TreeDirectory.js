// DEPENDENCE
Ext.Loader.load(fileList=[
DOMAIN_NAME_ROOT + '/js/commonextjs/form/textarea/HtmlEditor.js',
DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava/form/textarea/HtmlEditor.js'
],
preserveOrder=true);

// NAMESPACE
Ext.ns('Workspace.editorjava');

Workspace.editorjava.TreeDirectory = Ext.extend(Workspace.tree.TreeDirectory, {
	initComponent: function(config) {
		Workspace.editorjava.TreeDirectory.superclass.initComponent.call(this, config);
		this.menuContext = new Workspace.editorjava.TreeMenuContext();
	},
    listeners:{
        //scope: this, //yourScope
        'dblclick': function (node, event){
			if (node.attributes.contentType!='directory') {
				//var panelId='['+comboRecord.data.project+']'+node.attributes.id;
				var panelId='['+Ext.getCmp('project').value+']'+node.attributes.id;
				var panelEditorId=panelId+'Editor';
				var mainCenterPanel=Ext.getCmp('mainView').findById('mainCenterPanel');

				var htmlEditor = new Workspace.editorjava.form.textarea.HtmlEditor({
				    id: panelEditorId,
					className: node.attributes.className,
					contentType: node.attributes.contentType,
					build: node.attributes.build
				});
//				var htmlEditor = new Workspace.common.form.textarea.HtmlEditor({
//			        //{
//			        //	xtype: 'htmleditor',
//				        id: panelEditorId,
//				        enableColors: false,
//				        enableAlignments: false,
//				        cleanHtml: function(html) {
//				            var bd = this.getEditorBody();
//				            html = bd.innerText;
//							return html;
//						}
//						,
//						className: node.attributes.className,
//						contentType: node.attributes.contentType,
//						build: node.attributes.build
//		//				,plugins: [
//		//				    Ext.ux.form.HtmlEditor.Save
//		//				]
//						,initEditor : function() {
//							Workspace.common.form.textarea.HtmlEditor.superclass.initEditor.call(this);
//							if (Ext.isIE) {
//								///////////////IE///////////////////////////////
//								var iframe = this.container.dom.childNodes[0].lastChild.contentWindow.document;
//								iframe.attachEvent('onkeydown', this.onKeydown, this);
//							} else {
//								//////////////Mozilla///////////////////////////
//								var iframe = this.container.dom.childNodes[0].lastChild.contentDocument;
//								iframe.addEventListener('keydown', this.onKeydown, this);
//							}
//						}, onKeydown : function (e) {
//							if (e.ctrlKey && Ext.EventObject.SPACE == e.keyCode) {
//								e.preventDefault();
//								e.stopPropagation();
//		
//								var view = e.currentTarget.defaultView;
//								var selection = view.getSelection();
//								// Selection du d�but de la ligne jusqu'au curseur
//								//selection.extend(selection.focusNode,0)
//								// Selection du d�but de textarea jusqu'au curseur
//								selection.extend(view.document.firstChild,0);
//								var txt = selection.toString();
//								var pos = txt.length;
//								selection.collapseToEnd();
//		
//								htmlEditor.syncValue();
//								var txt=htmlEditor.getRawValue();
//								txt=escape(txt);
//		
//								var fnOnSubmitTree = function(tree, key, e) {
//						          var sm = tree.getSelectionModel();
//						          var node = sm.getSelectedNode();
//						          htmlEditor.insertAtCursor('.'+node.text);
//						          wndClasspathDetail.close();
//								};
//								
//								var wndClasspathDetail = create_WindowCompletionAction (
//									Ext.getCmp('el_wnd_hot_key_completion'),
//									txt,
//									pos,
//									fnOnSubmitTree
//								);
//								wndClasspathDetail.show();
//							}
//						}
//					});
		
				mainCenterPanel.add({
					title: node.attributes.text,
					id: panelId,
					elements: 'body,tbar',
					closable:true,
					layout: 'fit',
				    items: [
				          htmlEditor
				    ],
				    tbar: new Ext.Toolbar({
				    	cls: 'x-panel-header',
				    	height: 25,
				        items: [
						    '<span style="color:#15428B; font-weight:bold">Title Here</span>',
						    '->',
						    {text: 'Save', handler: 
						    function(){
								var pnl = mainCenterPanel.findById(panelId);
								var pnlEdit = pnl.findById(panelEditorId);
								pnlEdit.syncValue();
								var value=pnlEdit.getRawValue();
								//value=value.replace(/&\w+;/g,"");
								var className=pnlEdit.className;
		
								var wndWaiting = showWindowWaiting();
		
			    				Ext.MessageBox.updateText('Saving process...');
						    	Ext.Ajax.request({
									method:'POST',
									url:DOMAIN_NAME_ROOT + '/action.servlet?event=JsonEditSaveFile',
									callback:function(options, success, response) { 
		
						    			if (pnlEdit.build) {
						    				Ext.MessageBox.updateText('Building process...');
						    				var application = Ext.getCmp('project').value;
											Ext.Ajax.request({
												method:'POST',
												url:DOMAIN_NAME_ROOT + '/action.servlet?event=JsonEditCompileProject',
												callback:create_WindowResultText(response,function(btn, text){
									  		    	hideWindowWaiting("Building complete.", 1);
										  		}),
												params:{application:application,target:'compile',className:className}
											});
						    			}
						    			else {
						    				hideWindowWaiting("Saving complete.", 1);
						    			}
									},
									params:{filename:panelId,content:value}
								}); 		
						    }},
				            {text: 'Reload', handler: function(){
								var pnl = mainCenterPanel.findById(panelId);
								var pnlEdit = pnl.findById(panelEditorId);
								pnlEdit.syncValue();
								var value=pnlEdit.getPosition();
						    		alert('Reload pnlEdit.getPosition(true):'+pnlEdit.getPosition(true)+' pnlEdit.getPosition(false):'+pnlEdit.getPosition(false));
						    	}
				            }
				        ]
				    })
				});
			}
			
			var filePanel = mainCenterPanel.findById(panelId);
			mainCenterPanel.setActiveTab(filePanel);
		
			var filePanelEditor = filePanel.findById(panelEditorId);
		
			Ext.Ajax.request({
				url : DOMAIN_NAME_ROOT + '/action.servlet?event=JsonEditLoadFile',
				method: 'GET',
				params :{filename:panelId},
				success: function ( result, request ) {
					var jsonData = Ext.util.JSON.decode(result.responseText);
					var results = jsonData.results;
					var resultMessage = '';
					for(i=0 ; i<results ; i++) {
						resultMessage += jsonData.data[i].text + '<br>';//'\r\n';
					}
		
					resultMessage = formatHtml(resultMessage);
					resultMessage = colorize(resultMessage);
		
					filePanelEditor.setValue(resultMessage);
					filePanelEditor.syncValue();
				},
				failure: function ( result, request ) {
					alert('failure');
				}
			});
		},
		'movenode' : function (tree, node, oldParent, newParent, index){
			 alert('moved. Old parent node id='+ oldParent.id+'. new parent node id='+newParent.id);
		},
		'contextmenu' : function (node) {
	       console.info('Beforeshow node.id: '+ node.id + ' node.getPath(): '+ node.getPath());
	       // TODO Tester ICI si il s'agit d'une repertoire ou d'un fichier
	       // pour personnaliser le menu Contextuel
	       var menuC = this.menuContext;//Ext.getCmp('treeMenuContext');
//	       if (!menuC)
//	    	   menuC = new Workspace.editorjava.TreeMenuContext();
	       // Stock le noeud selectionn� dans le menu contextuel
	       menuC.data = node;
	       menuC.show(node.ui.getAnchor());
	    }
	}
});

// REGISTER
Ext.reg('WorkspaceEditorjavaTreeDirectory',Workspace.editorjava.TreeDirectory);
