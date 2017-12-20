Ext.require([
]);

Ext.define('Workspace.common.window.WindowTextCompile', {

	extend: 'Workspace.common.window.WindowText'
	,
	alias: 'widget.commonWindowTextCompile',
	alternateClassName: 'CommonWindowWindowTextCompile'
	,
	// private
	initComponent : function(){
		var me = this;

	   var data = '';
	   var jsonData = me.data;
	   var nbLine = jsonData.results;
	   console.log('jsonData:' + jsonData);
	   console.log('nbLine:' + nbLine);
	   try {
		   //var max=30;
		   var max=nbLine;
		   for(i=0 ; i<max ; i++) {
			   data += Workspace.common.window.WindowTextCompile.formatFont(jsonData.data[i].text)
			}
			if (nbLine>max) {
				data += "...";
			}
		}
		catch (ex) {
			data = "Error ex:"+ex;
		}
		finally {
			console.log(data);
			this.text = data
		}
		me.callParent(arguments);
	}
	,
	statics: {
		formatFont : function (str) {
			   var fontStart = "";
			   var fontEnd = "";
			   if (str.indexOf(": warning:") >= 0 ) {
				   fontStart = "<font color='orange'>";
				   fontEnd = "</font>";
			   } else if (str.indexOf(": error:") >= 0 ) {
				   fontStart = "<font color='red'>";
				   fontEnd = "</font>";
			   }
			   return fontStart + str + fontEnd + '<br>';
			}
	}
	,
	title: 'Message',        //titre de la fenêtre
	// el = id du div dans le code html de la page qui contiendra la popup
	//el:windowEl,        
	layout:'fit',
	width:850,
	height:450,
//	autoHeight: true,        //hauteur de la fenêtre
	modal: true,             //Grise automatiquement le fond de la page
	closeAction:'destroy',
	plain: true
}, function() {Workspace.tool.Log.defined('Workspace.common.window.WindowTextCompile');});