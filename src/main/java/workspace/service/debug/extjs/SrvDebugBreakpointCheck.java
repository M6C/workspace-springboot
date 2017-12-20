package workspace.service.debug.extjs;

import java.io.OutputStream;
import java.net.URLDecoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sun.jdi.event.LocatableEvent;
import com.sun.jdi.request.EventRequest;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilString;
import workspace.bean.debug.BeanDebug;
import workspace.service.debug.tool.ToolDebug;

public class SrvDebugBreakpointCheck extends workspace.service.debug.SrvDebugBreakpointCheck {

	@Override
	protected void doResponse(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean, BeanDebug beanDebug, LocatableEvent brkE) throws Exception {
		String BeanApplication = (String)bean.getParameterDataByName("application");
		boolean stopped = false;
		String application = "";
        String className = "";
		String fileName = "";
		String line = "0";
		String sourceName = "";
		if (brkE != null /*&& beanDebug.getCurrentStepEvent() == null*/) {
			EventRequest brkR = (EventRequest) brkE.request();
			application = URLDecoder.decode((String)brkR.getProperty("application"), "UTF-8");
			if (UtilString.isEmpty(BeanApplication) || UtilString.isEquals(application, BeanApplication)) {
				stopped = true;
		        fileName = URLDecoder.decode((String) brkR.getProperty("fileName"), "UTF-8");
				line = Integer.toString(brkE.location().lineNumber());
				className = URLDecoder.decode(brkE.location().declaringType().name(), "UTF-8");
				sourceName = ToolDebug.getPathExistInApplicationJson(beanDebug, brkE, "UTF-8");
			} else {
				application = "";
			}
		}

        String jsonData = "{"+
        	"'stopped':" + stopped + "," +
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