Ext.define('Workspace.common.panel.PanelCollapsible', {
	// REQUIRED

	extend: 'Ext.panel.Panel'
	,
	alias: 'widget.panelCollapsible',
	alternateClassName: 'PanelCollapsible'
	,
	split: true,
	collapseMode: 'mini',
//	collapsed: true,
	collapsible: true,
	titleCollapse: true,
    autoScroll: true

}, function() {Workspace.tool.Log.defined('Workspace.common.panel.PanelCollapsible');});
