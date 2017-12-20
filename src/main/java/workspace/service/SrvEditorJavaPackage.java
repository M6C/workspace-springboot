// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvEditorJavaPackage.java

package workspace.service;

import framework.beandata.BeanGenerique;
import framework.ressource.util.*;
import framework.service.SrvGenerique;
import framework.trace.Trace;
import java.io.*;
import java.util.Hashtable;
import java.util.Vector;
import javax.servlet.ServletContext;
import javax.servlet.http.*;
import org.w3c.dom.*;
import workspace.adaptateur.application.AdpXmlApplication;
import workspace.util.UtilPath;

public class SrvEditorJavaPackage extends SrvGenerique
{

    public SrvEditorJavaPackage()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        HttpSession session = request.getSession();
        ServletContext context = session.getServletContext();
        String application = (String)bean.getParameterDataByName("application");
        String login = (String)bean.getParameterDataByName("login");
        String password = (String)bean.getParameterDataByName("password");
        String pack = (String)bean.getParameterDataByName("package");
        String type = (String)bean.getParameterDataByName("type");
        if(UtilString.isNotEmpty(application) && UtilString.isNotEmpty(type) && UtilString.isNotEmpty(pack))
            try
            {
                Document dom = (Document)request.getSession().getAttribute("resultDom");
                String filePathMain = AdpXmlApplication.getFormatedPathMain(context, dom, application);
                if(filePathMain != null && !filePathMain.equals("") && !filePathMain.toUpperCase().startsWith("FTP://"))
                {
                    File fileMain = new File(filePathMain);
                    Document xml = AdpXmlApplication.getPackageXmlByName(context, dom, application, type, pack);
                    String exploded = UtilXML.getXPathStringValue(xml, "/PACKAGE/@Exploded");
                    String pathDst = UtilXML.getXPathStringValue(xml, "/PACKAGE/@Filename");
                    if("true".equalsIgnoreCase(exploded))
                    {
                        Hashtable hash = new Hashtable();
                        hash.put(application, filePathMain);
                        Node node = null;
                        Node nodeSubdirectory = null;
                        String from = null;
                        String to = null;
                        File fileFrom = null;
                        File fileTo = null;
                        File filePathMainTo = null;
                        if(!(new File(pathDst)).isAbsolute())
                            filePathMainTo = new File(filePathMain, pathDst);
                        else
                            filePathMainTo = new File(pathDst);
                        NodeList nodeList = xml.getFirstChild().getChildNodes();
                        int size = nodeList.getLength();
                        for(int i = 0; i < size; i++)
                        {
                            node = nodeList.item(i);
                            if(node.getNodeType() == 1 && node.hasAttributes())
                            {
                                from = node.getAttributes().getNamedItem("From").getNodeValue();
                                to = node.getAttributes().getNamedItem("To").getNodeValue();
                                nodeSubdirectory = node.getAttributes().getNamedItem("Subdirectory");
                                from = UtilPath.formatPath(dom, hash, from);
                                fileFrom = new File(from);
                                if(!fileFrom.isAbsolute())
                                    fileFrom = new File(filePathMain, from);
                                fileTo = new File(filePathMainTo, to);
                                if(fileFrom.exists() && fileFrom.canRead())
                                    if(fileFrom.isFile())
                                    {
                                        String nameFrom = fileFrom.getName();
                                        if(!to.toUpperCase().endsWith(nameFrom.toUpperCase()))
                                            fileTo = new File(fileTo, nameFrom);
                                        copyFile(fileFrom, fileTo);
                                    } else
                                    {
                                        boolean isSubDir = nodeSubdirectory == null || Boolean.getBoolean(nodeSubdirectory.getNodeValue());
                                        Vector listFile = UtilFile.dirFile(fileFrom.getCanonicalPath(), isSubDir);
                                        int maxJ = UtilVector.safeSize(listFile);
                                        for(int j = 0; j < maxJ; j++)
                                        {
                                            File file = (File)UtilVector.safeGetElementAt(listFile, j);
                                            if(file != null && file.isFile() && file.canRead())
                                            {
                                                String path = file.getPath().substring(fileFrom.getCanonicalPath().length() + 1);
                                                File fileNew = new File(fileTo, path);
                                                try
                                                {
                                                    copyFile(file, fileNew);
                                                }
                                                catch(Exception exception) { }
                                            }
                                        }

                                    }
                            }
                        }

                    } else
                    {
                        Node node = null;
                        String pathMain = fileMain.getPath();
                        StringBuffer stbSrcFrom = new StringBuffer();
                        StringBuffer stbSrcTo = new StringBuffer();
                        NodeList nodeList = xml.getFirstChild().getChildNodes();
                        int size = nodeList.getLength();
                        for(int i = 0; i < size; i++)
                        {
                            node = nodeList.item(i);
                            if(node.getNodeType() == 1 && node.hasAttributes())
                            {
                                stbSrcFrom.append(node.getAttributes().getNamedItem("From").getNodeValue()).append(";");
                                stbSrcTo.append(node.getAttributes().getNamedItem("To").getNodeValue()).append(";");
                            }
                        }

                        String szSrcFrom = stbSrcFrom.substring(0, stbSrcFrom.length() - 1);
                        String szSrcTo = stbSrcTo.substring(0, stbSrcTo.length() - 1);
                        String pathSrcFrom = UtilPath.formatPath(context, dom, application, szSrcFrom, ';');
                        String listPathSrcFrom[] = UtilString.split(pathSrcFrom, ';');
                        String listPathSrcTo[] = UtilString.split(szSrcTo, ';');
                        if(!(new File(pathDst)).isAbsolute())
                            pathDst = (new File(filePathMain, pathDst)).getCanonicalPath();
                        else
                            pathDst = (new File(pathDst)).getCanonicalPath();
                        build(listPathSrcFrom, listPathSrcTo, pathDst);
                    }
                }
            }
            catch(Exception ex)
            {
                Trace.ERROR(this, ex);
                throw ex;
            }
    }

    protected void copyFile(File in, File out)
        throws Exception
    {
        out.getParentFile().mkdirs();
        FileInputStream fis = new FileInputStream(in);
        FileOutputStream fos = new FileOutputStream(out);
        byte buf[] = new byte[1024];
        for(int i = 0; (i = fis.read(buf)) != -1;)
            fos.write(buf, 0, i);

        fis.close();
        fos.close();
    }

    protected void build(String listPathSrcFrom[], String listPathSrcTo[], String pathDst)
        throws FileNotFoundException, IOException
    {
        UtilBuildJar.build(listPathSrcFrom, listPathSrcTo, pathDst);
    }
}
