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
				<tr class="menuLevel01">
					<td class="menuLevel01" onmouseover="javascript:showMenuLevel('menuLevel02', 'File')">
						File
					</td>
					<td class="menuLevel01" onmouseover="javascript:showMenuLevel('menuLevel02', 'Build')">
						Build
					</td>
					<td class="menuLevel01" onmouseover="javascript:showMenuLevel('menuLevel02', 'Tool')">
						Tool
					</td>
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
			<table cellspacing="0" cellpadding="0" class="menuLevel02" id="menuLevel02">
				<tr class="menuLevel02" id="File">
<%--
					<td class="menuLevel02">
						<html:TagA attrClass="menuLevel02" attrHref="javascript:openPopup('action.servlet?event=EditorJavaPageNew&application=#R$application#&Type=File&Path=#R$pathToExpand#', 'EditorJavaPageNew', 320, 120)">New File</html:TagA>
					</td>
					<td class="separatorLevel02">&nbsp;</td>
					<td class="menuLevel02">
						<html:TagA attrClass="menuLevel02" attrHref="javascript:openPopup('action.servlet?event=EditorJavaPageNew&application=#R$application#&Type=Dir&Path=#R$pathToExpand#', 'EditorJavaPageNew', 320, 120)">New Directory</html:TagA>
					</td>
					<td class="separatorLevel02">&nbsp;</td>
					<td class="menuLevel02">
						<html:TagA attrClass="menuLevel02" attrHref="javascript:openPopup('action.servlet?event=EditorJavaPageCopyMove&application=#R$application#&pathSrc=#R$pathToExpand#&pathDst=#R$pathToExpand#&path=', 'EditorJavaPageCopyMove', 390, 150)">Copy/Move</html:TagA>
					</td>
					<td class="separatorLevel02">&nbsp;</td>
					<td class="menuLevel02">
						<html:TagA attrClass="menuLevel02" attrHref="javascript:openPopup('action.servlet?event=EditorJavaPageRename&application=#R$application#&oldName=#R$pathToExpand#&newName=#R$pathToExpand#', 'EditorJavaPageRename', 320, 120)">Rename</html:TagA>
					</td>
					<td class="separatorLevel02">&nbsp;</td>
--%>
					<td class="menuLevel02">
						<html:TagA attrClass="menuLevel02" attrHref="javascript:(function(){Ext.create('Workspace.filebrowser.menu.MenuFile').deleteFile();}())">Delete</html:TagA>
					</td>
					<td width="*">&nbsp;
					</td>
				</tr>
				<tr class="menuLevel02" id="Build">
					<td class="menuLevel02">
						<html:TagA attrClass="menuLevel02" attrHref="javascript:(function(){Ext.create('Workspace.filebrowser.menu.MenuFile').archive('Jar');}())">Jar</html:TagA>
					</td>
					<td class="separatorLevel02">&nbsp;</td>
					<td class="menuLevel02">
						<html:TagA attrClass="menuLevel02" attrHref="javascript:(function(){Ext.create('Workspace.filebrowser.menu.MenuFile').archive('Zip');}())">Zip</html:TagA>
					</td>
					<td width="*">&nbsp;
					</td>
				</tr>
				<tr class="menuLevel02" id="Tool">
					<td class="menuLevel02">
						<html:TagA attrClass="menuLevel02" attrHref="javascript:(function(){Ext.create('Workspace.filebrowser.menu.MenuTool').upload();}())">Upload</html:TagA>
					</td>
					<td width="*">&nbsp;
					</td>
				</tr>
				<tr class="menuLevel02" id="Exit">
					<td class="menuLevel02">
						<html:TagA attrClass="menuLevel02" attrHref="action.servlet?event=EditorJavaPageExtJsAce&application=#R$application#&pathToExpand=#R$pathToExpand#&fileName=#R$FileName#">Editeur Java</html:TagA>
					</td>
					<td class="menuLevel02">
                        <html:TagA attrClass="menuLevel02" attrHref="action.servlet?event=DebuggerPageExtJs&application=#R$application#&pathToExpand=#R$pathToExpand#&fileName=#R$FileName#">Debugger</html:TagA>
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
