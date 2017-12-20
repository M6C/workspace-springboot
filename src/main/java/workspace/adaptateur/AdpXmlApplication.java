// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   AdpXmlApplication.java

package workspace.adaptateur;

import framework.ressource.util.UtilXML;
import java.io.File;
import org.w3c.dom.Document;

public class AdpXmlApplication
{

    private AdpXmlApplication()
    {
    }

    public static String getLocalDirectory(Document dom, String application)
    {
        String ret = null;
        checkDocument(dom);
        checkApplication(application);
        String xpath = "//ROOT/USER/PROFILES/PROFILE/APPLICATIONS/APPLICATION[@Name = '" + application + "']/VERSIONNING/LOCAL_DIRECTORY";
        ret = UtilXML.getXPathStringValue(dom, xpath);
        if(ret == null)
            throw new IllegalArgumentException((new StringBuilder("XPath [")).append(xpath).append("] value not found in document").toString());
        else
            return ret;
    }

    public static String getModuleName(Document dom, String application)
    {
        String ret = null;
        checkDocument(dom);
        checkApplication(application);
        String xpath = "//ROOT/USER/PROFILES/PROFILE/APPLICATIONS/APPLICATION[@Name = '" + application + "']/VERSIONNING/MODULE_NAME";
        ret = UtilXML.getXPathStringValue(dom, xpath);
        if(ret == null)
            throw new IllegalArgumentException((new StringBuilder("XPath [")).append(xpath).append("] value not found in document").toString());
        else
            return ret;
    }

    public static String getServerHostName(Document dom, String application)
    {
        String ret = null;
        checkDocument(dom);
        checkApplication(application);
        String xpath = "//ROOT/USER/PROFILES/PROFILE/APPLICATIONS/APPLICATION[@Name = '" + application + "']/VERSIONNING/SERVER_HOSTNAME";
        ret = UtilXML.getXPathStringValue(dom, xpath);
        if(ret == null)
            throw new IllegalArgumentException((new StringBuilder("XPath [")).append(xpath).append("] value not found in document").toString());
        else
            return ret;
    }

    public static String getServerPort(Document dom, String application)
    {
        String ret = null;
        checkDocument(dom);
        checkApplication(application);
        String xpath = "//ROOT/USER/PROFILES/PROFILE/APPLICATIONS/APPLICATION[@Name = '" + application + "']/VERSIONNING/SERVER_PORT";
        ret = UtilXML.getXPathStringValue(dom, xpath);
        if(ret == null)
            throw new IllegalArgumentException((new StringBuilder("XPath [")).append(xpath).append("] value not found in document").toString());
        else
            return ret;
    }

    public static String getServerRepository(Document dom, String application)
    {
        String ret = null;
        checkDocument(dom);
        checkApplication(application);
        String xpath = "//ROOT/USER/PROFILES/PROFILE/APPLICATIONS/APPLICATION[@Name = '" + application + "']/VERSIONNING/SERVER_REPOSITORY";
        ret = UtilXML.getXPathStringValue(dom, xpath);
        if(ret == null)
            throw new IllegalArgumentException((new StringBuilder("XPath [")).append(xpath).append("] value not found in document").toString());
        else
            return ret;
    }

    public static String getUserName(Document dom, String application)
    {
        String ret = null;
        checkDocument(dom);
        checkApplication(application);
        String xpath = "//ROOT/USER/PROFILES/PROFILE/APPLICATIONS/APPLICATION[@Name = '" + application + "']/VERSIONNING/USER";
        ret = UtilXML.getXPathStringValue(dom, xpath);
        if(ret == null)
            throw new IllegalArgumentException((new StringBuilder("XPath [")).append(xpath).append("] value not found in document").toString());
        else
            return ret;
    }

    public static String getPassword(Document dom, String application)
    {
        String ret = null;
        checkDocument(dom);
        checkApplication(application);
        String xpath = "//ROOT/USER/PROFILES/PROFILE/APPLICATIONS/APPLICATION[@Name = '" + application + "']/VERSIONNING/PASSWORD";
        ret = UtilXML.getXPathStringValue(dom, xpath);
        if(ret == null)
            throw new IllegalArgumentException((new StringBuilder("XPath [")).append(xpath).append("] value not found in document").toString());
        else
            return ret;
    }

    public static File getPathMain(Document dom, String application)
    {
        File ret = null;
        checkDocument(dom);
        checkApplication(application);
        String xpath = "//ROOT/USER/PROFILES/PROFILE/APPLICATIONS/APPLICATION[@Name = '" + application + "']/PATHS/PATH[@Name = 'Main']";
        String szXPathMain = UtilXML.getXPathStringValue(dom, xpath);
        if(szXPathMain == null)
            throw new IllegalArgumentException((new StringBuilder("XPath [")).append(xpath).append("] value not found in document").toString());
        ret = new File(szXPathMain);
        if(!ret.exists())
            throw new IllegalArgumentException((new StringBuilder("Path [")).append(szXPathMain).append("] do not exist.").toString());
        if(ret.isFile())
            throw new IllegalArgumentException((new StringBuilder("Path [")).append(szXPathMain).append("] is not a directory.").toString());
        else
            return ret;
    }

    protected static void checkDocument(Document dom)
    {
        if(dom == null)
            throw new IllegalArgumentException("Argument dom (org.w3c.dom.Document) is null");
        else
            return;
    }

    protected static void checkApplication(String application)
    {
        if(application == null)
            throw new IllegalArgumentException("Argument application (java.lang.String) is null");
        if(application.trim().equals(""))
            throw new IllegalArgumentException("Argument application (java.lang.String) is empty");
        else
            return;
    }
}
