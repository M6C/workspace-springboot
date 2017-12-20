Ext.define('Workspace.editorjava.function.Colorize',  {
	// REQUIRED

	statics: {
		source : [
	      	"void",
	      	"public",
	      	"protected",
	      	"private",
	      	"extends",
	      	"instanceof",
	      	"final",
	      	"import",
	      	"package",
	      	"class",
	      	"switch",
	      	"function",
	      	"if",
	      	"else",
	      	"while",
	      	"for",
	      	"try",
	      	"catch",
	      	"static",
	      	"return",
	      	"\"",
	      	"}",
	      	"{"
	    ]
	    ,
	    remplacant : [
			['<b><font color=blue>', '</font></b>'],
			['<b><font color=blue>', '</font></b>'],
			['<b><font color=blue>', '</font></b>'],
			['<b><font color=blue>', '</font></b>'],
			['<b><font color=blue>', '</font></b>'],
			['<b><font color=blue>', '</font></b>'],
			['<b><font color=blue>', '</font></b>'],
			['<b><font color=blue>', '</font></b>'],
			['<b><font color=blue>', '</font></b>'],
			['<b><font color=blue>', '</font></b>'],
			['<b><font color=blue>', '</font></b>'],
			['<b><font color=blue>', '</font></b>'],
			['<b><font color=blue>', '</font></b>'],
			['<b><font color=blue>', '</font></b>'],
			['<b><font color=blue>', '</font></b>'],
			['<b><font color=blue>', '</font></b>'],
			['<b><font color=blue>', '</font></b>'],
			['<b><font color=blue>', '</font></b>'],
			['<b><font color=blue>', '</font></b>'],
			['<b><font color=blue>', '</font></b>'],
			['<b><font color=blue>', '</font></b>'],
			['<b><font color=gray>', '</font></b>'],
			['<font color=black>', '</font>'],
			['<font color=black>', '</font>']
		]
		,
		comment : ['<font color=green>', '</font>']
		,
		stringChar : ['<font color=gray>', '</font>']
	    ,
		call : function (text) {
			  var newText = '';
			  var len = 0, pos = 0, i, j, k;
			  // Variables pour la colorization des '"'
			  var posQuot=0, nbQuot=0, lenQuot1=(6+this.stringChar[0].length), lenQuot2=6;
			  var posComM1=0, posComM2=0, lenComM1=(10+this.comment[0].length), lenComM2=10;
			  var textab = text.split('&nbsp;');
			  var inCommentM = false;
			  var inComment = false;
			  var inString = false;
			  for (i=0; i<textab.length; i++) {   // parcours du textarea
			    var texBr = textab[i].split('<br>');
			    for (j=0; j<texBr.length; j++) {   // parcours du textarea
			
			      len = texBr[j].length;
			      posQuot = 0;
			      posComM1 = posComM2 = 0;
			
			      // Colorization des '//'
			      if (!inCommentM && !inComment && !inString) {
			        var cnt = texBr[j].indexOf('&#47;&#47;');
			        if (cnt>=0) {
			          texBr[j] = texBr[j].substring(0, cnt) + this.comment[0] + texBr[j].substring(cnt);
			          inComment = true;
			        }
			        else {
			          cnt = texBr[j].indexOf('//');
			          if (cnt>=0) {
			            texBr[j] = texBr[j].substring(0, cnt) + this.comment[0] + texBr[j].substring(cnt);
			            inComment = true;
			          }
			        }
			      }
			
			      // Colorization des '/*' '*/'
			      //newText = newText.replace(/\s*&#47;&#42;/g, this.comment[0] + "&#47;&#42;");
			      //newText = newText.replace(/\s*&#42;&#47;/g, "&#42;&#47;" + this.comment[1]);
			      if (!inComment && !inString) {
			        do {
			          posComM1 = texBr[j].indexOf('&#47;&#42;', posComM1);
			          posComM2 = texBr[j].indexOf('&#42;&#47;', ((posComM1>=0)&&(posComM1<len)) ? posComM1 : 0);
			          if(posComM1>len)
			            posComM1=-1;
			          else if(posComM1>=0) {
			            if (((posComM1<1)||(texBr[j].substr((posComM1-1), 1)!='\\')) &&
			                ((posComM1<5)||(texBr[j].substr((posComM1-5), 5)!='&#92;'))) {
			              texBr[j]=texBr[j].substring(0, posComM1) + this.comment[0] + texBr[j].substring(posComM1);
			              inCommentM = true;
			            }
			            posComM1+=lenComM1;
			          }
			          if(posComM2>len)
			            posComM2=-1;
			          else if(posComM2>=0) {
			            posComM2+=lenComM2;
			            if (((posComM2<1)||(texBr[j].substr((posComM2-1-lenComM2), 1)!='\\')) &&
			                ((posComM2<5)||(texBr[j].substr((posComM2-5-lenComM2), 5)!='&#92;'))) {
			              texBr[j]=texBr[j].substring(0, posComM2) + this.comment[1] + texBr[j].substring(posComM2);
			              inCommentM = false;
			            }
			            if ((posComM1>=0)&&(posComM1<len))
			              posComM1=posComM2;
			          }
			        }
			        while(posComM1>=0);
			      }
			
			      if (!inCommentM && !inComment && !inString) {
			        // colorization des '"'
			        do {
			          posQuot = texBr[j].indexOf('&quot;', posQuot);
			          if(posQuot>=0) {
			            // Si '"' n'est pas precede par un '\'
			            if ((posQuot<5)||(texBr[j].substr(posQuot-5, 5)!='&#92;')) {
			              if (nbQuot%2==0) {
			                texBr[j]=texBr[j].substring(0, posQuot) + this.stringChar[0] + texBr[j].substring(posQuot);
			                posQuot+=lenQuot1;
			                inString = true;
			              }
			              else {
			                posQuot+=lenQuot2;
			                texBr[j]=texBr[j].substring(0, posQuot) + this.stringChar[1] + texBr[j].substring(posQuot);
			                inString = false;
			              }
			              nbQuot++;
			            }
			            else {
			              posQuot++;
			            }
			          }
			        }
			        while(posQuot>=0);
			      }
			
			      if (!inCommentM && !inComment && !inString) {
			        pos += len;
			        add = true;
			        for (k=0; k<this.source.length; k++) {   // parcours des tableaux de mots a corriger
			          if (texBr[j]==this.source[k]) {
			            newText += this.remplacant[k][0] + texBr[j] + this.remplacant[k][1];
			            add = false;
			            break;
			          }
			        }
			        if (add) {
			          newText += texBr[j];
			        }
			      }
			      else
			        newText += texBr[j];
			
			      if (j<(texBr.length-1)) {
			        if (inComment) {
			          newText += this.comment[1];
			        }
			        // colorization des '"'
			        if (inString) {
			          newText += this.stringChar[1];
			          nbQuot++;
			        }
			        newText += '<br>';
			        pos += 1;
			        inComment = false;
			        inString = false;
			      }
			    }
			    if (i<(textab.length-1)) {
			      newText += '&nbsp;';
			      pos += 1;
			    }
			  }
			
			//  alert(newText.substr(newText.indexOf('startsWith')-10, 10000));
			
			  return newText;
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.function.Colorize');});