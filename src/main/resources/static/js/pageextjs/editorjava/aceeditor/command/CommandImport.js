Ext.define('Workspace.editorjava.aceeditor.command.CommandImport',  {
	requires: [
	    'Workspace.common.constant.ConstantJava'
	]
	,
	extend: 'Workspace.editorjava.aceeditor.command.CommandOptimizeImport'
	,
	statics: {
	    addCommand: function(editor) {
	        var command = new Workspace.editorjava.aceeditor.command.CommandImport();
		    editor.commands.addCommand(command);
	    }
	}
    ,
    name: "editorImport",
    bindKey: {win: "Ctrl-I", mac: "Command-I"},
    exec: function(editor) {
	    console.info('Workspace.editorjava.aceeditor.command.CommandImport Ctrl-I');
        this.optimizeImport(editor)
    }
    ,
    extractClass: function(value) {
		var me = this;
		var editor = me.editor;
		var selection = editor.selection;

		selection.selectWordLeft();
		var classname = editor.getCopyText();

		editor.clearSelection();

        return [classname];
    }
    ,
    callbackImport: function(options, success, responseCompile) {
		var me = this;
	    // 	Workspace.common.tool.Pop.info(me, "Optimize Import complete." + responseCompile.responseText);
	    var jsonData = Ext.JSON.decode(responseCompile.responseText);
	    var multiChoiceImport = false;
	    if (Ext.isArray(jsonData.import) && !Ext.isEmpty(jsonData.import)) {
            var cnt = jsonData.import.length;
            var importList = jsonData.import;
            Ext.Array.each(importList, function(objImport, index, importItSelf) {
                // Do Replace Import on 1st Window because WindowCombo is ASYNCHRONOUS and the 1st Window will be the last showing window
                var doReplaceImport = (index == 0);

                me.choiceImport(objImport, doReplaceImport);
            });
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
            Ext.Array.remove(me.listClassWithOutImport, name);
        }
        if (me.listClassWithOutImportProcess.length == me.listClassWithOutImport.length) {
            me.replaceImport();
        }
    }
    ,
    getClassWithOutImport: function() {
		var me = this;
        return me.listClass;
    }
    ,
    getImportUnused: function() {
		var me = this;
        var ret = [];

        Ext.Array.each(me.listImport, function(classname, index, importItSelf) {
            var idx = classname.lastIndexOf(".");
            var cls = (idx <= 0) ? classname : classname.substring(idx+1);

            if (me.listClass.indexOf(cls) >= 0) {
                ret.push(classname);
            }
        });

        return ret;
    }
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.aceeditor.command.CommandImport');});