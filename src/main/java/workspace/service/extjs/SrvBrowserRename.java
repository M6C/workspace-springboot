// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvBrowserRename.java

package workspace.service.extjs;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilString;
import framework.service.SrvGenerique;
import framework.trace.Trace;
import java.io.File;
import javax.servlet.ServletContext;
import javax.servlet.http.*;
import org.w3c.dom.Document;
import workspace.util.UtilPath;

public class SrvBrowserRename extends SrvGenerique
{

    public SrvBrowserRename()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        ServletContext context;
        String application;
        String oldName;
        String newName;
        String oldNameFormated;
        String newNameFormated;
        HttpSession session = request.getSession();
        context = session.getServletContext();
        application = (String)bean.getParameterDataByName("application");
        oldName = (String)bean.getParameterDataByName("oldName");
        newName = (String)bean.getParameterDataByName("newName");
        oldNameFormated = null;
        newNameFormated = null;
        try
        {
            if(UtilString.isNotEmpty(oldName) && UtilString.isNotEmpty(newName))
            {
                Document dom = (Document)request.getSession().getAttribute("resultDom");
                oldNameFormated = UtilPath.formatPath(context, dom, application, oldName);
                newNameFormated = UtilPath.formatPath(context, dom, application, newName);
                (new File(oldNameFormated)).renameTo(new File(newNameFormated));
            }
        }
        catch(Exception ex)
        {
            Trace.ERROR(this, ex);
        }
        Trace.DEBUG(this, (new StringBuilder("SrvBrowserRename application:")).append(application).append(" oldName:").append(oldName).append(" oldNameFormated:").append(oldNameFormated).append(" newName:").append(newName).append(" newNameFormated:").append(newNameFormated).toString());
    }
}
