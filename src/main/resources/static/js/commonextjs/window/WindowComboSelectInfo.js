Ext.define('Workspace.common.window.WindowComboSelectInfo', {

    extend: 'Workspace.common.window.WindowCombo',

    maxLenTitle: 60
    ,
    // initComponent: function () {
    // }
    // ,
    _createComboBoxField: function (me) {
        var combo = me.superclass._createComboBoxField(me);

        combo.on('select', function(combo, records, option) {
        	var title = '';
        	if (records.length == 1) {
            	title = me.createTitle(records[0].data.data);
        	}
        	me.setTitle(title);
        });

        var onSpecialkey = function (field, e) {
        	var key = e.getKey();
        	if (key == e.UP || key == e.DOWN) {

            	var idx = field.idxFocus;
                if (Ext.isDefined(idx) && idx >= 0) {
            	    var title = me.createTitle(field.store.data.items[idx].data.data);
                    me.setTitle(title);
                }
        	}
        };
        combo.on('specialkey', onSpecialkey);

        return combo;
    }
    ,
    createTitle: function(data) {
    	var path = data.path;//classname;
    	var len = path.length;
    	if (len > this.maxLenTitle) {
    	    path = "..." + path.substring(len - this.maxLenTitle)
    	}
    	return path;
    }
    
}, function() {Workspace.tool.Log.defined('Workspace.common.window.WindowComboSelectInfo');});