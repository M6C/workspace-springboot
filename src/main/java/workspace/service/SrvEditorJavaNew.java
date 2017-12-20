// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvEditorJavaNew.java

package workspace.service;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilFile;
import framework.ressource.util.UtilString;
import framework.service.SrvGenerique;
import framework.taglib.file.bean.BeanFTP;
import framework.taglib.file.bean.BeanFTPAddress;
import java.io.File;
import java.io.FileWriter;
import javax.servlet.ServletContext;
import javax.servlet.http.*;
import org.w3c.dom.Document;
import workspace.adaptateur.application.AdpXmlApplication;

public class SrvEditorJavaNew extends SrvGenerique
{

    public SrvEditorJavaNew()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        HttpSession session = request.getSession();
        ServletContext context = session.getServletContext();
        String application = (String)bean.getParameterDataByName("application");
        String type = (String)bean.getParameterDataByName("Type");
        String name = (String)bean.getParameterDataByName("Name");
        String path = (String)bean.getParameterDataByName("Path");
        if(UtilString.isNotEmpty(type) && UtilString.isNotEmpty(name))
        {
            Document dom = (Document)request.getSession().getAttribute("resultDom");
            String filePathMain = AdpXmlApplication.getFormatedPathMain(context, dom, application);
            if(filePathMain != null && !filePathMain.equals(""))
            {
                String fileName = UtilString.isNotEmpty(path) ? UtilFile.formatPath(path, name) : name;
                if(filePathMain.toUpperCase().startsWith("FTP://"))
                {
                    BeanFTPAddress address = new BeanFTPAddress(filePathMain);
                    BeanFTP ftp = new BeanFTP(address, fileName);
                    ftp.createNewFile();
                } else
                {
                    File outputFile = new File(filePathMain, fileName);
                    if(!outputFile.exists())
                        if(UtilString.isEqualsIgnoreCase(type, "Dir"))
                            outputFile.mkdir();
                        else
                            (new FileWriter(outputFile)).close();
                }
            }
        }
    }
}
