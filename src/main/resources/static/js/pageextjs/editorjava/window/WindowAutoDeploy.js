Ext.define('Workspace.editorjava.window.WindowAutoDeploy', {
	requires: [
   	    'Workspace.common.tool.Pop',
	    'Workspace.common.form.combobox.ComboProjectExtjs4'
   	]
   	,
	extend: 'Ext.Window'
	,
	alias: 'widget.editorjavaWindowAutoDeploy',
	alternateClassName: 'WorkspaceEditorJavaWindowAutoDeploy'
	,
	// Must be override
	onItemSelected: function(combo, newValue, oldValue, option) {
		console.info('Workspace.editorjava.window.WindowAutoDeploy onTabChange do nothing');
	},
	// private
	initComponent : function(){
		var me = this;

        var combo = Ext.create('Workspace.common.form.combobox.ComboProjectExtjs4', {
            anchor: '100% 10%', 
		    id: 'nameFilter',
		    name: 'nameFilter',
            // value: me.application,
            valueField: me.application,
		    enableKeyEvents: true,
		    listeners: {
		    	keydown : function(field, event, option) {
                    var key = event.getKey();
                    if (key == event.ENTER) {
		                console.info('Workspace.editorjava.window.WindowAutoDeploy field.isExpanded:' + field.isExpanded);
                        if (!field.isExpanded == true) {
                            me.buttonCallBack({itemId:'yes'}, 'Yes');
                        } else {
                            return false;
                        }
                    } else if (key == event.ESC) {
                        me.close();
                        return false;
                    }
		    	}
		    }

        });

        var bottomTb = Ext.create('Ext.toolbar.Toolbar', {
            ui: 'footer',
            dock: 'bottom',
            layout: {
                pack: 'center'
            },
            items: [
                {text: 'Yes', itemId: 'yes', scope: me, minWidth: 75, handler: me.buttonCallBack},
                {text: 'No', itemId: 'no', scope: me, minWidth: 75, handler: me.buttonCallBack}
            ]
        });

        Workspace.tool.UtilComponent.addListener(me, 'change', me.onItemSelected);
        // Workspace.tool.UtilComponent.addListener(me.store, 'load', function() {me.focus();});

		Ext.apply(me, {
		    items : [
		        combo
		    ]
		    ,
		    dockedItems: [bottomTb]
			,
			listeners : {
				'show' : function (wnd) {
					console.info('Workspace.editorjava.window.WindowAutoDeploy show');
					new Ext.util.DelayedTask().delay(100, function() {
                        combo.setRawValue(me.application);
    					new Ext.util.DelayedTask().delay(100, function() {
                            combo.focus(false, true);
                            combo.setSelectText(0,0);
    					});
					});
				}
			}
		});

		me.callParent(arguments);
	}
	,
	buttonCallBack : function(btn, text) {
        var me = this;
        if (btn.itemId == 'yes'){
            var combo = me.getComponent('nameFilter');
            var application = combo.getRawValue();

            me.onItemSelected(combo, application, me.application);
        }
        me.close();
    }
	,
	title: 'Auto Deploy',
	layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'center'
    },
	width:300,
	height:70,
	//autoHeight: true,        //hauteur de la fen?tre
	modal: true
	,             //Grise automatiquement le fond de la page
// 	closeAction:'hide',
    border: 0,
    plain: true
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.window.WindowAutoDeploy');});