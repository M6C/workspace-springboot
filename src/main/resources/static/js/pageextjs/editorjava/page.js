function init_page() {

	Ext.Loader.setPath('Workspace.editorjava', DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava');

	Ext.Loader.setConfig({enabled: true, origine:DOMAIN_NAME_ROOT});
	Ext.Loader.setPath('Ext.ux', DOMAIN_NAME_ROOT + '/jsFramework/ext-4.0.7/examples/ux');
	Ext.Loader.setPath('Ext.ux.window.Notification', DOMAIN_NAME_ROOT + '/jsFramework/Notification/Notification.js');

	Ext.require([
	    'Ext.data.*',
	    'Ext.grid.*',
	    'Ext.util.*',
	    'Ext.ux.ProgressBarPager'
	]);

    var viewport = Ext.create('Workspace.editorjava.view.ViewMain', {
    	renderTo: Ext.getBody(),
    	id: 'mainView'
    });

    Ext.QuickTips.init();
}