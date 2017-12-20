// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvEditorJavaCompile.java

package workspace.service;

import framework.beandata.BeanGenerique;
import framework.ressource.util.*;
import framework.service.SrvGenerique;
import java.io.*;
import java.util.Vector;
import javax.servlet.ServletContext;
import javax.servlet.http.*;
import org.w3c.dom.Document;
import workspace.adaptateur.application.AdpXmlApplication;

public class SrvEditorJavaCompile extends SrvGenerique
{

    public SrvEditorJavaCompile()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        HttpSession session = request.getSession();
        ServletContext context = session.getServletContext();
        String pathSrc = (String)bean.getParameterDataByName("pathSrc");
        String pathDst = (String)bean.getParameterDataByName("pathDst");
        if(UtilString.isNotEmpty(pathSrc))
        {
            Document domXml = (Document)session.getAttribute("resultDom");
            String application = (String)bean.getParameterDataByName("application");
            String szPathMain = AdpXmlApplication.getFormatedPathByName(context, domXml, application, "Main");
            if(UtilString.isEmpty(pathDst))
                pathDst = AdpXmlApplication.getFormatedPathByName(context, domXml, application, "Class");
            String szClasspath = AdpXmlApplication.getClassPathAll(context, domXml, application);
            String szJdkpath = AdpXmlApplication.getJdkPathByName(context, domXml, application, "Home");
            String szJreHome = AdpXmlApplication.getJdkJrePathByName(context, domXml, application, "Home");
            String szJreLib = AdpXmlApplication.getJdkJrePathByName(context, domXml, application, "Lib");
            String szPathSrc = (new File(szPathMain, pathSrc)).getCanonicalPath();
            StringBuffer pathClass = new StringBuffer(UtilPackage.getPackageClassPath());
            addJarToClassPath(context.getRealPath("WEB-INF"), pathClass);
            if(UtilString.isNotEmpty(szJdkpath))
            {
                File jdkPath = new File(szJdkpath);
                if(jdkPath.exists())
                {
                    File jreHome = null;
                    File jreLib = null;
                    if(UtilString.isNotEmpty(szJreHome))
                        jreHome = szJreHome.indexOf(':') <= 0 ? new File(jdkPath, szJreHome) : new File(szJreHome);
                    if(UtilString.isNotEmpty(szJreLib))
                    {
                        File home = jreHome == null || !jreHome.exists() ? jdkPath : jreHome;
                        jreLib = szJreLib.indexOf(':') <= 0 ? new File(home, szJreLib) : new File(szJreLib);
                        if(jreLib.exists())
                            addJarToClassPath(jreLib.getCanonicalPath(), pathClass);
                    }
                }
            }
            pathClass.append(";").append(szClasspath);
            ByteArrayOutputStream baosOut = new ByteArrayOutputStream();
            if(UtilString.isNotEmpty(pathDst))
            {
                String listPathDst[] = UtilString.split(pathDst, ';');
                if(listPathDst != null)
                {
                    int max = listPathDst.length;
                    for(int i = 0; i < max; i++)
                    {
                        listPathDst[i] = (new File(szPathMain, listPathDst[i])).getCanonicalPath();
                        UtilBuildJavac.build(baosOut, szPathSrc, listPathDst[i], (new StringBuilder(String.valueOf(listPathDst[i]))).append(";").append(pathClass.toString()).toString());
                    }

                }
            } else
            {
                String szPathClass = (new File(szPathMain, pathDst)).getCanonicalPath();
                UtilBuildJavac.build(baosOut, szPathSrc, szPathClass, pathClass.toString());
            }
            String msg = baosOut.toString();
            if(msg.equals(""))
                msg = "Build Completed";
            request.setAttribute("traceOut", msg);
            request.setAttribute("msgText", msg);
        }
    }

    private void addJarToClassPath(String path, StringBuffer classpath)
        throws IOException
    {
        Vector listJar = UtilFile.dir(path, true, ".jar");
        int max = UtilVector.safeSize(listJar);
        for(int i = 0; i < max; i++)
            classpath.append(";").append((String)UtilVector.safeGetElementAt(listJar, i));

    }
}
