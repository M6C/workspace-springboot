// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvEditorJavaPackageClean.java

package workspace.service;

import framework.beandata.BeanGenerique;
import framework.ressource.util.*;
import framework.service.SrvGenerique;
import java.io.File;
import java.io.PrintStream;
import javax.servlet.ServletContext;
import javax.servlet.http.*;
import org.w3c.dom.Document;
import workspace.adaptateur.application.AdpXmlApplication;

public class SrvEditorJavaPackageClean extends SrvGenerique
{

    public SrvEditorJavaPackageClean()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        HttpSession session = request.getSession();
        ServletContext context = session.getServletContext();
        String application = (String)bean.getParameterDataByName("application");
        String pack = (String)bean.getParameterDataByName("package");
        String type = (String)bean.getParameterDataByName("type");
        if(UtilString.isNotEmpty(application) && UtilString.isNotEmpty(pack) && UtilString.isNotEmpty(type))
            try
            {
                Document dom = (Document)request.getSession().getAttribute("resultDom");
                Document xml = AdpXmlApplication.getPackageXmlByName(context, dom, application, type, pack);
                String filePathMain = AdpXmlApplication.getFormatedPathMain(context, dom, application);
                if(filePathMain != null && !filePathMain.equals("") && !filePathMain.toUpperCase().startsWith("FTP://"))
                {
                    File fileMain = new File(filePathMain);
                    String exploded = UtilXML.getXPathStringValue(xml, "/PACKAGE/@Exploded");
                    String pathDst = UtilXML.getXPathStringValue(xml, "/PACKAGE/@Filename");
                    File file = null;
                    if(!(new File(pathDst)).isAbsolute())
                        file = new File(filePathMain, pathDst);
                    else
                        file = new File(pathDst);
                    if(!file.getCanonicalPath().equals(fileMain.getCanonicalPath()))
                        if(file.isFile())
                        {
                            file.delete();
                        } else
                        {
                            File listFile[] = file.listFiles();
                            if(listFile != null)
                            {
                                File f = null;
                                int size = listFile.length;
                                for(int i = 0; i < size; i++)
                                {
                                    f = listFile[i];
                                    if(f.isFile())
                                        f.delete();
                                    else
                                        UtilFile.delete(f);
                                }

                                file.delete();
                            }
                        }
                }
            }
            catch(Exception ex)
            {
                System.out.println(ex.getMessage());
            }
    }
}
