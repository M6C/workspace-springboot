// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvBrowserCopyMove.java

package workspace.service.extjs;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilFile;
import framework.ressource.util.UtilString;
import framework.service.SrvGenerique;
import framework.trace.Trace;
import java.io.File;
import java.util.Vector;
import javax.servlet.ServletContext;
import javax.servlet.http.*;
import org.w3c.dom.Document;
import workspace.util.UtilPath;

public class SrvBrowserCopyMove extends SrvGenerique
{

    public SrvBrowserCopyMove()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        String pathSrc;
        String pathDst;
        String operation;
        String pathSrcFormated;
        String pathDstFormated;
        HttpSession session = request.getSession();
        ServletContext context = session.getServletContext();
        pathSrc = (String)bean.getParameterDataByName("pathSrc");
        pathDst = (String)bean.getParameterDataByName("pathDst");
        operation = (String)bean.getParameterDataByName("operation");
        pathSrcFormated = null;
        pathDstFormated = null;
        try
        {
            if(UtilString.isNotEmpty(pathSrc) && UtilString.isNotEmpty(pathDst))
            {
                Document dom = (Document)request.getSession().getAttribute("resultDom");
                pathSrcFormated = UtilPath.formatPath(dom, pathSrc);
                pathDstFormated = UtilPath.formatPath(dom, pathDst);
                if("move".equalsIgnoreCase(operation))
                    move(pathSrcFormated, pathDstFormated);
                else
                    copy(pathSrcFormated, pathDstFormated);
            }
        }
        catch(Exception ex)
        {
            Trace.ERROR(this, ex);
        }
        Trace.DEBUG(this, (new StringBuilder("SrvBrowserCopyMove pathSrc:")).append(pathSrc).append(" pathSrcFormated:").append(pathSrcFormated).append(" pathDst:").append(pathDst).append(" pathDstFormated:").append(pathDstFormated).append(" operation:").append(operation).toString());
    }

    protected static boolean copy(String pathSrc, String pathDst)
        throws Exception
    {
        boolean resultat = false;
        File fileSrc = new File(pathSrc);
        File fileDst = new File(pathDst);
        if(fileSrc.isFile())
        {
            if(fileDst.isDirectory())
                fileDst = new File(fileDst, UtilFile.fileName(fileSrc.getCanonicalPath()));
            UtilFile.copyFile(fileSrc, fileDst);
            resultat = true;
        } else
        if(fileSrc.isDirectory() && fileDst.isDirectory())
        {
            File file = null;
            File fDst = null;
            Vector files = UtilFile.dirFile(pathSrc, true);
            for(int i = 0; i < files.size(); i++)
            {
                file = (File)files.get(i);
                fDst = new File(new File(fileDst, fileSrc.getName()), UtilFile.getPathRelative(fileSrc, file));
                Trace.DEBUG((new StringBuilder("SrvBrowserCopyMove file src:")).append(file.getCanonicalPath()).append(" -> dst:").append(fDst.getCanonicalPath()).toString());
                UtilFile.copyFile(file, fDst);
            }

            resultat = true;
        }
        return resultat;
    }

    protected static boolean move(String pathSrc, String fileDst)
        throws Exception
    {
        boolean result = copy(pathSrc, fileDst);
        if(result)
        {
            Trace.DEBUG((new StringBuilder("SrvBrowserCopyMove delete pathSrc:")).append(pathSrc).toString());
            result &= UtilFile.delete(new File(pathSrc));
        }
        return result;
    }
}
