// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   AdpXmlServlet.java

package workspace.adaptateur;

import framework.ressource.util.UtilXML;
import framework.trace.Trace;
import java.io.IOException;
import java.io.StringWriter;
import java.util.Dictionary;
import java.util.Hashtable;
import javax.servlet.ServletContext;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.*;
import javax.xml.transform.stream.StreamSource;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;
import workspace.adaptateur.bean.BeanAdpXmlBean;
import workspace.adaptateur.bean.BeanAdpXmlQuery;
import workspace.adaptateur.bean.BeanAdpXmlServlet;

public class AdpXmlServlet
{

    private AdpXmlServlet()
    {
    }

    public static String classNameByTable(ServletContext context, Document dom, BeanAdpXmlServlet beanAdpXmlServlet)
        throws TransformerException
    {
        String ret = null;
        checkDocument(dom);
        String szXsl = "Xsl/Servlet/AddServlet.xsl";
        Dictionary dictionary = new Hashtable();
        dictionaryPut(dictionary, "pName", beanAdpXmlServlet.getName());
        dictionaryPut(dictionary, "pClass", beanAdpXmlServlet.getAClass());
        dictionaryPut(dictionary, "pTarget", beanAdpXmlServlet.getTarget());
        dictionaryPut(dictionary, "pTargetError", beanAdpXmlServlet.getTargetError());
        dictionaryPut(dictionary, "pAuthentification", beanAdpXmlServlet.getAuthentification());
        if(beanAdpXmlServlet.getBeanAdpXmlBean() != null)
        {
            BeanAdpXmlBean beanAdpXmlBean = beanAdpXmlServlet.getBeanAdpXmlBean();
            dictionaryPut(dictionary, "pBeanName", beanAdpXmlBean.getName());
            dictionaryPut(dictionary, "pBeanService", beanAdpXmlBean.getService());
            dictionaryPut(dictionary, "pBeanClass", beanAdpXmlBean.getAClass());
            dictionaryPut(dictionary, "pBeanScope", beanAdpXmlBean.getScope());
            if(beanAdpXmlBean.getBeanAdpXmlQuery() != null)
            {
                BeanAdpXmlQuery beanAdpXmlQuery = beanAdpXmlBean.getBeanAdpXmlQuery();
                dictionaryPut(dictionary, "pQueryType", beanAdpXmlQuery.getType());
                dictionaryPut(dictionary, "pQueryParameterCount", beanAdpXmlQuery.getParameterCount());
                dictionaryPut(dictionary, "pQuery", beanAdpXmlQuery.getQuery());
            }
            dictionaryPut(dictionary, "pParamName", beanAdpXmlBean.getParamName());
            dictionaryPut(dictionary, "pParamType", beanAdpXmlBean.getParamType());
            dictionaryPut(dictionary, "pParamBean", beanAdpXmlBean.getParamBean());
            dictionaryPut(dictionary, "pParamFormatIn", beanAdpXmlBean.getParamFormatIn());
        }
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

    public static Document addServletDom(ServletContext context, Document dom, BeanAdpXmlServlet beanAdpXmlServlet)
        throws TransformerException
    {
        Document ret = null;
        checkDocument(dom);
        String szXsl = "Xsl/Servlet/AddServlet.xsl";
        Dictionary dictionary = new Hashtable();
        dictionaryPut(dictionary, "pName", beanAdpXmlServlet.getName());
        dictionaryPut(dictionary, "pClass", beanAdpXmlServlet.getAClass());
        dictionaryPut(dictionary, "pTarget", beanAdpXmlServlet.getTarget());
        dictionaryPut(dictionary, "pTargetError", beanAdpXmlServlet.getTargetError());
        dictionaryPut(dictionary, "pAuthentification", beanAdpXmlServlet.getAuthentification());
        if(beanAdpXmlServlet.getBeanAdpXmlBean() != null)
        {
            BeanAdpXmlBean beanAdpXmlBean = beanAdpXmlServlet.getBeanAdpXmlBean();
            dictionaryPut(dictionary, "pBeanName", beanAdpXmlBean.getName());
            dictionaryPut(dictionary, "pBeanService", beanAdpXmlBean.getService());
            dictionaryPut(dictionary, "pBeanClass", beanAdpXmlBean.getAClass());
            dictionaryPut(dictionary, "pBeanScope", beanAdpXmlBean.getScope());
            if(beanAdpXmlBean.getBeanAdpXmlQuery() != null)
            {
                BeanAdpXmlQuery beanAdpXmlQuery = beanAdpXmlBean.getBeanAdpXmlQuery();
                dictionaryPut(dictionary, "pQueryType", beanAdpXmlQuery.getType());
                dictionaryPut(dictionary, "pQueryParameterCount", beanAdpXmlQuery.getParameterCount());
                dictionaryPut(dictionary, "pQuery", beanAdpXmlQuery.getQuery());
            }
            dictionaryPut(dictionary, "pParamName", beanAdpXmlBean.getParamName());
            dictionaryPut(dictionary, "pParamType", beanAdpXmlBean.getParamType());
            dictionaryPut(dictionary, "pParamBean", beanAdpXmlBean.getParamBean());
            dictionaryPut(dictionary, "pParamFormatIn", beanAdpXmlBean.getParamFormatIn());
        }
        try
        {
            final ServletContext ctx = context;
            URIResolver uriResolver = new URIResolver() {

                public Source resolve(String href, String base)
                {
                    Source src = new StreamSource(ctx.getResourceAsStream(href));
                    return src;
                }
            };
            ret = UtilXML.tranformeXmlWithXslToDom(dom, context.getResourceAsStream(szXsl), dictionary, uriResolver);
        }
        catch(IllegalArgumentException e)
        {
            Trace.ERROR(e, e);
        }
        catch(ParserConfigurationException e)
        {
            Trace.ERROR(e, e);
        }
        catch(SAXException e)
        {
            Trace.ERROR(e, e);
        }
        catch(IOException e)
        {
            Trace.ERROR(e, e);
        }
        return ret;
    }

    public static Document addServletBeanDom(ServletContext context, Document dom, BeanAdpXmlServlet beanAdpXmlServlet, BeanAdpXmlBean beanAdpXmlBean)
        throws TransformerException
    {
        Document ret = null;
        checkDocument(dom);
        String szXsl = "Xsl/Servlet/AddServletBean.xsl";
        Dictionary dictionary = new Hashtable();
        dictionaryPut(dictionary, "pName", beanAdpXmlServlet.getName());
        dictionaryPut(dictionary, "pBeanName", beanAdpXmlBean.getName());
        dictionaryPut(dictionary, "pBeanService", beanAdpXmlBean.getService());
        dictionaryPut(dictionary, "pBeanClass", beanAdpXmlBean.getAClass());
        dictionaryPut(dictionary, "pBeanScope", beanAdpXmlBean.getScope());
        if(beanAdpXmlBean.getBeanAdpXmlQuery() != null)
        {
            BeanAdpXmlQuery beanAdpXmlQuery = beanAdpXmlBean.getBeanAdpXmlQuery();
            dictionaryPut(dictionary, "pQueryType", beanAdpXmlQuery.getType());
            dictionaryPut(dictionary, "pQueryParameterCount", beanAdpXmlQuery.getParameterCount());
            dictionaryPut(dictionary, "pQuery", beanAdpXmlQuery.getQuery());
        }
        dictionaryPut(dictionary, "pParamName", beanAdpXmlBean.getParamName());
        dictionaryPut(dictionary, "pParamType", beanAdpXmlBean.getParamType());
        dictionaryPut(dictionary, "pParamBean", beanAdpXmlBean.getParamBean());
        dictionaryPut(dictionary, "pParamFormatIn", beanAdpXmlBean.getParamFormatIn());
        try
        {
            final ServletContext ctx = context;
            URIResolver uriResolver = new URIResolver() {

                public Source resolve(String href, String base)
                {
                    Source src = new StreamSource(ctx.getResourceAsStream(href));
                    return src;
                }
            };
            ret = UtilXML.tranformeXmlWithXslToDom(dom, context.getResourceAsStream(szXsl), dictionary, uriResolver);
        }
        catch(IllegalArgumentException e)
        {
            Trace.ERROR(e, e);
        }
        catch(ParserConfigurationException e)
        {
            Trace.ERROR(e, e);
        }
        catch(SAXException e)
        {
            Trace.ERROR(e, e);
        }
        catch(IOException e)
        {
            Trace.ERROR(e, e);
        }
        return ret;
    }

    public static Document addServletBeanGlobalDom(ServletContext context, Document dom, BeanAdpXmlServlet beanAdpXmlServlet, BeanAdpXmlBean beanAdpXmlBean)
        throws TransformerException
    {
        Document ret = null;
        checkDocument(dom);
        String szXsl = "Xsl/Servlet/AddServletBeanGlobal.xsl";
        Dictionary dictionary = new Hashtable();
        dictionaryPut(dictionary, "pName", beanAdpXmlServlet.getName());
        dictionaryPut(dictionary, "pBeanName", beanAdpXmlBean.getName());
        try
        {
            final ServletContext ctx = context;
            URIResolver uriResolver = new URIResolver() {

                public Source resolve(String href, String base)
                {
                    Source src = new StreamSource(ctx.getResourceAsStream(href));
                    return src;
                }
            };
            ret = UtilXML.tranformeXmlWithXslToDom(dom, context.getResourceAsStream(szXsl), dictionary, uriResolver);
        }
        catch(IllegalArgumentException e)
        {
            Trace.ERROR(e, e);
        }
        catch(ParserConfigurationException e)
        {
            Trace.ERROR(e, e);
        }
        catch(SAXException e)
        {
            Trace.ERROR(e, e);
        }
        catch(IOException e)
        {
            Trace.ERROR(e, e);
        }
        return ret;
    }

    public static Document addBeanDom(ServletContext context, Document dom, BeanAdpXmlBean beanAdpXmlBean)
        throws TransformerException
    {
        Document ret = null;
        checkDocument(dom);
        String szXsl = "Xsl/Servlet/AddBean.xsl";
        Dictionary dictionary = new Hashtable();
        dictionaryPut(dictionary, "pBeanName", beanAdpXmlBean.getName());
        dictionaryPut(dictionary, "pBeanService", beanAdpXmlBean.getService());
        dictionaryPut(dictionary, "pBeanClass", beanAdpXmlBean.getAClass());
        dictionaryPut(dictionary, "pBeanScope", beanAdpXmlBean.getScope());
        if(beanAdpXmlBean.getBeanAdpXmlQuery() != null)
        {
            BeanAdpXmlQuery beanAdpXmlQuery = beanAdpXmlBean.getBeanAdpXmlQuery();
            dictionaryPut(dictionary, "pQueryType", beanAdpXmlQuery.getType());
            dictionaryPut(dictionary, "pQueryParameterCount", beanAdpXmlQuery.getParameterCount());
            dictionaryPut(dictionary, "pQuery", beanAdpXmlQuery.getQuery());
        }
        dictionaryPut(dictionary, "pParamName", beanAdpXmlBean.getParamName());
        dictionaryPut(dictionary, "pParamType", beanAdpXmlBean.getParamType());
        try
        {
            final ServletContext ctx = context;
            URIResolver uriResolver = new URIResolver() {

                public Source resolve(String href, String base)
                {
                    Source src = new StreamSource(ctx.getResourceAsStream(href));
                    return src;
                }
            };
            ret = UtilXML.tranformeXmlWithXslToDom(dom, context.getResourceAsStream(szXsl), dictionary, uriResolver);
        }
        catch(IllegalArgumentException e)
        {
            Trace.ERROR(e, e);
        }
        catch(ParserConfigurationException e)
        {
            Trace.ERROR(e, e);
        }
        catch(SAXException e)
        {
            Trace.ERROR(e, e);
        }
        catch(IOException e)
        {
            Trace.ERROR(e, e);
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
