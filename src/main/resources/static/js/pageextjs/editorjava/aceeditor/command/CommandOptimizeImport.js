Ext.define('Workspace.editorjava.aceeditor.command.CommandOptimizeImport',  {
	requires: [
	    'Workspace.common.constant.ConstantJava'
	],
	statics: {
        regExtractImport: /(\bimport\b)(\s*)([\w|.]+)(\s*)(;)/g
        ,
        regExtractPackage: /(\bpackage\b)(\s*)([\w|.]+)(\s*)(;)/
        ,
        regExtractClass: /(([\,(;{}=]+)|(\bpublic\b|\bprotected\b|\bprivate\b|\bnew\b|\bthrows\b|\bextends\b|\bimplements\b))(\s*)([A-Z]{1}[A-Za-z0-9]+)/g
        ,
        regExtractClassname: /(((\bpublic\b|\bprotected\b|\bprivate\b)(\s*))*)(\bclass\b)(\s*)([\w|.]+)(\s*)({|\bthrows\b|\bextends\b|\bimplements\b)/
        ,
        regDeleteImport: function(strImport) {
            var strReg = "(\\bimport\\b)(\\s*)(\\b"+strImport+"\\b)(\\s*)(;)";
    		return new RegExp(strReg);
        }
        ,
        regFindClass: function(strClass) {
            return new RegExp("\\b."+strClass+"\\b$");
        }
        ,
	    addCommand: function(editor) {
	        var command = new Workspace.editorjava.aceeditor.command.CommandOptimizeImport();
		    editor.commands.addCommand(command);
	    }
	}
	,
    name: "editorOptimizeImport",
    bindKey: {win: "Ctrl-Shift-O", mac: "Command-Option-O"},
    exec: function(editor) {
        this.optimizeImport(editor)
    }
	,
    optimizeImport: function(editor) {
		var me = this;
		me.editor = editor;

		var filename = editor.panelId.toLowerCase();
        if (!filename.endsWith('.java')) {
		    console.info('Workspace.editorjava.aceeditor.command.CommandOptimizeImport no java file');
            return;
        }
	    Workspace.common.tool.Pop.info(me, 'Optimize Import waiting complete.', {detail: filename});

		var selection = editor.selection;
		var col = selection.getCursor().column;
		var row = selection.getCursor().row;
		me.position = {column:col,row:row};

        //https://regex101.com/r/gN4sS0/2
        // var regex ="/([;{}]+)(\s+)(\w+)([\s|\W])/ig";

        //https://ace.c9.io/#nav=api&api=editor
        //var regex ="([;{}]+)(\\s+)(\\w+)([\\s|\\W])";
        //var cnt = editor.findAll(regex, {regExp:true, wholeWord:false});

		//http://docs.sencha.com/extjs/4.0.7/#!/api/RegExp
		var value=editor.getValue();

        me.listClass = me.extractClass(value);
 		// Workspace.common.tool.Pop.info(me, "Workspace.editorjava.aceeditor.command.CommandOptimizeImport exractClass cnt:" + me.listClass.length + "<br>ret:" + me.listClass.join(","), false);
        me.listImport = me.extractImport(value);
 		// Workspace.common.tool.Pop.info(me, "Workspace.editorjava.aceeditor.command.CommandOptimizeImport exractImport cnt:" + me.listImport.length + "<br>ret:" + me.listImport.join(","), false);

        me.listClassWithOutImport = me.getClassWithOutImport();
		// Workspace.common.tool.Pop.info(me, "Workspace.editorjava.aceeditor.command.CommandOptimizeImport getClassWithOutImport cnt:" + me.listClassWithOutImport.length + "<br>ret:" + me.listClassWithOutImport.join(","), false);

        me.listImportUnused = me.getImportUnused();
		// Workspace.common.tool.Pop.info(me, "Workspace.editorjava.aceeditor.command.CommandOptimizeImport getImportUnused cnt:" + me.listImportUnused.length + "<br>ret:" + me.listImportUnused.join(","), false);
        me.listImportUsed = me.removeImportUnused();
		// Workspace.common.tool.Pop.info(me, "Workspace.editorjava.aceeditor.command.CommandOptimizeImport getImportUsed cnt:" + me.listImportUsed.length + "<br>ret:" + me.listImportUsed.join(","), false);

        me.doOptimizeImport();
    }
    ,
    deleteImportUnused: function(editor) {
		var me = this;
		var me_static = Workspace.editorjava.aceeditor.command.CommandOptimizeImport;
		var selection = editor.selection;
		var col = selection.getCursor().column;
		var row = selection.getCursor().row;
        var value = editor.getValue();

        Ext.Array.each(me.listImportUnused, function(strImport, index, importItSelf) {
			var reg = me_static.regDeleteImport(strImport);
			value = value.replace(reg, "");
        });

		selection.selectToPosition({column:col,row:row});
		return value;
    }
    ,
    doOptimizeImport: function() {
		var me = this;

        me.listClassWithOutImportProcess = Ext.clone(me.listClassWithOutImport);
        var listClass = me.listClassWithOutImportProcess;
        if (!Ext.isEmpty(listClass)) {
		    var paramApplication = Ext.getCmp('project').value;
            var paramClassname = listClass.join(";");

			Ext.Ajax.request({
				method:'GET',
				url:DOMAIN_NAME_ROOT + '/action.servlet?event=JsonOptimizeImport',
				params:{application:paramApplication, classname: paramClassname},
				callback:me.callbackImport,
				scope: me
			});
        } else  {
            me.replaceImport();
		}
    }
    ,
    callbackImport: function(options, success, responseCompile) {
		var me = this;
	    // 	Workspace.common.tool.Pop.info(me, "Optimize Import complete." + responseCompile.responseText);
	    var jsonData = Ext.JSON.decode(responseCompile.responseText);
	    if (!Ext.isDefined(jsonData)) {
    		Workspace.common.tool.Pop.failure(me, 'Optimize Import callback with empty json data', {toast: false});
			return;
	    }
	    var multiChoiceImport = false;
	    if (Ext.isArray(jsonData.import) && !Ext.isEmpty(jsonData.import)) {
            var cnt = jsonData.import.length;
            var importList = jsonData.import;
            Ext.Array.each(importList, function(objImport, index, importItSelf) {
                var classname = objImport.classname;
                Ext.Array.remove(me.listClassWithOutImport, classname);
            });
            Ext.Array.each(importList, function(objImport, index, importItSelf) {
                var classname = objImport.classname;
                var list = objImport.list;
                if (list.length == 1) {
                    me.listImportUsed.push(list[0].classname);  
                    Ext.Array.remove(me.listClassWithOutImportProcess, classname);
                } else {
                    multiChoiceImport = true;
                    // Do Replace Import on 1st Window because WindowCombo is ASYNCHRONOUS and the 1st Window will be the last showing window
	                var doReplaceImport = (index == 0);

                	me.choiceImport(objImport, doReplaceImport);
                }
            });
	    } else {
            me.listClassWithOutImportProcess = [];
	    }
		if (multiChoiceImport === false && Ext.isEmpty(me.listClassWithOutImport)) {
            me.replaceImport();
		}
    }
    ,
    callbackPrompt: function (btn, text, option) {
		var me = this;
		var classname = text.classname;
		var name = classname.substring(classname.lastIndexOf('.') + 1);
        if (btn == 'ok') {
            me.listImportUsed.push(classname);
            Ext.Array.remove(me.listClassWithOutImportProcess, name);
        } else {
            me.listClassWithOutImport.push(name);
        }
        if (me.listClassWithOutImportProcess.length == me.listClassWithOutImport.length) {
            me.replaceImport();
        }
    }
    ,
    choiceImport: function(objImport, doReplaceImport) {
		var me = this;
        var classname = objImport.classname;
        var list = objImport.list;

    	var textConverter = function(value, record) {
            return record.raw.classname;
        };

        var msgbox = Ext.create('Workspace.common.window.WindowComboSelectInfo',  {
            value: list, 
            doReplaceImport: doReplaceImport, 
            textConverter: textConverter, 
            minPromptWidth:420,
            resizable:true
            ,
            comboConfig: {
                width: 390
            }
            ,
            listeners: {
                beforeclose: function(panel, option) {
                    me.listClassWithOutImport.push(classname);
                    if (me.listClassWithOutImportProcess.length == me.listClassWithOutImport.length) {
                        me.replaceImport();
                    }
                }
            }
        });

        msgbox.prompt("Optimize Import", classname, me.callbackPrompt, me);
    }
    ,
    replaceImport: function() {
		var me = this;
		var me_static = Workspace.editorjava.aceeditor.command.CommandOptimizeImport;
		var filename = me.editor.panelId.toLowerCase();
	    var value=me.editor.getValue();

        var generatedImport = me.generateImport();

        // RegEx Import
        var reg = me_static.regExtractImport;

        var idxStart = -1, idxEnd = -1;
        var result;
        while ((result = reg.exec(value)) != null) {
            var str = result[0];
            if (idxStart == -1) {
                idxStart = result.index;
            }
            idxEnd = result.index + str.length;
        }

        var oldImport = "";
        if (idxStart > -1) {
            oldImport = value.substring(idxStart, idxEnd);
        } else {
        	// Try insert import after package declaration
            var regPack = me_static.regExtractPackage;
            if ((result = regPack.exec(value)) != null) {
                var str = result[0];
                idxStart = result.index + str.length;
                idxEnd = idxStart;
                generatedImport = "\r\n\r\n" + generatedImport;
            } else {
                // Try insert import before class definition
                var regClsn = me_static.regExtractClassname;
                if ((result = regClsn.exec(value)) != null) {
                    idxStart = result.index;
                    idxEnd = idxStart;
                    generatedImport += "\r\n\r\n";
                }
            }
        }
        var valueResult = value.substring(0, idxStart) + generatedImport + value.substring(idxEnd);

        me.editor.setValue(valueResult);

	    me.editor.focus();
	    var cursorRow = me.position.row;//(Ext.isDefined(editor.cursorRow) ? editor.cursorRow : 0);
	    var cursorCol = me.position.column;//(Ext.isDefined(editor.cursorCol) ? editor.cursorCol : 0);

        if (!Ext.isEmpty(oldImport)) {
            var tab = undefined;
            tab = oldImport.match(/\r/g);
            if (Ext.isDefined(tab)) {
                cursorRow -= tab.length;
            }
            tab = generatedImport.match(/\r/g);
            if (Ext.isDefined(tab)) {
                cursorRow += tab.length;
            }
        }

	    me.editor.scrollToLine(cursorRow+1, true, false, function(){});
		me.editor.gotoLine(cursorRow+1, cursorCol, false);
		var message = "Optimize Import complete.";
		var detail = filename
		var fnPop = Workspace.common.tool.Pop.info;
		if (!Ext.isEmpty(me.listClassWithOutImport)) {
            detail += '<br><b>Without import for class:';
            detail += me.listClassWithOutImport.join(",&nbsp;");
            detail += '</b>';
    		fnPop = Workspace.common.tool.Pop.error;
		}
        fnPop(me, message, {detail: detail});
    }
    ,
    generateImport: function() {
		var me = this;
        var ret = "";

        var listImport = me.listImportUsed.sort(function(a, b){
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        });

        var rootPackage = undefined;
        Ext.Array.each(listImport, function(classname, index, importItSelf) {
            var idx = classname.indexOf(".");
            if (idx > 0 && (!Ext.isDefined(rootPackage) || (classname.indexOf(rootPackage) != 0))) {
                ret += "\r\n";
                rootPackage = classname.substring(0, idx+1);
            }
            ret += "import " + classname + ";\r\n";
        });

        return ret.trim();
    }
    ,
    removeImportUnused: function() {
		var me = this;
        return me.listImport.filter(function(classname, index, array) {
            return (me.listImportUnused.indexOf(classname) < 0);
        });
    }
    ,
    getClassWithOutImport: function() {
		var me = this;
		var me_static = Workspace.editorjava.aceeditor.command.CommandOptimizeImport;
        var ret = [];

        Ext.Array.each(me.listClass, function(strClass, index, importItSelf) {
            var find = false;
            Ext.Array.each(me.listImport, function(classname, index, importItSelf) {
                var idx = classname.lastIndexOf(".");

				var reg = me_static.regFindClass(strClass);
                if (!Ext.isEmpty(classname.match(reg))) {
                    find = true;
                }
                return !find;
            });
            if (!find) {
                ret.push(strClass);
            }
        });

        return ret;
    }
    ,
    getImportUnused: function() {
		var me = this;
        var ret = [];

        Ext.Array.each(me.listImport, function(classname, index, importItSelf) {
            var idx = classname.lastIndexOf(".");

            if ((idx <= 0) || (me.listClass.indexOf(classname.substring(idx+1)) < 0)) {
                ret.push(classname);
            }
        });

        return ret;
    }
    ,
    extractClass: function(value) {
		var me = this;
		var me_static = Workspace.editorjava.aceeditor.command.CommandOptimizeImport;
        var ret = [];

		// RegEx Classname
        var reg = me_static.regExtractClass

        var result;
        var keywords = Workspace.common.constant.ConstantJava.KEYWORDS;
        var langClasses = Workspace.common.constant.ConstantJava.LANG_CLASSES;
        while ((result = reg.exec(value)) != null) {
            var str = result[5];
            if ((ret.indexOf(str) < 0) && (keywords.indexOf(str.toLowerCase()) < 0) && (langClasses.indexOf(str) < 0)) {
                ret.push(str);
            }
        }

		return ret;
    }
    ,
    extractImport: function(value) {
		var me = this;
		var me_static = Workspace.editorjava.aceeditor.command.CommandOptimizeImport;
        var ret = [];

        // RegEx Import
        var reg = me_static.regExtractImport

        var result;
        var ret = [];
        while ((result = reg.exec(value)) != null) {
            var str = result[3];
            if (ret.indexOf(str) < 0) {
                ret.push(str);
            }
        }

		return ret;
    }
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.aceeditor.command.CommandOptimizeImport');});