function refresh() {
	window.document.GoFileBrowser.submit();
}

function openWindow(url) {
  popupWin = window.open(url, 'zoom', 'scrollbars,resizable,dependent,width=840,height=650,top=1,left=1')
}

function onClickTvDir(param) {
	reloadDir(DOMAIN_NAME_ROOT+'/Web/Component/TreeView/TreeViewDir_Border01.jsp', param);
	reloadFile(DOMAIN_NAME_ROOT+'/Web/Component/TreeView/TreeViewImage_Border02.jsp', param);
	reloadMenu(DOMAIN_NAME_ROOT+'/Web/Component/Menu/ImageViewer/MenuHeader.jsp', param);
}

function onClickTvFile(param) {
	reloadFile(DOMAIN_NAME_ROOT+'/Web/Component/TreeView/TreeViewImage_Border02.jsp', param);
}
