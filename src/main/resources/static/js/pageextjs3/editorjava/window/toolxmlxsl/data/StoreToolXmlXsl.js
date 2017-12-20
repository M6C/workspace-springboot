// NAMESPACE
Ext.ns('Workspace.window.ToolXmlXsl.data');

// DataStore
Workspace.window.ToolXmlXsl.data.StoreToolXmlXsl = Ext.extend(Ext.data.ArrayStore, {
    fields: ['id', 'name'],
	autoload:true,
    data : [
        ['request', 'Request'],
        ['session', 'Session']
   	]
});

// REGISTER
Ext.reg('WorkspaceWindowToolXmlXslDataStoreToolXmlXsl',Workspace.window.ToolXmlXsl.data.StoreToolXmlXsl);
