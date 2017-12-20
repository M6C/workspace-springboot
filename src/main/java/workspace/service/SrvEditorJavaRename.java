// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvEditorJavaRename.java

package workspace.service;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilString;
import framework.service.SrvGenerique;
import java.io.File;
import java.io.PrintStream;
import javax.servlet.ServletContext;
import javax.servlet.http.*;
import org.w3c.dom.Document;
import workspace.adaptateur.application.AdpXmlApplication;

public class SrvEditorJavaRename extends SrvGenerique
{

    public SrvEditorJavaRename()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        HttpSession session = request.getSession();
        ServletContext context = session.getServletContext();
        String application = (String)bean.getParameterDataByName("application");
        String oldName = (String)bean.getParameterDataByName("oldName");
        String newName = (String)bean.getParameterDataByName("newName");
        if(UtilString.isNotEmpty(oldName) && UtilString.isNotEmpty(newName))
            try
            {
                Document dom = (Document)request.getSession().getAttribute("resultDom");
                String filePathMain = AdpXmlApplication.getFormatedPathMain(context, dom, application);
                (new File(filePathMain, oldName)).renameTo(new File(filePathMain, newName));
            }
            catch(Exception ex)
            {
                System.out.println(ex.getMessage());
            }
    }
}
