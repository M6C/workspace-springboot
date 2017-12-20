Ext.define('Workspace.common.window.WindowResultText',  {
	// REQUIRED

	statics: {
		NB_LINE_MAX : 30,
		NB_CAR_MAX : 150
		,
		show : function(response,submitFunction) {
			var data = '';
			try {
				//console.log('response.responseText:'+response.responseText);
				var jsonData = Ext.decode(response.responseText);
				var results = jsonData.results;
				var maxLine=results;
				if (maxLine>this.NB_LINE_MAX)
					maxLine=this.NB_LINE_MAX;
				for(i=0 ; i<maxLine ; i++) {
					var line = jsonData.data[i].text;
					if (line.length>this.NB_CAR_MAX)
						line = line.substring(0, this.NB_CAR_MAX) + "...";
					console.log('line['+i+']:'+line);
					data += line + '<br>';
				}
				if (results>maxLine)
					data += "...";
			}
			catch (ex) {
				data = "Error ex:"+ex;
			}
			finally {
				//console.log('data:'+data);
			    Ext.Msg.alert('Trace', data, submitFunction);
			}
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.common.window.WindowResultText');});