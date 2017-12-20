// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   ActionFileReader.java

package workspace.action;

import java.io.File;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.xml.transform.TransformerException;
import org.w3c.dom.Document;
import workspace.adaptateur.application.AdpXmlApplication;

public class ActionFileReader extends framework.action.ActionFileReader
{
    protected File getFileRootSource(HttpServletRequest req)
    {
        HttpSession session = req.getSession();
        ServletContext context = session.getServletContext();
        File ret = null;
        String path = req.getParameter("path");
        String application = req.getParameter("application");
        Document dom = (Document)req.getSession().getAttribute("resultDom");
        String pathMain = null;
        try
        {
            pathMain = AdpXmlApplication.getFormatedPathMain(context, dom, application);
        }
        catch(TransformerException e)
        {
            e.printStackTrace();
        }
        if(pathMain != null && path != null)
            ret = new File(pathMain, path);
        return ret;
    }
}