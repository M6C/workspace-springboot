function init_page() {

	Ext.Loader.setPath('Workspace.filebrowser', DOMAIN_NAME_ROOT + '/js/pageextjs/filebrowser');
	Ext.Loader.setPath('Workspace.editorjava', DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava');

	Ext.Loader.setPath('Ext.ux', DOMAIN_NAME_ROOT + '/jsFramework/ext-4.0.7/examples/ux');
	Ext.Loader.setPath('Ext.ux.window.Notification', DOMAIN_NAME_ROOT + '/jsFramework/Notification/Notification.js');

// DEPENDENCE
//	Ext.require('Workspace.filebrowser.view.ViewMain');
//	Ext.syncRequire('Workspace.filebrowser.view.ViewMain');

//	Ext.QuickTips.init();

    var viewport = Ext.create('Workspace.filebrowser.view.ViewMain', {
    	renderTo: Ext.getBody(),
    	id: 'mainView'
    });
}
