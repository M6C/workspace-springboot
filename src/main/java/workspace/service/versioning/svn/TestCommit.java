// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   TestCommit.java

package workspace.service.versioning.svn;

import framework.beandata.BeanGenerique;
import framework.service.SrvGenerique;
import java.io.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.tmatesoft.svn.core.*;
import org.tmatesoft.svn.core.auth.ISVNAuthenticationManager;
import org.tmatesoft.svn.core.internal.io.dav.DAVRepositoryFactory;
import org.tmatesoft.svn.core.internal.io.fs.FSRepositoryFactory;
import org.tmatesoft.svn.core.internal.io.svn.SVNRepositoryFactoryImpl;
import org.tmatesoft.svn.core.io.*;
import org.tmatesoft.svn.core.io.diff.SVNDeltaGenerator;
import org.tmatesoft.svn.core.wc.SVNWCUtil;

public class TestCommit extends SrvGenerique
{

    public TestCommit()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
//        main(null);
//    }

//    public static void main(String args[])
//    {
        setupLibrary();
        try
        {
            commitExample();
        }
        catch(SVNException e)
        {
            for(SVNErrorMessage err = e.getErrorMessage(); err != null; err = err.getChildErrorMessage())
                System.err.println((new StringBuilder(String.valueOf(err.getErrorCode().getCode()))).append(" : ").append(err.getMessage()).toString());

            e.printStackTrace();
        }
    }

    private static void commitExample()
        throws SVNException
    {
        SVNURL url = SVNURL.parseURIEncoded("https://workspace-extjs-0-0-1.googlecode.com/svn/");
        File configDir = new File("I:/Workspace/WorkSpace/src/workspace/service/versioning/svn/config");
        String userName = "roca.david";
        String userPassword = "hb4Up6Gt7TD4";
        byte contents[] = "This is a new file".getBytes();
        byte modifiedContents[] = "This is the same file but modified a little.".getBytes();
        SVNRepository repository = SVNRepositoryFactory.create(url);
        ISVNAuthenticationManager authManager = SVNWCUtil.createDefaultAuthenticationManager(configDir, userName, userPassword);
        repository.setAuthenticationManager(authManager);
        try
        {
            SVNNodeKind nodeKind = repository.checkPath("", -1L);
            if(nodeKind == SVNNodeKind.NONE)
            {
                SVNErrorMessage err = SVNErrorMessage.create(SVNErrorCode.UNKNOWN, "No entry at URL ''{0}''", url);
                throw new SVNException(err);
            }
            if(nodeKind == SVNNodeKind.FILE)
            {
                SVNErrorMessage err = SVNErrorMessage.create(SVNErrorCode.UNKNOWN, "Entry at URL ''{0}'' is a file while directory was expected", url);
                throw new SVNException(err);
            }
        }
        catch(Exception ex)
        {
            ex.printStackTrace();
        }
        long latestRevision = 0L;
        try
        {
            latestRevision = repository.getLatestRevision();
            System.out.println((new StringBuilder("Repository latest revision (before committing): ")).append(latestRevision).toString());
        }
        catch(Exception ex)
        {
            ex.printStackTrace();
        }
        ISVNEditor editor = repository.getCommitEditor("directory and file added", null);
        SVNCommitInfo commitInfo = addDir(editor, "test", "test/file.txt", contents);
        System.out.println((new StringBuilder("The directory was added: ")).append(commitInfo).toString());
        editor = repository.getCommitEditor("file contents changed", null);
        commitInfo = modifyFile(editor, "test", "test/file.txt", contents, modifiedContents);
        System.out.println((new StringBuilder("The file was changed: ")).append(commitInfo).toString());
        String absoluteSrcPath = repository.getRepositoryPath("test");
        long srcRevision = repository.getLatestRevision();
        editor = repository.getCommitEditor("directory copied", null);
        commitInfo = copyDir(editor, absoluteSrcPath, "test2", srcRevision);
        System.out.println((new StringBuilder("The directory was copied: ")).append(commitInfo).toString());
        editor = repository.getCommitEditor("directory deleted", null);
        commitInfo = deleteDir(editor, "test");
        System.out.println((new StringBuilder("The directory was deleted: ")).append(commitInfo).toString());
        editor = repository.getCommitEditor("copied directory deleted", null);
        commitInfo = deleteDir(editor, "test2");
        System.out.println((new StringBuilder("The copied directory was deleted: ")).append(commitInfo).toString());
        latestRevision = repository.getLatestRevision();
        System.out.println((new StringBuilder("Repository latest revision (after committing): ")).append(latestRevision).toString());
    }

    private static SVNCommitInfo addDir(ISVNEditor editor, String dirPath, String filePath, byte data[])
        throws SVNException
    {
        editor.openRoot(-1L);
        editor.addDir(dirPath, null, -1L);
        editor.addFile(filePath, null, -1L);
        editor.applyTextDelta(filePath, null);
        SVNDeltaGenerator deltaGenerator = new SVNDeltaGenerator();
        String checksum = deltaGenerator.sendDelta(filePath, new ByteArrayInputStream(data), editor, true);
        editor.closeFile(filePath, checksum);
        editor.closeDir();
        editor.closeDir();
        return editor.closeEdit();
    }

    private static SVNCommitInfo modifyFile(ISVNEditor editor, String dirPath, String filePath, byte oldData[], byte newData[])
        throws SVNException
    {
        editor.openRoot(-1L);
        editor.openDir(dirPath, -1L);
        editor.openFile(filePath, -1L);
        editor.applyTextDelta(filePath, null);
        SVNDeltaGenerator deltaGenerator = new SVNDeltaGenerator();
        String checksum = deltaGenerator.sendDelta(filePath, new ByteArrayInputStream(oldData), 0L, new ByteArrayInputStream(newData), editor, true);
        editor.closeFile(filePath, checksum);
        editor.closeDir();
        editor.closeDir();
        return editor.closeEdit();
    }

    private static SVNCommitInfo deleteDir(ISVNEditor editor, String dirPath)
        throws SVNException
    {
        editor.openRoot(-1L);
        editor.deleteEntry(dirPath, -1L);
        editor.closeDir();
        return editor.closeEdit();
    }

    private static SVNCommitInfo copyDir(ISVNEditor editor, String srcDirPath, String dstDirPath, long revision)
        throws SVNException
    {
        editor.openRoot(-1L);
        editor.addDir(dstDirPath, srcDirPath, revision);
        editor.closeDir();
        editor.closeDir();
        return editor.closeEdit();
    }

    private static void setupLibrary()
    {
        DAVRepositoryFactory.setup();
        SVNRepositoryFactoryImpl.setup();
        FSRepositoryFactory.setup();
    }
}
