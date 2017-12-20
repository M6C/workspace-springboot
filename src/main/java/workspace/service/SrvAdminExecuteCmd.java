package workspace.service;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilString;
import framework.service.SrvGenerique;
import framework.trace.Trace;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.util.Date;

import javax.jms.Session;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.w3c.dom.Document;

import workspace.adaptateur.application.AdpXmlApplication;
import workspace.bean.BeanRuntime;

public class SrvAdminExecuteCmd extends SrvGenerique {

    protected static final String OUT_PREFIX = "[OUT]";
    protected static final String ERR_PREFIX = "[ERR]";
    protected static final String SESSION_ATTRIBUT_BEAN_RUNTIME = "beanRuntimeExecCmd";

	public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean) throws Exception {
        String application = (String) bean.getParameterDataByName("application");
        String commandLine = (String) bean.getParameterDataByName("commandLine");
        String result = "";
    	String line = "";
        try {
            HttpSession session = request.getSession();

            if (UtilString.isEmpty(application)) {
                result = "execute application is empty.";
                session.removeAttribute(SESSION_ATTRIBUT_BEAN_RUNTIME);
            	Trace.OUT(this, result);
                return;
            }
    
            ServletContext context = session.getServletContext();
            Document dom = (Document)request.getSession().getAttribute("resultDom");
    
            StringBuffer stb = new StringBuffer();
    	    StringBuffer sbCmd = new StringBuffer();

            if (UtilString.isNotEmpty(commandLine)) {
            	for(String cmd : commandLine.split("\n")) {
            		cmd = cmd.trim();
            		if (UtilString.isNotEmpty(cmd) && !cmd.startsWith(OUT_PREFIX) && !cmd.startsWith(ERR_PREFIX)) {
    			        sbCmd.append(cmd + "\r\n");
            		}
            	}
            } else {
                String filePathMain = AdpXmlApplication.getFormatedPathMain(context, dom, application);
                if (UtilString.isEmpty(filePathMain)) {
                    result = "execute application:"+application+" main path is empty.";
                	Trace.ERROR(this, result);
                    return;
                }
    
    	        sbCmd.append("cd ").append(filePathMain).append("\r\n");
            }

            FileWriter out = null;
        	try {
            	File cmdFile = File.createTempFile("Exec_Cmd_" + Long.toString(new Date().getTime()), ".cmd");
        	    out = new FileWriter(cmdFile);
    			out.write(sbCmd.toString());
    			out.close();
    			out = null;

            	line = cmdFile.getAbsolutePath(); //"cmd /C " + cmdFile.getAbsolutePath();
			    execCmd(session, line, stb);
        	} finally {
        		if (out != null) {
        			out.close();
        		}
        	}

        	result = stb.toString();
        }
        catch(Exception ex) {
            ByteArrayOutputStream streamLog = new ByteArrayOutputStream();
            PrintStream psLog = new PrintStream(streamLog);
            ex.printStackTrace(psLog);
            result = ERR_PREFIX + " " + streamLog.toString();
            Trace.ERROR(this, ex);
        } finally {
        	if (UtilString.isEmpty(result)) {
        		result = OUT_PREFIX;
        	}
        	doResponse(request, response, bean, result);
        	Trace.DEBUG(this, (new StringBuilder("execute application:'")).append(application).append("'").toString());
        	Trace.DEBUG(this, (new StringBuilder("execute commandLine:'")).append(commandLine).append("'").toString());
        	Trace.DEBUG(this, (new StringBuilder("execute temp script:'")).append(line).append("'").toString());
        	Trace.DEBUG(this, (new StringBuilder("execute result:'")).append(result).append("'").toString());
        }
    }

    protected void doResponse(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean, String content) throws Exception {
        request.setAttribute("resultCommandLine", content);
    }

    private void execCmd(HttpSession session, String commandLine, StringBuffer stb) throws IOException, InterruptedException {
        if (UtilString.isNotEmpty(commandLine)) {
	        Runtime runtime = null;
	        BeanRuntime beanRuntime = (BeanRuntime)session.getAttribute(SESSION_ATTRIBUT_BEAN_RUNTIME);
	        if (beanRuntime == null) {
	            beanRuntime = new BeanRuntime();
		        session.setAttribute(SESSION_ATTRIBUT_BEAN_RUNTIME, beanRuntime);
                runtime = Runtime.getRuntime();
	        } else {
	            runtime = beanRuntime.getRuntime();
	        }
	        Process p = runtime.exec(commandLine);
            p.waitFor();
            if (stb != null) {
                BufferedReader out = new BufferedReader(new InputStreamReader(p.getInputStream()));
                for(String str = out.readLine(); str != null; str = out.readLine()) {
                    stb.append(OUT_PREFIX).append(" ").append(str).append("\r\n");
                }
            }
            p.destroy();
        }
    }
}