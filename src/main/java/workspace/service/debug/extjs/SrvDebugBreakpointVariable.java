package workspace.service.debug.extjs;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.URLEncoder;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.sun.jdi.LocalVariable;
import com.sun.jdi.ObjectReference;
import com.sun.jdi.PrimitiveValue;
import com.sun.jdi.StackFrame;
import com.sun.jdi.StringReference;
import com.sun.jdi.ThreadReference;
import com.sun.jdi.Value;
import com.sun.jdi.event.Event;
import com.sun.jdi.event.LocatableEvent;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilString;
import framework.service.SrvGenerique;
import workspace.bean.debug.BeanDebug;

/**
 *
 * a servlet handles upload request.<br>
 * refer to http://www.ietf.org/rfc/rfc1867.txt
 * 
 */

public class SrvDebugBreakpointVariable extends SrvGenerique {

	public void init() {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean) throws Exception {
    	  HttpSession session = request.getSession();
    	  StringBuffer sb = new StringBuffer("{\"success\":true,\"children\":[");
    	  try {
    		  boolean stop = false;
	    	  BeanDebug beanDebug = (BeanDebug)session.getAttribute("beanDebug");
	    	  if (beanDebug!=null) {
//	    		  Event currentEvent = beanDebug.getCurrentEvent();
	    		  Event currentEvent = (beanDebug.getCurrentStepEvent() != null) ? beanDebug.getCurrentStepEvent() : beanDebug.getCurrentEvent();
	    		  if ((currentEvent!=null)&&(currentEvent instanceof LocatableEvent)) {
	    			  LocatableEvent event = (LocatableEvent)currentEvent;
		    		  ThreadReference thread = event.thread();
		    		  if (thread == null) {
		    			  System.err.println("No Thread found for event");
		    			  return;
		    		  }
		    		  List frames = thread.frames();
		    		  if ((frames!=null)&&(!frames.isEmpty())) {
		    			  StackFrame frame = null;
		    			  Iterator it = frames.iterator();
		    			  int cnt = 0;
		    			  while(it.hasNext()) {
		    				  frame = (StackFrame)it.next();
				              if (cnt > 0) {
				                sb.append(",");
				              }
				    		  sb.append("{");

				    		  addFrameInfo(sb, frame);

				              sb.append("\"variable\":[");
		    				  
		    				  try {
			    				  List<LocalVariable> visibleVariables = frame.visibleVariables();
					    		  if ((visibleVariables!=null)&&(!visibleVariables.isEmpty())) {
									int cntVar = 0;
									String varName = "", typename = "", valueText = "";
									Value value = null;
									for (LocalVariable variable : visibleVariables) {
										value = frame.getValue(variable);
										varName = variable.name();

										String varId = "";
										if (value instanceof ObjectReference) {
											ObjectReference objectReference = (ObjectReference) value;
											varId = Long.toString(objectReference.uniqueID());
										}

										try {typename = URLEncoder.encode(variable.typeName());} catch (Exception ex) {}
										try {valueText = URLEncoder.encode(value.toString());} catch (Exception ex) {}

										boolean isObjectReference = !(UtilString.isEmpty(varId) || value instanceof StringReference || value instanceof PrimitiveValue);
										if (cntVar > 0) {
											sb.append(",");
										}
										sb.append("{").append("\"id\":\"").append(varId).append("\",")
												.append("\"name\":\"").append(varName).append("\",")
												.append("\"type\":\"").append(typename).append("\",")
												.append("\"value\":\"").append(valueText).append("\",")
												.append("\"objectReference\":").append(isObjectReference).append("}");
										cntVar++;
									}
					    		  }
		    				  }
		    				  catch(Exception ex) {}
				              sb.append("]}");
		    				  cnt++;
		    				  if (stop) {
		    					  break;
		    				  }
		    			  }
		    		  }
	    		  }
	    	  }
			  sb.append("]}");
    	  }
    	  catch(Exception ex) {
    		  StringWriter sw = new StringWriter();
    		  ex.printStackTrace(new PrintWriter(sw));
    		  request.setAttribute("msgText", sw.toString());
    		  sb = new StringBuffer("{success:false,message:\"").append(ex.getMessage()).append("\"}");
    	  }
		  PrintWriter out = response.getWriter();
          out.print(sb.toString());
//          File file = new File("out_json.txt");
//          file.createNewFile();
//          try{UtilFile.write(file, sb.toString());}catch(Exception ex){ex.printStackTrace();}
    }

	protected void addFrameInfo(StringBuffer sb, StackFrame frame) {
		String classname = "";
		  String sourcePath = "";
		  String methode = "";
		  String signature = "";
		  try {
			  classname = frame.location().declaringType().name();
			  sourcePath = frame.location().sourcePath();
			  methode = frame.location().method().name();
			  signature = frame.location().method().signature();
		  }
		  catch(Exception ex) {}

		  try{classname = URLEncoder.encode(classname);}catch(Exception ex){}
		  try{sourcePath = URLEncoder.encode(sourcePath);}catch(Exception ex){}
		  try{methode = URLEncoder.encode(methode);}catch(Exception ex){}
		  try{signature = URLEncoder.encode(signature);}catch(Exception ex){}

		  sb.append("\"classname\":\"").append(classname).append("\",")
		    .append("\"source\":\"").append(sourcePath).append("\",")
		    .append("\"methode\":\"").append(methode).append("\",")
		    .append("\"signature\":\"").append(signature).append("\",");
	}
}