package workspace.business;

import framework.trace.Trace;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.xml.transform.TransformerException;

import workspace.bean.BeanWorkspace;
import workspace.business.BusinessWorkspace;

public class BusinessWorkspace {

    private BusinessWorkspace() {
    }

	public static String getClassPath(HttpServletRequest request, String application) throws TransformerException, IOException {
	    BeanWorkspace beanWorkspace = getBeanWorkspaceOrInitialize(request);

        String classPath = beanWorkspace.getDataString(application, BeanWorkspace.KEY_CLASSPATH_STRING);
		Trace.DEBUG(BusinessWorkspace.class, "BusinessWorkspace getClassPath application:" + application + " classpath:" + (classPath != null && classPath.length() > 100 ? classPath.substring(0, 100) : classPath));
		return classPath;
	}

	public static void setClassPath(HttpServletRequest request, String application, String classpath) throws TransformerException, IOException {
		Trace.DEBUG(BusinessWorkspace.class, "BusinessWorkspace setClassPath application:" + application + " classpath:" + (classpath != null && classpath.length() > 100 ? classpath.substring(0, 100) : classpath));
	    BeanWorkspace beanWorkspace = getBeanWorkspaceOrInitialize(request);

	    beanWorkspace.setDataString(application, BeanWorkspace.KEY_CLASSPATH_STRING, classpath);
	}

	public static List<String> getClassPathList(HttpServletRequest request, String application) throws TransformerException, IOException {
	    BeanWorkspace beanWorkspace = getBeanWorkspaceOrInitialize(request);

        List<String> classPathList = beanWorkspace.getListString(application, BeanWorkspace.KEY_CLASSPATH_LIST);
		Trace.DEBUG(BusinessWorkspace.class, "BusinessWorkspace getClassPathList application:" + application + " classpathList.size:" + (classPathList != null ? classPathList.size() : 0));
		return classPathList;
	}

	public static void setClassPathList(HttpServletRequest request, String application, List<String> classpath) throws TransformerException, IOException {
 		Trace.DEBUG(BusinessWorkspace.class, "BusinessWorkspace setClassPathList application:" + application + " classpath.length:" + (classpath != null ? classpath.size() : classpath));
	    BeanWorkspace beanWorkspace = getBeanWorkspaceOrInitialize(request);

	    beanWorkspace.setListString(application, BeanWorkspace.KEY_CLASSPATH_STRING, classpath);
	}

	public static Map<String, List<String>> getClassPathClassList(HttpServletRequest request, String application) throws TransformerException, IOException {
	    BeanWorkspace beanWorkspace = getBeanWorkspaceOrInitialize(request);

        Map<String, List<String>> classPathList = beanWorkspace.getMapString(application, BeanWorkspace.KEY_CLASSPATH_CLASS_LIST);
		Trace.DEBUG(BusinessWorkspace.class, "BusinessWorkspace getClassPathClassList application:" + application + " classpathList.size:" + (classPathList != null ? classPathList.size() : 0));
		return classPathList;
	}

	public static void setClassPathClassList(HttpServletRequest request, String application, Map<String, List<String>> classpath) throws TransformerException, IOException {
 		Trace.DEBUG(BusinessWorkspace.class, "BusinessWorkspace setClassPathClassList application:" + application + " classpath.length:" + (classpath != null ? classpath.size() : classpath));
	    BeanWorkspace beanWorkspace = getBeanWorkspaceOrInitialize(request);

	    beanWorkspace.setMapString(application, BeanWorkspace.KEY_CLASSPATH_CLASS_LIST, classpath);
	}

    private static BeanWorkspace getBeanWorkspace(HttpServletRequest request) {
        HttpSession session = request.getSession();
	    BeanWorkspace beanWorkspace = (BeanWorkspace)session.getAttribute(BeanWorkspace.KEY_SESSION_HTTP);
	    if (beanWorkspace == null) {
 			Trace.DEBUG(BusinessWorkspace.class, "BusinessWorkspace new BeanWorkspace create. Set in session with key:" + BeanWorkspace.KEY_SESSION_HTTP);
	    } else {
 			Trace.DEBUG(BusinessWorkspace.class, "BusinessWorkspace BeanWorkspace find with key:" + BeanWorkspace.KEY_SESSION_HTTP);
	    }
	    return beanWorkspace;
    }

    private static BeanWorkspace getBeanWorkspaceOrInitialize(HttpServletRequest request) {
	    BeanWorkspace beanWorkspace = getBeanWorkspace(request);
	    if (beanWorkspace == null) {
            HttpSession session = request.getSession();
	        beanWorkspace = new BeanWorkspace();
            session.setAttribute(BeanWorkspace.KEY_SESSION_HTTP, beanWorkspace);
	    }
	    return beanWorkspace;
    }
}