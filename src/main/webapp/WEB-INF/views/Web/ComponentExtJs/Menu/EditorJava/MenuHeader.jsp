<%@ taglib uri="/WEB-INF/tld/Framework_Taglib_Html.tld" prefix="html" %>
<%@ taglib uri="/WEB-INF/tld/Workspace_Taglib_Versionning.tld" prefix="versionning" %>

<script language="javascript">
function showMenuLevel(tableId, trId) {
    var table = document.getElementById(tableId);
    var tr = table.getElementsByTagName("tr");
    var len = tr.length;
    for(var i=0 ; i<len ; i++) {
      if (tr[i].id==trId) {
        tr[i].style.display = 'inline';
      }
      else {
        tr[i].style.display = 'none';
      }
    }
}
</script>
<table cellspacing="0" cellpadding="0" class="level">
    <tr class="level01">
        <td>
            <table class="menuLevel01" id="menuLevel01">
                <tr class="menuLevel01"><%--
                    <td class="menuLevel01" onmouseover="javascript:showMenuLevel('menuLevel02', 'File')">
                        File
                    </td>--%>
                    <td class="menuLevel01" onmouseover="javascript:showMenuLevel('menuLevel02', 'Build')">
                        Build
                    </td>
                    <td class="menuLevel01" onmouseover="javascript:showMenuLevel('menuLevel02', 'Package')">
                        Package
                    </td>
                    <td class="menuLevel01" onmouseover="javascript:showMenuLevel('menuLevel02', 'Server')">
                        Server
                    </td>
                    <td class="menuLevel01" onmouseover="javascript:showMenuLevel('menuLevel02', 'Tools')">
                        Tools
                    </td><%--
                    <td class="menuLevel01" onmouseover="javascript:showMenuLevel('menuLevel02', 'Team')">
                        Team
                    </td>--%>
                    <td class="menuLevel01" onmouseover="javascript:showMenuLevel('menuLevel02', 'Exit')">
                        <A class="menuLevel01" href="action.servlet?event=Home">Exit</A>
                    </td>
                    <td class="menuLevel01" width="*">
                      &nbsp;
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr class="level02">
        <td align="center">
            <table cellspacing="0" cellpadding="0" class="menuLevel02" id="menuLevel02"><%--
                <tr class="menuLevel02" id="File">
                    <td class="menuLevel02">
                        <html:TagA attrClass="menuLevel02" attrHref="javascript:openPopup('action.servlet?event=EditorJavaPageNew&application=#R$application#&Type=File&Path=#R$pathToExpand#', 'EditorJavaPageNew', 320, 120)">New File</html:TagA>
                    </td>
                    <td class="separatorLevel02">&nbsp;</td>
                    <td class="menuLevel02">
                        <html:TagA attrClass="menuLevel02" attrHref="javascript:openPopup('action.servlet?event=EditorJavaPageNew&application=#R$application#&Type=Dir&Path=#R$pathToExpand#', 'EditorJavaPageNew', 320, 120)">New Directory</html:TagA>
                    </td>
                    <td class="separatorLevel02">&nbsp;</td>
                    <td class="menuLevel02">
                        <html:TagA attrClass="menuLevel02" attrHref="javascript:openPopup('action.servlet?event=EditorJavaPageRename&application=#R$application#&oldName=#R$pathToExpand##R$FileName#&newName=#R$pathToExpand##R$FileName#', 'EditorJavaPageRename', 320, 120)">Rename</html:TagA>
                    </td>
                    <td class="separatorLevel02">&nbsp;</td>
                    <td class="menuLevel02">
                        <html:TagA attrClass="menuLevel02" attrHref="javascript:openPopup('action.servlet?event=EditorJavaPageCopyMove&application=#R$application#&pathSrc=#R$pathToExpand##R$FileName#&pathDst=#R$pathToExpand##R$FileName#&path=&type=file', 'EditorJavaPageCopyMove', 390, 150)">Copy/Move</html:TagA>
                    </td>
                    <td class="separatorLevel02">&nbsp;</td>
                    <td class="menuLevel02">
                        <html:TagA attrClass="menuLevel02" attrHref="javascript:openPopup('action.servlet?event=EditorJavaPageDelete&application=#R$application#&fileName=#R$pathToExpand##R$FileName#', 'EditorJavaPageDelete', 320, 120)">Delete</html:TagA>
                    </td>
                    <td width="*">&nbsp;
                    </td>
                </tr>--%>
                <tr class="menuLevel02" id="Build">
                    <td class="menuLevel02">
                        <html:TagA attrClass="menuLevel02" attrHref="javascript:cleanBuild()">Clean</html:TagA>
                    </td>
                    <td class="menuLevel02">
                        <html:TagA attrClass="menuLevel02" attrHref="javascript:build()">Project</html:TagA>
                    </td>
                    <td class="menuLevel02">
                        <html:TagA attrClass="menuLevel02" attrHref="javascript:showClasspathDetail()">Classpath</html:TagA>
                    </td>
                    <td width="*">&nbsp;
                    </td>
                </tr>
                <tr class="menuLevel02" id="Package">
                    <td class="menuLevel02">
                        <html:TagA attrClass="menuLevel02" attrHref="javascript:showCleanWar()">Clean War</html:TagA>
                    </td>
                    <td class="menuLevel02">
                      <html:TagA attrClass="menuLevel02" attrHref="javascript:showPackageJar()">Jar</html:TagA>
                    </td>
                    <td class="separatorLevel02">&nbsp;</td>
                    <td class="menuLevel02">
                      <html:TagA attrClass="menuLevel02" attrHref="javascript:showPackageWar()">War</html:TagA>
                    </td>
<%--
                    <td class="separatorLevel02">&nbsp;</td>
                    <td class="menuLevel02">
                      <html:TagA attrClass="menuLevel02" attrHref="javascript:openPopup('action.servlet?event=EditorJavaPageZip&application=#R$application#&pathSrc=#R$pathToExpand#&pathDst=&path=', 'EditorJavaPageZip', 390, 150)">Zip</html:TagA>
                    </td>
--%>
                    <td width="*">&nbsp;
                    </td>
                </tr>
                <tr class="menuLevel02" id="Server">
                    <td class="menuLevel02">
                  <html:TagA attrClass="menuLevel02" attrHref="javascript:showServerWebCommandDeploy()">Deploy</html:TagA>
                    </td>
                    <td class="separatorLevel02">&nbsp;</td>
                    <td class="menuLevel02">
                  <html:TagA attrClass="menuLevel02" attrHref="javascript:showServerWebCommandRedeploy()">Redeploy</html:TagA>
                    </td>
                    <td class="separatorLevel02">&nbsp;</td>
                    <td class="menuLevel02">
                  <html:TagA attrClass="menuLevel02" attrHref="javascript:showServerWebCommandUndeploy()">Undeploy</html:TagA>
                    </td>
                    <td class="separatorLevel02">&nbsp;</td>
                    <td class="menuLevel02">
                  <html:TagA attrClass="menuLevel02" attrHref="javascript:autoDeployProject()">Auto Deploy</html:TagA>
                    </td>
                    <td width="*">&nbsp;
                    </td>
                </tr>
                <tr class="menuLevel02" id="Tools">
                    <td class="menuLevel02">
                        <html:TagA attrClass="menuLevel02" attrHref="javascript:showToolUpload()">Upload</html:TagA>
                    </td>
                    <td class="menuLevel02">
                        <html:TagA attrClass="menuLevel02" attrHref="javascript:showToolXmlXsl()">Xml/Xsl</html:TagA>
                    </td>
                    <td class="menuLevel02">
                        <html:TagA attrClass="menuLevel02" attrHref="javascript:managerConsoleVisibility()">Show/Hide Console</html:TagA>
                    </td>
                    <%--
                    <td class="menuLevel02">
                        <html:TagA attrClass="menuLevel02" attrHref="javascript:openPopup('action.servlet?event=EditorJavaSplitFile&application=#R$application#', 'EditorJavaSplitFile', 640, 200)">Split&nbsp;File</html:TagA>
                    </td>
                    --%>
                    <td width="*">&nbsp;
                    </td>
                </tr><%--
                <tr class="menuLevel02" id="Team">
                    <td class="menuLevel02">
                        <html:TagA attrClass="menuLevel02" attrHref="javascript:openPopup('action.servlet?event=VersionAddFile&application=#R$application#&fileName=#R$pathToExpand##R$FileName#', 'VersionAddFile', 390, 400)">Add</html:TagA>
                    </td>
                    <td class="separatorLevel02">&nbsp;</td>
                    <td class="menuLevel02">
                        <html:TagA attrClass="menuLevel02" attrHref="javascript:openPopup('action.servlet?event=VersionUpdFile&application=#R$application#&fileName=#R$pathToExpand##R$FileName#', 'VersionUpdateFile', 390, 400)">Update</html:TagA>
                    </td>
                    <td class="separatorLevel02">&nbsp;</td>
                    <td class="menuLevel02">
                        <html:TagA attrClass="menuLevel02" attrHref="javascript:openPopup('action.servlet?event=VersionCommitFile&application=#R$application#&fileName=#R$pathToExpand##R$FileName#', 'VersionCommitFile', 390, 400)">Commit</html:TagA>
                    </td>
                    <td class="separatorLevel02">&nbsp;</td>
                    <td class="menuLevel02">
                        <html:TagA attrClass="menuLevel02" attrHref="javascript:openPopup('action.servlet?event=VersionIgnoreAdd&application=#R$application#&fileName=#R$pathToExpand##R$FileName#', 'VersionIgnoreAdd', 390, 200)">Ignore Add</html:TagA>
                    </td>
                    <td class="separatorLevel02">&nbsp;</td>
                    <td class="menuLevel02">
                        <html:TagA attrClass="menuLevel02" attrHref="javascript:openPopup('action.servlet?event=VersionIgnoreDel&application=#R$application#&fileName=#R$pathToExpand##R$FileName#', 'VersionIgnoreDel', 390, 200)">Ignore Remove</html:TagA>
                    </td>
                    <td class="separatorLevel02">&nbsp;</td>
                    <td class="menuLevel02">
                        <html:TagA attrClass="menuLevel02" attrHref="javascript:openPopup('action.servlet?event=VersionRemoveFile&application=#R$application#&fileName=#R$pathToExpand##R$FileName#', 'VersionRemoveFile', 390, 400)">Remove</html:TagA>
                    </td>
                    <td class="separatorLevel02">&nbsp;</td>
                    <td class="menuLevel02">
                        <html:TagA attrClass="menuLevel02" attrHref="javascript:openPopup('action.servlet?event=VersionStatusFileValider&application=#R$application#&fileName=#R$pathToExpand##R$FileName#', 'VersionStatusFileValider', 390, 200)">Status</html:TagA>
                    </td>
                    <td width="*">&nbsp;
                    </td>
                </tr>--%>
                <tr class="menuLevel02" id="Exit">
                    <td class="menuLevel02">
                        <html:TagA attrClass="menuLevel02" attrHref="action.servlet?event=DebuggerPageExtJs&application=#R$application#&pathToExpand=#R$pathToExpand#&fileName=#R$FileName#">Debugger</html:TagA>
                    </td>
                    <td class="menuLevel02">
                        <html:TagA attrClass="menuLevel02" attrHref="action.servlet?event=FileBrowserPageExtJs&application=#R$application#&pathToExpand=#R$pathToExpand#&fileName=#R$FileName#">Explorateur de fichier</html:TagA>
                    </td>
                    <td class="menuLevel02">
                        <html:TagA attrClass="menuLevel02" attrHref="action.servlet?event=VersionPage&application=#R$application#&pathToExpand=#R$pathToExpand#&fileName=#R$FileName#">Versioning</html:TagA>
                    </td>
                    <td class="menuLevel02">
                        <html:TagA attrClass="menuLevel02" attrHref="action.servlet?event=AdminPageExtJs">Administration</html:TagA>
                    </td>
                    <td class="menuLevel02">
                        <html:TagA attrClass="menuLevel02" attrHref="action.servlet?event=ImageViewerPage&application=#R$application#&pathToExpand=#R$pathToExpand#&fileName=#R$FileName#">Visionneur d'image</html:TagA>
                    </td>
                    <td width="*">&nbsp;
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>

<div id="el_wnd_menu_pkg_1" class="x-hidden">
	<div id="el_wnd_menu_pkg_jar"></div>
</div>

<div id="el_wnd_menu_pkg_2" class="x-hidden">
	<div id="el_wnd_menu_pkg_war"></div>
</div>

<div id="el_wnd_menu_srv" class="x-hidden">
	<div id="el_wnd_menu_srv_web_command_deploy"></div>
	<div id="el_wnd_menu_srv_web_command_redeploy"></div>
	<div id="el_wnd_menu_srv_web_command_undeploy"></div>
</div>

<div id="el_wnd_menu_tool" class="x-hidden">
	<div id="el_wnd_menu_tool_upload"></div>
	<div id="el_wnd_menu_tool_xml_xsl"></div>
	<div id="el_wnd_menu_build_classpath"></div>
</div>

<div id="el_wnd_hot_key" class="x-hidden">
	<!-- HtmlEditor : CTRL + SPACE -->
	<div id="el_wnd_hot_key_completion"></div>
</div>