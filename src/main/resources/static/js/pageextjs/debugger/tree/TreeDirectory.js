// NAMESPACE
Ext.ns('Workspace.debugger');

Workspace.debugger.TreeDirectory = Ext.extend(Workspace.tree.TreeDirectory, {
//	initComponent: function(config) {
//		Workspace.debugger.TreeDirectory.superclass.initComponent.call(this, config);
//		this.menuContext = new Workspace.debugger.TreeMenuContext();
//	},
    listeners:{
        //scope: this, //yourScope
        'dblclick': function (node, event){
	        //scope: this, //yourScope
			if (node.attributes.contentType!='directory') {
			// Remplac� par getRowClass du viewer
//						function lineRenderer(value, metaData, record, rowIndex, colIndex, store) {
//			                //var row = grid.store.getAt(rowIndex);
//			                var row = record.store.getAt(rowIndex);
//			                console.log('row', row);
//			                if (row.data.breakpoint==1)
//					            return '<span style="color:red;">' + value + '</span>';
//			                else
//			                	return value;
//						}
	
				var fields = [
				   {name: 'line', mapping : 'line'},
				   {name: 'text', mapping : 'text'},
				   {name: 'breakpoint', mapping : 'breakpoint'}
				 ];
				 // create the data store
				 var gridStore = new Ext.data.JsonStore({
				   fields : fields,
				   //data   : myData,
				   root   : 'data'
				 });
				 // Column Model shortcut array
				 var cols = [
				   {id : 'line', dataIndex: 'line'},//, renderer: lineRenderer},
				   {id : 'text', dataIndex: 'text'}
				 ];
				 // declare the source Grid
				 var grid = new Ext.grid.GridPanel({
	//							 ddGroup          : 'gridDDGroup',
				     store            : gridStore,
				     colModel: new Ext.grid.ColumnModel({
				         defaults: {
				           width: 50,
				           sortable: true
				         },
				         columns: cols
				     }),
				     enableDragDrop   : false,
				     stripeRows       : true,
				     autoExpandColumn : 'text',
				     header           : false,
				     hideHeaders      : true,
				     selModel         : new Ext.grid.RowSelectionModel({singleSelect : true}),
				     viewConfig: {
				     //forceFit: true,
	
					 	// Return CSS class to apply to rows depending upon data values
				        getRowClass: function(record, index) {
			                if (record.data.breakpoint==1)
					            return 'breakpoint-row';
			                else
			                	return '';
				        }
				    }
				 });
				 
				 grid.on('rowdblclick', function(grid, rowIndex, e) {
		                console.log('rowdblclick', grid, rowIndex, e);
		                var project = Ext.getCmp('project').value;
		                var pClass = node.attributes.className;
		    	    	var requestUrl = DOMAIN_NAME_ROOT + '/action.servlet';
		      			Ext.Ajax.request({
		      			   url: requestUrl,
		      			   params: {event:'DebuggerBreakpointAddExtJs',application:project,className:pClass,breakpointLine:rowIndex},
		      			   success: function(result, request){
		      				   console.log('DebuggerBreakpointAdd result', result);
		      				   var jsonData = Ext.util.JSON.decode(result.responseText);
		      				   if (jsonData.status=='success') {
				   	               var row = grid.store.getAt(rowIndex);
					               console.log('row', row);
				   	               if (jsonData.data[0].text=='added')
				   	            	   row.data.breakpoint=1
					               else if (jsonData.data[0].text=='deleted')
					            	   row.data.breakpoint=0;
				   	               /*
					               else if (row.data.breakpoint==1)
				   	            	   row.data.breakpoint=0
					               else
					            	   row.data.breakpoint=1;
					               */
					               grid.getView().refresh();
		      				   }
		      				   else {
		      					 Ext.Msg.alert('Breakpoint', 'Breakpoint failed.['+jsonData.text+']');
		      				   }
		      			   },
		      			   failure: function (result, request) {
		      				   Ext.Msg.alert('Breakpoint', 'Breakpoint failed.['+result+']');
		      			   }
		      			});
	
		    			// Recopie les donn�es pour mettre � jour l'affichage (r�-executer la m�thode lineRenderer)
		    			// Il faudrait trouver le moyen de faire un fireEvent pour mettre � jour la vue (ou juste la ligne) mise � jour
		                //
		                // Tout ceci � �t� remplac� par : grid.getView().refresh();
		                // et dans le viewer : getRowClass
	//			   			var nwData = {
	//							data : []
	//			   			};
	//			   			var d;
	//			   			for(i=0 ; i<grid.store.data.items.length ; i++) {
	//			   				d = grid.store.data.items[i].data;
	//			   				nwData.data[i] = {line:d.line, text:d.text, breakpoint:d.breakpoint};
	//			   			}
	//			               grid.store.loadData(nwData);
	//			               grid.getView().getRow(rowIndex).scrollIntoView();
	
		            }, this);
	
				//var panelId='['+comboRecord.data.project+']'+node.attributes.id;
				var panelId='['+Ext.getCmp('project').value+']'+node.attributes.id;
				var mainCenterPanel=Ext.getCmp('mainView').findById('mainCenterPanel');
				mainCenterPanel.add({
					title: node.attributes.text,
					id: panelId,
					elements: 'body,tbar',
					closable:true,
					layout: 'fit',
				    items: [
				        grid
				    ],
				    tbar: new Ext.Toolbar({
				    	cls: 'x-panel-header',
				    	height: 25,
				        items: [
			              //'->', //{ xtype : 'tbfill' },
			              { text : 'Run', handler : function() {} },
			              '-',//{ xtype : 'tbseparator' },
			              { text : 'Step Into', handler : function() {} },
			              { xtype : 'tbspacer', width: 10},//same as ' ' to create Ext.Toolbar.Spacer
			              { text : 'Step Over', handler : function() {} },
			              { xtype : 'tbspacer', width: 10},//same as ' ' to create Ext.Toolbar.Spacer
			              { text : 'Step Out', handler : function() {} }
				        ]
				    })
				});
	
				Ext.Ajax.request({
					url : ACTION_SERVLET_ROOT + '/action.servlet?event=JsonEditLoadFile',
					method: 'GET',
					params :{filename:panelId},
					success: function ( result, request ) {
						var jsonData = Ext.util.JSON.decode(result.responseText);
						var results = jsonData.results;
		
						var myData = {
								data : [
								]
							};
						// Affichage du fichier ligne par ligne
					    for(i=0 ; i<results ; i++) {
					    	myData.data[i] = {line:i, text:jsonData.data[i].text, breakpoint:0};
					    }
		
					    gridStore.loadData(myData);
					},
					failure: function ( result, request ) {
						alert('failure');
						//var jsonData = Ext.util.JSON.decode(result.responseText);
						//var resultMessage = jsonData.data.result;
						//alert(resultMessage);
					}
				});
		
				var filePanel = mainCenterPanel.findById(panelId);
				mainCenterPanel.setActiveTab(filePanel);
			}
		}
	}
});

// REGISTER
Ext.reg('WorkspaceDebuggerTreeDirectory',Workspace.debugger.TreeDirectory);