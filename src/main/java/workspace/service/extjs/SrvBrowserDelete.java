// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvBrowserDelete.java

package workspace.service.extjs;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilFile;
import framework.ressource.util.UtilString;
import framework.service.SrvGenerique;
import framework.taglib.file.bean.BeanFTP;
import framework.taglib.file.bean.BeanFTPAddress;
import framework.trace.Trace;
import java.io.File;
import javax.servlet.ServletContext;
import javax.servlet.http.*;
import org.w3c.dom.Document;
import workspace.util.UtilPath;

public class SrvBrowserDelete extends SrvGenerique
{

    public SrvBrowserDelete()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        ServletContext context;
        String application;
        String fileName;
        String pathToExpand;
        String fileNameFormated;
        HttpSession session = request.getSession();
        context = session.getServletContext();
        application = (String)bean.getParameterDataByName("application");
        fileName = (String)bean.getParameterDataByName("fileName");
        pathToExpand = (String)bean.getParameterDataByName("pathToExpand");
        fileNameFormated = null;
        try
        {
            if(UtilString.isNotEmpty(fileName))
            {
                Document dom = (Document)request.getSession().getAttribute("resultDom");
                fileName = UtilPath.formatPath(context, dom, application, fileName);
                if(fileName != null && !fileName.equals(""))
                    if(fileName.toUpperCase().startsWith("FTP://"))
                    {
                        BeanFTPAddress address = new BeanFTPAddress(fileName);
                        BeanFTP ftp = new BeanFTP(address);
                        ftp.delete();
                    } else
                    {
                        fileNameFormated = UtilPath.formatPath(context, dom, application, fileName);
                        Trace.DEBUG((new StringBuilder("SrvBrowserCopyMove fileNameFormated:")).append(fileNameFormated).toString());
                        File file = new File(fileNameFormated);
                        UtilFile.delete(file);
                    }
            }
        }
        catch(Exception ex)
        {
            Trace.ERROR(this, ex);
        }
        Trace.DEBUG(this, (new StringBuilder("SrvBrowserDelete application:")).append(application).append(" fileName:").append(fileName).append(" fileNameFormated:").append(fileNameFormated).append(" pathToExpand:").append(pathToExpand).toString());
    }
}
