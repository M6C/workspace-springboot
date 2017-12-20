package workspace.service.debug.extjs;

import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.sun.jdi.event.LocatableEvent;
import com.sun.jdi.request.EventRequest;

import framework.beandata.BeanGenerique;
import workspace.bean.debug.BeanDebug;
import workspace.service.debug.tool.ToolDebug;

public class SrvDebugBreakpointStep extends workspace.service.debug.SrvDebugBreakpointStep {

	protected void doResponse(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean, LocatableEvent brkE) throws Exception {
		// Recupere le nom de l'application du point d'arret
		boolean success = false;
		String application = "";
        String className = "";
        String line = "0";
		String fileName = "";
		String sourceName = "";
		if (brkE != null) {
			success = true;
			EventRequest brkR = (EventRequest) brkE.request();
	  	  	HttpSession session = request.getSession();
	    	BeanDebug beanDebug = (BeanDebug)session.getAttribute("beanDebug");

			application = URLEncoder.encode((String) brkR.getProperty("application"), "UTF-8");
	        line = Integer.toString(brkE.location().lineNumber());
			fileName = URLEncoder.encode((String) brkR.getProperty("fileName"), "UTF-8");
			className = URLEncoder.encode(brkE.location().declaringType().name(), "UTF-8");
			sourceName = ToolDebug.getPathExistInApplicationJson(beanDebug, brkE, "UTF-8");
		}

        String jsonData = "{"+
        	"'success':" + success + "," +
            "'application':'" + application + "'," +
            "'className':'" + className + "'," +
        	"'line':" + line + "," +
        	"'fileName':'" + fileName + "'," + 
        	"'sourceName':[" + sourceName + "]" +
        "}";

        OutputStream os = response.getOutputStream();
        response.setContentType("text/json");
        os.write(jsonData.getBytes());
        os.close();
        return;
    }
}