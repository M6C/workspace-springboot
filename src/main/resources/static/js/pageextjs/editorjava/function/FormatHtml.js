Ext.define('Workspace.editorjava.function.FormatHtml',  {
	// REQUIRED

	statics: {
		call : function (text) {
			//alert("formatHtml");
			var ret = "";
			var size = text.length;
			for(var i=0;i<size;i++) {
				car = text.charAt(i);
				if (car=="\n")
					ret += "<br>";
				else if (car==" ")
					ret += "&nbsp;";
				else if (car=='"')
					ret += "&quot;";
				else if (car!="\r")
					ret += car;
			}
			ret = ret.replace(/\/\*/g, '&#47;&#42;');
			ret = ret.replace(/\*\//g, '&#42;&#47;');
			return ret;
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.function.FormatHtml');});