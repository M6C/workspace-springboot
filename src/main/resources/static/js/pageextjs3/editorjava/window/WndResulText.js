var NB_LINE_MAX = 30;
var NB_CAR_MAX = 150;

function create_WindowResultText(response,submitFunction) {
	var data = '';
	try {
		//console.log('response.responseText:'+response.responseText);
		var jsonData = Ext.util.JSON.decode(response.responseText);
		var results = jsonData.results;
		var maxLine=results;
		if (maxLine>NB_LINE_MAX)
			maxLine=NB_LINE_MAX;
		for(i=0 ; i<maxLine ; i++) {
			var line = jsonData.data[i].text;
			if (line.length>NB_CAR_MAX)
				line = line.substring(0, NB_CAR_MAX) + "...";
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