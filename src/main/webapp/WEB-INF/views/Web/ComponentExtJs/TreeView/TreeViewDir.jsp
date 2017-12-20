<%@ taglib uri="Framework_Taglib_Html.tld" prefix="html" %>
<%@ taglib uri="Framework_Taglib_Logic.tld" prefix="logic" %>
<%@ taglib uri="Framework_Taglib_File.tld" prefix="file" %>
<%@ taglib uri="Framework_Taglib_Request.tld" prefix="request" %>
<%@ taglib uri="Framework_Taglib_Eval.tld" prefix="eval" %>
<%@ taglib uri="Workspace_Taglib_Path.tld" prefix="path" %>
<%String DOMAIN_NAME_ROOT = "/resources";//"/Workspace";%>
<%String VIEW_ROOT = "/WEB-INF/views";%>

<table class="treeview">
    <tr>
        <td class="treeviewTopLeft"><IMG class="BorderTopLeft" src="<%=DOMAIN_NAME_ROOT%>/img/TreeView/b.gif"></td>
        <td class="treeviewTop"></td>
        <td class="treeviewTopRight"></td>
    </tr>
        <tr>
            <td class="treeviewLeft"></td>
            <th class="treeviewHeader">
              <jsp:include page="/Web/ComponentExtJs/ToolBar/ToolBarProject.jsp" flush="true"/>
            </th>
            <td class="treeviewRight"></td>
        </tr>
    <tr>
        <td class="treeviewLeft"></td>
        <td class="treeviewMain">
            <div class="treeviewScrollBar" id="treeviewDir">
                <table width="200%"><tr><td class="treeviewMain">
                <file:TagFileList path="#R$path#" pathToExpand="#R$pathToExpand#" name="#R$fileListName#" scope="#R$fileListScope#" sortMethod="getName">
                    <file:TagFileListItem name="myFile" scope="request"/>
                    <%--logic:TagIf expression='"#R$myFile.Index#".equals("0")'--%>
                    <%if (((framework.taglib.file.bean.BeanFile)request.getAttribute("myFile")).getIndex()==0) {%>
                        <request:TagDefineCount name="cnt" scope="request"/>
                    <%}%>
                    <%--/logic:TagIf--%>
                    <%--logic:TagIf expression="#R$myFile.isDirectory#"--%>
                    <%if (((framework.taglib.file.bean.BeanFile)request.getAttribute("myFile")).isDirectory()) {%>
                        &nbsp;
                        <logic:TagFor to="#R$myFile.Index#">
                            &nbsp;
                        </logic:TagFor>
                        <html:TagA attrName="anchor#R$cnt##R$myFile.Index#" attrClass="treeviewMain" attrHref="action.servlet?event=#R$eventDst#&application=#R$application<encoding=UTF-8>#&pathToExpand=#R$myFile.getPathUriRelative<encoding=ISO-8859-1>##R$paramOther#\#anchor#R$cnt##R$myFile.Index#">
                            <img src="<%=DOMAIN_NAME_ROOT%>/img/TreeView/ot1.gif" border="0" align="top"/>
                        </html:TagA>
                        <html:TagA attrName="anchor#R$cnt##R$myFile.Index#" attrClass="treeviewHeader" attrHref="javascript:onClickTvDir('eventDst=#R$eventDst#&application=#R$application<encoding=UTF-8>#&pathToExpand=#R$myFile.getPathUriRelative<encoding=ISO-8859-1>##R$paramOther#', 'anchor#R$cnt##R$myFile.Index#')">
                            <file:TagFileListItem methode="getName"/>
                        </html:TagA>
                        <br>
                    <%}%>
                    <%--/logic:TagIf--%>
                </file:TagFileList>
                </td></tr></table>
            </div>
        </td>
        <td class="treeviewRight"></td>
    </tr>
    <tr>
        <td class="treeviewBottomLeft"></td>
        <td class="treeviewBottom"></td>
        <td class="treeviewBottomRight"><IMG class="BorderBottomRight" src="<%=DOMAIN_NAME_ROOT%>/img/TreeView/b.gif"></td>
    </tr>
</table>
<%--
<script type="text/javascript">
document.getElementById("divTreeviewDir").focus();
</script>
--%>