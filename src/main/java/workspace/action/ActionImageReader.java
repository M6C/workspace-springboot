// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   ActionImageReader.java

package workspace.action;

import framework.trace.Trace;
import java.io.File;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.xml.transform.TransformerException;
import org.w3c.dom.Document;
import workspace.adaptateur.application.AdpXmlApplication;

public class ActionImageReader extends framework.action.ActionImageReader
{

    public ActionImageReader()
    {
    }

    protected File getRootDirectory(HttpServletRequest request, HttpServletResponse response)
    {
        File ret = null;
        HttpSession session = request.getSession();
        ServletContext context = session.getServletContext();
        String application = request.getParameter("application");
        Document domXml = (Document)session.getAttribute("resultDom");
        try
        {
            String szPathMain = AdpXmlApplication.getFormatedPathByName(context, domXml, application, "Main");
            if(szPathMain != null)
                ret = new File(szPathMain);
        }
        catch(TransformerException e)
        {
            Trace.ERROR(this, e);
        }
        return ret;
    }
}
