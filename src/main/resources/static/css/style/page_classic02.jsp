<%String DOMAIN_NAME_ROOT = "/resources";//"/Workspace";%>
<link rel="stylesheet" type="text/css" href="<%=DOMAIN_NAME_ROOT%>/css/toolbar/ToolBar_Classic02.css"/>
<link rel="stylesheet" type="text/css" href="<%=DOMAIN_NAME_ROOT%>/css/component/menu/MenuHeader_Classic02.css"/>
<link rel="stylesheet" type="text/css" href="<%=DOMAIN_NAME_ROOT%>/css/component/treeview/TreeView_Classic02.css"/>
<link rel="stylesheet" type="text/css" href="<%=DOMAIN_NAME_ROOT%>/css/component/treeview/TreeViewFile_Classic02.css"/>
<link rel="stylesheet" type="text/css" href="<%=DOMAIN_NAME_ROOT%>/css/component/treeview/TreeViewImage_Classic02.css"/>
<link rel="stylesheet" type="text/css" href="<%=DOMAIN_NAME_ROOT%>/css/component/combo/Completion_Classic02.css"/>
<link rel="stylesheet" type="text/css" href="<%=DOMAIN_NAME_ROOT%>/css/component/navbar/NavBar_Classic02.css"/>

<style type="text/css">
body {
    background-image: url(<%=DOMAIN_NAME_ROOT%>/img/Style/Informatique/Background/background_whoppix_01.jpg);
/*    background-color: #FFFFEE;*/
/*
    background-attachment:fixed;
    scrollbar-face-color: white;
    scrollbar-highlight-color: #84B2C6;
    scrollbar-3dlight-color: white;
    scrollbar-darkshadow-color: white;
    scrollbar-shadow-color: #84B2C6;
    scrollbar-arrow-color: #84B2C6;
    scrollbar-track-color: #E8F8FF;
*/
  scrollbar-3dlight-color: #9999AA;
  scrollbar-arrow-color: #555577;
  scrollbar-darkshadow-color: #AAAAAA;
  scrollbar-face-color: #FEFEDC;
  scrollbar-highlight-color: #666677;/*#222233;*/
  scrollbar-shadow-color: #555555;
  scrollbar-track-color: #EEEEEE;
  margin:0px; padding:0px;
  height: 100%;
    width: 100%;
    overflow: auto;
}
iframe {
    background-attachment:fixed;
    scrollbar-face-color: white;
    scrollbar-highlight-color: #84B2C6;
    scrollbar-3dlight-color: white;
    scrollbar-darkshadow-color: white;
    scrollbar-shadow-color: #84B2C6;
    scrollbar-arrow-color: #84B2C6;
    scrollbar-track-color: #E8F8FF;
}

iframe.texteditor {
    height:100%;
    width:95%;
/*
    font-family:sans-serif;
    font-size:10px;
    font-weight:bold;
*/
/*
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size:10px;
  font-weight:normal;
*/
    overflow-y:scroll;
/*    padding:2px;*/
    border: 0px solid #555577;
/*    border-right:1px solid #555577;*/
/*    border-top:1px solid #555577;*/
/*    border-left:0px;*/
/*    border-bottom:1px solid #555577;*/
    float:left;
}

/*                 TextEditor                      */
textarea.TextEditor {
    overflow-x:auto;
    overflow-y:auto;
/*    background-color: white;*/
    border: 1px solid #84B2C6;
}
textarea {
    border: 1px solid #84B2C6;
}

textarea.numberline {
    height:100%;
    width:5%;
    overflow-x:hidden;
    overflow-y:hidden;
    padding:2px;
    border: 0px solid #555577;
    background-color:#EEEEEE;
    color:#888888;
    float:left;
    font-family: Verdana, Arial, Helvetica, sans-serif;
/*    font-size:10px;*/
    font-size:12px;
    font-weight:normal;
}

/*                   Input                         */
input {
    font-family: Verdana, Arial, Helvetica, sans-serif;
    font-size: 10px;
    color:#505050;
    background-color:#f6ffc6;
    border-color:#84B2C6;
    border-style: solid;
    border-top-width: 1px;
    border-right-width: 1px;
    border-bottom-width: 1px;
    border-left-width: 1px;
}
/*                   Select                        */
select {
    font-family: Verdana, Arial, Helvetica, sans-serif;
/*    font-size: 8px;*/
    font-size: smaller;
    color:#505050;
    background-color:#f6ffc6;
    border-color:#84B2C6;
    border: #E8F8FF;
    border-style: solid;
    border-top-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 0px;
    border-left-width: 0px;
    top:-4px;
    left:-3px;
}

/*                     Img                         */
img {
    border-top-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 0px;
    border-left-width: 0px;
}

/*                    Font                        */
font.normal {
    color: black;
    font-size: 75%;
    font-style: bold;
}

font.inverse {
    color: white;
    font-size: 75%;
    font-style: bold;
}

font.input_title_inverse {
    color: white;
    font: italic small-caps 900 10px arial;
}

font.input_title {
    color: black;
    font: italic small-caps 900 10px arial;
}


/*-- Transparency --*/
td.treeviewMain {
    filter:alpha(opacity=85);
    -moz-opacity:0.85;
    opacity: 0.85;
}
td.treeviewFile {
    filter:alpha(opacity=85);
    -moz-opacity:0.85;
    opacity: 0.85;
}
input {
    filter:alpha(opacity=85);
    -moz-opacity:0.85;
    opacity: 0.85;
}
textarea.TreeView_Content_ScrollBar {
    filter:alpha(opacity=85);
    -moz-opacity:0.85;
    opacity: 0.85;
}
table.main {
    filter:alpha(opacity=85);
    -moz-opacity:0.85;
    opacity: 0.85;
}
table.main_tab {
    filter:alpha(opacity=85);
    -moz-opacity:0.85;
    opacity: 0.85;
}
table.menu {
    filter:alpha(opacity=85);
    -moz-opacity:0.85;
    opacity: 0.85;
}
#theTableToDo {
}
#theTableResolved {
}
#theCellToDo {
    filter:alpha(opacity=85);
    -moz-opacity:0.85;
    opacity: 0.85;
}
#theCellResolved {
    filter:alpha(opacity=85);
    -moz-opacity:0.85;
    opacity: 0.85;
}
</style>