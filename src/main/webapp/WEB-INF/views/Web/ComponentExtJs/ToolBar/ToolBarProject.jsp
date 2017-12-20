<%@ taglib uri="Framework_Taglib_Html.tld" prefix="html" %>
<%@ taglib uri="Framework_Taglib_Logic.tld" prefix="logic" %>
<%@ taglib uri="Framework_Taglib_File.tld" prefix="file" %>
<%@ taglib uri="Framework_Taglib_Request.tld" prefix="request" %>
<%@ taglib uri="Framework_Taglib_Eval.tld" prefix="eval" %>
<%@ taglib uri="Workspace_Taglib_Path.tld" prefix="path" %>

<logic:TagIfNotDefine name="path" scope="request" checkNotEmpty="true">
	<logic:TagIfDefine name="application" scope="request" checkNotEmpty="true">
  	  <request:TagDefineAttribute expression="[#R$application#]" name="path" scope="request"/>
  	  <path:TagPathFormat name="path" scope="request" application="#R$application#" toURI="true"/>
	</logic:TagIfDefine>
</logic:TagIfNotDefine>
    <table width=100%>
        <tr>
            <td width="5%" align="center">
              <html:TagA attrClass="treeviewHeader" attrHref="action.servlet?event=#R$eventDst#&application=#R$application<encoding=UTF-8>#">
                 <img width="15px" height="14px" src="<%=DOMAIN_NAME_ROOT%>/img/Common/home_small.gif"/>
              </html:TagA>
            </td>
            <td width="90%" align="center">
              <jsp:include page="/Web/ComponentExtJs/ComboBox/ComboBoxProjetXml.jsp" flush="true"/>
            </td>
            <td width="5%" align="center">
              <html:TagA attrHref="javascript:openPopup('action.servlet?event=EditorJavaPageSelectDir&formNameToSubmit=#R$formNameToSubmit#&formName=#R$formName#&fieldName=pathToExpand&fieldNameApplication=application&application=#R$application#&pathToExpand=#R$pathToExpand#', 'EditorJavaPageSelectDir', 340, 350)">
                 <img src="<%=DOMAIN_NAME_ROOT%>/img/Style/Classic/Header/Header_01_down.gif" height="14px">
              </html:TagA>
            </td>
        </tr>
</table>
