// DEPENDENCE
Ext.Loader.load(fileList=[
DOMAIN_NAME_ROOT + '/js/commonextjs/view/ViewPort.js',
DOMAIN_NAME_ROOT + '/js/commonextjs/plugin/AddTabPanel.js',
DOMAIN_NAME_ROOT + '/js/commonextjs/tree/TreeDirectory.js',
DOMAIN_NAME_ROOT + '/js/commonextjs/form/textarea/HtmlEditor.js',
DOMAIN_NAME_ROOT + '/js/commonextjs/form/combobox/Combo.js',
DOMAIN_NAME_ROOT + '/js/commonextjs/form/combobox/ComboProject.js',
DOMAIN_NAME_ROOT + '/js/commonextjs/form/combobox/ComboPackage.js',
DOMAIN_NAME_ROOT + '/js/commonextjs/form/textfield/TextFieldFileChose.js',
DOMAIN_NAME_ROOT + '/js/commonextjs/window/WindowWaiting.js',
DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava/form/combobox/ComboProject.js',
DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava/menu/MenuAction.js',
DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava/menu/MenuTreeAction.js',
DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava/menu/MenuCVSAction.js',
DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava/menu/MenuSVNAction.js',
DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava/tree/TreeMenuContext.js',
DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava/tree/TreePackageDetail.js',
DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava/tree/TreeDirectory.js',
DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava/window/ToolXmlXsl.js',
DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava/window/ClasspathDetail.js',
DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava/window/Completion.js',
DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava/window/Package.js',
DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava/window/package/window/WndPackage.js',
DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava/window/ToolUpload.js',
DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava/Colorize.js',
DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava/view/ViewMain.js'
],
preserveOrder=true);

function init_page() {
	Ext.QuickTips.init();

    // NOTE: This is an example showing simple state management. During development,
    // it is generally best to disable state management as dynamically-generated ids
    // can change across page loads, leading to unpredictable results.  The developer
    // should ensure that stable state ids are set for stateful components in real apps.
    Ext.state.Manager.setProvider(new Ext.state.CookieProvider());

    var viewport = new Workspace.editorjava.ViewMain({
    	renderTo: Ext.getBody()
    });

	/*
    // get a reference to the HTML element with id "hideit-east" and add a click listener to it 
    Ext.get("hideit-east").on('click', function(){
        // get a reference to the Panel that was created with id = 'west-panel' 
        var w = Ext.getCmp('east-panel');
        // expand or collapse that Panel based on its collapsed property state
        w.collapsed ? w.expand() : w.collapse();
    });
    // get a reference to the HTML element with id "hideit-west" and add a click listener to it 
    Ext.get("hideit-west").on('click', function(){
        // get a reference to the Panel that was created with id = 'west-panel' 
        var w = Ext.getCmp('west-panel');
        // expand or collapse that Panel based on its collapsed property state
        w.collapsed ? w.expand() : w.collapse();
    });

    Ext.getCmp('east-panel').collapse();
    */
}
