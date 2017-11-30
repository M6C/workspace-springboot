<%String DOMAIN_NAME_ROOT = "";//"/Workspace";%>
<html>
	<head>
		<title>
			Home Popup
		</title>
	        <link href="<%=DOMAIN_NAME_ROOT%>/css/page/home_popup.css" rel="stylesheet" type="text/css">
			<script language="javascript" src="<%=DOMAIN_NAME_ROOT%>/js/Popup.js" type="text/javascript"></script>
			<script language="javascript" src="<%=DOMAIN_NAME_ROOT%>/js/page/home_popup.js" type="text/javascript"></script>
<script language="javascript" type="text/javascript">			
function openPopupRet(url,name,width, height, timeOut, parameters)
{
  var tmpWindow
  /*
  width: window width size
  height: window height size
  timeOut: close window after 'timeOut' secondes.
  parameters: reste des parametres (commence obligatoirement par ",")
  */
  if (name == null) name="s4f";
  if (width == null) width=460;
  if (height == null) height = 360;

  if (parameters == null)
//    parameters =",toolbar=0,location=0,directories=0,status=0,menubar=0, scrollbars=0, resizable=no"
    parameters =",toolbar=0,location=0,directories=0,status=0,menubar=0, scrollbars=1, resizable=yes";
  else
    parameters = "," + parameters;

  var top, top2, left;
  top = (screen.height - height)/2;
  top2 = -1;
  left = (screen.width - width)/2;
  tmpWindow = window.open(url,name,'width=' + width + ',height=' + height +',screenX=' + left +',screenY=' + top2 + ',Left=' + left + ',Top=' + top + parameters);

  if (timeOut !=null)
    setTimeout('tmpWindow.close()',timeOut*1000);
  tmpWindow.focus();
  return tmpWindow;
}

function openPopup(url,name,width, height, timeOut, parameters)
{
  var tmpWindow = openPopupRet(url,name,width, height, timeOut, parameters);
}

function CloseWindow(href) {
/*
    var winX = (document.all)?window.screenLeft:window.screenX;
    var winY = (document.all)?window.screenTop:window.screenY;
    var obj_window = openPopup('action.servlet?event=Home', '', document.body.clientWidth, document.body.clientHeight, null, 'status=1, resizable=yes, screenX='+window.event.screenX+',screenY='+window.event.screenY+',Left='+winX+',Top='+winY);
*/
    var obj_window = openPopupRet('action.servlet?event=Home', '', screen.width*0.90 , screen.height*0.75, null, 'status=1, resizable=yes, _self');
    obj_window.opener = window;
    //obj_window.focus();
    opener=self;
    self.close();
}
</script>
	</head>
	<body bgcolor="#ffffff" onload="CloseWindow()">
	</body>
</html>
