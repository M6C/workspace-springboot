Ext.define('Workspace.widget.tree.WidgetTreeExplorer', {
	requires: [
  	     'Workspace.common.tool.Delete',
  	     'Workspace.common.tool.Rename',
  	     'Workspace.tool.UtilComponent',
  	     'Workspace.common.draganddrop.ApplyDragAndDropCopyMove',
  	     'Workspace.tool.Log'
  	]
  	,
	extend: 'Workspace.common.tree.TreeFileExplorerExtjs4'
	,
	alias: 'widget.widgetTreeExplorer',
	alternateClassName: 'WorkspaceWidgetTreeExplorer'
	,
    initComponent : function(){
		var me = this;

        Workspace.tool.UtilComponent.addListener(me, 'load', me.listenerLoad);
        Workspace.tool.UtilComponent.addListener(me, 'add', me.listenerAdd);
        Workspace.tool.UtilComponent.addListener(me, 'itemdblclick', me.listenerItemdblclick);

		me.callParent(arguments);
	}
	,
	// Must be overrided
	onActionOpen(view, record, item, index, event, eOpts) {
		console.info('Workspace.widget.tree.WidgetTreeExplorer onActionOpen do nothing');
	},
	// Can be overrided
	onActionDelete(view, record, item, index, event, eOpts) {
		console.info('Workspace.widget.tree.WidgetTreeExplorer onActionDelete');
		Workspace.common.tool.Delete.doRequest(view.getSelectionModel(), view);
	},
	// Can be overrided
	onActionRename(view, record, item, index, event, eOpts) {
		console.info('Workspace.widget.tree.WidgetTreeExplorer onActionRename');
		Workspace.common.tool.Rename.doRequest(view.getSelectionModel(), view);
	},
	// Can be overrided
	onItemKeyDown: function(view, record, item, index, event, eOpts) {
		console.info('Workspace.widget.tree.WidgetTreeExplorer onItemKeyDown');
        var me = this;
		var key = event.keyCode;
		switch (key) {
			case Ext.EventObject.ENTER: 	// code:13
				me.onActionOpen(view, record, item, index, event, eOpts);
				break;

			case Ext.EventObject.DELETE: 	// code:46
			case Ext.EventObject.BACKSPACE: // code:8
				me.onActionDelete(view, record, item, index, event, eOpts);
				break;

			case Ext.EventObject.F2:        // code:113
				me.onActionRename(view, record, item, index, event, eOpts);
				break;

			default:
				break;
		}
	},
	// Can be overrided
	listenerLoad: function(store, records, successful, operation, eOpts) {
		if (successful) {
			var view = this.getView();
			var node = records;
			if (node.parentNode == undefined && node.firstChild != undefined) {
				view.select(node.firstChild);
			}
			view.focus();
		}
	},
	// Can be overrided
	listenerAdd: function(container, component, index, eOpts) {
		console.info('Workspace.widget.tree.WidgetTreeExplorer add');
	    var me = this;
	   // if (!this.listnered) {
	       // Workspace.tool.Log.logAllEvent(component);
	   //     this.listnered = true;
	   // }
		component.on('itemkeydown', me.onItemKeyDown);
	},
	// Can be overrided
	listenerItemdblclick: function(view, record, item, index, event, eOpts) {
	    var me = this;
		me.onActionOpen(view, record, item, index, event, eOpts);
	},
	// Can be overrided
	applyDragAndDrop: function(me) {
		// Explicit load required library (Mandatory for extending this class)
		Workspace.common.draganddrop.ApplyDragAndDropCopyMove.apply(me);
	}
	,
    enableKeyEvents:true,
    stateful:false
    ,
    // Overide of 'Ext.tree.Panel'
    expandPath: function(path, field, separator, callback, scope) {
        var me = this,
            current = me.getRootNode(),
            index = 1,
            view = me.getView(),
            keys;

        field = field || me.getRootNode().idProperty;
        separator = separator || '/';

        if (Ext.isEmpty(path)) {
            Ext.callback(callback, scope || me, [false, null]);
            return;
        }

        keys = path.split(separator);
        if (current.get(field) != keys[1]) {
            // invalid root
            Ext.callback(callback, scope || me, [false, current]);
            return;
        }

        var cnt = 10;
        var delayedFn = function(){
	        if(current.isLoading() && (cnt-- > 0)) {
				// Waiting...
				console.debug('Workspace.widget.tree.WidgetTreeExplorer expandPath Waiting... ('+field+':'+current.get(field)+',cnt:'+cnt+',loading:'+current.isLoading()+')');
				task.delay(500);
	        } else {
	            var expander = function(){
	                if (++index === keys.length) {
	                    Ext.callback(callback, scope || me, [true, current]);
	                    return;
	                }
	                var node = current.findChild(field, keys[index]);
	                if (!node) {
	                    Ext.callback(callback, scope || me, [false, current]);
	                    return;
	                }
	                current = node;
	                cnt = 10;
	                task.delay(0);
	            };

	            if (current.isLeaf()) {
	            	// TODO No Effect
	            	me.getView().focusRow(current);
	            }
	            current.expand(false, expander);
	        }
		};
        var task = new Ext.util.DelayedTask(delayedFn);
		task.delay(0);
    }
}, function() {Workspace.tool.Log.defined('Workspace.widget.tree.WidgetTreeExplorer');});