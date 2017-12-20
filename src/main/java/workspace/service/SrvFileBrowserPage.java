// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvFileBrowserPage.java

package workspace.service;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilString;
import framework.service.SrvGenerique;
import framework.trace.Trace;
import java.io.File;
import java.net.URI;
import javax.servlet.ServletContext;
import javax.servlet.http.*;
import org.w3c.dom.Document;
import workspace.adaptateur.application.AdpXmlApplication;

public class SrvFileBrowserPage extends SrvGenerique
{

    public SrvFileBrowserPage()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        HttpSession session = request.getSession();
        ServletContext context = session.getServletContext();
        String application = (String)bean.getParameterDataByName("application");
        try
        {
            if(UtilString.isNotEmpty(application))
            {
                Document dom = (Document)request.getSession().getAttribute("resultDom");
                String filePathMain = AdpXmlApplication.getFormatedPathMain(context, dom, application);
                if(filePathMain != null && !filePathMain.equals(""))
                    if(filePathMain.toUpperCase().startsWith("FTP://"))
                    {
                        request.setAttribute("path", filePathMain);
                    } else
                    {
                        File fileMain = new File(filePathMain);
                        request.setAttribute("path", fileMain.toURI().getPath());
                    }
            }
        }
        catch(Exception ex)
        {
            Trace.ERROR(this, ex);
        }
    }
}
