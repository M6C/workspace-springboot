// NAMESPACE
Ext.ns('Workspace.common.view');

Workspace.common.view.ViewPort = Ext.extend(Ext.Viewport, {
	id: 'mainView',
	layout: 'border',
    stateful:false,
	initComponent : function() {
		Workspace.common.view.ViewPort.superclass.initComponent.call(this);
    },
    renderTo: Ext.getBody()
});


Ext.reg('WorkspaceCommonViewViewPort', Workspace.common.view.ViewPort);
