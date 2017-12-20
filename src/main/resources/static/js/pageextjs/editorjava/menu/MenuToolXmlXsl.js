function create_WindowToolXmlXsl(windowEl,submitFunction) {
	Ext.QuickTips.init();                //n�cessaire pour initialiser les infobulles d�erreur
	Ext.form.Field.prototype.msgTarget = 'side';    //n�cessaire pour initialiser les infobulles d�erreur

	var wnd = new Workspace.window.ToolXmlXsl.WindowToolXmlXsl ({
		el:windowEl,
		callBackSubmit:submitFunction
	});

	return wnd;
}