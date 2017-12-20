// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvSVNCommit.java

package workspace.service.versioning.svn;

import framework.beandata.BeanGenerique;
import java.io.File;
import javax.servlet.http.*;
import org.tmatesoft.svn.core.wc.SVNClientManager;
import org.tmatesoft.svn.core.wc.SVNCommitClient;
import org.w3c.dom.Document;
import workspace.adaptateur.application.AdpXmlApplication;

// Referenced classes of package workspace.service.versioning.svn:
//            SrvSVN

public class SrvSVNCommit extends SrvSVN
{

    public SrvSVNCommit()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        HttpSession session = request.getSession();
        javax.servlet.ServletContext context = session.getServletContext();
        super.execute(request, response, bean);
        String application = (String)bean.getParameterDataByName("application");
        String messageStr = (String)bean.get("messageStr");
        boolean keepLocks = false;
        Document dom = (Document)request.getSession().getAttribute("resultDom");
        String filePathMain = AdpXmlApplication.getFormatedPathMain(context, dom, application);
        clientManager.getCommitClient().doCommit(new File[] {
            new File(filePathMain)
        }, keepLocks, messageStr, false, true);
    }
}
