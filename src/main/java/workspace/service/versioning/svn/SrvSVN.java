// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvSVN.java

package workspace.service.versioning.svn;

import framework.beandata.BeanGenerique;
import framework.service.SrvGenerique;
import java.io.File;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.tmatesoft.svn.core.SVNURL;
import org.tmatesoft.svn.core.io.ISVNEditor;
import org.tmatesoft.svn.core.io.SVNRepository;
import org.tmatesoft.svn.core.wc.SVNClientManager;
import org.tmatesoft.svn.core.wc.SVNWCUtil;

public class SrvSVN extends SrvGenerique
{

    public SrvSVN()
    {
    }

    public void execute(HttpServletRequest req, HttpServletResponse res, BeanGenerique bean)
        throws Exception
    {
        editor = null;
        url = SVNURL.parseURIEncoded("https://workspace-extjs-0-0-1.googlecode.com/svn/");
        urlTrunk = SVNURL.parseURIEncoded("https://workspace-extjs-0-0-1.googlecode.com/svn/trunk/");
        clientManager = SVNClientManager.newInstance(SVNWCUtil.createDefaultOptions(false), SVNWCUtil.createDefaultAuthenticationManager(new File("I:/Workspace/WorkSpace/src/workspace/service/versioning/svn/config"), "roca.david", "hb4Up6Gt7TD4"));
    }

    protected static final String URL_REPOSITORY = "https://workspace-extjs-0-0-1.googlecode.com/svn/";
    protected static final String URL_REPOSITORY_TRUNK = "https://workspace-extjs-0-0-1.googlecode.com/svn/trunk/";
    protected static final String USER_NAME = "roca.david";
    protected static final String USER_PASSWORD = "hb4Up6Gt7TD4";
    protected static final String CONFIG_FILE = "I:/Workspace/WorkSpace/src/workspace/service/versioning/svn/config";
    protected SVNURL url;
    protected SVNURL urlTrunk;
    protected SVNClientManager clientManager;
    protected SVNRepository repository;
    protected ISVNEditor editor;
    protected long latestRevision;
}
