// NAMESPACE
Ext.ns('Workspace.common.form.textarea');

Workspace.common.form.textarea.HtmlEditor = Ext.extend(Ext.form.HtmlEditor, {
	frame : true,
	initComponent : function() {
		Workspace.common.form.textarea.HtmlEditor.superclass.initComponent.call(this);
		this.addEvents('submit');
	},
	initEditor : function() {
		Workspace.common.form.textarea.HtmlEditor.superclass.initEditor.call(this);
		if (Ext.isIE) {
			///////////////IE///////////////////////////////
			var iframe = this.container.dom.childNodes[0].lastChild.contentWindow.document;
			iframe.attachEvent('onkeydown', this.onKeydown, this);
			iframe.attachEvent('onkeyup', this.onKeyUp, this);
			iframe.htmlEditor = this;
		} else {
			//////////////Mozilla///////////////////////////
			var iframe = this.container.dom.childNodes[0].lastChild.contentDocument;
			iframe.addEventListener('keydown', this.onKeydown, this);
			iframe.addEventListener('keyup', this.onKeyUp, this);
			iframe.htmlEditor = this;
		}
	},
    enableKeyEvents: true,
	onKeydown : function(evt, cmp) {
	},
    onKeyUp : function(evt, cmp) {
	},
    getCaretSelection : function () {
        var doc = this.getDoc(), selDocFrag;
        if (this.win.getSelection){
	        console.log('win getSelection');
	        // FF, Chrome
	        return this.win.getSelection();
        } else if (doc.getSelection){
	        console.log('doc getSelection');
	        // Safari
	        return this.win.getSelection();
        } else if (doc.selection){
        	// IE
            this.win.focus();
            console.log('doc createRange text');
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
});
