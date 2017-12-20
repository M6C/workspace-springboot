package workspace.service.debug;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.URLDecoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.sun.jdi.event.Event;
import com.sun.jdi.event.LocatableEvent;
import com.sun.jdi.request.BreakpointRequest;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilString;
import framework.service.SrvGenerique;
import workspace.bean.debug.BeanDebug;
import workspace.service.debug.tool.ToolDebug;

/**
 *
 * a servlet handles upload request.<br>
 * refer to http://www.ietf.org/rfc/rfc1867.txt
 * 
 */

public class SrvDebugBreakpointCheck extends SrvGenerique {

	public void init() {
	}

	public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean) throws Exception {
		HttpSession session = request.getSession();
		LocatableEvent brkE = null;
		String application = (String)bean.getParameterDataByName("application");
		BeanDebug beanDebug = null;
		try {
			beanDebug = ToolDebug.getBeanDebug(session, application);
			if (beanDebug != null) {
//				Event currentEvent = beanDebug.getCurrentEvent();
				Event currentEvent = (beanDebug.getCurrentStepEvent() != null) ? beanDebug.getCurrentStepEvent() : beanDebug.getCurrentEvent();
				if ((currentEvent != null) && (currentEvent instanceof LocatableEvent)) {
					brkE = (LocatableEvent) currentEvent;
				}
			} else {
				System.err.println("BeanDebug not found. Can't Check Breakpoint.");
				return;
			}
		} catch (Exception ex) {
			StringWriter sw = new StringWriter();
			ex.printStackTrace(new PrintWriter(sw));
			request.setAttribute("msgText", sw.toString());
			throw ex;
		} finally {
			doResponse(request, response, bean, beanDebug, brkE);
		}
	}

	protected void doResponse(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean, BeanDebug beanDebug, LocatableEvent brkE) throws Exception {
		String BeanApplication = (String)bean.getParameterDataByName("application");
		BreakpointRequest brkR = (BreakpointRequest) brkE.request();
		// Recupere le nom de l'application du point d'arret
		String application = URLDecoder.decode((String)brkR.getProperty("application"), "UTF-8");
		if (UtilString.isEmpty(BeanApplication) || UtilString.isEquals(application, BeanApplication)) {
			// Recupere le chemin des sources de la class du point d'arret
			String path = URLDecoder.decode((String) brkR.getProperty("path"), "UTF-8");
			String sourceName = URLDecoder.decode(brkR.location().sourceName(), "UTF-8");
			int lineNumber = brkE.location().lineNumber();
			PrintWriter out = response.getWriter();
			out.print(application + ":" + path + ":" + sourceName + ":" + lineNumber);
		}
	}

}