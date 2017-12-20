// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvEditorJavaCompileClean.java

package workspace.service;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilFile;
import framework.ressource.util.UtilString;
import framework.service.SrvGenerique;
import java.io.File;
import java.io.PrintStream;
import javax.servlet.ServletContext;
import javax.servlet.http.*;
import org.w3c.dom.Document;
import workspace.adaptateur.application.AdpXmlApplication;

public class SrvEditorJavaCompileClean extends SrvGenerique
{

    public SrvEditorJavaCompileClean()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        HttpSession session = request.getSession();
        ServletContext context = session.getServletContext();
        String application = (String)bean.getParameterDataByName("application");
        if(UtilString.isNotEmpty(application))
            try
            {
                Document dom = (Document)request.getSession().getAttribute("resultDom");
                String filePathMain = AdpXmlApplication.getFormatedPathMain(context, dom, application);
                String pathDst = AdpXmlApplication.getFormatedPathByName(context, dom, application, "Class");
                File file = new File(filePathMain, pathDst);
                File listFile[] = file.listFiles();
                if(listFile != null)
                {
                    int size = listFile.length;
                    for(int i = 0; i < size; i++)
                    {
                        file = listFile[i];
                        if(file.isFile())
                            file.delete();
                        else
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
