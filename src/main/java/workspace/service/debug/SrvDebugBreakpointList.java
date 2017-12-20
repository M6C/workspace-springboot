package workspace.service.debug;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.URLEncoder;
import java.util.Hashtable;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilString;
import framework.service.SrvGenerique;
import workspace.bean.debug.BeanDebug;
import workspace.service.debug.tool.ToolDebug;

public class SrvDebugBreakpointList extends SrvGenerique {

	public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean) throws Exception {
		HttpSession session = request.getSession();
		String application = (String)bean.getParameterDataByName("application");
		BeanDebug beanDebug = null;
		try {
			beanDebug = ToolDebug.getBeanDebug(session, application);
		} catch (Exception ex) {
			StringWriter sw = new StringWriter();
			ex.printStackTrace(new PrintWriter(sw));
			request.setAttribute("msgText", sw.toString());
			throw ex;
		} finally {
			doResponse(request, response, bean, beanDebug);
		}
	}

	protected void doResponse(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean, BeanDebug beanDebug) throws Exception {
	    if (beanDebug != null) {
	    	String beanClassName = (String)bean.getParameterDataByName("className");
            Hashtable<String, Properties> tableBreakpoint = beanDebug.getTableBreakpoint();
            String ret = null;
            try {
                for(Properties propertie : tableBreakpoint.values()) {
    
            		// Recupere le nom de l'application du point d'arret
            		String application = URLEncoder.encode((String) propertie.getProperty("application"), "UTF-8");
            		// Recupere le chemin des sources de la class du point d'arret
            		String path = URLEncoder.encode((String) propertie.getProperty("path"), "UTF-8");
            		String sourceName = URLEncoder.encode((String) propertie.getProperty("fileName"), "UTF-8");
            		String className = URLEncoder.encode((String) propertie.getProperty("className"), "UTF-8");
            		String line = URLEncoder.encode((String) propertie.getProperty("line"), "UTF-8");

            		if (UtilString.isEmpty(beanClassName) || UtilString.isEquals(className, beanClassName)) {
            			ret = (ret == null) ? "" : ret + ";";
            			ret += application + ":" + path + ":" + sourceName + ":" + className + ":" + line;
            		}
                }
            } finally {
        		PrintWriter out = response.getWriter();
        		out.print(ret);
            }
	    }
	}
}