<%@ taglib uri="Framework_Taglib_Html.tld" prefix="html" %>
<%@ taglib uri="Framework_Taglib_File.tld" prefix="file" %>
<%@ taglib uri="Framework_Taglib_Logic.tld" prefix="logic" %>
<%@ taglib uri="Framework_Taglib_Eval.tld" prefix="eval" %>
<%@ taglib uri="Framework_Taglib_Request.tld" prefix="request" %>
<%@ taglib uri="Workspace_Taglib_Versionning.tld" prefix="versionning" %>

<%String DOMAIN_NAME_ROOT = "/resources";//"/Workspace";%>
<%String VIEW_ROOT = "/WEB-INF/views";%>
<html>
<head>
  <title>Complex Layout</title>
    <link rel="stylesheet" type="text/css" href="/webjars/extjs/3.4.0/resources/css/ext-all.css" />
    <link rel="stylesheet" type="text/css" href="/webjars/extjs/3.4.0/resources/css/xtheme-gray.css" />
    
    <link rel="stylesheet" type="text/css" href="<%=DOMAIN_NAME_ROOT%>/css/componentextjs/menu/MenuHeader.css" />
    <link rel="stylesheet" type="text/css" href="<%=DOMAIN_NAME_ROOT%>/css/pageextjs/debugger/styles.css"/>

    <!-- GC -->
    <!-- LIBS -->
    <script type="text/javascript" src="/webjars/extjs/3.4.0/adapter/ext/ext-base.js"></script>
    <!-- ENDLIBS -->

    <%--script type="text/javascript" src="/webjars/extjs/3.4.0/ext-all.js"></script--%>
    <script type="text/javascript" src="/webjars/extjs/3.4.0/ext-all-debug.js"></script>

    <!--script type="text/javascript" src="<%=DOMAIN_NAME_ROOT%>/js/pageextjs/editorjava/ComboProjet.js"></script-->
    <!--script type="text/javascript" src="<%=DOMAIN_NAME_ROOT%>/js/pageextjs/editorjava/TreeDirectory.js"></script-->

	<!-- ExtJs Librairies (Use for : Window)  -->
    <script type="text/javascript" src="/webjars/extjs/3.4.0/src/util/MixedCollection.js"></script>
    <script type="text/javascript" src="/webjars/extjs/3.4.0/examples/ux/statusbar/StatusBar.js"></script>
	<script type="text/javascript" src="/webjars/extjs/3.4.0/examples/ux/statusbar/ValidationStatus.js"></script>
	<script type="text/javascript" src="/webjars/extjs/3.4.0/examples/ux/fileuploadfield/FileUploadField.js"></script>

    <script type="text/javascript" src="<%=DOMAIN_NAME_ROOT%>/js/commonextjs/constant/Constant.js"></script>
	<script type="text/javascript" src="<%=DOMAIN_NAME_ROOT%>/js/commonextjs/view/ViewPort.js"></script>
	<script type="text/javascript" src="<%=DOMAIN_NAME_ROOT%>/js/commonextjs/form/textarea/HtmlEditor.js"></script>
	<script type="text/javascript" src="<%=DOMAIN_NAME_ROOT%>/js/commonextjs/window/WndWaiting.js"></script>
	<script type="text/javascript" src="<%=DOMAIN_NAME_ROOT%>/js/commonextjs/form/combobox/Combo.js"></script>
	<script type="text/javascript" src="<%=DOMAIN_NAME_ROOT%>/js/commonextjs/form/combobox/ComboProject.js"></script>
	<script type="text/javascript" src="<%=DOMAIN_NAME_ROOT%>/js/commonextjs/tree/TreeDirectory.js"></script>
	<script type="text/javascript" src="<%=DOMAIN_NAME_ROOT%>/js/commonextjs/plugin/AddTabPanel.js"></script>

	<script type="text/javascript" src="<%=DOMAIN_NAME_ROOT%>/js/pageextjs/debugger/form/combobox/ComboProject.js"></script>
	<script type="text/javascript" src="<%=DOMAIN_NAME_ROOT%>/js/pageextjs/debugger/tree/TreeDirectory.js"></script>
	<script type="text/javascript" src="<%=DOMAIN_NAME_ROOT%>/js/pageextjs/debugger/menu/MenuAction.js"></script>
	<script type="text/javascript" src="<%=DOMAIN_NAME_ROOT%>/js/pageextjs/debugger/menu/MenuTreeAction.js"></script>
	<script type="text/javascript" src="<%=DOMAIN_NAME_ROOT%>/js/pageextjs/debugger/breakpoint/set.js"></script>
	<script type="text/javascript" src="<%=DOMAIN_NAME_ROOT%>/js/pageextjs/editorjava/Colorize.js"></script>

    <script type="text/javascript" src="<%=DOMAIN_NAME_ROOT%>/js/pageextjs/debugger/view/ViewMain.js"></script>

    <script type="text/javascript" src="<%=DOMAIN_NAME_ROOT%>/js/pageextjs/debugger/page.js"></script>

	<script type="text/javascript">
		Ext.BLANK_IMAGE_URL = '/webjars/extjs/3.4.0/resources/images/default/s.gif';
	
		Ext.onReady(function() {
    		init_page();
    	});
	</script>
</head>
<body>
	<div id="popup_log" class="x-hidden">
		<div id="popup_log_window"></div>
	</div>
        <table cellspacing="0" cellpadding="0" width="100%" height="100%" id="menuTable" style='background-color:none'>
        <tr height="10%" valign="top" align="center">
            <td colspan="2" valign="top">
                <div id="reloadmenu">
					<jsp:include page="/Web/ComponentExtJs/Menu/Debugger/MenuHeader.jsp" flush="true"/>
                </div>
            </td>
        </tr>
        </table>
</body>
</html>