
function create_TextFieldFileChose(textId, textLabel, textName) {
/*
	var labelFileChose = new Ext.form.Label({
		text:textLabel
	});

	var textfieldFileChose = new Ext.form.TextField({
		id:textId,
        label:labelFileChose
    });
*/
	var textfieldFileChose = new Ext.form.TextField({
		id:textId,
		fieldLabel:textLabel,
		name:textName
    });

	return textfieldFileChose;
}