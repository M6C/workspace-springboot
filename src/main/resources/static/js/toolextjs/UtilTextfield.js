Ext.define('Workspace.tool.UtilTextfield', {

	statics: {
		setCaretTo: function(id, pos) {
    		var obj = document.getElementById(id); 
    		if(obj.createTextRange) { 
    			var range = obj.createTextRange(); 
    			range.move("character", pos); 
    			range.select(); 
    		} else if(obj.selectionStart) { 
    			obj.focus(); 
    			obj.setSelectionRange(pos, pos); 
    		} 
    	}
    	,
        getCaretPos: function(id) {
        	var el = document.getElementById(id);
        	   var rng, ii=-1;
    		if(typeof el.selectionStart=="number") {
    			ii=el.selectionStart;
    		} else if (document.selection && el.createTextRange){
    			rng=document.selection.createRange();
    			rng.collapse(true);
    			rng.moveStart("character", -el.value.length);
    			ii=rng.text.length;
    		}
    		return ii;
        }
	}

}, function() {Workspace.tool.Log.defined('Workspace.tool.UtilComponent');});