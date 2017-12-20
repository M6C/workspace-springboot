// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvBrowserZip.java

package workspace.service.extjs;

import framework.beandata.BeanGenerique;
import framework.ressource.util.*;
import framework.service.SrvGenerique;
import framework.trace.Trace;
import java.io.File;
import java.io.OutputStream;
import javax.servlet.ServletContext;
import javax.servlet.http.*;
import org.w3c.dom.Document;
import workspace.util.UtilPath;

public class SrvBrowserZip extends SrvGenerique
{

    public SrvBrowserZip()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        ServletContext context;
        String application;
        String pathSrc;
        String pathDst;
        String fileName;
        String pathSrcFormated;
        String pathDstFormated;
        HttpSession session = request.getSession();
        context = session.getServletContext();
        application = (String)bean.getParameterDataByName("application");
        pathSrc = (String)bean.getParameterDataByName("pathSrc");
        pathDst = (String)bean.getParameterDataByName("pathDst");
        fileName = (String)bean.getParameterDataByName("fileName");
        pathSrcFormated = null;
        pathDstFormated = null;
        try
        {
            if(UtilString.isNotEmpty(fileName))
            {
                Document dom = (Document)request.getSession().getAttribute("resultDom");
                pathSrcFormated = UtilPath.formatPath(context, dom, application, UtilString.isEmpty(pathSrc) ? "." : pathSrc);
                pathDstFormated = UtilPath.formatPath(context, dom, pathDst);
                if(UtilString.isNotEmpty(pathDstFormated) && UtilString.isNotEmpty(pathSrcFormated) && !UtilString.isBeginByIgnoreCase(pathDstFormated, "FTP://"))
                {
                    String listPathSrc[] = UtilString.split(pathSrcFormated, ';');
                    String listPathTo[] = new String[listPathSrc.length];
                    for(int i = 0; i < listPathSrc.length; i++)
                    {
                        File src = new File(listPathSrc[i]);
                        listPathTo[i] = src.isFile() ? "" : src.getName();
                    }

                    pathDstFormated = UtilFile.formatPath(pathDst, fileName);
                    UtilBuildJar.build(listPathSrc, listPathTo, pathDstFormated);
                }
            }
        }
        catch(Exception ex)
        {
            response.setStatus(400);
            String jsonData = (new StringBuilder("{'success':'false', 'message':'")).append(ex.getMessage()).append("'}").toString();
            OutputStream os = response.getOutputStream();
            response.setContentType("text/json");
            os.write(jsonData.getBytes());
            os.close();
            Trace.ERROR(this, ex);
        }
        Trace.DEBUG(this, (new StringBuilder("SrvBrowserZip pathSrc:")).append(pathSrc).append(" pathSrcFormated:").append(pathSrcFormated).append(" pathDst:").append(pathDst).append(" pathDstFormated:").append(pathDstFormated).append(" fileName:").append(fileName).toString());
    }
}
