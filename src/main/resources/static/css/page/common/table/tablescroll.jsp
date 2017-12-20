<style type="text/css">
div.TraceOut{
  text-align: left;                      /* - texte cadre � gauche           */
  border-left: buttonface 1px solid;     /* - bordure � gauche               */
  border-right: buttonface 1px solid;    /* - bordure � droite               */
  border-bottom: buttonface 1px solid;   /* - bordure au fond                */
  overflow-y: auto;                      /* - avec un ascenceur vertical     */
  overflow-x: auto;                      /* - avec un ascenceur horizontal   */
  width:250px;*/
  /*height:150px;*/
}

@import url ("../../style/page.css");
table.global {
	width:100%;
	height:100%;
	border-collapse:collapse;
	border-spacing:0px 0px 0px 0px;
	border: 0px 0px 0px 0px;
	padding:0px 0px 0px 0px;
}

td.global {
	width:100%;
	height:100%;
	text-align:center;
	vertical-align:middle;
}

table.message {
	border:2px;
	/*background-color:white;*/
	width:90%;
	height:90%;
	border-collapse:collapse;
	border-spacing:0px 0px 0px 0px;
	border: 0px 0px 0px 0px;
	padding:0px 0px 0px 0px;
	filter:alpha(opacity=85);
	-moz-opacity:0.85;
	opacity: 0.85;
}

td.title {
	font-family: Verdana, Arial, Helvetica, sans-serif;
	font-size: 12px;
	height:5%;
	width:100%;
	text-align:center;
	background-color:#EEEE77;
	/*background-color:#DDDDDD;*/
}

td.message {
/*	height:95%;*/
/*	width:100%;*/
	font-family: Verdana, Arial, Helvetica, sans-serif;
	font-size: 12px;
	vertical-align:top;
}
#messageTable {
	height:200px;
	/*width:100%;*/
	table-layout:fixed;
	border-collapse:collapse;
}

#messageScroll {
/*	background-color:white;*/
	overflow:auto;
	clip:auto;
	border:1px solid black;
	border-collapse:collapse;
	width:100%;
	height:200px;
}

#messageCell {
	BACKGROUND-COLOR: white;
	border: 0px solid black;
	border-collapse:collapse;
	font-size:smaller;
	vertical-align:top;
	height:100%;
	padding:0px 0px 0px 0px;
	filter:alpha(opacity=85);
	-moz-opacity:0.85;
	opacity: 0.85;
}
</style>