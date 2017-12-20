// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvEditorJavaXmlXsl1.java

package workspace.service;

import framework.beandata.BeanGenerique;
import framework.ressource.util.*;
import framework.service.SrvGenerique;
import framework.trace.Trace;
import java.io.*;
import java.net.URL;
import javax.servlet.ServletContext;
import javax.servlet.http.*;
import javax.xml.transform.*;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;
import org.w3c.dom.Document;
import workspace.adaptateur.application.AdpXmlApplication;
import workspace.util.UtilPath;

public class SrvEditorJavaXmlXsl1 extends SrvGenerique
{

    public SrvEditorJavaXmlXsl1()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        HttpSession session = request.getSession();
        ServletContext context = session.getServletContext();
        String application = (String)bean.getParameterDataByName("application");
        String pathXml = (String)bean.getParameterDataByName("pathXml");
        String xmlName = (String)bean.getParameterDataByName("xmlName");
        String xmlScope = (String)bean.getParameterDataByName("xmlScope");
        String pathXsl = (String)bean.getParameterDataByName("pathXsl");
        String xslParam = (String)bean.getParameterDataByName("paramXsl");
        if(UtilString.isNotEmpty(application) && (UtilString.isNotEmpty(pathXml) || UtilString.isNotEmpty(xmlName)))
            try
            {
                Document dom = (Document)session.getAttribute("resultDom");
                String filePathMain = AdpXmlApplication.getFormatedPathMain(context, dom, application);
                Transformer transformer = null;
                TransformerFactory tFactory = TransformerFactory.newInstance("org.apache.xalan.processor.TransformerFactoryImpl", Thread.currentThread().getContextClassLoader());
                String szXsl = UtilRequest.replaceParamByRequestValue(pathXsl, request, session, "");
                if(UtilString.isNotEmpty(szXsl))
                {
                    szXsl = UtilPath.formatPath(dom, szXsl, ';');
                    if(!(new File(szXsl)).isAbsolute())
                        szXsl = (new File(filePathMain, szXsl)).getAbsolutePath();
                    Source xslSource = null;
                    try
                    {
                        xslSource = new StreamSource((new URL("file", "", szXsl)).openStream());
                    }
                    catch(FileNotFoundException ex)
                    {
                        xslSource = new StreamSource(context.getResourceAsStream(szXsl));
                    }
                    transformer = tFactory.newTransformer(xslSource);
                } else
                {
                    transformer = tFactory.newTransformer();
                }
                String szXmlPath = UtilRequest.replaceParamByRequestValue(pathXml, request, session, "");
                String szXmlName = UtilRequest.replaceParamByRequestValue(xmlName, request, session, "");
                String szXmlScope = UtilRequest.replaceParamByRequestValue(xmlScope, request, session, "");
                String szXslParam = UtilRequest.replaceParamByRequestValue(xslParam, request, session, "");
                if(transformer != null)
                {
                    Source xmlSource = null;
                    if(UtilString.isNotEmpty(szXmlPath))
                    {
                        szXmlPath = UtilPath.formatPath(dom, szXmlPath, ';');
                        if(!(new File(szXmlPath)).isAbsolute())
                            szXmlPath = (new File(filePathMain, szXmlPath)).getAbsolutePath();
                        try
                        {
                            xmlSource = new StreamSource((new URL("file", "", szXmlPath)).openStream());
                        }
                        catch(FileNotFoundException ex)
                        {
                            xmlSource = new StreamSource(context.getResourceAsStream(szXmlPath));
                        }
                    } else
                    if(UtilString.isNotEmpty(szXmlName))
                    {
                        Document doc = null;
                        if(UtilString.isEqualsIgnoreCase("session", szXmlScope))
                            doc = (Document)session.getAttribute(szXmlName);
                        else
                            doc = (Document)request.getAttribute(szXmlName);
                        if(doc != null)
                            xmlSource = new DOMSource(doc);
                    }
                    if(xmlSource != null)
                    {
                        String listXslParam[] = UtilString.split(szXslParam, ';');
                        String param = null;
                        String listParam[] = (String[])null;
                        int size = UtilSafe.safeListSize(listXslParam);
                        for(int i = 0; i < size; i++)
                        {
                            param = (String)UtilSafe.safeListGetElementAt(listXslParam, i);
                            listParam = UtilString.split(param, '=');
                            if(listParam != null && listParam.length == 2)
                                transformer.setParameter(listParam[0], listParam[1]);
                        }

                        StringWriter strWriter = new StringWriter();
                        final ServletContext ctx = context;
                        URIResolver uriResolver = new URIResolver() {

                            public Source resolve(String href, String base)
                            {
                                Source src = new StreamSource(ctx.getResourceAsStream(href));
                                return src;
                            }
                        };
                        transformer.setURIResolver(uriResolver);
                        transformer.transform(xmlSource, new StreamResult(strWriter));
                        String xmlResult = strWriter.toString();
                        if(UtilString.isNotEmpty(xmlResult))
                            request.setAttribute("xmlResult", xmlResult);
                    }
                }
            }
            catch(Exception ex)
            {
                Trace.ERROR(this, ex);
            }
    }
}
