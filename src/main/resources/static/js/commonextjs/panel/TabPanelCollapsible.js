Ext.define('Workspace.common.panel.TabPanelCollapsible', {
	// REQUIRED

	extend: 'Ext.tab.Panel'
	,
	alias: 'widget.tabPanelCollapsible',
	alternateClassName: 'TabPanelCollapsible'
	,
	split: true,
	collapseMode: 'mini',
//	collapsed: true,
	collapsible: true,
	titleCollapse: true,
    autoScroll: true,
    stateful:false

}, function() {Workspace.tool.Log.defined('Workspace.common.panel.TabPanelCollapsible');});
