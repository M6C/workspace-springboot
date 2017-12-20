// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvEditorJavaDelete.java

package workspace.service;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilFile;
import framework.ressource.util.UtilString;
import framework.service.SrvGenerique;
import framework.taglib.file.bean.BeanFTP;
import framework.taglib.file.bean.BeanFTPAddress;
import java.io.File;
import java.io.PrintStream;
import javax.servlet.ServletContext;
import javax.servlet.http.*;
import org.w3c.dom.Document;
import workspace.adaptateur.application.AdpXmlApplication;
import workspace.util.UtilPath;

public class SrvEditorJavaDelete extends SrvGenerique
{

    public SrvEditorJavaDelete()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        HttpSession session = request.getSession();
        ServletContext context = session.getServletContext();
        String application = (String)bean.getParameterDataByName("application");
        String fileName = (String)bean.getParameterDataByName("fileName");
        String pathToExpand = (String)bean.getParameterDataByName("pathToExpand");
        if(UtilString.isNotEmpty(fileName))
            try
            {
                Document dom = (Document)request.getSession().getAttribute("resultDom");
                String filenameFormated = UtilPath.formatPath(dom, application, fileName);
                if(filenameFormated != null && !filenameFormated.equals(""))
                    if(filenameFormated.toUpperCase().startsWith("FTP://"))
                    {
                        BeanFTPAddress address = new BeanFTPAddress(filenameFormated);
                    	if (UtilString.isNotEmpty(pathToExpand)) {
                    		fileName = pathToExpand + fileName;
                    	}
                        BeanFTP ftp = new BeanFTP(address, fileName);
                        ftp.delete();
                    } else
                    {
                    	if (UtilString.isNotEmpty(application)) {
                            String filePathMain = AdpXmlApplication.getFormatedPathMain(context, dom, application);
                            File fileMain = new File(filePathMain);
                            File file = new File(filenameFormated);
                            if(!file.getCanonicalPath().equals(fileMain.getCanonicalPath()))
                                UtilFile.delete(file);
                    	} else {
                            File file = new File(filenameFormated);
                            UtilFile.delete(file);
                    	}
                    }
            }
            catch(Exception ex)
            {
                System.out.println(ex.getMessage());
            }
    }
}
