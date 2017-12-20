function showCleanWar() {
	// Explicit load required library (Mandatory for extending this class)
	Ext.Loader.syncRequire('Workspace.editorjava.window.package.function.OnCleanWar');

//	onSubmit = Ext.create('Workspace.editorjava.window.package.function.OnSubmit',
//   	{
//		resultMessageSuccess : 'Clean War successfull',
//		resultMessageFailure : 'Clean War failed',
//		type : 'War',
//		statusbarId : 'package_statusbar_clean_war',
//		requestUrl : DOMAIN_NAME_ROOT + '/action.servlet?event=JsonCleanWar'
//   	}).call();

	Ext.create('Workspace.editorjava.window.WindowPackage',
		{
			formId:'package_content_clean_war',
			comboId:'package_combo_clean_war',
			statusbarId:'package_statusbar_clean_war',
			type:'War',
			submitText:'Clean War',
			callBackSubmit:'Workspace.editorjava.window.package.function.OnCleanWar'
		}
	).show();
}

function showClasspathDetail() {
	Ext.create('Workspace.editorjava.window.WindowClasspath').show();
}

function showPackageJar() {
	// Explicit load required library (Mandatory for extending this class)
	Ext.Loader.syncRequire('Workspace.editorjava.window.package.function.OnSubmitJar');

	Ext.create('Workspace.editorjava.window.WindowPackage',
		{
			formId:'package_content_jar',
		    comboId:'package_combo_jar',
		    statusbarId:'package_statusbar_jar',
			type:'Jar',
			submitText:'Create Jar',
			callBackSubmit:Ext.create('Workspace.editorjava.window.package.function.OnSubmitJar')
		}
	).show();
}


function showPackageWar() {
	// Explicit load required library (Mandatory for extending this class)
	Ext.Loader.syncRequire('Workspace.editorjava.window.package.function.OnSubmitJar');

	Ext.create('Workspace.editorjava.window.WindowPackage',
		{
			formId:'package_content_war',
		    comboId:'package_combo_war',
		    statusbarId:'package_statusbar_war',
			type:'War',
			submitText:'Create War',
			callBackSubmit:Ext.create('Workspace.editorjava.window.package.function.OnSubmitJar')
		}
	).show();
}