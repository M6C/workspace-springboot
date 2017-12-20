Ext.define('Workspace.common.form.textarea.HtmlEditor', {
	// REQUIRED
	requiers: ['Workspace.editorjava.panel.center.function.AddTab']
	,
	extend: 'Ext.form.HtmlEditor'
	,
	alias: 'widget.commonHtmlEditor',
	alternateClassName: 'WorkspaceCommonHtmlEditor'
	,
	frame : true,
	initComponent : function() {
		this.callParent(arguments);;
		this.addEvents('submit');
	},
	initEditor : function() {
		this.callParent(arguments);;
		if (Ext.isIE) {
			///////////////IE///////////////////////////////
			var iframe = this.getDoc();//this.container.dom.childNodes[0].lastChild.contentWindow.document;
			iframe.attachEvent('onkeydown', this.onKeydown, this);
			iframe.attachEvent('onkeyup', this.onKeyUp, this);
			iframe.htmlEditor = this;
		} else {
			//////////////Mozilla///////////////////////////
			var iframe = this.getDoc();//this.container.dom.childNodes[0].lastChild.ownerDocument;//this.container.dom.childNodes[0].lastChild.contentDocument;
			iframe.addEventListener('keydown', this.onKeydown, this);
			iframe.addEventListener('keyup', this.onKeyUp, this);
			iframe.htmlEditor = this;
		}
	},
    enableKeyEvents: true,
	onKeydown : function(evt, cmp) {
		console.log('Workspace.common.form.textarea.HtmlEditor onKeydown');
	},
    onKeyUp : function(evt, cmp) {
		console.log('Workspace.common.form.textarea.HtmlEditor onKeyUp');
	},
    getCaretSelection : function () {
        var doc = this.getDoc(), selDocFrag;
        if (this.win.getSelection){
	        console.log('Workspace.common.form.textarea.HtmlEditor win getSelection');
	        // FF, Chrome
	        return this.win.getSelection();
        } else if (doc.getSelection){
	        console.log('Workspace.common.form.textarea.HtmlEditor doc getSelection');
	        // Safari
	        return this.win.getSelection();
        } else if (doc.selection){
        	// IE
            this.win.focus();
            console.log('Workspace.common.form.textarea.HtmlEditor doc createRange text');
            return doc.selection.createRange();
        }
    },
    getCaretPositionRange : function () {
    	var agileSelection = new Workspace.Agile.Selection(this.iframe.ownerDocument.body);
    	agileSelection.setCursor(5,6);
    	var caret = agileSelection.getCaretPosition();
    	agileSelection.setCaretPosition(5, 2);

    	var sel = getCaretSelection();

        var bookmark = '~';
    	this.syncValue();
		var txtOrigine=this.getEditorBody().innerHTML;
	    var pos = 0;
		try {
	        var text = bookmark;
	        this.win.focus();
            this.execCmd('InsertHTML', text);

            this.syncValue();

			var txt=this.getRawValue();
	        pos = txt.search(bookmark);
	        return {startOffset:pos, endOffset:pos};
		} finally {
		}
    }
    ,
    insertAtCursor : function(text){
        if(!this.activated){
            return;
        }
        if(Ext.isIE){
            this.win.focus();
            var doc = this.getDoc(),
                r = doc.selection.createRange();
            if(r){
                r.pasteHTML(text);
                this.syncValue();
            }
        }else{
            this.win.focus();
            this.execCmd('InsertHTML', text);
        }
    }

}, function() {Workspace.tool.Log.defined('Workspace.common.form.textarea.HtmlEditor defined!');})