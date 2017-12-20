package workspace.service;

import java.io.File;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.w3c.dom.Document;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilBuildJar;
import framework.ressource.util.UtilFile;
import framework.ressource.util.UtilString;
import framework.service.SrvGenerique;
import workspace.adaptateur.application.AdpXmlApplication;
import workspace.util.UtilPath;

public class SrvEditorJavaZip extends SrvGenerique
{

    public SrvEditorJavaZip()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        HttpSession session = request.getSession();
        ServletContext context = session.getServletContext();
        String application = (String)bean.getParameterDataByName("application");
        String pathSrc = (String)bean.getParameterDataByName("pathSrc");
        String pathDst = (String)bean.getParameterDataByName("pathDst");
        String fileName = (String)bean.getParameterDataByName("fileName");
        if(UtilString.isNotEmpty(application) && UtilString.isNotEmpty(fileName)) {
            try
            {
                Document dom = (Document)request.getSession().getAttribute("resultDom");
                String filePathMain = AdpXmlApplication.getFormatedPathMain(context, dom, application);
                if(filePathMain != null && !filePathMain.equals("") && !filePathMain.toUpperCase().startsWith("FTP://"))
                {
                    File fileMain = new File(filePathMain);
                    String pathMain = fileMain.toURI().getPath();
                    if(UtilString.isEmpty(pathSrc))
                        pathSrc = ".";
                    if(pathDst != null)
                        fileMain = new File(filePathMain, pathDst);
                    pathDst = fileMain.toURI().getPath();
                    String listPathSrc[] = UtilString.split(pathSrc, ';');
                    String listPathTo[] = new String[listPathSrc.length];
                    for(int i = 0; i < listPathSrc.length;)
                        listPathTo[i++] = "";

                    pathDst = UtilFile.formatPath(pathDst, fileName);
                    UtilBuildJar.build(pathMain, listPathSrc, listPathTo, pathDst);
                }
            }
            catch(Exception exception) { }
        } else if (UtilString.isNotEmpty(fileName)) {
            try {
                Document dom = (Document)request.getSession().getAttribute("resultDom");
                pathDst = UtilPath.formatPath(dom, pathDst);
                if(pathDst != null && !pathDst.equals("") && !pathDst.toUpperCase().startsWith("FTP://")) {
                    if(UtilString.isEmpty(pathSrc))
                        pathSrc = ".";
                    String listSrc[] = UtilString.split(pathSrc, ';');
                    String listPathSrc[] = new String[listSrc.length];
                    String listPathTo[] = new String[listSrc.length];
                    for(int i = 0; i < listSrc.length; i++) {
                    	String src = listSrc[i];
                        listPathSrc[i] = UtilPath.formatPath(dom, src);

                    	int iDeb = src.indexOf('[', 0);
                        int iFin = src.indexOf(']', iDeb);
                        if(iDeb >= 0 && iFin >= 0) {
                            String srcFormated = listPathSrc[i];
                            if (new File(srcFormated).isDirectory()) {
	                        	String app = src.substring(iDeb + 1, iFin);;
	                            String filePathMain = AdpXmlApplication.getFormatedPathMain(context, dom, app);
	
	                            listPathTo[i] = srcFormated.substring(filePathMain.length());
                            } else {
                            	listPathTo[i] = "";
                            }
                        } else {
                        	listPathTo[i] = "";
                        }
                    }

                    pathDst = UtilFile.formatPath(pathDst, fileName);
                    UtilBuildJar.build(listPathSrc, listPathTo, pathDst);
                }
            }
            catch(Exception exception) { }
        }
    }
}
