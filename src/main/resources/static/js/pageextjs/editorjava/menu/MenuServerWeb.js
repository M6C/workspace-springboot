function create_WindowServerWebCommand(windowEl,formId,comboId,statusbarId,cmd) {
	Ext.QuickTips.init();                //n�cessaire pour initialiser les infobulles d�erreur
	Ext.form.Field.prototype.msgTarget = 'side';    //n�cessaire pour initialiser les infobulles d�erreur

	var submitText = 'Execute \''+cmd+'\'';
	var type = 'War';

	return Ext.create('Workspace.editorjava.window.WindowServerWeb', {
		el:windowEl,
		formId:formId,
		comboId:comboId,
		statusbarId:statusbarId,
		type:type,
		submitText:submitText,
		cmd:cmd
	});
}
