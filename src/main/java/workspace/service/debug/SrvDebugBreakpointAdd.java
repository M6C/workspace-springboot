package workspace.service.debug;

import com.sun.jdi.VirtualMachine;
import com.sun.jdi.request.BreakpointRequest;
import com.sun.jdi.request.EventRequestManager;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilString;
import framework.ressource.util.jdi.UtilJDI;
import framework.service.SrvGenerique;
import framework.trace.Trace;

import java.io.File;
import java.io.PrintWriter;
import java.io.Serializable;
import java.io.StringWriter;
import java.util.Hashtable;
import java.util.Properties;
import java.util.StringTokenizer;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.Queue;
import javax.jms.QueueConnection;
import javax.jms.QueueConnectionFactory;
import javax.jms.QueueSender;
import javax.jms.QueueSession;
import javax.jms.Session;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NameAlreadyBoundException;
import javax.naming.NameNotFoundException;
import javax.naming.NamingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.w3c.dom.Document;

import workspace.adaptateur.application.AdpXmlApplication;
import workspace.bean.debug.BeanDebug;
import workspace.service.debug.tool.ToolDebug;
import workspace.util.UtilPath;

/**
 *
 * a servlet handles upload request.<br>
 * refer to http://www.ietf.org/rfc/rfc1867.txt
 * 
 */

public class SrvDebugBreakpointAdd extends SrvGenerique {

    private File file = null;

    public void init() {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean) throws Exception {
      String szLigne = (String)bean.getParameterDataByName("breakpointLine");
      String application = (String)bean.getParameterDataByName("application");
      String path = (String)bean.getParameterDataByName("pathToExpand");
      String fileName = (String)bean.getParameterDataByName("FileName");
      String className = (String)bean.getParameterDataByName("className");
      boolean success = false;
      if (UtilString.isNotEmpty(szLigne)){
          HttpSession session = request.getSession();
          BeanDebug beanDebug = ToolDebug.getBeanDebug(session, application);
          VirtualMachine virtualMachine = null;
          Hashtable<String, Properties> tableBreakpoint = null;
          String result = "";
          String text = "";
          String key = className+":"+szLigne;
          try {
	          if (beanDebug==null) {
	        	text = "BeanDebug not found. Can't Add Breakpoint.";
	          	Trace.WARNING(this, text);
	          	return;
	          }
	          tableBreakpoint = beanDebug.getTableBreakpoint();
	          virtualMachine = beanDebug.getVirtualMachine();
	          if (virtualMachine==null) {
	          	text = "VirtualMachine not found. Can't Add Breakpoint.";
	          	if (UtilString.isNotEmpty(beanDebug.getMessageError())) {
	          		text += " " + beanDebug.getMessageError();
	          		beanDebug.setMessageError(null);
	          	}
	          	Trace.WARNING(this, text);
	        	return;
	          }
    
              Document domXml = (Document)session.getAttribute("resultDom");
              boolean readFile = false;
              if (UtilString.isNotEmpty(className)) {
              } else if (UtilString.isNotEmpty(application) &&
                UtilString.isNotEmpty(fileName) &&
                UtilString.isNotEmpty(path)) {
                  String filePathMain = AdpXmlApplication.getPathMain(domXml, application);
                  File filePath = new File(filePathMain, path);
                  file = new File(filePath, fileName);
                  readFile = true;
              } else if (UtilString.isNotEmpty(fileName)) {
                String filenameFormated = UtilPath.formatPath(domXml, application, fileName);
                file = new File(filenameFormated);
                readFile = true;
              } else {
                  return;
              }
              if (readFile) {
                  className = ToolDebug.readClassnameFromFile(file);
              }

              Integer rowNum = new Integer(szLigne);

              EventRequestManager eventRequestManager = virtualMachine.eventRequestManager();
              BreakpointRequest brkR = ToolDebug.findBreakpoint(virtualMachine, className, rowNum.intValue());
              if (brkR==null) {
//TODO The method createVirtualMachine(String, Integer) from the type UtilJDI refers to the missing type VirtualMachine
                 brkR = UtilJDI.createBreakpointRequest(virtualMachine, className, rowNum);
                 if (brkR!=null) {
                	 Properties prop = initBreakpointProperties(bean, brkR);
                     
                     tableBreakpoint.put(key, prop);
                     
                     text = "added";
                     success = true;
                 }
                 else {
                     text = "Can't create breakpoint class '" + className + "' not found.";
                 }
              } else {
                  eventRequestManager.deleteEventRequest(brkR);
                  tableBreakpoint.remove(key);
                  text = "deleted";
                  success = true;
              }
/*
// get the initial context, refer to your app server docs for this
Context ctx = new InitialContext();
addToJNDI(ctx, "/workspace/debug/breakpoint", request.getSession().getId(), thread);
//          addToQueue(ctx, "/queue", request.getSession().getId(), thread);
*/
          }
          catch(Exception ex) {
        	  session.removeAttribute("beanDebug");
              StringWriter sw = new StringWriter();
              ex.printStackTrace(new PrintWriter(sw));
              request.setAttribute("msgText", sw.toString());
              throw ex;
          }
          finally {
              result = key+":"+text;
              if (virtualMachine!=null) {
                  virtualMachine.resume();
              }
//              Event currentEvent = beanDebug.getCurrentEvent();
//              if (currentEvent == null) {
//            	  beanDebug.setVirtualMachine(null);
//            	  ThrdDebugEventQueue thrdDebug = beanDebug.getThrdDebugEventQueue();
//            	  if (thrdDebug != null) {
//            		  thrdDebug.resume();
//            	  }
//            	  beanDebug.setThrdDebugEventQueue(null);
//              } else if (virtualMachine!=null) {
//            	  virtualMachine.dispose();
//              }
              if (!success && tableBreakpoint != null) {
                 tableBreakpoint.remove(key);
              }
        	  ToolDebug.writeBeanDebugBreakpoint(session, beanDebug);
              doResponse(request, response, bean, result, success);
          }
      }
    }

    protected Properties initBreakpointProperties(BeanGenerique bean, BreakpointRequest brkR) throws Exception {
    	Properties ret = new Properties();
        String line = (String)bean.getParameterDataByName("breakpointLine");
        String application = (String)bean.getParameterDataByName("application");
        String path = (String)bean.getParameterDataByName("pathToExpand");
        String className = (String)bean.getParameterDataByName("className");

        // Stock le numero de ligne du point d'arret
        ret.put("line", line);
        // Stock le nom de l'application dans le point d'arret
        ret.put("application", application);
        // Stock le chemin des sources de la class dans le point d'arret
        ret.put("path", path);
        // Stock le nom de la class dans le point d'arret
        ret.put("className", className);
        if (file != null) {
            // Stock le nom du fichier dans le point d'arret
        	ret.put("fileName", file.getName());
        }

        ToolDebug.initializeBreakpointPropertie(ret, brkR);

        return ret;
    }
        
    protected void doResponse(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean, String result, boolean success) throws Exception {
        PrintWriter out = response.getWriter();
        out.write(result);
    }

    protected void addToJNDI(Context ctx, String path, String name, Serializable object) throws NamingException {
        ctx = createContext(ctx, path);
        try {
            ctx.bind(name, object);
        }
        catch(NameAlreadyBoundException ex) {
            ctx.rebind(name, object);
        }
    }
    protected void addToQueue(Context ctx, String path, String name, Serializable object) throws NamingException, JMSException {
      QueueConnection queueCon = null;
      try {
          // get the connection factory, and open a connection
          QueueConnectionFactory qcf = (QueueConnectionFactory) ctx.lookup("ConnectionFactory");
          queueCon = qcf.createQueueConnection();
          // create queue session off the connection
          QueueSession queueSession = queueCon.createQueueSession(false, Session.AUTO_ACKNOWLEDGE );
          // get handle on queue, create a sender and send the message
          Queue queue = null;
//          String queueName = "jms/workspace/debug/breakpoint/" + request.getSession().getId();
          ctx = createContext(ctx, path);
          queue = queueSession.createQueue(name);//(Queue)ctx.lookup("jms/queue/devilman");
          if (queue!=null) {
            QueueSender sender = queueSession.createSender(queue);
//            Message msg = queueSession.createTextMessage( "hello..." );
//            sender.send( msg );
            Message msg = queueSession.createObjectMessage(object);
            sender.send(msg);              
            System.out.println( "sent the message" );
          }
      }
      finally {
          // close the queue connection
          if( queueCon != null ) {
              queueCon.close();
          }
      }
    }
    
    protected Context createContext(Context ctx, String path) throws NamingException {
        Object o = null;
        String name = null;
        StringTokenizer st = new StringTokenizer(path, "/");
        while(st.hasMoreTokens()) {
            name = st.nextToken();
            try {
                o = ctx.lookup(name);
                if (o instanceof Context)
                    ctx = (Context)o;
                else
                    break;
            } catch(NameNotFoundException ex) {
                ctx = ctx.createSubcontext(name);
            }
        }
        return ctx;
    }
}