<%String DOMAIN_NAME_ROOT = "/resources";//"/Workspace";%>
<%String VIEW_ROOT = "/WEB-INF/views";%>
<html>
<head>
  <title>EditorJava</title>
    <link rel="stylesheet" type="text/css" href="/webjars/extjs/4.2.0/resources/css/ext-all-gray.css" />
    <link rel="stylesheet" type="text/css" href="<%=DOMAIN_NAME_ROOT%>/css/componentextjs/Notification.css" />
    <link rel="stylesheet" type="text/css" href="<%=DOMAIN_NAME_ROOT%>/css/componentextjs/Console.css" />
    <link rel="stylesheet" type="text/css" href="<%=DOMAIN_NAME_ROOT%>/css/componentextjs/menu/MenuHeader.css" />
    <link rel="stylesheet" type="text/css" href="<%=DOMAIN_NAME_ROOT%>/css/pageextjs/editorjava/styles.css"/>
    <link rel="stylesheet" type="text/css" href="<%=DOMAIN_NAME_ROOT%>/css/pageextjs/editorjava/styles_ace_editor.css"/>

    <script type="text/javascript" src="/webjars/extjs/4.2.0/ext-all-debug-w-comments.js"></script><%-- ext-all.js --%>

    <script type="text/javascript" src="<%=DOMAIN_NAME_ROOT%>/js/commonextjs/constant/Constant.js"></script>
    <script type="text/javascript" src="<%=DOMAIN_NAME_ROOT%>/js/commonextjs/init/InitLoader.js"></script>
    <script type="text/javascript" src="<%=DOMAIN_NAME_ROOT%>/js/pageextjs/editorjava/page.js"></script>

	<script type="text/javascript">
		Ext.BLANK_IMAGE_URL = '/webjars/extjs/4.2.0/resources/themes/images/default/tree/s.gif';
	
		function addScript(path) {
			var script = document.createElement('script');
			script.src = DOMAIN_NAME_ROOT + path;
			script.charset = 'utf-8';
			document.getElementsByTagName('head')[0].appendChild(script);
		}

		Ext.onReady(function() {
			if (typeof bravojs == 'undefined') { bravojs = {}; }
			bravojs.url = window.location.protocol + '//' + window.location.host + '<%=DOMAIN_NAME_ROOT%>/jsFramework/ace-extjs-0.1.0/extjs4-ace/Component.js';
			bravojs.mainModuleDir = /^(https?|resource):\/(.*?)\.js$/.exec(bravojs.url)[2];
			bravojs.mainContext = bravojs.mainModuleDir + '/c371cd05c8df40c0af3b1515b808c9d737b98b02';

	        init_loader();

/* 			addScript('/webjars/ace/1.2.6/src-min-noconflict/ace.js');
			// Use for 'ace/ext/language_tools' (Completion...)
			addScript('/webjars/ace/1.2.6/src-min-noconflict/ext-language_tools.js');
 */
	        addScript('/js/pageextjs/editorjava/window/WindowMenu.js');
	        addScript('/js/pageextjs/editorjava/menu/MenuAction.js');
	        addScript('/js/pageextjs/editorjava/menu/MenuServerWeb.js');
	        addScript('/js/pageextjs/editorjava/menu/MenuToolUpload.js');
	        addScript('/js/pageextjs/editorjava/menu/MenuToolUpload.js');

    		init_page();
		});
	</script>
<%--
    <script type="text/javascript" src="/webjars/ace/1.2.6/src-min-noconflict/ace.js"></script>
    <script type="text/javascript" src="/webjars/ace/1.2.6/src-min-noconflict/ext-language_tools.js"></script>
--%>
    <script type="text/javascript" src="/webjars/ace/1.2.6/src-noconflict/ace.js"></script>
    <script type="text/javascript" src="/webjars/ace/1.2.6/src-noconflict/ext-language_tools.js"></script>
</head>
<body>
	<div id="popup_log" class="x-hidden"><div id="popup_log_window"></div></div>
    <table cellspacing="0" cellpadding="0" width="100%" height="100%" id="menuTable" style='background-color:none'>
    <tr height="10%" valign="top" align="center">
        <td colspan="2" valign="top">
            <div id="reloadmenu">
                <%String ROOT = VIEW_ROOT + "/Web/ComponentExtJs/Menu/EditorJava/MenuHeader.jsp";%>
				<jsp:include page="<%=ROOT%>" flush="true"/>
            </div>
        </td>
    </tr>
    </table>
</body>
</html>