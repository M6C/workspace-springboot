<%@ taglib uri="Framework_Taglib_Request.tld" prefix="request" %>
<%@ taglib uri="Framework_Taglib_Xml.tld" prefix="xml" %>
<xml:TagXsl xml="#S$security_xml#" xsl="#S$security_xsl#">
    <xml:TagXslParameter name="myID" value="#S$BeanAuthentification:login#"/>
    <xml:TagXslParameter name="myPWD" value="#S$BeanAuthentification:password#"/>
    <xml:TagXslResultDom name="resultDom" scope="session"/>
</xml:TagXsl>
<%String DOMAIN_NAME_ROOT = "";//"/Workspace";%>
<html>
    <head>
        <title>
            Workspace - User:<request:TagPrintAttribut name="BeanAuthentification:login" scope="session"/>
        </title>
        <%--link href="<%=DOMAIN_NAME_ROOT%>/css/page/home.css" rel="stylesheet" type="text/css"--%>
        <jsp:include page="/css/page/home.jsp" />
        <script language="javascript" src="<%=DOMAIN_NAME_ROOT%>/js/page/home.js" type="text/javascript"></script>
                <script language="javascript" src="<%=DOMAIN_NAME_ROOT%>/js/Popup.js" type="text/javascript"></script>
    </head>
    <body bgcolor="#ffffff">
        <table width="100%">
            <tr>
                <td>
                    <table class="treeview" id="theTableToDo">
                        <tr>
                            <td class="treeviewTopLeft"><IMG height="8px" width="8px" src="<%=DOMAIN_NAME_ROOT%>/img/TreeView/b.gif"></td>
                            <td class="treeviewTop"></td>
                            <td class="treeviewTopRight"></td>
                        </tr>
                        <tr>
                            <td class="treeviewLeft"></td>
                            <th class="treeviewHeader"><font size="4px">Menu - ExtJs</font></th>
                            <td class="treeviewRight"></td>
                        </tr>
                        <tr>
                            <td class="treeviewLeft"></td>
                            <td class="treeviewMain">
                                <table width="100%">
                                    <tr>
                                        <td class="treeviewMain">
                                            <a href="action.servlet?event=EditorJavaPageExtJsAce">Editeur Java</a>
                                        </td>
                                        <td class="treeviewMain">
                                            <a href="action.servlet?event=AdminPageExtJs">Administration</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="treeviewMain">
                                            <a href="action.servlet?event=FileBrowserPageExtJs">Explorateur de fichier</a>
                                        </td>
                                        <td class="treeviewMain">
                                            <%--a href="action.servlet?event=VersionPage">Versioning</a--%>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="treeviewMain">
                                            <%--a href="action.servlet?event=DebuggerPageExtJs">Debugger</a--%>
                                        </td>
                                        <td class="treeviewMain">
                                            <%--a href="action.servlet?event=ImageViewerPage">Visionneur d'image</a--%>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="treeviewMain" colspan="2">
                                            <%--a href="action.servlet?event=HbnGeneratorJspTable">Hibernate&nbsp;Generator</a--%>
                                        </td>
                                        <%--
                                        <td class="treeviewMain">
                                            <a href="javascript:openPopup('action.servlet?event=Home', '', screen.width*0.90 , screen.height*0.70, null, 'status=1');window.close();">popup</a>
                                            &nbsp;
                                            <a href="javascript:openPopup('action.servlet?event=Home', '', document.body.clientWidth, document.body.clientHeight, null, 'status=1');">popup</a>
                                        </td>
                                        --%>
                                    </tr>
                                </table>
                            </td>
                            <td class="treeviewRight"></td>
                        </tr>
                        <tr>
                            <td class="treeviewBottomLeft"></td>
                            <td class="treeviewBottom"></td>
                            <td class="treeviewBottomRight"><IMG height="8px" width="8px" src="<%=DOMAIN_NAME_ROOT%>/img/TreeView/b.gif"></td>
                        </tr>
                    </table>
                </td>
            </tr>
<%--
            <tr>
                <td>
                    <table class="treeview" id="theTableToDo">
                        <tr>
                            <td class="treeviewTopLeft"><IMG height="8px" width="8px" src="<%=DOMAIN_NAME_ROOT%>/img/TreeView/b.gif"></td>
                            <td class="treeviewTop"></td>
                            <td class="treeviewTopRight"></td>
                        </tr>
                        <tr>
                            <td class="treeviewLeft"></td>
                            <th class="treeviewHeader"><font size="4px">Menu</font></th>
                            <td class="treeviewRight"></td>
                        </tr>
                        <tr>
                            <td class="treeviewLeft"></td>
                            <td class="treeviewMain">
                                <table width="100%">
                                    <tr>
                                        <td class="treeviewMain">
                                            <a href="action.servlet?event=EditorJavaPage">Editeur Java</a>
                                        </td>
                                        <td class="treeviewMain">
                                            <a href="action.servlet?event=DebuggerPage">Debugger</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="treeviewMain">
                                            <a href="action.servlet?event=FileBrowserPage">Explorateur de fichier</a>
                                        </td>
                                        <td class="treeviewMain">
                                            <a href="action.servlet?event=VersionPage">Versioning</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="treeviewMain">
                                            <a href="action.servlet?event=AdminPage">Administration</a>
                                        </td>
                                        <td class="treeviewMain">
                                            <a href="action.servlet?event=ImageViewerPage">Visionneur d'image</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="treeviewMain" colspan="2">
                                            <a href="action.servlet?event=HbnGeneratorJspTable">Hibernate&nbsp;Generator</a>
                                        </td>
                                        <!%--
                                        <td class="treeviewMain">
                                            <a href="javascript:openPopup('action.servlet?event=Home', '', screen.width*0.90 , screen.height*0.70, null, 'status=1');window.close();">popup</a>
                                            &nbsp;
                                            <a href="javascript:openPopup('action.servlet?event=Home', '', document.body.clientWidth, document.body.clientHeight, null, 'status=1');">popup</a>
                                        </td>
                                        --%!>
                                    </tr>
                                </table>
                            </td>
                            <td class="treeviewRight"></td>
                        </tr>
                        <tr>
                            <td class="treeviewBottomLeft"></td>
                            <td class="treeviewBottom"></td>
                            <td class="treeviewBottomRight"><IMG height="8px" width="8px" src="<%=DOMAIN_NAME_ROOT%>/img/TreeView/b.gif"></td>
                        </tr>
                    </table>
                </td>
            </tr>
--%>
            <tr>
                <td>
                    <xml:TagXsl xml="/Xml/Rss/Task_Todo.xml" xsl="/Xsl/Rss/News_Todo.xsl">
                        <xml:TagXslResultWrite/>
                    </xml:TagXsl>
                </td>
            </tr>
            <tr>
                <td>
                    <xml:TagXsl xml="/Xml/Rss/Task_Resolved.xml" xsl="/Xsl/Rss/News_Resolved.xsl">
                        <xml:TagXslResultWrite/>
                    </xml:TagXsl>
                </td>
            </tr>
        </table>
    </body>
</html>