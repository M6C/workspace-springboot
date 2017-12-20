package workspace.service.extjs;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilString;
import framework.service.SrvGenerique;
import framework.trace.Trace;

import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Vector;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.w3c.dom.Document;

import workspace.adaptateur.application.AdpXmlApplication;
import workspace.adaptateur.application.AdpXmlServer;
import workspace.util.UtilFile;
import workspace.util.UtilPath;

public class SrvTreeDirectory extends SrvGenerique {

    private static final String CONTENT_TYPE_DEFAULT = "text/plain";
    private static final String CONTENT_TYPE_DIRECTORY = "directory";

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean) throws Exception {
        HttpSession session = request.getSession();
        ServletContext context = session.getServletContext();
        String application = (String)bean.getParameterDataByName("application");
        String path = (String)bean.getParameterDataByName("path");
        String withContentType = (String)bean.getParameterDataByName("contentType");
        String noContentType = (String)bean.getParameterDataByName("noContentType");
        String nameFilter = (String)bean.getParameterDataByName("nameFilter");
        String contentFilter = (String)bean.getParameterDataByName("contentFilter");
        String extentionFilter = (String)bean.getParameterDataByName("extentionFilter");
        String recursive = (String)bean.getParameterDataByName("recursive");
        String ignoreCase = (String)bean.getParameterDataByName("ignoreCase");
        String withSubDirectory = (String)bean.getParameterDataByName("withSubDirectory");
        String pathMain = null;
        String pathSrc = null;
        String jsonData = null;
        String pathFormated = null;
        try {
            if (UtilString.isNotEmpty(nameFilter)) {
            	nameFilter = nameFilter.trim();
            	String app = UtilPath.getInstance().extractPathApplication(nameFilter);
            	if (UtilString.isNotEmpty(app)) {
            	    application = app;
            	    nameFilter = nameFilter.substring(nameFilter.indexOf(']')+1);
            	}
            }

        	if (UtilString.isNotEmpty(contentFilter)) {
            	contentFilter = contentFilter.trim();
            }
            if (UtilString.isNotEmpty(extentionFilter)) {
            	String app = UtilPath.getInstance().extractPathApplication(extentionFilter);
            	if (UtilString.isNotEmpty(app)) {
            	    application = app;
            	    extentionFilter = extentionFilter.substring(extentionFilter.indexOf(']')+1);
            	}
            }

            if(UtilString.isEmpty(application) && UtilString.isNotEmpty(path)) {
            	application = UtilPath.extractPathApplication(path);
            	if (application != null) {
            		path = path.substring(application.length()+2);
            	}
            }

            if(UtilString.isNotEmpty(application)) {
                Document dom = (Document)request.getSession().getAttribute("resultDom");
                pathMain = AdpXmlApplication.getFormatedPathMain(context, dom, application);
                pathSrc = AdpXmlApplication.getPathSource(context, dom, application);
	            final boolean isAutoDeploy = AdpXmlServer.isAutoDeploy(context, dom, application);
                final boolean bIgnoreCase = (recursive == null ? false : Boolean.valueOf(ignoreCase));
                final boolean bRecursive = (recursive == null ? false : Boolean.valueOf(recursive));
                final boolean bWithSubDirectory = (withSubDirectory == null ? true : Boolean.valueOf(withSubDirectory));
                // Trace.DEBUG(this, new StringBuilder("execute pathMain:").append(pathMain).toString());
                // Trace.DEBUG(this, new StringBuilder("execute pathSrc:").append(pathSrc).toString());
                // Trace.DEBUG(this, new StringBuilder("execute ignoreCase:").append(bIgnoreCase).append(" recursive:").append(bRecursive).append(" withSubDirectory:").append(bWithSubDirectory).toString());
                if(UtilString.isNotEmpty(pathMain)) {
                    if(pathMain.toUpperCase().startsWith("FTP://"))
                    {
                        // Trace.DEBUG("NYI");
                    } else
                    {
                        File fileMain = new File(pathMain);
                        if(UtilString.isNotEmpty(path))
                        {
                            path = UtilPath.formatPath(context, dom, application, path);
                            File f = new File(path);
                            if(!f.isAbsolute())
                                path = new File(fileMain, path).getAbsolutePath();
                        } else
                        {
                            path = pathMain;
                        }
                        pathFormated = path;
                        if (pathFormated.indexOf("/") >= 0 && !"/".equals(File.separator)) {
                            pathFormated = path.replaceAll("/", "\\\\");
                        } else if (pathFormated.indexOf("\\") >= 0 && !"\\".equals(File.separator)) {
                            pathFormated = path.replaceAll("\\\\", File.separator);
                        }
                        FilenameFilter filter = null;

                    	final String strName = (nameFilter == null ? null : (bIgnoreCase ? nameFilter.toLowerCase() : nameFilter));
                    	final String strContent = (contentFilter == null ? null : (bIgnoreCase ? contentFilter.toLowerCase() : contentFilter));
                    	final String strExtention = (extentionFilter == null ? null : (bIgnoreCase ? extentionFilter.toLowerCase() : extentionFilter));

                    	if (UtilString.isNotEmpty(strName) || UtilString.isNotEmpty(strContent) || UtilString.isNotEmpty(strExtention)) {
	                        filter = new FilenameFilter() {
	                            public boolean accept(File directory, String string) {
	                            	boolean ret = true;
	                            	File file = new File(directory, string);
	                            	boolean isFile = file.isFile();
	                            	if (!isFile) {
	                            		return ret;
	                            	}
	                            	string = (bIgnoreCase ? string.toLowerCase() : string);
	                            	if (!UtilString.isEmpty(strName)) {
		                            	ret = string.indexOf(strName) >= 0;
	                            	}
	                            	if (ret && !UtilString.isEmpty(strExtention)) {
										try {
                                            ret = UtilString.isEmpty(strExtention) || UtilFile.isExtFile(string, strExtention);
										} catch (Exception ex) {
								            Trace.ERROR(this, ex);
										}
	                            	}
                            	    if (ret && !UtilString.isEmpty(strContent)) {
										try {
			                            	if (UtilString.isEmpty(strExtention)) {
			                            		ret = isTextFile(file);
			                            	}
        	                            	if (ret) {
    											ret = (UtilFile.findText(file, strContent) >= 0);
        	                            	}
										} catch (IOException ex) {
								            Trace.ERROR(this, ex);
										}
	                            	}
	                                return ret;
	                            }
	                        };
                    	}

                        Vector vListFile = UtilFile.dirFile(path, bRecursive, filter, false, bWithSubDirectory, true);
                        if(vListFile != null && vListFile.size() > 0)
                        {
                            int j = vListFile.size();
                            for(int i = 0; i < j; i++)
                            {
                                File file = (File) vListFile.get(i);
                                // Trace.DEBUG(this, (new StringBuilder("execute file:")).append(file.getName()).append(" isFile:").append(file.isFile()).append(" isDirectory:").append(file.isDirectory()).toString());
                                String pathRelative = UtilFile.getPathRelative(fileMain, file);
                                if (!file.getAbsolutePath().equals(pathFormated)) {
	                                if(pathRelative.indexOf('\\') >= 0)
	                                    pathRelative = pathRelative.replaceAll("\\\\", "\\\\\\\\");
	                                String leaf = file.isFile() ? "true" : "false";
	                                String contentType = "directory";
	                                if(file.isFile())
	                                    contentType = UtilFile.getTypeByExtension(file);
	                                boolean bAddJson = true;
	                                if(UtilString.isNotEmpty(withContentType))
	                                	bAddJson = withContentType.equals(contentType);
	                                if(bAddJson && UtilString.isNotEmpty(noContentType))
	                                	bAddJson = !withContentType.equals(noContentType);
	                                if(bAddJson)
	                                {
	                                	boolean bBuild = false;
	                                    String className = "";
	                                    if(file.isFile() && UtilString.isNotEmpty(pathSrc))
	                                    {
	                                        File fileSrc = new File(fileMain, pathSrc);
	                                        if(UtilString.isBeginByIgnoreCase(file.getAbsolutePath(), fileSrc.getAbsolutePath()))
	                                        {
	                                            className = UtilFile.getPathRelative(fileSrc, file);
	                                            if(className.indexOf('\\') >= 0)
	                                                className = className.replaceAll("\\\\", ".");
	                                            if(className.startsWith("."))
	                                                className = className.substring(1);
	                                            if(UtilString.isEndByIgnoreCase(className, ".java"))
	                                                className = className.substring(0, className.length() - 5);
	                                            bBuild = UtilString.isEndByIgnoreCase(file.getName(), ".java");
	                                        }
	                                    }
	                                    if(jsonData == null)
	                                        jsonData = "[";
	                                    else
	                                        jsonData = (new StringBuilder(String.valueOf(jsonData))).append(",").toString();
	                                    String pathRoot = (new StringBuilder("[")).append(application).append("]").append(pathRelative).toString();
	                                    jsonData += "{'text':'" + file.getName() + "',"
		                                    + "'id':'" + pathRoot + "',"
	                                        + "'application':'" + application + "',"
	                                        + "'path':'" + pathRoot + "',"
	                                        + "'className':'" + className + "',"
	                                        + "'contentType':'" + contentType + "',"
	                                        + "'build':'" + bBuild + "',"
	                                        + "'leaf':" + leaf + ","
	                                        + "'autoDeploy':" + isAutoDeploy
	                                        + "}";
	                                }
                                }
                            }

                        }
                        if(jsonData != null)
                            jsonData = (new StringBuilder(String.valueOf(jsonData))).append("]").toString();
                        else
                            jsonData = "[]";
                        OutputStream os = response.getOutputStream();
                        response.setContentType("text/json");
                        os.write(jsonData.getBytes());
                        os.close();
                    }
                }
            }
        } catch(Exception ex) {
            Trace.ERROR(this, ex);
        }
        // Trace.DEBUG(this, (new StringBuilder("execute application:")).append(application).append(" path:").append(path).append(" pathFormated:").append(pathFormated).toString());
        // Trace.DEBUG(this, (new StringBuilder("execute pathMain:")).append(pathMain).append(" pathSrc:").append(pathSrc).toString());
        // Trace.DEBUG(this, (new StringBuilder("execute withContentType:")).append(withContentType).append(" noContentType:").append(noContentType).toString());
        // Trace.DEBUG(this, (new StringBuilder("execute jsonData:")).append(jsonData).toString());
    }

    private boolean isTextFile(File file) {
        try {
            String type = UtilFile.getTypeByExtension(file);
            if (type.startsWith("text")) {
                return true;
            } else {
                //type isn't text
                return false;
            }
        } catch(Exception ex) {
            return false;
        }
    }
}