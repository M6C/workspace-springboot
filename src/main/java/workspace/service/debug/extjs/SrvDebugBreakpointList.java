package workspace.service.debug.extjs;

import java.io.PrintWriter;
import java.net.URLEncoder;
import java.util.Hashtable;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilString;
import workspace.bean.debug.BeanDebug;

public class SrvDebugBreakpointList extends workspace.service.debug.SrvDebugBreakpointList {

	public void init() {
	}

	protected void doResponse(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean, BeanDebug beanDebug) throws Exception {
	    if (beanDebug != null) {
			String beanClassName = (String)bean.getParameterDataByName("className");
            Hashtable<String, Properties> tableBreakpoint = beanDebug.getTableBreakpoint();
            String ret = "{\"success\":true,\"children\":[";
            int cnt = 0;
            try {
                for(Properties propertie : tableBreakpoint.values()) {
                    if (cnt > 0) {
                        ret += ",";
                    }
    
            		// Recupere le nom de l'application du point d'arret
            		String application = getProperty(propertie, "application");
            		// Recupere le chemin des sources de la class du point d'arret
            		String sourceName = getProperty(propertie, "fileName");
            		String className = getProperty(propertie, "className");
            		String line = getProperty(propertie, "line");

            		if (UtilString.isEmpty(beanClassName) || UtilString.isEquals(className, beanClassName)) {
	            		ret += "{application:'" + application + "',line:" + line + ",classname:'" + className + "',filename:'" + sourceName + "'}";
	            		cnt++;
            		}
                }
            } finally {
                ret += "]}";

        		PrintWriter out = response.getWriter();
        		out.print(ret);
            }
	    }
	}

	private String getProperty(Properties propertie, String name) {
		String ret = "";
		try {
			ret = URLEncoder.encode((String) propertie.getProperty(name), "UTF-8");
		} catch(Exception ex) {
        	System.err.println("SrvDebugBreakpointList getProperty '" + name + "' error message:" + ex.getMessage());
		}
		return ret;
	}
}