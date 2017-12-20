// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   AdpXmlHibernate.java

package workspace.adaptateur;

import framework.ressource.util.UtilXML;
import framework.ressource.xpath.XPathResult;
import framework.trace.Trace;
import java.io.StringWriter;
import java.util.Dictionary;
import java.util.Hashtable;
import javax.servlet.ServletContext;
import javax.xml.transform.*;
import javax.xml.transform.stream.StreamSource;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import workspace.adaptateur.bean.BeanAdpXmlHibernate;
import workspace.adaptateur.bean.BeanHbnClass;
import workspace.adaptateur.bean.BeanHbnGenerator;
import workspace.adaptateur.bean.BeanHbnId;
import workspace.adaptateur.bean.BeanHbnManyToOne;
import workspace.adaptateur.bean.BeanHbnMeta;
import workspace.adaptateur.bean.BeanHbnProperty;

public class AdpXmlHibernate
{

    private AdpXmlHibernate()
    {
    }

    public static String classNameByTable(ServletContext context, Document dom, BeanAdpXmlHibernate beanAdpXmlHibernate)
        throws TransformerException
    {
        String ret = null;
        checkDocument(dom);
        String szXsl = "Xsl/Hbn/ClassNameByTable.xsl";
        Dictionary dictionary = new Hashtable();
        dictionaryPut(dictionary, "pTable", beanAdpXmlHibernate.getTable());
        try
        {
            StringWriter strWriter = new StringWriter();
            final ServletContext ctx = context;
            URIResolver uriResolver = new URIResolver() {

                public Source resolve(String href, String base)
                {
                    Source src = new StreamSource(ctx.getResourceAsStream(href));
                    return src;
                }
            };
            UtilXML.tranformeXmlWithXsl(dom, context.getResourceAsStream(szXsl), strWriter, dictionary, uriResolver);
            ret = strWriter.toString();
        }
        catch(IllegalArgumentException e)
        {
            Trace.ERROR(e, e);
        }
        return ret;
    }

    public static String className(ServletContext context, Document dom)
        throws TransformerException
    {
        String ret = null;
        checkDocument(dom);
        String szXsl = "Xsl/Hbn/ClassName.xsl";
        Dictionary dictionary = new Hashtable();
        dictionaryPut(dictionary, "pTable", "");
        try
        {
            StringWriter strWriter = new StringWriter();
            final ServletContext ctx = context;
            URIResolver uriResolver = new URIResolver() {

                public Source resolve(String href, String base)
                {
                    Source src = new StreamSource(ctx.getResourceAsStream(href));
                    return src;
                }
            };
            UtilXML.tranformeXmlWithXsl(dom, context.getResourceAsStream(szXsl), strWriter, dictionary, uriResolver);
            ret = strWriter.toString();
        }
        catch(IllegalArgumentException e)
        {
            Trace.ERROR(e, e);
        }
        return ret;
    }

    public static String tableName(ServletContext context, Document dom)
        throws TransformerException
    {
        String ret = null;
        checkDocument(dom);
        String szXsl = "Xsl/Hbn/TableName.xsl";
        Dictionary dictionary = new Hashtable();
        dictionaryPut(dictionary, "pTable", "");
        try
        {
            StringWriter strWriter = new StringWriter();
            final ServletContext ctx = context;
            URIResolver uriResolver = new URIResolver() {

                public Source resolve(String href, String base)
                {
                    Source src = new StreamSource(ctx.getResourceAsStream(href));
                    return src;
                }
            };
            UtilXML.tranformeXmlWithXsl(dom, context.getResourceAsStream(szXsl), strWriter, dictionary, uriResolver);
            ret = strWriter.toString();
        }
        catch(IllegalArgumentException e)
        {
            Trace.ERROR(e, e);
        }
        return ret;
    }

    public static BeanHbnClass toBeanHbnByClass(ServletContext context, Document dom)
        throws TransformerException
    {
        return toBeanHbn(context, dom, "@name");
    }

    public static BeanHbnClass toBeanHbnByDB(ServletContext context, Document dom)
        throws TransformerException
    {
        return toBeanHbn(context, dom, "@column");
    }

    public static BeanHbnClass toBeanHbn(ServletContext context, Document dom, String keyName)
        throws TransformerException
    {
        BeanHbnClass ret = new BeanHbnClass();
        XPathResult xPathResult = null;
        XPathResult xPathResultId = null;
        Node node = null;
        Node nodeId = null;
        String name = null;
        String column = null;
        String type = null;
        String notNull = null;
        String length = null;
        String value = null;
        checkDocument(dom);
        ret.setPackageName(UtilXML.getXPathStringValue(dom, "hibernate-mapping/@package"));
        ret.setClassName(UtilXML.getXPathStringValue(dom, "hibernate-mapping/class/@name"));
        ret.setTable(UtilXML.getXPathStringValue(dom, "hibernate-mapping/class/@table"));
        xPathResult = UtilXML.getXPathResultNodeUnordered(dom, "hibernate-mapping/class/meta");
        while((node = xPathResult.iterateNext()) != null) 
        {
            BeanHbnMeta bean = new BeanHbnMeta();
            bean.setName(UtilXML.getXPathStringValue(dom, node, "@name"));
            bean.setValue(node.getNodeValue());
            ret.addHbnMeta(bean.getName(), bean);
        }
        xPathResult = UtilXML.getXPathResultNodeUnordered(dom, "hibernate-mapping/class/property");
        while((node = xPathResult.iterateNext()) != null) 
        {
            String key = UtilXML.getXPathStringValue(dom, node, keyName);
            BeanHbnProperty bean = new BeanHbnProperty();
            bean.setName(UtilXML.getXPathStringValue(dom, node, "@name"));
            bean.setColumn(UtilXML.getXPathStringValue(dom, node, "@column"));
            bean.setType(UtilXML.getXPathStringValue(dom, node, "@type"));
            bean.setNotNull(UtilXML.getXPathStringValue(dom, node, "@not-null"));
            bean.setLength(UtilXML.getXPathStringValue(dom, node, "@length"));
            ret.addHbnProperty(key, bean);
        }
        xPathResult = UtilXML.getXPathResultNodeUnordered(dom, "hibernate-mapping/class/many-to-one");
        while((node = xPathResult.iterateNext()) != null) 
        {
            String key = UtilXML.getXPathStringValue(dom, node, keyName);
            BeanHbnManyToOne bean = new BeanHbnManyToOne();
            bean.setName(UtilXML.getXPathStringValue(dom, node, "@name"));
            bean.setColumn(UtilXML.getXPathStringValue(dom, node, "@column"));
            bean.setClassName(UtilXML.getXPathStringValue(dom, node, "@class"));
            bean.setNotNull(UtilXML.getXPathStringValue(dom, node, "@not-null"));
            ret.addHbnManyToOne(key, bean);
        }
        xPathResult = UtilXML.getXPathResultNodeUnordered(dom, "hibernate-mapping/class/id");
        while((node = xPathResult.iterateNext()) != null) 
        {
            String key = UtilXML.getXPathStringValue(dom, node, keyName);
            BeanHbnId bean = new BeanHbnId();
            bean.setName(UtilXML.getXPathStringValue(dom, node, "@name"));
            bean.setType(UtilXML.getXPathStringValue(dom, node, "@type"));
            bean.setColumn(UtilXML.getXPathStringValue(dom, node, "@column"));
            xPathResultId = UtilXML.getXPathResultNodeUnordered(dom, node, "id");
            while((nodeId = xPathResultId.iterateNext()) != null) 
                bean.addHbnGenerator(new BeanHbnGenerator(UtilXML.getXPathStringValue(dom, nodeId, "@className")));
            ret.addHbnId(key, bean);
        }
        return ret;
    }

    protected static void dictionaryPut(Dictionary dictionary, String key, String value)
    {
        if(dictionary != null && key != null && value != null)
            dictionary.put(key, value);
    }

    protected static void checkDocument(Document dom)
    {
        if(dom == null)
            throw new IllegalArgumentException("Argument dom (org.w3c.dom.Document) is null");
        else
            return;
    }
}
