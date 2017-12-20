Ext.Ajax.request({
   url: DOMAIN_NAME_ROOT + '/action.servlet?event=JsonProjectName',
   params: { },
   success: function(msg){
     //alert( "Data Saved 1: " + msg );
     Ext.namespace('Ext.workspace.data');
     //alert( "Data Saved 2: " + msg );
     Ext.workspace.data.project = msg;
   }
});