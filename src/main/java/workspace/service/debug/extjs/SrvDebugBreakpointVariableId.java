package workspace.service.debug.extjs;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.URLEncoder;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.sun.jdi.AbsentInformationException;
import com.sun.jdi.Field;
import com.sun.jdi.IncompatibleThreadStateException;
import com.sun.jdi.LocalVariable;
import com.sun.jdi.ObjectReference;
import com.sun.jdi.PrimitiveValue;
import com.sun.jdi.ReferenceType;
import com.sun.jdi.StackFrame;
import com.sun.jdi.StringReference;
import com.sun.jdi.ThreadReference;
import com.sun.jdi.Value;
import com.sun.jdi.event.Event;
import com.sun.jdi.event.LocatableEvent;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilString;
import workspace.bean.BeanPair;
import workspace.bean.debug.BeanDebug;

/**
 *
 * a servlet handles upload request.<br>
 * refer to http://www.ietf.org/rfc/rfc1867.txt
 * 
 */

public class SrvDebugBreakpointVariableId extends SrvDebugBreakpointVariable {

	private static final String VARIABLE_SEPARATOR = ":";

	public void init() {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean) throws Exception {
    	  HttpSession session = request.getSession();
    	  String variableId = (String) bean.getParameterDataByName("variableId");
    	  StringBuffer sb = new StringBuffer("{\"success\":true,\"children\":[");
    	  try {
	    	  BeanDebug beanDebug = (BeanDebug)session.getAttribute("beanDebug");
	    	  if (beanDebug!=null && UtilString.isNotEmpty(variableId)) {
//	    		  Event currentEvent = beanDebug.getCurrentEvent();
	    		  Event currentEvent = (beanDebug.getCurrentStepEvent() != null) ? beanDebug.getCurrentStepEvent() : beanDebug.getCurrentEvent();
	    		  if ((currentEvent!=null)&&(currentEvent instanceof LocatableEvent)) {
	    			  LocatableEvent event = (LocatableEvent)currentEvent;
		    		  ThreadReference thread = event.thread();
		    		  if (thread == null) {
		    			  System.err.println("No Thread found for event");
		    			  return;
		    		  }

		    		  String[] listVarId = variableId.split(VARIABLE_SEPARATOR);
		    		  int cnt = listVarId.length;
		    		  if (cnt > 0) {
		    			String varId = listVarId[0];
		    			BeanPair<StackFrame, LocalVariable> pair = findFrameAndVariable(thread, varId);
						if (pair != null) {

		    				sb.append("{");

							addFrameInfo(sb, pair.getFirst());

	    				  sb.append("\"variableId\":\"").append(variableId).append("\",");

			              sb.append("\"variable\":[");
							Value value = pair.getFirst().getValue(pair.getSecond());
							if (value instanceof ObjectReference) {
								ObjectReference fObject = (ObjectReference)value;
								if (cnt > 1) {
									for(int i=1 ; i<cnt ; i++)  {
										varId = listVarId[i];
										fObject = findObjectReference(fObject, varId);
									}
								}
								if (fObject != null) {
									inspectObjectReference(sb, fObject, variableId);
								}
							}
			              sb.append("]}");
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

	private BeanPair<StackFrame, LocalVariable> findFrameAndVariable(ThreadReference thread, String varId) throws IncompatibleThreadStateException, AbsentInformationException {
		BeanPair<StackFrame, LocalVariable> ret = null;

		List frames = thread.frames();
		if ((frames != null) && (!frames.isEmpty())) {
			StackFrame frame = null;
			Iterator<StackFrame> it = frames.iterator();
			while (it.hasNext()) {
				frame = it.next();
				LocalVariable variable = findVariable(frame, varId);
				if(variable != null ) {
					ret = new BeanPair<StackFrame, LocalVariable>(frame, variable);
					break;
				}
			}
		}
		return ret;
	}

	private LocalVariable findVariable(StackFrame frame, String varId) throws AbsentInformationException {
		LocalVariable ret = null;
		List<LocalVariable> visibleVariables = frame.visibleVariables();
		if ((visibleVariables != null) && (!visibleVariables.isEmpty())) {
			Value value = null;
			for (LocalVariable variable : visibleVariables) {
				value = frame.getValue(variable);

				if (value instanceof ObjectReference) {
					ObjectReference objectReference = (ObjectReference) value;
					String id = Long.toString(objectReference.uniqueID());
					if (UtilString.isEquals(varId, id)) {
						ret = variable;
						break;
					}
				}
			}
		}
		return ret;
	}

	private ObjectReference findObjectReference(ObjectReference fObject, String varId) throws AbsentInformationException {
		ObjectReference ret = null;
		if (fObject != null || UtilString.isEmpty(varId)) {
			Map<Field, Value> values = fObject.getValues(fObject.referenceType().fields());
			for(Value value : values.values()) {
				if (value instanceof ObjectReference) {
					String id = Long.toString(((ObjectReference)value).uniqueID());
					if (UtilString.isEquals(varId, id)) {
						ret = (ObjectReference)value;
					}
				}
			}
		}
		return ret;
	}

    // http://www.programcreek.com/java-api-examples/index.php?api=com.sun.jdi.LocalVariable
	// http://alvinalexander.com/java/jwarehouse/eclipse/org.eclipse.jdt.debug.jdi.tests/tests/org/eclipse/debug/jdi/tests/ObjectReferenceTest.java.shtml
	private void inspectObjectReference(StringBuffer sb, ObjectReference fObject, String variableId) {
		// setup
		ReferenceType type = fObject.referenceType();
		List<Field> instanceFields = type.fields();
		Map<Field, Value> values = fObject.getValues(instanceFields);
		int cntVar = 0;
		String varName = "", typename = "", valueText = "";
		for (Field field : instanceFields) {
			Value value = (Value) values.get(field);

			try {varName = URLEncoder.encode(field.name());} catch (Exception ex) {}
			try {typename = URLEncoder.encode(field.typeName());} catch (Exception ex) {}
			try {valueText = URLEncoder.encode(value.toString());} catch (Exception ex) {}

			String varId = "";
            if (value instanceof ObjectReference) {
				  ObjectReference objectReference = (ObjectReference) value;
				  varId = variableId + VARIABLE_SEPARATOR + Long.toString(objectReference.uniqueID());
            }
		    boolean isObjectReference = !(UtilString.isEmpty(varId) || value instanceof StringReference || value instanceof PrimitiveValue);

			if (cntVar > 0) {
				sb.append(",");
			}
			sb.append("{")
				.append("\"id\":\"").append(varId).append("\",")
				.append("\"name\":\"").append(varName).append("\",")
				.append("\"type\":\"").append(typename).append("\",")
				.append("\"value\":\"").append(valueText).append("\",")
				.append("\"objectReference\":").append(isObjectReference)
				.append("}");
			cntVar++;
		}

//		 setValue(Field,Value)
//		 Value newValue = fVM.mirrorOf('b');
//		 try {
//		 fObject.setValue(field, newValue);
//		 } catch (ClassNotLoadedException e) {
//		 assertTrue("4.1", false);
//		 } catch (InvalidTypeException e) {
//		 assertTrue("4.2", false);
//		 }
//		
//		 getValue(Field)
//		 assertEquals("5", fObject.getValue(field), newValue);
//
//		 assertEquals("6", "fString2", field.name());
//		 try {
//		 fObject.setValue(field, null);
//		 } catch (ClassNotLoadedException e) {
//		 assertTrue("7.1", false);
//		 } catch (InvalidTypeException e) {
//		 assertTrue("7.2", false);
//		 }
//
//		 getValue(Field)
//		 assertEquals("8", fObject.getValue(field), null);
//
//		 test get final value.
//		 The value is null and should be because it's final
//		 assertEquals("10", fVM.mirrorOf("HEY"), fObject.getValue(field));

	}
}