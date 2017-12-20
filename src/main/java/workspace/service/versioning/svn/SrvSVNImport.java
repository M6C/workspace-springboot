// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvSVNImport.java

package workspace.service.versioning.svn;

import framework.beandata.BeanGenerique;
import java.io.File;
import javax.servlet.ServletContext;
import javax.servlet.http.*;
import org.tmatesoft.svn.core.*;
import org.tmatesoft.svn.core.internal.wc.SVNErrorManager;
import org.tmatesoft.svn.core.internal.wc.SVNFileType;
import org.tmatesoft.svn.core.io.SVNRepository;
import org.tmatesoft.svn.core.io.SVNRepositoryFactory;
import org.tmatesoft.svn.core.wc.SVNClientManager;
import org.tmatesoft.svn.core.wc.SVNCommitClient;
import org.tmatesoft.svn.util.SVNLogType;
import org.w3c.dom.Document;
import workspace.adaptateur.application.AdpXmlApplication;

// Referenced classes of package workspace.service.versioning.svn:
//            SrvSVN

public class SrvSVNImport extends SrvSVN
{

    public SrvSVNImport()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        HttpSession session = request.getSession();
        ServletContext context = session.getServletContext();
        super.execute(request, response, bean);
        String application = (String)bean.getParameterDataByName("application");
        String messageStr = (String)bean.get("messageStr");
        boolean isRecursive = true;
        Document dom = (Document)request.getSession().getAttribute("resultDom");
        String filePathMain = AdpXmlApplication.getFormatedPathMain(context, dom, application);
        String path = (new StringBuilder(String.valueOf(filePathMain))).append("/tld").toString();
        File pathFile = new File(path);
        SVNURL rootURL = SVNURL.parseURIEncoded("https://workspace-extjs-0-0-1.googlecode.com/svn/trunk/test/");
        SVNRepository repos = SVNRepositoryFactory.create(rootURL, null);
        SVNNodeKind pathKind = repos.checkPath(path, -1L);
        if(pathKind == SVNNodeKind.NONE)
        {
            rootURL = rootURL.removePathTail();
            repos = SVNRepositoryFactory.create(rootURL, null);
        }
        SVNFileType srcKind = SVNFileType.getType(pathFile);
        if(srcKind == SVNFileType.NONE)
        {
            SVNErrorMessage err = SVNErrorMessage.create(SVNErrorCode.ENTRY_NOT_FOUND, "Path ''{0}'' does not exist", pathFile);
            SVNErrorManager.error(err, SVNLogType.WC);
        }
        clientManager.getCommitClient().doImport(pathFile, rootURL, messageStr, isRecursive);
    }
}
