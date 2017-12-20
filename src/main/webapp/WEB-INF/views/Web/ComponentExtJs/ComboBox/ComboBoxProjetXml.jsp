<%--
Paramètres à definir pour utiliser ce composant
  -- Obligatoires:
    * myID  : Login de l'utilisateur connectamp;eacute;
    * myPWD : Password de l'utilisateur connectamp;eacute;
  -- Optionnels
    * paramOther : Autres paramètres à mettre dans les 'value' des options dans le changement de projets
--%>
<%@ taglib uri="Framework_Taglib_Html.tld" prefix="html" %>
<%@ taglib uri="Framework_Taglib_Request.tld" prefix="request" %>
<%@ taglib uri="Framework_Taglib_Xml.tld" prefix="Xml" %>

<!--script type="text/javascript" src="<%=DOMAIN_NAME_ROOT%>/js/ajax/request/ListProject.js"></script-->

<script type="text/javascript"><!--
Ext.onReady(function(){
    Ext.QuickTips.init();
	Ext.namespace('Ext.workspace.data');
/*
	Ext.workspace.data.project = [
		['']
		<Xml:TagXml name="resultDom" scope="session" path="/ROOT/USER/PROFILES/PROFILE/APPLICATIONS/APPLICATION">
			,['<Xml:TagXmlValue path='@Name'/>']
		</Xml:TagXml>
	];

	var store = new Ext.data.ArrayStore({
	    fields: ['project'],
	    data : Ext.workspace.data.project
	});
*/

	var store = new Ext.data.Store({
	    proxy: new Ext.data.HttpProxy({
	        url: '/Workspace/action.servlet?event=JsonProjectName'
	    }),
	    reader: new Ext.data.JsonReader({
			idProperty: 'project',
			root: 'data',
			fields: [
						{ name: 'project', mapping: 'project' }
			]
	    }),
	    autoLoad: true
	 
	});

	var combo = new Ext.form.ComboBox({
        store: store,
        //url: '/Workspace/action.servlet?event=JsonProjectName',
        //autoLoad: true,
        displayField:'project',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        emptyText:'Select a project...',
        selectOnFocus:true,
        applyTo: 'local-project'
    });

	// Add a listener to take some action when a node is moved. 
	combo.addListener('select', function (cmb, record, index){
		var tree = Ext.getCmp("treeDirectory");
		tree.loader.baseParams.path = '';
		tree.loader.baseParams.application = record.data.project;
		tree.root.reload();
	});

});
</script>
<input type="text" id="local-project" size="20"/> 