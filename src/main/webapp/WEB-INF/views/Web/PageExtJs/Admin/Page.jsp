<%String DOMAIN_NAME_ROOT = "/resources";//"/Workspace";%>
<%String VIEW_ROOT = "/WEB-INF/views";%>
<html>
<head>
  <title>Administration</title>
    <link rel="stylesheet" type="text/css" href="<%=DOMAIN_NAME_ROOT%>/jsFramework/ext-4.0.7/resources/css/ext-all-gray.css" />
    <link rel="stylesheet" type="text/css" href="<%=DOMAIN_NAME_ROOT%>/css/componentextjs/menu/MenuHeader.css" />
    <link rel="stylesheet" type="text/css" href="<%=DOMAIN_NAME_ROOT%>/css/componentextjs/Console.css" />
    <link rel="stylesheet" type="text/css" href="<%=DOMAIN_NAME_ROOT%>/css/pageextjs/admin/styles.css"/>

    <script type="text/javascript" src="<%=DOMAIN_NAME_ROOT%>/jsFramework/ext-4.0.7/ext-all-debug-w-comments.js"></script>
    <script type="text/javascript" src="<%=DOMAIN_NAME_ROOT%>/js/commonextjs/constant/Constant.js"></script>
    <script type="text/javascript" src="<%=DOMAIN_NAME_ROOT%>/js/commonextjs/init/InitLoader.js"></script>
    <script type="text/javascript" src="<%=DOMAIN_NAME_ROOT%>/js/pageextjs/admin/page.js"></script>
    <script type="text/javascript" src="<%=DOMAIN_NAME_ROOT%>/js/pageextjs/admin/window/WindowMenu.js"></script>

	<script type="text/javascript">
		Ext.BLANK_IMAGE_URL = '<%=DOMAIN_NAME_ROOT%>/jsFramework/ext-4.0.7/resources/themes/images/default/tree/s.gif';
	
		Ext.onReady(function() {
			init_loader();
    		init_page();
    	});
	</script>
</head>
<body>
	<div id="popup_log" class="x-hidden"><div id="popup_log_window"></div></div>
    <table cellspacing="0" cellpadding="0" width="100%" height="100%" id="menuTable" style='background-color:none'>
    <tr height="10%" valign="top" align="center">
        <td colspan="2" valign="top">
            <div id="reloadmenu">
				<jsp:include page="/Web/ComponentExtJs/Menu/Admin/MenuHeader.jsp" flush="true"/>
            </div>
        </td>
    </tr>
    </table>
</body>
</html>