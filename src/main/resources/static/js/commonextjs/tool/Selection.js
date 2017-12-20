// NAMESPACE
Ext.ns('Workspace.common.tool');

Workspace.common.tool.Selection = function(input){
    
    this.input = input;
    if (!this.input.nodeName)
    {
        this.isTA = false;
    }
    else
    {    
        this.isTA = this.input.nodeName.toLowerCase() == "textarea";
    }

};
with({o: Workspace.common.tool.Selection.prototype}){
    o.setCaret = function(start, end){
        var o = this.input;
        if(Workspace.common.tool.Selection.isStandard)
            o.setSelectionRange(start, end);
        else if(Workspace.common.tool.Selection.isSupported){
            var t = this.input.createTextRange();
            end -= start + o.value.slice(start + 1, end).split("\n").length - 1;
            start -= o.value.slice(0, start).split("\n").length - 1;
            t.move("character", start), t.moveEnd("character", end), t.select();
        }
    };
    o.getCaret = function(){
        var o = this.input;
        /*if(Workspace.common.tool.Selection.isStandard)
            return {start: o.selectionStart, end: o.selectionEnd};
        else*/ if(Workspace.common.tool.Selection.isSupported){
            var s = (this.input.focus(), document.selection.createRange()), r, start, end, value;
            if(s.parentElement() != o)
                return {start: 0, end: 0};
            if(this.isTA ? (r = s.duplicate()).moveToElementText(o) : r = o.createTextRange(), !this.isTA)
                return r.setEndPoint("EndToStart", s), {start: r.text.length, end: r.text.length + s.text.length};
            for(var $ = "[###]"; (value = o.value).indexOf($) + 1; $ += $);
            r.setEndPoint("StartToEnd", s), r.text = $ + r.text, end = o.value.indexOf($);
            s.text = $, start = o.value.indexOf($);
            if(document.execCommand && document.queryCommandSupported("Undo"))
                for(r in {0:0, 0:0})
                    document.execCommand("Undo");
            return o.value = value, this.setCaret(start, end), {start: start, end: end};
        }
        return {start: 0, end: 0};
    };
    o.getCaretPosition = function(){
        var c = this.getCaret(),o=this.input;
        if(c){
              var lines = (o.value) ? o.value.split("\n") : o.innerText.split("\n");
              c.lines = lines.length;
              var p=c.start,ll=c.lines,len=0,line=0;
              for(;line<ll;line++) {
                len = lines[line].length + 1;
                if(p<len)break;
                p -= len;
         }
         line++;

         c.line=line;
         c.column = p;
         c.position = c.start;

        }
        return c;
    };
    o.setCaretPosition = function(start,theEnd) {
        this.setCaret(start,theEnd || start);
    };
    o.getText = function(){
        var o = this.getCaret();
        return this.input.value.slice(o.start, o.end);
    };
    o.setText = function(text){
        var o = this.getCaret(), i = this.input, s = i.value;
        i.value = s.slice(0, o.start) + text + s.slice(o.end);
        this.setCaret(o.start += text.length, o.start);
    };
    new function(){
        var d = document, o = d.createElement("input"), s = Workspace.common.tool.Selection;
        s.isStandard = "selectionStart" in o;
        s.isSupported = s.isStandard || (o = d.selection) && !!o.createRange;
    };
} 

