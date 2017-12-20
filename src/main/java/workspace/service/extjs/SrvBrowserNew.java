// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvBrowserNew.java

package workspace.service.extjs;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilString;
import framework.service.SrvGenerique;
import framework.trace.Trace;
import java.io.File;
import java.io.FileWriter;
import javax.servlet.ServletContext;
import javax.servlet.http.*;
import org.w3c.dom.Document;
import workspace.util.UtilPath;

public class SrvBrowserNew extends SrvGenerique
{

    public SrvBrowserNew()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        ServletContext context;
        String application;
        String name;
        String pathDst;
        String type;
        String pathDstFormated;
        String nameFormated;
        HttpSession session = request.getSession();
        context = session.getServletContext();
        application = (String)bean.getParameterDataByName("application");
        name = (String)bean.getParameterDataByName("name");
        pathDst = (String)bean.getParameterDataByName("pathDst");
        type = (String)bean.getParameterDataByName("type");
        pathDstFormated = null;
        nameFormated = null;
        try
        {
            if(UtilString.isNotEmpty(name))
            {
                Document dom = (Document)request.getSession().getAttribute("resultDom");
                name = UtilPath.formatPath(context, dom, application, name);
                if(name != null && !name.equals("") && !name.toUpperCase().startsWith("FTP://"))
                {
                    File file = null;
                    if(UtilString.isNotEmpty(pathDst))
                    {
                        pathDstFormated = UtilPath.formatPath(context, dom, application, pathDst);
                        File dirDst = new File(pathDstFormated);
                        dirDst.mkdirs();
                        file = new File(dirDst, name);
                    } else
                    {
                        nameFormated = UtilPath.formatPath(context, dom, application, name);
                        file = new File(nameFormated);
                    }
                    if(!file.exists())
                        if(UtilString.isEqualsIgnoreCase(type, "dir") || UtilString.isEqualsIgnoreCase(type, "directory"))
                            file.mkdir();
                        else
                            (new FileWriter(file)).close();
                }
            }
        }
        catch(Exception ex)
        {
            Trace.ERROR(this, ex);
        }
        Trace.DEBUG(this, (new StringBuilder("SrvBrowserNew application:")).append(application).append(" name:").append(name).append(" nameFormated:").append(nameFormated).append(" pathDst:").append(pathDst).append(" pathDstFormated:").append(pathDstFormated).append(" type:").append(type).toString());
    }
}
