var url = "/action.servlet?event=EditorJavaCompletion&"; // The server-side script
/*
function SymError() {
  return true;
}

window.onerror = SymError;
*/

function createAutoComplete(inputName, divName, maxSize) {
//alert("createAutoComplete");
	new AutoComplete(
		document.getElementById(inputName),
		document.getElementById(divName),
		maxSize
	);
}

function AutoCompleteDB() {
//alert("AutoCompleteDB");
	// set the initial values.
	this.bEnd = false;
	this.nCount = 0;
	this.aStr = new Object;
}

function AutoComplete(oText, oDiv, nMaxSize) {
//alert("AutoComplete");
	// initialize member variables
	this.oText = oText;
	this.oDiv = oDiv;
	this.nMaxSize = nMaxSize;

	// preprocess the texts for fast access
	this.db = new AutoCompleteDB();

	// attach handlers to the text-box
	this.oText.AutoComplete = this;
	this.oText.onkeyup = AutoComplete.prototype.onTextChange;
	this.oText.onblur = AutoComplete.prototype.onTextBlur;
	this.oText.onclick = AutoComplete.prototype.onClick;
	this.oText.onselect = AutoComplete.prototype.onSelect;
}

AutoCompleteDB.prototype.add = function(str) {
//alert("AutoCompleteDB.prototype.add:" + str);
	// increment the count value.
	this.nCount++;

	// if at the end of the string, flag this node as an end point.
	if ( str == "" )
		this.bEnd = true;
	else
	{
		// otherwise, pull the first letter off the string
		var letter = str.substring(0,1);
		var rest = str.substring(1,str.length);

		// and either create a child node for it or reuse an old one.
		if ( !this.aStr[letter] ) this.aStr[letter] = new AutoCompleteDB();
		this.aStr[letter].add(rest);
	}
}

AutoCompleteDB.prototype.getCount = function(str, bExact) {
//alert("AutoCompleteDB.prototype.getCount");
	// if end of search string, return number
	if ( str == "" )
		if ( this.bEnd && bExact && (this.nCount == 1) ) return 0;
		else return this.nCount;

	// otherwise, pull the first letter off the string
	var letter = str.substring(0,1);
	var rest = str.substring(1,str.length);

	// and look for case-insensitive matches
	var nCount = 0;
	var lLetter = letter.toLowerCase();
	if ( this.aStr[lLetter] )
		nCount += this.aStr[lLetter].getCount(rest, bExact && (letter == lLetter));

	var uLetter = letter.toUpperCase();
	if ( this.aStr[uLetter] )
		nCount += this.aStr[uLetter].getCount(rest, bExact && (letter == uLetter));

	return nCount;
}

AutoCompleteDB.prototype.getStrings = function(str1, str2, outStr) {
//alert("AutoCompleteDB.prototype.getStrings");
	if ( str1 == "" ) {
		// add matching strings to the array
		if ( this.bEnd )
			outStr.push(str2);

		// get strings for each child node
		for ( var i in this.aStr )
			this.aStr[i].getStrings(str1, str2 + i, outStr);
	}
	else {
		// pull the first letter off the string
		var letter = str1.substring(0,1);
		var rest = str1.substring(1,str1.length);

		// and get the case-insensitive matches.
		var lLetter = letter.toLowerCase();
		if ( this.aStr[lLetter] )
			this.aStr[lLetter].getStrings(rest, str2 + lLetter, outStr);

		var uLetter = letter.toUpperCase();
		if ( this.aStr[uLetter] )
			this.aStr[uLetter].getStrings(rest, str2 + uLetter, outStr);
	}
}

AutoComplete.prototype.handleHttpResponse = function() {
//alert("handleHttpResponse");
  if (this.http.readyState == 4) {
    var tmp = this.http.responseText.split(":");
    if(typeof(tmp[1]) != "undefined") {
//alert("handleHttpResponse (typeof(tmp[1]) != 'undefined')");
      var sz = "";
      var size = tmp.length;
      for(var i=0 ; i<size ; i++) {
	this.db.add(tmp[i]);
//        sz += tmp[i] + "\r\n";
      }
//      alert(sz);
    }
  }
}

AutoComplete.prototype.getHTTPObject = function() {
//alert("getHTTPObject");
  var xhr_object = null;
  if(window.XMLHttpRequest) // Firefox
    xhr_object = new XMLHttpRequest();
  else if(window.ActiveXObject) // Internet Explorer
    xhr_object = new ActiveXObject("Microsoft.XMLHTTP");
  else { // XMLHttpRequest non support� par le navigateur
    //alert("You do not support XMLHTTPRequest objet");
    return;
  }
  return xhr_object;
}

AutoComplete.prototype.onClick = function() {
  this.AutoComplete.storeCaret();
}

AutoComplete.prototype.onSelect = function() {
  this.AutoComplete.storeCaret();
}

AutoComplete.prototype.onTextBlur = function() {
//alert("AutoCompleteDB.prototype.onTextBlur");
	this.AutoComplete.onblur();
}

AutoComplete.prototype.onblur = function() {
//alert("AutoCompleteDB.prototype.onblur");
	this.oDiv.style.visibility = "hidden";
}

AutoComplete.prototype.onTextChange = function() {
//alert("AutoCompleteDB.prototype.onTextChange");
  this.AutoComplete.storeCaret();

  var oEvent = window.event;
  var iKeyCode = oEvent.keyCode;
  if (iKeyCode == 110) { // Caractere : '.'
	this.AutoComplete.onchange();
}

AutoComplete.prototype.onDivMouseDown = function() {
//alert("AutoCompleteDB.prototype.onDivMouseDown");
	this.AutoComplete.oText.value = this.innerHTML;
}

AutoComplete.prototype.onDivMouseOver = function() {
//alert("AutoCompleteDB.prototype.onDivMouseOver");
	this.className = "AutoCompleteHighlight";
}

AutoComplete.prototype.onDivMouseOut = function() {
//alert("AutoCompleteDB.prototype.onDivMouseOut");
	this.className = "AutoCompleteBackground";
}

AutoComplete.prototype.storeCaret = function() {
  if (this.oText.createTextRange) {
    this.oText.caretPos = document.selection.createRange().duplicate();
  }
}

AutoComplete.prototype.onchange = function() {
alert("AutoCompleteDB.prototype.onchange");
    if ( this.oText.isTextEdit && this.oText.caretPos ) {
      var bookmark = "~";
      var orig = this.oText.value;
      var caretPos = this.oText.caretPos;
      // Place la marque de position au niveau du curseur
      caretPos.text = bookmark;
      // Recherche la postion de la marque
      var pos = this.oText.search(bookmark);
      // Affiche dans la barre de status la postion du curseur
      window.status = "Caret is at character " + pos;
      // Re mets le texte d'origine
      this.oText.value = orig;
      // D�cr�mente le nombre de retour chario du nombre de caract�res
      for(var i=0;i<pos;i++) {
        if (orig.charAt(i)=="\n")
          pos--;
      }
      // Positionne le curseur
      setCursorPosition(this.oText, pos, pos);

      var txt = this.oText.value;
      var method   = "GET";//"POST";
      this.http = AutoComplete.prototype.getHTTPObject(); // We create the HTTP Object
      this.http.open(method, url + "caretPos" + pos + "&source=" + escape(orig), true);
      this.http.onreadystatechange = AutoComplete.prototype.handleHttpResponse;
      this.http.send(null);
      if(method == "POST")
        this.http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      // count the number of strings that match the text-box value
      var nCount = this.db.getCount(txt, true);
//alert("AutoCompleteDB.prototype.onchange nCount:"+nCount);

      // if a suitable number then show the popup-div
      if ( (this.nMaxSize == -1 ) || ((nCount < this.nMaxSize) && (nCount > 0)) ) {
              // clear the popup-div.
              while ( this.oDiv.hasChildNodes() )
                      this.oDiv.removeChild(this.oDiv.firstChild);

              // get all the matching strings from the AutoCompleteDB
              var aStr = new Array();
              this.db.getStrings(txt, "", aStr);

              // add each string to the popup-div
              var i, n = aStr.length;
              for ( i = 0; i < n; i++ ) {
                      var oDiv = document.createElement('div');
                      this.oDiv.appendChild(oDiv);
                      oDiv.innerHTML = aStr[i];
                      oDiv.onmousedown = AutoComplete.prototype.onDivMouseDown;
                      oDiv.onmouseover = AutoComplete.prototype.onDivMouseOver;
                      oDiv.onmouseout = AutoComplete.prototype.onDivMouseOut;
                      oDiv.AutoComplete = this;
              }
              this.oDiv.style.visibility = "visible";
      }
/*	else // hide the popup-div {
		this.oDiv.innerHTML = "";
		this.oDiv.style.visibility = "hidden";
	}
*/
    }
}
}
