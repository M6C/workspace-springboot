// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   ActionFileUpload.java

package workspace.action;

import framework.ressource.util.UtilFileUpload;
import java.io.File;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.xml.transform.TransformerException;
import org.w3c.dom.Document;
import workspace.adaptateur.application.AdpXmlApplication;

public class ActionFileUpload extends framework.action.ActionFileUpload
{

    public ActionFileUpload()
    {
    }

    protected File getFileRootSource(HttpServletRequest req, UtilFileUpload multi)
    {
        HttpSession session = req.getSession();
        ServletContext context = session.getServletContext();
        File ret = null;
        String application = multi.getParameter("application");
        Document dom = (Document)req.getSession().getAttribute("resultDom");
        String path = null;
        try
        {
            path = AdpXmlApplication.getFormatedPathMain(context, dom, application);
        }
        catch(TransformerException e)
        {
            e.printStackTrace();
        }
        if(path != null)
            ret = new File(path);
        return ret;
    }
}
