package workspace.service.debug;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Enumeration;
import java.util.Hashtable;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.sun.jdi.VirtualMachine;
import com.sun.jdi.request.BreakpointRequest;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilString;
import framework.service.SrvGenerique;
import framework.trace.Trace;
import workspace.bean.debug.BeanDebug;
import workspace.service.debug.tool.ToolDebug;

/**
 *
 * a servlet handles upload request.<br>
 * refer to http://www.ietf.org/rfc/rfc1867.txt
 * 
 */

public class SrvDebugStart extends SrvGenerique {

	public void init() {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean) throws Exception {
    	  HttpSession session = request.getSession();
          PrintWriter out = response.getWriter();
          String application = (String)bean.getParameterDataByName("application");
          BeanDebug beanDebug = ToolDebug.getBeanDebug(session, application);
          String text = "";
          if (beanDebug==null) {
	        text = "BeanDebug not found. Can't Start Debug.";
	        Trace.WARNING(this, text);
        	return;
          }
          if (beanDebug.getVirtualMachine()==null) {
          	text = "VirtualMachine not found. Can't Start Debug.";
          	if (UtilString.isNotEmpty(beanDebug.getMessageError())) {
          		text += " " + beanDebug.getMessageError();
          		beanDebug.setMessageError(null);
          	}
          	Trace.WARNING(this, text);
        	return;
          }
    	  try {
			  ToolDebug.recreateAllBreakpoint(beanDebug);
			  text = "Started";
    	  }
    	  catch(Exception ex) {
    		  StringWriter sw = new StringWriter();
    		  ex.printStackTrace(new PrintWriter(sw));
    		  text += " " + sw.toString();
    		  request.setAttribute("msgText", text);
    		  throw ex;
    	  }
    	  finally {
			  out.print(text);
    		  VirtualMachine virtualMachine = beanDebug.getVirtualMachine();
    		  if (virtualMachine!=null)
    			  virtualMachine.resume();
    	  }
    }
}