package workspace.adaptateur.application;

import framework.ressource.util.UtilString;
import framework.ressource.util.UtilXML;

import java.io.StringWriter;
import java.util.Dictionary;
import java.util.Hashtable;

import javax.servlet.ServletContext;
import javax.xml.transform.TransformerException;

import org.w3c.dom.Document;

import workspace.adaptateur.application.AdpXml;

public class AdpXmlDebug extends AdpXml {

    public static String getHostname(ServletContext context, Document dom, String application) throws TransformerException {
        String ret = null;
        checkDocument(dom);
        checkApplication(application);
        String szXsl = "/Xsl/User/Application/Debug/Hostname.xsl";
        Dictionary dictionary = new Hashtable();
        dictionary.put("pApplication", application);
        StringWriter strWriter = new StringWriter();
        UtilXML.tranformeXmlWithXsl(dom, context.getResourceAsStream(szXsl), strWriter, dictionary);
        ret = strWriter.toString();
        if(UtilString.isEmpty(ret)) {
            throw new IllegalArgumentException("Debug hostname not found in application '" + application + "'");
        } else {
            ret = ret.trim();
            return ret;
        }
    }

    public static int getPort(ServletContext context, Document dom, String application) throws TransformerException {
        int ret = -1;
        checkDocument(dom);
        checkApplication(application);
        String szXsl = "/Xsl/User/Application/Debug/Port.xsl";
        Dictionary dictionary = new Hashtable();
        dictionary.put("pApplication", application);
        StringWriter strWriter = new StringWriter();
        UtilXML.tranformeXmlWithXsl(dom, context.getResourceAsStream(szXsl), strWriter, dictionary);
        String str = strWriter.toString();
        if(UtilString.isEmpty(str)) {
            throw new IllegalArgumentException("Debug port not found in application '" + application + "'");
        } else {
            ret = Integer.parseInt(str.trim());
            return ret;
        }
    }

    public static int getTimeout(ServletContext context, Document dom, String application) throws TransformerException {
        int ret = -1;
        checkDocument(dom);
        checkApplication(application);
        String szXsl = "/Xsl/User/Application/Debug/Timeout.xsl";
        Dictionary dictionary = new Hashtable();
        dictionary.put("pApplication", application);
        StringWriter strWriter = new StringWriter();
        UtilXML.tranformeXmlWithXsl(dom, context.getResourceAsStream(szXsl), strWriter, dictionary);
        String str = strWriter.toString();
        if(UtilString.isEmpty(str)) {
            throw new IllegalArgumentException("Debug timeout not found in application '" + application + "'");
        } else {
            ret = Integer.parseInt(str.trim());
            return ret;
        }
    }
}