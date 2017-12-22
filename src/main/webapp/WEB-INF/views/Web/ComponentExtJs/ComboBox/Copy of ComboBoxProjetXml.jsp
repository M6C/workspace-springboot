<%--
Param�tres � definir pour utiliser ce composant
  -- Obligatoires:
    * myID  : Login de l'utilisateur connectamp;eacute;
    * myPWD : Password de l'utilisateur connectamp;eacute;
  -- Optionnels
    * paramOther : Autres param�tres � mettre dans les 'value' des options dans le changement de projets
--%>
<%@ taglib uri="Framework_Taglib_Html.tld" prefix="html" %>
<%@ taglib uri="Framework_Taglib_Request.tld" prefix="request" %>
<%@ taglib uri="Framework_Taglib_Xml.tld" prefix="Xml" %>

<script type="text/javascript">
Ext.onReady(function(){
    Ext.QuickTips.init();
	Ext.namespace('Ext.workspace.data');

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

	var combo = new Ext.form.ComboBox({
        store: store,
        //url: '/Workspace/action.servlet?event=JsonProjectName',
        //autoLoad: true,
        displayField:'project',
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        emptyText:'Select a project...',
        typeAhead: true,
        editable: true,
        selectOnFocus:true,
        applyTo: 'local-project'/*,
		onSelect: function(record){ // override default onSelect to do redirect
			window.location = 
			String.format('/action.servlet?event={0}&application={1}'+
				'<request:TagPrintAttribut name="paramOther" scope="request"/>', 
				'<request:TagPrintAttribut name="eventDst" scope="request"/>', record.data.project);
		}*/
    });
});
</script>
<input type="text" id="local-project" size="20"/> 