package workspace.adaptateur.application;

import framework.ressource.util.UtilString;
import framework.ressource.util.UtilXML;
import java.io.StringWriter;
import java.util.Dictionary;
import java.util.Hashtable;
import javax.servlet.ServletContext;
import javax.xml.transform.TransformerException;
import org.w3c.dom.Document;

public class AdpXmlServer extends AdpXml {

    private static final String XSL_PATH_PREFIX = "/";

    public static String getCommandByName(ServletContext context, Document dom, String application, String type, String name) throws TransformerException {
        String ret = null;
        checkDocument(dom);
        checkApplication(application);
        String szXsl = "/Xsl/User/Application/Server/Command/FindByName.xsl";
        Dictionary dictionary = new Hashtable();
        dictionary.put("pApplication", application);
        dictionary.put("pType", type);
        dictionary.put("pName", name);
        StringWriter strWriter = new StringWriter();
        UtilXML.tranformeXmlWithXsl(dom, context.getResourceAsStream(szXsl), strWriter, dictionary);
        ret = strWriter.toString();
        if(UtilString.isEmpty(ret))
        {
            throw new IllegalArgumentException(new StringBuilder("Type '").append(type).append("' Command '").append(name).append("' not found in application '").append(application).append("'").toString());
        } else
        {
            ret = ret.trim();
            return ret;
        }
    }

    public static String getPathByName(ServletContext context, Document dom, String application, String type, String name) throws TransformerException {
        String ret = null;
        checkDocument(dom);
        checkApplication(application);
        String szXsl = "/Xsl/User/Application/Server/Path/FindByName.xsl";
        Dictionary dictionary = new Hashtable();
        dictionary.put("pApplication", application);
        dictionary.put("pType", type);
        dictionary.put("pName", name);
        StringWriter strWriter = new StringWriter();
        UtilXML.tranformeXmlWithXsl(dom, context.getResourceAsStream(szXsl), strWriter, dictionary);
        ret = strWriter.toString();
        if(UtilString.isEmpty(ret))
        {
            throw new IllegalArgumentException(new StringBuilder("Type '").append(type).append("' Command '").append(name).append("' not found in application '").append(application).append("'").toString());
        } else
        {
            ret = ret.trim();
            return ret;
        }
    }

    public static boolean isAutoDeploy(ServletContext context, Document dom, String application) {
        try {
            String autoDeploy = getCommandByName(context, dom, application, "WebApplication", "AutoDeploy");
            return UtilString.isNotEmpty(autoDeploy);
        } catch (Exception ex) {
        }
        return false;
    }
}