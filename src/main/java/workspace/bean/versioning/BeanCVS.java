// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   BeanCVS.java

package workspace.bean.versioning;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilFile;
import framework.ressource.util.UtilString;
import framework.service.SrvGenerique;
import java.io.*;
import java.util.*;
import javax.naming.NoInitialContextException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.netbeans.lib.cvsclient.Client;
import org.netbeans.lib.cvsclient.admin.StandardAdminHandler;
import org.netbeans.lib.cvsclient.command.*;
import org.netbeans.lib.cvsclient.command.status.StatusCommand;
import org.netbeans.lib.cvsclient.command.status.StatusInformation;
import org.netbeans.lib.cvsclient.connection.*;
import org.netbeans.lib.cvsclient.event.*;
import org.w3c.dom.Document;
import workspace.adaptateur.application.AdpXmlApplication;

public class BeanCVS extends SrvGenerique
    implements CVSListener
{

    public BeanCVS(Document dom, String application)
        throws IOException, IllegalArgumentException, NoInitialContextException
    {
        this.application = null;
        userName = null;
        password = null;
        hostname = null;
        port = null;
        repository = null;
        rootDirectory = null;
        localDirectory = null;
        encodedPassword = null;
        filePathMain = null;
        traceBuffer = new StringBuffer();
        statusInformation = null;
        if(dom == null)
            throw new IllegalArgumentException("Argument dom (org.w3c.dom.Document) is null");
        this.application = application;
        if(application == null)
            throw new IllegalArgumentException("Argument application (java.lang.String) is null");
        String pathMain = AdpXmlApplication.getPathMain(dom, application);
        if(pathMain == null)
            throw new IllegalArgumentException((new StringBuilder("No main path define for application :")).append(application).toString());
        filePathMain = new File(pathMain);
        localDirectory = AdpXmlApplication.getLocalDirectory(dom, application);
        repository = AdpXmlApplication.getModuleName(dom, application);
        password = AdpXmlApplication.getPassword(dom, application);
        hostname = AdpXmlApplication.getServerHostName(dom, application);
        port = AdpXmlApplication.getServerPort(dom, application);
        rootDirectory = AdpXmlApplication.getServerRepository(dom, application);
        userName = AdpXmlApplication.getUserName(dom, application);
        if(localDirectory == null || repository == null || password == null || hostname == null || port == null || rootDirectory == null || userName == null)
        {
            throw new NoInitialContextException((new StringBuilder("No local Directory define for application :")).append(application).toString());
        } else
        {
            localDirectory = (new File(localDirectory)).getCanonicalPath();
            encodedPassword = StandardScrambler.getInstance().scramble(password);
            System.setProperty("javacvs.multiple_commands_warning", "false");
            return;
        }
    }

    public BeanCVS(HttpServletRequest request, BeanGenerique bean)
        throws IOException, IllegalArgumentException, NoInitialContextException
    {
        application = null;
        userName = null;
        password = null;
        hostname = null;
        port = null;
        repository = null;
        rootDirectory = null;
        localDirectory = null;
        encodedPassword = null;
        filePathMain = null;
        traceBuffer = new StringBuffer();
        statusInformation = null;
        Document dom = (Document)request.getSession().getAttribute("resultDom");
        if(dom == null)
            throw new IllegalArgumentException("Argument dom (org.w3c.dom.Document) is null");
        application = (String)bean.getParameterDataByName("application");
        if(application == null)
            throw new IllegalArgumentException("Argument application (java.lang.String) is null");
        String pathMain = AdpXmlApplication.getPathMain(dom, application);
        if(pathMain == null)
            throw new IllegalArgumentException((new StringBuilder("No main path define for application :")).append(application).toString());
        filePathMain = new File(pathMain);
        localDirectory = (String)bean.get("localDirectory");
        if(localDirectory == null)
        {
            localDirectory = AdpXmlApplication.getLocalDirectory(dom, application);
            localDirectory = localDirectory != null ? (new File(localDirectory)).getCanonicalPath() : null;
        } else
        {
            localDirectory = (new File(filePathMain, localDirectory)).getCanonicalPath();
        }
        repository = (String)bean.get("repository");
        if(repository == null)
            repository = AdpXmlApplication.getModuleName(dom, application);
        password = (String)bean.get("password");
        if(password == null)
            password = AdpXmlApplication.getPassword(dom, application);
        hostname = (String)bean.get("hostname");
        if(hostname == null)
            hostname = AdpXmlApplication.getServerHostName(dom, application);
        port = (String)bean.get("port");
        if(port == null)
            port = AdpXmlApplication.getServerPort(dom, application);
        rootDirectory = (String)bean.get("rootDirectory");
        if(rootDirectory == null)
            rootDirectory = AdpXmlApplication.getServerRepository(dom, application);
        userName = (String)bean.get("userName");
        if(userName == null)
            userName = AdpXmlApplication.getUserName(dom, application);
        if(localDirectory == null || repository == null || password == null || hostname == null || port == null || rootDirectory == null || userName == null)
        {
            throw new NoInitialContextException((new StringBuilder("No local Directory define for application :")).append(application).toString());
        } else
        {
            encodedPassword = StandardScrambler.getInstance().scramble(password);
            System.setProperty("javacvs.multiple_commands_warning", "false");
            return;
        }
    }

    public PServerConnection newPServerConnection()
        throws CommandAbortedException, AuthenticationException
    {
        PServerConnection c = new PServerConnection();
        c.setUserName(userName);
        c.setEncodedPassword(encodedPassword);
        c.setHostName(hostname);
        c.setPort(Integer.parseInt(port));
        c.setRepository(rootDirectory);
        c.open();
        return c;
    }

    public Client newClient()
        throws AuthenticationException, CommandAbortedException
    {
        Client client = new Client(newPServerConnection(), new StandardAdminHandler());
        client.getEventManager().addCVSListener(this);
        client.setLocalPath(localDirectory);
        return client;
    }

    public Client newClient(PServerConnection c)
    {
        Client client = new Client(c, new StandardAdminHandler());
        client.getEventManager().addCVSListener(this);
        client.setLocalPath(localDirectory);
        return client;
    }

    public void messageSent(MessageEvent e)
    {
        String line = e.getMessage();
        if(e.isTagged())
        {
            String message = MessageEvent.parseTaggedMessage(traceBuffer, "newline");
            if(message != null && !message.trim().equals(""))
                traceBuffer.append(message).append("\r\n");
        } else
        if(line != null && !line.trim().equals(""))
            traceBuffer.append(line).append("\r\n");
    }

    public StatusInformation[] executeStatusInformation(String fileName)
        throws CommandAbortedException, AuthenticationException, AuthenticationException, CommandException, IOException, CommandException, AuthenticationException, CommandAbortedException
    {
        return executeStatusInformation(fileName, false);
    }

    public StatusInformation[] executeStatusInformation(String fileName, boolean isRecursive)
        throws CommandAbortedException, AuthenticationException, AuthenticationException, CommandException, IOException
    {
        return executeStatusInformation(fileName, isRecursive, true);
    }

    public StatusInformation[] executeStatusInformation(String fileName, boolean isRecursive, boolean withFileContent)
        throws CommandAbortedException, AuthenticationException, AuthenticationException, CommandException, IOException
    {
        File lFile[] = (File[])null;
        File file = null;
        if(UtilString.isNotEmpty(fileName))
            file = new File(new File(getLocalDirectory(), getRepository()), fileName);
        else
            file = new File(getLocalDirectory(), getRepository());
        if(file.isFile() || !isRecursive)
        {
            lFile = (new File[] {
                file
            });
        } else
        {
            Vector vFile = UtilFile.dirFile(file.getCanonicalPath(), isRecursive, (FilenameFilter)null, false, false, withFileContent);
            ArrayList aFile = excludeCVSDirectory(vFile.iterator());
            lFile = new File[aFile.size()];
            aFile.toArray(lFile);
            UtilFile.sortByPathDepthAscendant(lFile);
        }
        return executeStatusInformation(lFile);
    }

    public StatusInformation[] executeStatusInformation(File lFile[])
        throws CommandAbortedException, AuthenticationException, AuthenticationException, CommandException, IOException
    {
        Client client = newClient();
        StatusCommand command = new StatusCommand();
        command.setBuilder(command.createBuilder(client.getEventManager()));
        command.setFiles(lFile);
        GlobalOptions globalOptions = new GlobalOptions();
        globalOptions.setCVSRoot((new StringBuilder(String.valueOf(getRootDirectory()))).append("/").append(getRepository()).toString());
        client.executeCommand(command, globalOptions);
        return statusInformation;
    }

    public ArrayList excludeCVSDirectory(Iterator vFile)
    {
        File file = null;
        ArrayList array = new ArrayList();
        while(vFile.hasNext()) 
        {
            file = (File)vFile.next();
            if(file.isFile())
            {
                if(file.getParentFile() == null || !UtilString.isEqualsIgnoreCase(file.getParentFile().getName(), "CVS") || !UtilString.isEqualsIgnoreCase(file.getName(), "Entries") && !UtilString.isEqualsIgnoreCase(file.getName(), "Repository") && !UtilString.isEqualsIgnoreCase(file.getName(), "Root"))
                    array.add(file);
            } else
            if(UtilString.isNotEqualsIgnoreCase(file.getName(), "CVS"))
                array.add(file);
        }
        array.trimToSize();
        return array;
    }

    public ArrayList excludeFile(Iterator vFile)
    {
        File file = null;
        ArrayList array = new ArrayList();
        while(vFile.hasNext()) 
        {
            file = (File)vFile.next();
            if(file.isDirectory())
                array.add(file);
        }
        array.trimToSize();
        return array;
    }

    public void fileAdded(FileAddedEvent fileaddedevent)
    {
    }

    public void fileRemoved(FileRemovedEvent fileremovedevent)
    {
    }

    public void fileUpdated(FileUpdatedEvent fileupdatedevent)
    {
    }

    public void fileInfoGenerated(FileInfoEvent e)
    {
        if(statusInformation == null)
        {
            statusInformation = (new StatusInformation[] {
                (StatusInformation)e.getInfoContainer()
            });
        } else
        {
            int size = statusInformation.length;
            StatusInformation listStatus[] = new StatusInformation[size + 1];
            System.arraycopy(statusInformation, 0, listStatus, 0, size);
            listStatus[size] = (StatusInformation)e.getInfoContainer();
            statusInformation = listStatus;
        }
    }

    public static boolean isIgnored(File f)
        throws FileNotFoundException, IOException
    {
        File fileIgnore = null;
        File tmpF = f;
        File parent = tmpF.getParentFile();
        String name = tmpF.getName();
        boolean ret;
        for(ret = false; parent != null && !ret; parent = parent.getParentFile())
        {
            fileIgnore = new File(parent, ".cvsignore");
            ret = fileIgnore.exists() && UtilFile.findLine(fileIgnore, name) >= 0;
            name = parent.getName();
            tmpF = parent;
        }

        return ret;
    }

    public void commandTerminated(TerminationEvent terminationevent)
    {
    }

    public void moduleExpanded(ModuleExpansionEvent moduleexpansionevent)
    {
    }

    public String getApplication()
    {
        return application;
    }

    public String getEncodedPassword()
    {
        return encodedPassword;
    }

    public String getPort()
    {
        return port;
    }

    public String getRepository()
    {
        return repository;
    }

    public StringBuffer getTraceBuffer()
    {
        return traceBuffer;
    }

    public String getHostname()
    {
        return hostname;
    }

    public String getLocalDirectory()
    {
        return localDirectory;
    }

    public String getRootDirectory()
    {
        return rootDirectory;
    }

    public File getFilePathMain()
    {
        return filePathMain;
    }

    public String getUserName()
    {
        return userName;
    }

    public void setPassword(String password)
    {
        this.password = password;
    }

    public void setApplication(String application)
    {
        this.application = application;
    }

    public void setEncodedPassword(String encodedPassword)
    {
        this.encodedPassword = encodedPassword;
    }

    public void setPort(String port)
    {
        this.port = port;
    }

    public void setRepository(String repository)
    {
        this.repository = repository;
    }

    public void setTraceBuffer(StringBuffer traceBuffer)
    {
        this.traceBuffer = traceBuffer;
    }

    public void setHostname(String hostname)
    {
        this.hostname = hostname;
    }

    public void setLocalDirectory(String localDirectory)
    {
        this.localDirectory = localDirectory;
    }

    public void setRootDirectory(String rootDirectory)
    {
        this.rootDirectory = rootDirectory;
    }

    public void setFilePathMain(File filePathMain)
    {
        this.filePathMain = filePathMain;
    }

    public void setUserName(String userName)
    {
        this.userName = userName;
    }

    public String getPassword()
    {
        return password;
    }

    protected String application;
    protected String userName;
    protected String password;
    protected String hostname;
    protected String port;
    protected String repository;
    protected String rootDirectory;
    protected String localDirectory;
    protected String encodedPassword;
    protected File filePathMain;
    protected StringBuffer traceBuffer;
    protected StatusInformation statusInformation[];
}
