<jsp:include page="/css/style/page.jsp" flush="true"/>

<style type="text/css">
body {
	scrollbar-arrow-color: #FF0000;
}
/*
body {
	scrollbar-face-color: #CCCCCC
	scrollbar-highlight-color: buttonface;
	scrollbar-3dlight-color: #000000;
	scrollbar-darkshadow-color: buttonface;
	scrollbar-shadow-color: #000000;
	scrollbar-arrow-color: #000000;
	scrollbar-track-color: buttonface;	
}
*/
#theTableToDo {
	height:60px;
	width:100%;
	table-layout:fixed;
}
#theTableResolved {
	height:60px;
	width:100%;
	table-layout:fixed;
}
#theCellToDo {
	background-color:white;
	overflow:auto;
	clip:auto;
	border:1px solid black;
	width:100%;
	height:60px;
}
#theCellResolved {
	background-color:white;
	overflow:auto;
	clip:auto;
	border:1px solid black;
	width:100%;
	height:60px;
}
</style>