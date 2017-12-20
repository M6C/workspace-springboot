package workspace.business;

import framework.ressource.util.UtilFile;
import framework.ressource.util.UtilPackage;
import framework.ressource.util.UtilPackageResource;
import framework.ressource.util.UtilString;
import framework.ressource.util.UtilVector;
import framework.trace.Trace;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;
import java.util.zip.ZipEntry;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.xml.transform.TransformerException;

import org.w3c.dom.Document;

import workspace.adaptateur.application.AdpXmlApplication;
import workspace.business.BusinessClasspath;
import workspace.business.BusinessWorkspace;
import workspace.util.UtilPath;

public class BusinessClasspath {

	public static void initializeApplication(HttpServletRequest request, String application, Document domXml) throws TransformerException, IOException {
		// Trace.DEBUG(BusinessClasspath.class, "BusinessClasspath initializeApplication application:" + application + " getClassPath");
        getClassPath(request, application, domXml);
		// Trace.DEBUG(BusinessClasspath.class, "BusinessClasspath initializeApplication application:" + application + " getClassPathList");
	    getClassPathList(request, application, domXml);
		// Trace.DEBUG(BusinessClasspath.class, "BusinessClasspath initializeApplication application:" + application + " getClassList");
	    getClassList(request, application, domXml);
	}

	public static String getClassPath(HttpServletRequest request, String application, Document domXml) throws TransformerException, IOException {
        String ret = BusinessWorkspace.getClassPath(request, application);
        if (ret == null) {
 			Trace.DEBUG(BusinessClasspath.class, "BusinessClasspath getClassPath not in cache application:" + application);
            List<String> list = getClassPathList(request, application, domXml); 
            ret = String.join(";", list);
            BusinessWorkspace.setClassPath(request, application, ret);
        } else {
 			Trace.DEBUG(BusinessClasspath.class, "BusinessClasspath getClassPath from cache application:" + application);
        }

		return ret;
	}

	public static List<String> getClassPathList(HttpServletRequest request, String application, Document domXml) throws TransformerException, IOException {
        HttpSession session = request.getSession();
        ServletContext context = session.getServletContext();

		List<String> pathClass = BusinessWorkspace.getClassPathList(request, application);
        if (pathClass == null) {
 			Trace.DEBUG(BusinessClasspath.class, "BusinessClasspath getClassPathList not in cache application:" + application);
		    pathClass = new ArrayList<String>();
    		//Recuperation du ClassPath
            String szClasspath = AdpXmlApplication.getClassPathAll(context, domXml, application);
            szClasspath = (szClasspath == null) ? szClasspath : UtilPath.formatPath(domXml, szClasspath);
    //        String szAppClasspath = AdpXmlApplication.getPathByName(context, domXml, application, "Class");//, false);
    		//Recuperation de la home du jdk
    		String szJdkpath = AdpXmlApplication.getJdkPathByName(context, domXml, application, "Home");
    		// Recuperation du repertoire lib du jdk
    		String szJdkLib = AdpXmlApplication.getJdkJrePathByName(context, domXml, application, "Lib");
    		// Recuperation du repertoire home de la jre
    		String szJreHome = AdpXmlApplication.getJdkJrePathByName(context, domXml, application, "Home");
    
    //		if(UtilString.isNotEmpty(szAppClasspath)) {
    //        	if (!UtilFile.isPathAbsolute(szAppClasspath)) {
    //                szAppClasspath = UtilPath.formatPath(domXml, application, szAppClasspath);
    //        	}
    //		    pathClass.add(szAppClasspath);
    //		}
            if (szClasspath != null) {
    		    pathClass.addAll(Arrays.asList(szClasspath.split(";")));
            }
    		addJarToClassPath(context.getRealPath("WEB-INF"), pathClass);
    		pathClass.add(UtilPackage.getPackageClassPath());
    		if(UtilString.isNotEmpty(szJdkpath)) {
    		    File jdkPath = new File(szJdkpath);
    		    if(jdkPath.exists()) {
    		        if(UtilString.isNotEmpty(szJreHome)) {
    		        	File jreHome = szJreHome.indexOf(':') <= 0 ? new File(jdkPath, szJreHome) : new File(szJreHome);
    		        	if (jreHome.exists()) {
    		            	File jreLib = new File(jreHome, "lib");
    		                if (jreLib.exists()) {
    		                    addJarToClassPath(jreLib.getCanonicalPath(), pathClass);
    		                }
    		        	}
    		        }
    		        if(UtilString.isNotEmpty(szJdkLib)) {
    		        	File jreLib = szJdkLib.indexOf(':') <= 0 ? new File(jdkPath, szJdkLib) : new File(szJdkLib);
    		            if(jreLib.exists()) {
    		                addJarToClassPath(jreLib.getCanonicalPath(), pathClass);
    		            }
    		        }
    		    }
    		}
            BusinessWorkspace.setClassPathList(request, application, pathClass);
        } else {
 			Trace.DEBUG(BusinessClasspath.class, "BusinessClasspath getClassPathList from cache application:" + application);
        }
		return pathClass;
	}

	public static Map<String, List<String>> getClassList(HttpServletRequest request, String application, Document domXml) throws TransformerException, IOException {
	    Map<String, List<String>> classList = BusinessWorkspace.getClassPathClassList(request, application);
	    if (classList == null) {
 			Trace.DEBUG(BusinessClasspath.class, "BusinessClasspath getClassList not in cache application:" + application);
            List<String> classpath = getClassPathList(request, application, domXml);
            classList = getClassList(classpath);
            BusinessWorkspace.setClassPathClassList(request, application, classList);
	    } else {
 			Trace.DEBUG(BusinessClasspath.class, "BusinessClasspath getClassList from cache application:" + application);
	    }
	    return classList;
	}

    private static Map<String, List<String>> getClassList(List<String> listPath) throws IOException {
        String ext = ".class";
        int extLen = ext.length();
        Map<String, List<String>> mapPathClass = new HashMap<String, List<String>>();

        int size = listPath.size();
        for(int i=0 ; i<size ; i++) {
            String path = listPath.get(i);
            if (UtilString.isEmpty(path)) {
    			Trace.DEBUG("BusinessClasspath getClassList empty path");
            	continue;
            }
            File file = new File(path);
            if (!file.exists()) {
    			Trace.DEBUG("BusinessClasspath getClassList '"+path+"' do not exist");
            	continue;
            }
            //Trace.DEBUG("BusinessClasspath file[" + i + "/" + size + "]:" + file.getAbsolutePath());
            if (file.isDirectory()) {
				Vector listClass = UtilFile.dir(path, true, ext + ";.jar", true);
		        int max = UtilVector.safeSize(listClass);
		        for(int k = 0; k < max; k++) {
                	String className = (String)UtilVector.safeGetElementAt(listClass, k);
                    if (className.endsWith(ext) && className.indexOf('$') < 0) {
                    	className = className.replaceAll("[/\\\\]", ".").substring(0, className.length()-extLen);
                        addClass(mapPathClass, path, className);
                    } else if (className.endsWith(".jar")) {
                    	listPath.add(new File(new File(path), className).getAbsolutePath());
                    	size++;
                    }
		        }
            } else {
                ZipEntry[] entries = UtilPackageResource.getZipEntries(file);
                if (entries == null) {
        			// Trace.DEBUG("BusinessClasspath getClassList '"+path+"' has no entrie");
                	continue;
                }
                int entriesLen = entries.length;
                for(int j=0;j<entriesLen;j++) {
                    ZipEntry entry = entries[j];
                    if (entry != null && !entry.isDirectory()) {
                        String entryName=entry.getName();
                        String entryNameLow = entryName.toLowerCase();
                        if (entryNameLow.endsWith(ext) && entryNameLow.indexOf('$') < 0) {
                        	String className = entryName.replaceAll("[/\\\\]", ".").substring(0, entryName.length()-extLen);
                        	//Trace.DEBUG("BusinessClasspath file[" + j + "/" + entriesLen + "] className:" + className);
                            addClass(mapPathClass, path, className);
                        }
                    }
                }
            }
        }
        return mapPathClass;
    }

    private static void addClass(Map<String, List<String>> mapPathClass, String path, String className) {
        List<String> list = mapPathClass.get(path);
        if (list == null) {
            list = new ArrayList<String>();
            mapPathClass.put(path, list);
        }
        list.add(className);
    }

    private static void addJarToClassPath(String path, List<String> classpath) throws IOException {
        Vector listJar = UtilFile.dir(path, true, ".jar");
        int max = UtilVector.safeSize(listJar);
        for(int i = 0; i < max; i++) {
            classpath.add((String)UtilVector.safeGetElementAt(listJar, i));
        }

    }
}