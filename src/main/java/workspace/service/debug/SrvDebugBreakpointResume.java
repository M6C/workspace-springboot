package workspace.service.debug;

import java.io.PrintWriter;
import java.io.StringWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.sun.jdi.VirtualMachine;
import com.sun.jdi.event.Event;
import com.sun.jdi.event.LocatableEvent;
import com.sun.jdi.event.StepEvent;
import com.sun.jdi.request.BreakpointRequest;

import framework.beandata.BeanGenerique;
import framework.service.SrvGenerique;
import workspace.bean.debug.BeanDebug;
import workspace.service.debug.tool.ToolDebug;

/**
 *
 * a servlet handles upload request.<br>
 * refer to http://www.ietf.org/rfc/rfc1867.txt
 * 
 */

public class SrvDebugBreakpointResume extends SrvGenerique {

	public void init() {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean) throws Exception {
  	  HttpSession session = request.getSession();
	  try {
		  String application = (String)bean.getParameterDataByName("application");
          BeanDebug beanDebug = ToolDebug.findBeanDebug(session);
    	  if (beanDebug!=null) {
              ToolDebug.resume(beanDebug);

    		  Event currentEvent = beanDebug.getCurrentEvent();
    		  if ((currentEvent!=null)&&(currentEvent instanceof LocatableEvent)) {
    			  LocatableEvent brkE = (LocatableEvent)currentEvent;
    			  BreakpointRequest brkR = (BreakpointRequest) brkE.request();

    			  // Recree le point d'arret
                  BreakpointRequest brkR2 = ToolDebug.recreateBreakpoint(beanDebug, brkR);
				  copyBreakpointProperties(brkR, brkR2);

    		  }

			  PrintWriter out = response.getWriter();
			  out.print("resume");
    	  } else {
    		  System.err.println("BeanDebug not found. Can't Resume Breakpoint.");
    		  return;
    	  }
	  }
	  catch(Exception ex) {
		  StringWriter sw = new StringWriter();
		  ex.printStackTrace(new PrintWriter(sw));
		  request.setAttribute("msgText", sw.toString());
		  throw ex;
	  }
    }

    protected void copyBreakpointProperties(BreakpointRequest brkR1, BreakpointRequest brkR2) throws Exception {
        brkR2.putProperty("line", brkR1.getProperty("line"));
        brkR2.putProperty("className", brkR1.getProperty("className"));
        brkR2.putProperty("application", brkR1.getProperty("application"));
        brkR2.putProperty("fileName", brkR1.getProperty("fileName"));
        brkR2.putProperty("path", brkR1.getProperty("path"));
    }
}