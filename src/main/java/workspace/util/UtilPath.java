package workspace.util;

import framework.beandata.BeanGenerique;
import framework.ressource.util.*;
import framework.trace.Trace;
import framework.ressource.util.UtilFile;
import java.io.File;
import java.io.IOException;
import java.util.Hashtable;
import javax.servlet.ServletContext;
import org.w3c.dom.Document;
import workspace.adaptateur.application.AdpXmlApplication;

public class UtilPath {
    private static UtilPath instance;

    public static UtilPath getInstance()
    {
        if(instance == null)
            instance = new UtilPath();
        return instance;
    }

    public static String formatPath(Document dom, String pathSrc) throws IOException {
        return formatPath(dom, ((String) (null)), new Hashtable(), pathSrc, ';');
    }

    public static String formatPath(Document dom, String pathSrc, char separator) throws IOException {
        return formatPath(dom, ((String) (null)), new Hashtable(), pathSrc, separator);
    }

    public static String formatPath(Document dom, Hashtable hash, String pathSrc) throws IOException {
        return formatPath(dom, ((String) (null)), hash, pathSrc, ';');
    }

    public static String formatPath(Document dom, Hashtable hash, String pathSrc, char separator) throws IOException {
        return formatPath(dom, ((String) (null)), hash, pathSrc, separator);
    }

    public static String formatPath(Document dom, String application, String pathSrc) throws IOException {
        return formatPath(dom, application, new Hashtable(), pathSrc, ';');
    }

    public static String formatPath(Document dom, String application, String pathSrc, char separator) throws IOException {
        return formatPath(dom, application, new Hashtable(), pathSrc, separator);
    }

    public static String formatPath(Document dom, String application, Hashtable hash, String pathSrc) throws IOException {
        return formatPath(dom, application, hash, pathSrc, ';');
    }

    public static String formatPath(Document dom, String application, Hashtable hash, String pathSrc, char separator) throws IOException {
        return formatPath(null, dom, application, hash, pathSrc, separator);
    }

    public static String formatPath(ServletContext context, Document dom, String pathSrc) throws IOException {
        return formatPath(context, dom, null, new Hashtable(), pathSrc, ';');
    }

    public static String formatPath(ServletContext context, Document dom, String pathSrc, char separator) throws IOException {
        return formatPath(context, dom, null, new Hashtable(), pathSrc, separator);
    }

    public static String formatPath(ServletContext context, Document dom, Hashtable hash, String pathSrc) throws IOException {
        return formatPath(context, dom, null, hash, pathSrc, ';');
    }

    public static String formatPath(ServletContext context, Document dom, Hashtable hash, String pathSrc, char separator) throws IOException {
        return formatPath(context, dom, null, hash, pathSrc, separator);
    }

    public static String formatPath(ServletContext context, Document dom, String application, String pathSrc) throws IOException {
        return formatPath(context, dom, application, new Hashtable(), pathSrc, ';');
    }

    public static String formatPath(ServletContext context, Document dom, String application, String pathSrc, char separator) throws IOException {
        return formatPath(context, dom, application, new Hashtable(), pathSrc, separator);
    }

    public static String formatPath(ServletContext context, Document dom, String application, Hashtable hash, String pathSrc) throws IOException {
        return formatPath(context, dom, application, hash, pathSrc, ';');
    }

    public static String formatPath(ServletContext context, Document dom, String application, Hashtable hash, String pathSrc, char separator) throws IOException {
        // Trace.DEBUG(getInstance(), (new StringBuilder("formatPath context:")).append(context).append(" dom:").append(dom).append(" application:").append(application).append(" hash:").append(hash).append(" pathSrc:").append(pathSrc).append(" separator:").append(separator).toString());
        String ret = null;
        try
        {
            String listPathSrc[] = UtilString.split(pathSrc, separator);
            int len = UtilSafe.safeListSize(listPathSrc);
            // Trace.DEBUG(getInstance(), (new StringBuilder("formatPath listPathSrc:")).append(listPathSrc).append(" len:").append(len).toString());
            if(len > 0)
            {
                File filePath = null;
                String path = null;
                int iDeb = 0;
                int iFin = 0;
                int iPos = 0;
                StringBuffer stb = new StringBuffer();
                for(int i = 0; i < len; i++)
                {
                    path = (String)UtilSafe.safeListGetElementAt(listPathSrc, i);
                    for(iPos = 0; iPos >= 0; iPos = iFin)
                    {
                        iDeb = path.indexOf('[', 0);
                        iFin = path.indexOf(']', iDeb);
                        // Trace.DEBUG(getInstance(), (new StringBuilder("formatPath path:")).append(path).append(" iPos:").append(iPos).append(" iDeb:").append(iDeb).append(" iFin:").append(iFin).toString());
                        if(iDeb >= 0 && iFin >= 0)
                        {
                            String szApplication = path.substring(iDeb + 1, iFin);
                            String filePathMain = (String)hash.get(szApplication);
                            if(filePathMain == null)
                                if(context == null)
                                    filePathMain = AdpXmlApplication.getPathMain(dom, szApplication);
                                else
                                    filePathMain = AdpXmlApplication.getFormatedPathMain(context, dom, szApplication);
                            // Trace.DEBUG(getInstance(), (new StringBuilder("formatPath szApplication:")).append(szApplication).append(" filePathMain:").append(filePathMain).toString());
                            if(UtilString.isNotEmpty(filePathMain))
                            {
                                // Trace.DEBUG(getInstance(), (new StringBuilder("formatPath filePathMain isNotEmpty:")).append(filePathMain).toString());
                                hash.put(szApplication, filePathMain);
                                if(!filePathMain.toUpperCase().startsWith("FTP://"))
                                {
                                    path = (new StringBuffer(path)).replace(iDeb, iFin + 1, filePathMain).toString();
                                    path = path.replace(File.separatorChar != '\\' ? '\\' : '/', File.separatorChar);
                                } else
                                {
                                    path = filePath.getCanonicalPath();
                                }
                            }
                        } else
                        if(UtilString.isNotEmpty(application) && !UtilFile.isPathAbsolute(path))
                        {
                            // Trace.DEBUG(getInstance(), (new StringBuilder("formatPath application isNotEmpty:")).append(application).toString());
                            String filePathApp = null;
                            if(context == null)
                                filePathApp = AdpXmlApplication.getPathMain(dom, application);
                            else
                                filePathApp = AdpXmlApplication.getFormatedPathMain(context, dom, application);
                            path = (new File(filePathApp, path)).getCanonicalPath();
                        }
                        // Trace.DEBUG(getInstance(), (new StringBuilder("formatPath path:")).append(path).toString());
                    }

                    if(stb.length() > 0)
                        stb.append(";");
                    stb.append(path);
                }

                ret = stb.toString();
            }
        }
        catch(Exception ex)
        {
            Trace.ERROR(ex);
        }
        return ret;
    }

    public static String extractPathApplication(String path) {
    	String ret = null;

    	int iDeb = path.indexOf('[', 0);
        int iFin = path.indexOf(']', iDeb);
        if(iDeb >= 0 && iFin >= 0) {
            ret = path.substring(iDeb + 1, iFin);
        }

    	return ret;
    }

    public static String getApplication(BeanGenerique bean, String path) {
    	String ret = extractPathApplication(path);
        if (ret == null) {
        	ret = (String)bean.getParameterDataByName("application");
        }
    	return ret;
    }
}