function init_loader() {

	console.info('common.ini.init_loader START');

	Ext.Loader.setConfig({enabled:true});
	console.info('common.ini.init_loader Ext.Loader Config enabled');

	Ext.Date.patterns = {
		    ISO8601Long:"Y-m-d H:i:s",
		    ISO8601Short:"Y-m-d",
		    ShortDate: "n/j/Y",
		    LongDate: "l, F d, Y",
		    FullDateTime: "l, F d, Y g:i:s A",
		    MonthDay: "F d",
		    ShortTime: "g:i A",
		    LongTime: "g:i:s A",
		    SortableDateTime: "Y-m-d\\TH:i:s",
		    UniversalSortableDateTime: "Y-m-d H:i:sO",
		    YearMonth: "F, Y"
		};

	// Session state initialization
	Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
	console.info('State Manager \'CookieProvider\' setted');

	Ext.Loader.setPath('Ext', DOMAIN_NAME_ROOT + '/jsFramework/ext-4.0.7');
	console.info('common.ini.init_loader Ext.Loader \'Ext\' setted');
	Ext.Loader.setPath('Ext.ux', DOMAIN_NAME_ROOT + '/jsFramework/ext-4.0.7/examples/ux');
	console.info('common.ini.init_loader Ext.Loader \'Ext.ux\' setted');
	Ext.Loader.setPath('Workspace.common', DOMAIN_NAME_ROOT + '/js/commonextjs');
	console.info('common.ini.init_loader Ext.Loader \'Workspace.common\' setted');
	Ext.Loader.setPath('Workspace.widget', DOMAIN_NAME_ROOT + '/js/widget');
	console.info('common.ini.init_loader Ext.Loader \'Workspace.widget\' setted');
	Ext.Loader.setPath('Workspace.data', DOMAIN_NAME_ROOT + '/js/dataextjs');
	console.info('common.ini.init_loader Ext.Loader \'Workspace.data\' setted');
	Ext.Loader.setPath('Workspace.tool', DOMAIN_NAME_ROOT + '/js/toolextjs');
	console.info('common.ini.init_loader Ext.Loader \'Workspace.tool\' setted');
	Ext.Loader.setPath('Workspace.poc', DOMAIN_NAME_ROOT + '/js/poc');
	console.info('common.ini.init_loader Ext.Loader \'Workspace.poc\' setted');

	// Requi pour une utilisation du style : Workspace.tool.Log.defined('...')
	Ext.Loader.syncRequire('Workspace.tool.Log');
	// Requi pour une utilisation du style : if (Workspace.tool.UtilString.isNotEqualPath(path1, path2)){...}
	Ext.Loader.syncRequire('Workspace.tool.UtilString');

	console.info('common.ini.init_loader END');
}
