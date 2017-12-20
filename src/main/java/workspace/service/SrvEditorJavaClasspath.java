// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvEditorJavaXmlXsl.java

package workspace.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.xml.transform.TransformerException;

import org.w3c.dom.Document;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilFile;
import framework.ressource.util.UtilPackage;
import framework.ressource.util.UtilString;
import framework.ressource.util.UtilVector;
import workspace.adaptateur.application.AdpXmlApplication;

public class SrvEditorJavaClasspath extends SrvEditorJavaXmlXsl
{
	private Random rand = new Random();

    protected void doResponse(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean, String data) throws Exception {
        HttpSession session = request.getSession();
        ServletContext context = session.getServletContext();
        String application = request.getParameter("pApplication");
        Document domXml = (Document)session.getAttribute("resultDom");

    	List listClassPathWebInf = getClasspathWebInf(context);
    	List listClassPathJdk = getClasspathJdk(context, application, domXml);
    	List listClassPathJre = getClasspathJre(context, application, domXml);

        String classpath = extractClasspathElement(data);
    	String classPathSystem = null;//getClasspathSystem();
    	String classPathWebInf = toJson(listClassPathWebInf);
    	String classPathJdk = toJson(listClassPathJdk);
    	String classPathJre = toJson(listClassPathJre);

        StringBuffer pathClass = new StringBuffer("[{'id':'root0', 'text':'"+application+"', children: [");
        boolean next = false;
        next = addJsonClasspathChild(pathClass, classpath, "CLASSPATH", next);
        next = addJsonClasspathChild(pathClass, classPathSystem, "CLASSPATH_SYSTEM", next);
        next = addJsonClasspathChild(pathClass, classPathWebInf, "CLASSPATH_WEB-INF", next);
        next = addJsonClasspathChild(pathClass, classPathJdk, "CLASSPATH_JDK", next);
        next = addJsonClasspathChild(pathClass, classPathJre, "CLASSPATH_JRE", next);
        pathClass.append("]}]");

    	super.doResponse(request, response, bean, pathClass.toString());
    }

    private boolean addJsonClasspathChild(StringBuffer pathClass, String classpath, String rootName, boolean next) {
        if (classpath != null) {
        	if (next) {
            	pathClass.append(",");
        	}
        	pathClass.append("{'id':'"+rootName+"_"+rand.nextLong()+"', 'text':'"+rootName+"',");
//        	pathClass.append("children: [");
        	pathClass.append(classpath);
//        	pathClass.append("]");
        	pathClass.append("}");
        	return true;
        }
        return next;
    }

    private String toJson(List list) {
    	String ret = null;
    	if (list != null && !list.isEmpty()) {
    		ret = "";
	    	for(int i=0 ; i<list.size() ; i++) {
	    		String str = (String)list.get(i);
	    		str = UtilString.replaceAll(str, "\\", "\\\\");
	    		if (i>0) {
	    			ret += ",";
	    		}
	    		ret += "{" +
	    	        "'id':'"+rand.nextLong()+"'" +
	    		    ",'text':'"+str+"'" +
	    		    ",'leaf':'true'" +
	    		    "}";
	    	}
	    	ret = "children: [" + ret + "]";
    	}
    	return ret;
    }

    private String extractClasspathElement(String data) {
    	String ret = extractChildren(data);
    	ret = extractChildren(ret);
    	return "children: [" + ret + "]";
    }

    private String extractChildren(String data) {
    	String ret = "";
    	int idxStart = data.indexOf('[');
    	int idxEnd = data.lastIndexOf(']');
    	if(idxStart >= 0 && idxEnd > 0) {
    		ret = data.substring(idxStart + 1, idxEnd);
    	}
    	return ret;
    }

	private String getClasspathSystem() {
		return UtilPackage.getPackageClassPath();
	}

	private List getClasspathWebInf(ServletContext context) throws IOException {
		return getJar(context.getRealPath("WEB-INF"));
	}

	/**
	 * TODO A Factoriser avec la methode ci dessous
	 */
	private List getClasspathJdk(ServletContext context, String application, Document domXml) throws TransformerException, IOException {
		List ret = new ArrayList<>();
		//Recuperation de la home du jdk
		String szJdkpath = AdpXmlApplication.getJdkPathByName(context, domXml, application, "Home");
		// Recuperation du repertoire lib du jdk
		String szJdkLib = AdpXmlApplication.getJdkJrePathByName(context, domXml, application, "Lib");

		StringBuffer pathClass = new StringBuffer();
		if(UtilString.isNotEmpty(szJdkpath))
		{
		    File jdkPath = new File(szJdkpath);
		    if(jdkPath.exists()) {
		        if(UtilString.isNotEmpty(szJdkLib)) {
		        	File jreLib = szJdkLib.indexOf(':') <= 0 ? new File(jdkPath, szJdkLib) : new File(szJdkLib);
		            if(jreLib.exists()) {
	                    ret.addAll(getJar(jreLib.getCanonicalPath()));
		            }
		        }
		    }
		}
		return ret;
	}

	/**
	 * TODO A Factoriser avec la methode ci dessus
	 */
	private List getClasspathJre(ServletContext context, String application, Document domXml) throws TransformerException, IOException {
		List ret = new ArrayList<>();
		//Recuperation de la home du jdk
		String szJdkpath = AdpXmlApplication.getJdkPathByName(context, domXml, application, "Home");
		// Recuperation du repertoire home de la jre
		String szJreHome = AdpXmlApplication.getJdkJrePathByName(context, domXml, application, "Home");

		if(UtilString.isNotEmpty(szJdkpath))
		{
		    File jdkPath = new File(szJdkpath);
		    if(jdkPath.exists()) {
		        if(UtilString.isNotEmpty(szJreHome)) {
		        	File jreHome = szJreHome.indexOf(':') <= 0 ? new File(jdkPath, szJreHome) : new File(szJreHome);
		        	if (jreHome.exists()) {
		            	File jreLib = new File(jreHome, "lib");
		                if (jreLib.exists()) {
		                    ret.addAll(getJar(jreLib.getCanonicalPath()));
		                }
		        	}
		        }
		    }
		}
		return ret;
	}

    private void addToClasspath(List listJar, StringBuffer classpath) throws IOException {
        int max = UtilVector.safeSize(listJar);
        for(int i = 0; i < max; i++) {
        	classpath.append(";").append((String)UtilVector.safeGetElementAt(listJar, i));
        }
    }

    private List getJar(String path) throws IOException {
        return UtilFile.dir(path, true, ".jar");
    }
}
