Ext.define('Workspace.poc.draganddrop.common.function.ApplyDragAndDrop', {
	statics: {

		apply : function(cmp, onBeforeDrop, onDrop) {
		    console.info('Workspace.poc.draganddrop.common.function.ApplyDragAndDrop apply');
			Ext.apply(cmp, {
				draggable: true,
				viewConfig: {
//				    getRowClass: function (record) {
//						if (Ext.isDefined(this.panel.getRowClass))
//							return this.panel.getRowClass(this, record);
//						else
//							return this.callParent(arguments);
//					}
//					,
					plugins: {
				        ptype: 'gridviewdragdrop',
						ddGroup:'GridDDGroup',
				        stripeRows : true
				        ,dropZone:{
				        	isValidDropPoint:function(node, position, dragZone, e, data){
				    		    console.info('Workspace.poc.draganddrop.common.function.ApplyDragAndDrop dropZone isValidDropPoint');
				        	}
				        }
				    }
					,
					listeners: {
					    beforedrop: function(nodeEl, data) {
					    	Workspace.poc.draganddrop.common.function.ApplyDragAndDrop.decorateNode(data);
							return onBeforeDrop(this, nodeEl, data);
						}
						,
						drop: function(nodeEl, data, overModel, dropPosition, eOpts) {
//					    	Workspace.poc.draganddrop.common.function.ApplyDragAndDrop.decorateNode(data);
							return onDrop(this, nodeEl, data, overModel, dropPosition, eOpts);
						}
					}
					,
					allowCopy: true
//				      ptype:'treeviewdragdrop',
//				      ddGroup:'GridDDGroup',
//				      dragZone:{
//				        ddGroup:'GridDDGroup',
//				        dragText : '{0} selected node{1}',
//				        repairHighlightColor: 'c3daf9',
//				        repairHighlight: Ext.enableFx,
//				        isPreventDrag:function(e, node){
//				          //write code here to prevent drag action if desired
//				          return true;//<bool>;
//				        }
//				      },
//				      dropZone:{
//				        copy:false,
//				        dragText : '{0} selected node{1}',
//				        allowContainerDrops: false,
//				        appendOnly: false,
//				        allowParentInserts: false,
//				        expandDelay: 1000,
//				        dropHighlightColor: 'c3daf9',
//				        dropHighlight: Ext.enableFx,
//				        isValidDropPoint:function(node, position, dragZone, e, data){
//				          /** write code here that determines if the drop point should allow drops **/
//
//				          //How to get the drop target node and drag nodes
//				          var view = this.view;
//				          var targetNode = view.getRecord(node);
//				          var dragNode = data.records[0]; 
//
//				          /*NOTE: dragNode will be data from whatever the drag source was, 
//				            which could be your grid or another tree node, or some other source.  
//				            You will have to figure out some way to tell where the data is coming from.  
//				            In my code I know the dragNode is from my Grid because dragNode.parentNode 
//				            will be NULL since grid nodes don't have parent nodes.  
//				            You'll need to figure out something similar for your code.
//				          */  
//
//				          return true;//<bool>
//				        },
//
//				        handleNodeDrop:function(data,targetNode,position){
//				          /** Handle what happens when the dragged data is dropped on a tree node **/
//				          //Note: you can cancel or prevent a drop by returning false.
//				          return true;//<bool>
//				        }//end handleNodeDrop
//				      }//end dropZone
				}
		      });
		}
		,
		decorateNode(data) {
	    	//The dragged in record needs to be decorated so it will work with the other tree data.
	    	//Fix error: record.getDepth is not a function
			var size = data.records.length;
			for(var i=0 ; i<size ; i++) {
		    	Ext.data.NodeInterface.decorate(data.records[i]);
			}
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.poc.draganddrop.common.function.ApplyDragAndDrop');});