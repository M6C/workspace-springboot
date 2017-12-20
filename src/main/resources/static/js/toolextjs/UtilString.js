Ext.define('Workspace.tool.UtilString', {

	statics: {
		/**
	     * Return true if the two path are equals
		 * Exemple :
		 *		- path1 : '/src' and path2 : '/src/item.txt' return true 
		 *		- path1 : '\src\java' and path2 : '/src/java/item.txt' return true 
		 *		- path1 : '/src/java' and path2 : '/src/java/tool/item.txt' return false
	     *
	     * @return true if the two path are equals
	     * @static
	     */
		isEqualPath : function(path1, path2) {
			var sep1 = (path1.indexOf('/')>=0 ? '/' : '\\');
			var sep2 = (path2.indexOf('/')>=0 ? '/' : '\\');

//			if (!this.endsWith(path1, sep1))
//				path1 += sep1;

			var lastSep1 = path1.length;//path1.lastIndexOf(sep1);
			var lastSep2 = path2.lastIndexOf(sep2);
	
			if (lastSep1 != lastSep2)
				return false;

//			if (sep1 != sep2) {
//				path1 = path1.replace(sep1, sep2);
//			}
			
//			path1 = path1.substring(0, lastSep1);
			path2 = path1.substring(0, lastSep2);
	
			return path1==path2;
		}
		,
	    /**
	     * Return true if the two path are diffent
		 * Exemple :
		 *		- path1 : '/src' and path2 : '/src/item.txt' return false 
		 *		- path1 : '\src\java' and path2 : '/src/java/item.txt' return false 
		 *		- path1 : '/src/java' and path2 : '/src/java/tool/item.txt' return true
	     *
	     * @return true if the two path are diffent
	     * @static
	     */
		isNotEqualPath : function(path1, path2) {
			return !this.isEqualPath(path1, path2);
		}
		,
		/**
	     * @return true str end with suffix
	     * @static
		 */
		endsWith : function(str, suffix) {
		    return str.indexOf(suffix, str.length - suffix.length) !== -1;
		}
		,
		cuteSplitPath: function(str, length) {
		    var me = Workspace.tool.UtilString;
		    var ret = str;

	        var idx, application, filename;
			var sep = (ret.indexOf('/')>=0 ? '/' : '\\');
			var pathReplacement = sep + '...' + sep;
			var path = ret;
			idx = path.lastIndexOf(sep);
			if (idx > 0) {
			    filename = path.substr(idx+1);
			    path = path.substr(0, idx);
			}
			idx = path.lastIndexOf(']');
			if (idx > 0) {
			    idx++;
			    application = path.substr(0, idx);
			    path = path.substr(idx+1);
			}

		    var size = path.length;
		    if (size > length) {
			    var part1 = '';
			    var part2 = '';
			    var part3 = '';
		        var middle = size / 2;
    			var idx1 = me.reverse(path).indexOf(sep, middle);
    			var idx2 = path.indexOf(sep, middle);
    			if (idx1 > 0 && idx2 > 0) {
        		    idx1 = middle - (idx1 - middle);

    			    part1 = path.substring(0, idx1-1);
    			    part2 = path.substring(idx1-1, idx2+1);
    			    part3 = path.substring(idx2+1);

                    if (part2.length <= pathReplacement.length) {
                        if (part1.length > part3.length && part1.lastIndexOf(sep) > 0) {
                            doReplace = true;
                            idx = part1.lastIndexOf(sep);
                            part1 = part1.substr(0, idx-1)
                        } else if (part3.indexOf(sep) > 0) {
                            doReplace = true;
                            idx = part3.indexOf(sep);
                            part3 = part3.substr(idx+1)
                        } else if (part1.length > part3.length) {
                            part1 = '';
                        } else {
                            part3 = '';
                        }
                    }
    			} else if (idx1 > 0) {
    			    part1 = path.substring(0, idx1-1);
    			} else if (idx2 > 0) {
    			    part3 = path.substring(idx2+1);
    			}

			    path = part1 + pathReplacement + part3;
			    if (path.indexOf(sep) != 0) {
			        path = sep + path;
			    }
			    if (path.lastIndexOf(sep) != (path.length-1)) {
			        path = path + sep;
			    }
			    ret = application + path + filename;
			    if (path.length > length) {
			        ret = me.cuteSplitPath(ret, length);
			    }

			    var pathReplacement2 = pathReplacement + '...' + sep;
				idx = ret.indexOf(pathReplacement2);
    			while (idx > 0) {
    			    ret = ret.substr(0, idx) + pathReplacement + ret.substr(idx + pathReplacement2.length);
					idx = ret.indexOf(pathReplacement2);
    			}
		    }
		    return ret;
		}
        ,
        reverse(str) {
            return str.split('').reverse().join('');
        }
        ,
        decodeUtf8: function(str) {
        	if (str == undefined) {
        		return "";
        	}
            var ret = '';
            var cTmp = 0;
            for (var i = 0; i < str.length; i++) {
            	var char = str.charCodeAt(i);
            	if (char == 0x25) { //'%'
                	var c = str.substr(++i, 2);
                    if (c == "C3") { // For UTF-8
    	            	cTmp = 64;
                    } else {
                    	ret += String.fromCharCode(parseInt(c, 16) + cTmp);
                    }
                    i++;
                }
                else {
                	cTmp = 0;
                	if (char == 43) { //'+' => ' '
    	            	ret += ' ';
    	            }
    	            else {
//    	            	ret += decodeURIComponent(String.fromCharCode(char));
    	            	ret += String.fromCharCode(char);
    	            }
                }
        	}
            return ret;
        }
        ,
        getSeparator: function(path) {
            return path.indexOf('/')>=0 ? '/' : '\\';
        }
        ,
        makeSamePathSeparator: function(path, mainPath) {
		    var sepMain = Workspace.tool.UtilString.getSeparator(mainPath);
		    var sep = Workspace.tool.UtilString.getSeparator(path);
            if (sep != sepMain) {
                path = Workspace.tool.UtilString.replaceAll(path, sep, sepMain);
            }
            return path;
        }
        ,
        replaceAll: function(text, what, by) {
            return text.split(what).join(by);
        }
	}

}, function() {Workspace.tool.Log.defined('Workspace.tool.UtilString');});