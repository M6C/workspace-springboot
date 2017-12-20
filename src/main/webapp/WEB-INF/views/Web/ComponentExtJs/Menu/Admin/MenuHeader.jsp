<%String DOMAIN_NAME_ROOT = "/resources";//"/Workspace";%>
<%String VIEW_ROOT = "/WEB-INF/views";%>
<%@ taglib uri="/WEB-INF/tld/Framework_Taglib_Html.tld" prefix="html" %>
<%@ taglib uri="/WEB-INF/tld/Workspace_Taglib_Versionning.tld" prefix="versionning" %>

<script language="javascript" src="<%=DOMAIN_NAME_ROOT%>/js/Popup.js" type="text/javascript"></script>

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
					<td class="menuLevel01" onmouseover="javascript:showMenuLevel('menuLevel02', 'User')">
						User
					</td>
					<td class="menuLevel01" onmouseover="javascript:showMenuLevel('menuLevel02', 'Server')">
						Server
					</td>
					<td class="menuLevel01" onmouseover="javascript:showMenuLevel('menuLevel02', 'Database')">
						Database
					</td>
					<td class="menuLevel01" onmouseover="javascript:showMenuLevel('menuLevel02', 'FrameWork')">
						FrameWork
					</td>
					<td class="menuLevel01" onmouseover="javascript:showMenuLevel('menuLevel02', 'ScreenShoot')">
						Screen Shoot
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
				<tr class="menuLevel02" id="User">
					<td class="separatorLevel02">&nbsp;</td>
					<td class="menuLevel02">
						<%--html:TagA attrClass="menuLevel02" attrHref="javascript:openPopup('action.servlet?event=PageUser', 'AdminPageUser', 320, 120)">Show</html:TagA--%>
						<html:TagA attrClass="menuLevel02" attrHref="javascript:showUserDetail()">Show</html:TagA>
					</td>
					<td width="*">&nbsp;
					</td>
				</tr>
				<tr class="menuLevel02" id="Server">
					<td class="menuLevel02">
						<html:TagA attrClass="menuLevel02" attrHref="javascript:showExecCmd()">Execute Commande</html:TagA>
					</td>
					<td class="separatorLevel02">&nbsp;</td>
					<td class="menuLevel02">
						<html:TagA attrClass="menuLevel02" attrHref="javascript:showExecShutdown()">Shutdown</html:TagA>
					</td>
					<td class="separatorLevel02">&nbsp;</td>
					<td class="menuLevel02">
						<html:TagA attrClass="menuLevel02" attrHref="javascript:showExecReboot()">Reboot</html:TagA>
					</td>
				</tr>
				<tr class="menuLevel02" id="Database">
					<td class="separatorLevel02">&nbsp;</td>
					<td class="menuLevel02">
						<html:TagA attrClass="menuLevel02" attrHref="javascript:showDBStartup()">Startup</html:TagA>
					</td>
					<td class="separatorLevel02">&nbsp;</td>
					<td class="menuLevel02">
						<html:TagA attrClass="menuLevel02" attrHref="javascript:showDBShutdown()">Shutdown</html:TagA>
					</td>
					<td width="*">&nbsp;
					</td>
				</tr>
				<tr class="menuLevel02" id="FrameWork">
					<td class="separatorLevel02">&nbsp;</td>
					<td class="menuLevel02">
						<html:TagA attrClass="menuLevel02" attrHref="action.servlet?event=AdminFrameworkReloadExtJs">Reload</html:TagA>
					</td>
					<td width="*">&nbsp;
					</td>
				</tr>
				<tr class="menuLevel02" id="ScreenShoot">
					<td class="separatorLevel02">&nbsp;</td>
					<td class="menuLevel02">
						<html:TagA attrClass="menuLevel02" attrHref="javascript:showScreenShoot()">Screen Shoot</html:TagA>
					</td>
					<td width="*">&nbsp;
					</td>
				</tr>
				<tr class="menuLevel02" id="Tool">
					<td class="separatorLevel02">&nbsp;</td>
					<td class="menuLevel02">
						<html:TagA attrClass="menuLevel02" attrHref="action.servlet?event=Redirect">Redirect</html:TagA>
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
						<html:TagA attrClass="menuLevel02" attrHref="action.servlet?event=FileBrowserPageExtJs&application=#R$application#&pathToExpand=#R$pathToExpand#&fileName=#R$FileName#">Explorateur de fichier</html:TagA>
					</td>
					<td class="menuLevel02">
						<html:TagA attrClass="menuLevel02" attrHref="action.servlet?event=VersionPage&application=#R$application#&pathToExpand=#R$pathToExpand#&fileName=#R$FileName#">Versioning</html:TagA>
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