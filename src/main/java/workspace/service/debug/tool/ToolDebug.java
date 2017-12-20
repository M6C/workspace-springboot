package workspace.service.debug.tool;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.xml.transform.TransformerException;

import org.w3c.dom.Document;

import com.sun.jdi.AbsentInformationException;
import com.sun.jdi.Location;
import com.sun.jdi.VirtualMachine;
import com.sun.jdi.connect.IllegalConnectorArgumentsException;
import com.sun.jdi.event.Event;
import com.sun.jdi.event.LocatableEvent;
import com.sun.jdi.event.StepEvent;
import com.sun.jdi.request.BreakpointRequest;
import com.sun.jdi.request.EventRequest;
import com.sun.jdi.request.EventRequestManager;

import framework.ressource.util.UtilFile;
import framework.ressource.util.UtilString;
import framework.ressource.util.jdi.UtilJDI;
import framework.trace.Trace;
import workspace.adaptateur.application.AdpXmlApplication;
import workspace.adaptateur.application.AdpXmlDebug;
import workspace.bean.debug.BeanDebug;
import workspace.thread.debug.ThrdDebugEventQueue;

public class ToolDebug {

	private final static String FILE_BREAKPOINT_PROPERTIE = "brkpntprop.sav";

	private ToolDebug() {
	}

	public static BeanDebug findBeanDebug(HttpSession session) throws IOException, IllegalConnectorArgumentsException {
	    return (BeanDebug)session.getAttribute("beanDebug");
	}

	public static BeanDebug getBeanDebug(HttpSession session, String application) throws IOException, IllegalConnectorArgumentsException {
        BeanDebug beanDebug = findBeanDebug(session);
        if (beanDebug==null && application == null) {
        	System.err.println("BeanDebug not found and can't create it for empty application");
        	return beanDebug;
        }
        try {
            if (beanDebug==null) {
	        	beanDebug = createBeanDebug(application);
		        initializeBeanDebugData(session, beanDebug);
		        initializeBeanDebugBreakpoint(session, beanDebug);
                initializeBeanDebug(beanDebug);
		        session.setAttribute("beanDebug", beanDebug);
            } else {
                checkConnection(beanDebug);
                initializeBeanDebug(beanDebug);
            }
        } catch (Exception ex) {
        	beanDebug.setMessageError(ex.getMessage());
            resume(beanDebug);
        }

        return beanDebug;
	}

	public static BreakpointRequest findBreakpoint(VirtualMachine virtualMachine, Properties propertie) {
		String classname = propertie.getProperty("className");
		int line = Integer.parseInt(propertie.getProperty("line"));
		return findBreakpoint(virtualMachine, classname, line);
	}

	public static BreakpointRequest findBreakpoint(VirtualMachine virtualMachine, String classname, int line) {
		BreakpointRequest ret = null;
		Location location = null;
        EventRequestManager eventRequestManager = virtualMachine.eventRequestManager();
        List<?> breakpointRequests = eventRequestManager.breakpointRequests();
        int size = breakpointRequests.size();
        for(int i=0 ; i<size ; i++) {
            EventRequest eventRequest = (EventRequest)breakpointRequests.get(i);
            if (eventRequest instanceof BreakpointRequest) {
                ret = (BreakpointRequest)eventRequest;
                location = ret.location();
                if (classname.equals(ret.getProperty("className")) && location.lineNumber()==line) {
                    break;
                }
                else {
                    ret = null;
                }
            }
        }
        return ret;
	}
	
	public static String readClassnameFromFile(File file) throws IOException {
        String className = "";//szClass;
        String fileName = file.getName();
        FileReader fileReader = new FileReader(file);
        BufferedReader fileInput = null;
        try {
            fileInput = new BufferedReader(fileReader);
            String lineFile = fileInput.readLine();
            while (lineFile!=null) {
                lineFile = lineFile.trim();
                if (lineFile.toUpperCase().startsWith("PACKAGE ")&&
                    lineFile.endsWith(";")) {
                    className = lineFile.substring(8, lineFile.length()-1);
                    break;
                }
                lineFile = fileInput.readLine();
            }
        } finally {
      	  if (fileInput != null) {
      		  fileInput.close();
      	  }
        }

        className += fileName.substring(0, fileName.lastIndexOf('.'));
        className = className.replace('\\', '.').replace('/', '.');
        return className;
	}

    public static void resume(BeanDebug beanDebug) {
        if (beanDebug!=null) {
    		Event currentEvent = beanDebug.getCurrentEvent();
    		if ((currentEvent!=null)&&(currentEvent instanceof LocatableEvent)) {

    			StepEvent currentStep = beanDebug.getCurrentStepEvent();
    			if (currentStep!=null) {
	    			try {
	    				currentStep.thread().resume();
	    			} catch (Exception ex) {
	    				//Catch hide delete raison
	    			}
	    			beanDebug.setCurrentStepEvent(null);
    			}

    			LocatableEvent brkE = (LocatableEvent)currentEvent;
    			try {
        			brkE.thread().resume();
				} catch (Exception ex) {
					//Catch hide delete raison
				}

    			beanDebug.setCurrentEvent(null);
    		}
    		VirtualMachine virtualMachine = beanDebug.getVirtualMachine();
			if (virtualMachine != null) {
    			try {
        			beanDebug.getVirtualMachine().resume();
				} catch (Exception ex) {
					//Catch hide delete raison
				}
    		}
        }
    }

    public static void dispose(BeanDebug beanDebug) {
		if (beanDebug != null) {
			VirtualMachine virtualMachine = beanDebug.getVirtualMachine();
			ThrdDebugEventQueue thrdDebug = beanDebug.getThrdDebugEventQueue();
			if (thrdDebug != null) {
				try {thrdDebug.stopRunning();} catch (Exception ex) {}
			}
			if (virtualMachine != null) {
				try {virtualMachine.dispose();} catch (Exception ex) {}
			}
			beanDebug.setThrdDebugEventQueue(null);
			beanDebug.setVirtualMachine(null);
		}
    }

	public static List<String> getPathExistInApplication(BeanDebug beanDebug, String path) {
		List<String> ret = new ArrayList<>();
		Map<String, String[]> mapApplicationPath = beanDebug.getMapApplicationPath();

		if (path.startsWith("/") || path.startsWith("\\")) {
			path = path.substring(1);
		}

		String[] value = null;
		String pathApp = null, pathSrc = null;
		for(String key : mapApplicationPath.keySet()) {
			value = mapApplicationPath.get(key);
			pathApp = value[1];
			pathSrc = value[0];
			if (new File(pathApp, path).exists()) {
				if (!pathSrc.startsWith("/") && !pathSrc.startsWith("\\")) {
					pathSrc = "/" + pathSrc;
				}
				if (!pathSrc.endsWith("/") || !pathSrc.endsWith("\\")) {
					pathSrc += "/";
				}
				ret.add(UtilString.replaceAll("[" + key + "]" + pathSrc + path, "\\", "/"));
			}
		}
		return ret;
	}

	public static String getPathExistInApplicationJson(BeanDebug beanDebug, LocatableEvent brkE) throws AbsentInformationException {
		try {
			return getPathExistInApplicationJson(beanDebug, brkE, null);
		} catch (UnsupportedEncodingException ex) {
			Trace.ERROR(ToolDebug.class, ex);
		}
		return null;
	}

	public static String getPathExistInApplicationJson(BeanDebug beanDebug, LocatableEvent brkE, String encoding) throws AbsentInformationException, UnsupportedEncodingException {
		String ret = "";
		String path = brkE.location().sourcePath();
		List<String> listPath = ToolDebug.getPathExistInApplication(beanDebug, path);
		if (!listPath.isEmpty()) {
			int i=0;
			for(String item : listPath) {
				if (UtilString.isNotEmpty(encoding)) {
					item = URLEncoder.encode(item, encoding);
				}
				ret += (i++>0 ? "," : "") + "'" + item + "'";
			}
		}
		return ret;
	}

	public static BeanDebug createBeanDebug(String application) throws IOException, IllegalConnectorArgumentsException {
        return new BeanDebug(application);
	}

    private static void checkConnection(BeanDebug beanDebug) throws IOException, IllegalConnectorArgumentsException {
		VirtualMachine virtualMachine = beanDebug.getVirtualMachine();
		if (virtualMachine != null) {
		    System.out.println("ToolDebug.checkConnection");
		    try {
		        virtualMachine.classesByName("java.lang.String");
		    } catch (Exception ex) {
        		System.out.println("ToolDebug.checkConnection error message:" + ex.getMessage());
        		System.out.println("ToolDebug.checkConnection error dispose");
                dispose(beanDebug);
        		System.out.println("ToolDebug.checkConnection error recreate VirtualMachine");
                initializeBeanDebug(beanDebug);
//        		System.out.println("ToolDebug.checkConnection error recreate all breakpoint start");
//                recreateAllBreakpoint(beanDebug);
//        		System.out.println("ToolDebug.checkConnection error recreate all breakpoint end");
		    }
		} else {
		    System.out.println("ToolDebug.checkConnection virtualMachine is null");
		}
    }

	private static void initializeBeanDebug(BeanDebug beanDebug) throws IOException, IllegalConnectorArgumentsException {
		VirtualMachine virtualMachine = beanDebug.getVirtualMachine();
		if (virtualMachine == null) {
			virtualMachine = UtilJDI.createVirtualMachine(beanDebug.getHostname(), beanDebug.getPort());
	        beanDebug.setVirtualMachine(virtualMachine);
		}
		if (beanDebug.getThrdDebugEventQueue() == null) {
           ThrdDebugEventQueue thread = new ThrdDebugEventQueue(beanDebug, virtualMachine.eventQueue());
           thread.setOut(System.out);
           thread.setErr(System.err);
           thread.setErrTrace(System.err);
           thread.start();
           
           beanDebug.setThrdDebugEventQueue(thread);
        }
	}

	private static void initializeBeanDebugData(HttpSession session, BeanDebug beanDebug) throws IOException, IllegalConnectorArgumentsException {
        Document dom = (Document)session.getAttribute("resultDom");
        if (dom != null) {
        	ServletContext context = session.getServletContext();
        	String main = null, src = null, path = null;
        	String[] moduleList = AdpXmlApplication.getModuleList(dom);
        	for (String module : moduleList) {
        		try {
        			main = AdpXmlApplication.getFormatedPathMain(context, dom, module);
					src = AdpXmlApplication.getPathSource(context, dom, module);
					path = UtilFile.formatPath(main, src);
					beanDebug.getMapApplicationPath().put(module, new String[]{src, path});
				} catch (TransformerException ex) {
					Trace.ERROR(ToolDebug.class, ex);
				}
        	}

        	String application = beanDebug.getApplication();
        	String hostname = null;
        	int port = -1;
        	int timeout = 5 * 60 * 1000; // Default 5 minutes

        	try {
            	hostname = AdpXmlDebug.getHostname(context, dom, application);
            	try {
            		port = AdpXmlDebug.getPort(context, dom, application);
            	} catch (Exception ex) {
            		System.out.println("Debug port not found in application '" + application + "'");
            	}
            	try {
            		timeout = AdpXmlDebug.getTimeout(context, dom, application);
            	} catch (Exception ex) {
            		System.out.println("Debug timeout not found in application '" + application + "'");
            	}
        	} catch (Exception ex) {
                System.out.println("Debug hostname not found in application '" + application + "'");
        	}
        	System.out.println("Debug information hostname:'" + hostname + "' port:" + port + " timeout:" + timeout);

        	beanDebug.setHostname(hostname);
        	beanDebug.setPort(port);
        	beanDebug.setTimeout(timeout);
        }
	}

	private static void initializeBeanDebugBreakpoint(HttpSession session, BeanDebug beanDebug) {
		ServletContext context = session.getServletContext();
        Document dom = (Document)session.getAttribute("resultDom");
    	FileInputStream fos;
    	ObjectInputStream oos = null;
        try {
        	String application = beanDebug.getApplication();
			String pathMain = AdpXmlApplication.getFormatedPathMain(context, dom, application);
            if(UtilString.isNotEmpty(pathMain)) {
    	    	File fileMain = new File(pathMain, FILE_BREAKPOINT_PROPERTIE);
    	    	if (fileMain.exists() && fileMain.isFile()) {
    	    		fos = new FileInputStream(fileMain);
    	    		oos = new ObjectInputStream(fos);
    	    		Hashtable<String, Properties> tableBreakpoint = (Hashtable<String, Properties>)oos.readObject();

    	    		beanDebug.getTableBreakpoint().clear();
    	    		beanDebug.getTableBreakpoint().putAll(tableBreakpoint);
    	    	}
            }
		} catch (TransformerException e) {
			Trace.ERROR(ToolDebug.class, e);
	    } catch(IOException e){
			Trace.ERROR(ToolDebug.class, e);
		} catch (ClassNotFoundException e) {
			Trace.ERROR(ToolDebug.class, e);
		} finally {
            if (oos != null) {
				try {
		            oos.close();
				} catch (IOException e) {
					Trace.ERROR(ToolDebug.class, e);
				}
			}
		}
	}

	public static void writeBeanDebugBreakpoint(HttpSession session, BeanDebug beanDebug) {
		ServletContext context = session.getServletContext();
        Document dom = (Document)session.getAttribute("resultDom");
    	FileOutputStream fos;
    	ObjectOutputStream oos = null;
        try {
        	String application = beanDebug.getApplication();
			String pathMain = AdpXmlApplication.getFormatedPathMain(context, dom, application);
            if(UtilString.isNotEmpty(pathMain)) {
    	    	File fileMain = new File(pathMain, FILE_BREAKPOINT_PROPERTIE);
    	        fos = new FileOutputStream(fileMain);
    	        oos = new ObjectOutputStream(fos);
    			oos.writeObject(beanDebug.getTableBreakpoint());
            }
		} catch (TransformerException e) {
			Trace.ERROR(ToolDebug.class, e);
	    } catch(IOException e){
			Trace.ERROR(ToolDebug.class, e);
		} finally {
            if (oos != null) {
				try {
		            oos.flush();
		            oos.close();
				} catch (IOException e) {
					Trace.ERROR(ToolDebug.class, e);
				}
			}
		}
	}

	public static void initializeBreakpointPropertie(Properties properties, BreakpointRequest brkR) {
		for (Object key : properties.keySet()) {
			brkR.putProperty(key, properties.get(key));
		}
	}

	public static BreakpointRequest recreateBreakpoint(BeanDebug beanDebug, BreakpointRequest brkR) throws NumberFormatException, AbsentInformationException {
		int rowNum = Integer.parseInt((String) brkR.getProperty("line"));
		String className = (String) brkR.getProperty("className");
		return recreateBreakpoint(beanDebug, className, rowNum);
	}

	public static BreakpointRequest recreateBreakpoint(BeanDebug beanDebug, Properties propertie) throws NumberFormatException, AbsentInformationException {
		int rowNum = Integer.parseInt(propertie.getProperty("line"));
		String className = propertie.getProperty("className");
		return recreateBreakpoint(beanDebug, className, rowNum);
	}

	public static BreakpointRequest recreateBreakpoint(BeanDebug beanDebug, String className, int rowNum) throws AbsentInformationException {
		VirtualMachine virtualMachine = beanDebug.getVirtualMachine();
		EventRequestManager eventRequestManager = virtualMachine.eventRequestManager();
		// Supprime le point d'arret du beanDebug
		try {
			BreakpointRequest brkR = findBreakpoint(virtualMachine, className, rowNum);
			if (brkR.isEnabled()) {
				brkR.disable();
			}
			eventRequestManager.deleteEventRequest(brkR);
		} catch(Exception ex) {
			//Catch hide delete raison
		}
		// Cree un nouveau point d'arret
		BreakpointRequest ret = UtilJDI.createBreakpointRequest(virtualMachine, className, rowNum);
		return ret;
	}

	public static void recreateAllBreakpoint(BeanDebug beanDebug) {
		// Recréé la totalitée des points d'arret
		Hashtable<String, Properties> tableBreakpoint = beanDebug.getTableBreakpoint();
		if (tableBreakpoint!=null) {
			BreakpointRequest brkR = null;
			Properties propertie = null;
			for(String key : tableBreakpoint.keySet()) {
				propertie = tableBreakpoint.get(key);
				try {
					brkR = recreateBreakpoint(beanDebug, propertie);
					if (brkR!=null) {
						initializeBreakpointPropertie(propertie, brkR);
						brkR.enable();
					}
				} catch (NumberFormatException e) {
					Trace.ERROR(ToolDebug.class, e);
				} catch (AbsentInformationException e) {
					Trace.ERROR(ToolDebug.class, e);
				}
			}
		}
	}

	public static void deleteBreakpoint(BeanDebug beanDebug) throws NumberFormatException, AbsentInformationException {
		VirtualMachine virtualMachine = beanDebug.getVirtualMachine();
		EventRequestManager eventRequestManager = virtualMachine.eventRequestManager();

		List<?> breakpointRequests = eventRequestManager.breakpointRequests();
		int size = breakpointRequests.size();
		for(int i=0 ; i<size ; i++) {
			BreakpointRequest brkR = (BreakpointRequest)breakpointRequests.get(i);
			try {
				if (brkR.isEnabled()) {
					brkR.disable();
				}
				eventRequestManager.deleteEventRequest(brkR);
			} catch(Exception ex) {
				//Catch hide delete raison
			}
		}

		beanDebug.getTableBreakpoint().clear();
	}

	// NOT USED
	public static void stopRunning(BeanDebug beanDebug) {
		  ThrdDebugEventQueue thrdDebugEventQueue = beanDebug.getThrdDebugEventQueue();
		  if (thrdDebugEventQueue!=null) {
			  thrdDebugEventQueue.stopRunning();
		  }
	}
}