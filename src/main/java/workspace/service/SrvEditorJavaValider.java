// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvEditorJavaValider.java

package workspace.service;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilString;
import framework.service.SrvGenerique;
import framework.taglib.file.bean.*;
import java.io.*;
import java.net.URI;
import javax.servlet.ServletContext;
import javax.servlet.http.*;
import org.w3c.dom.Document;
import workspace.adaptateur.application.AdpXmlApplication;

public class SrvEditorJavaValider extends SrvGenerique
{

    public SrvEditorJavaValider()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        HttpSession session = request.getSession();
        ServletContext context = session.getServletContext();
        String application = (String)bean.getParameterDataByName("application");
        String fileEditor = (String)bean.getParameterDataByName("FileEditor");
        String fileName = (String)bean.getParameterDataByName("FileName");
        String pathToExpand = (String)bean.getParameterDataByName("pathToExpand");
        String navIndex = (String)bean.getParameterDataByName("navIndex");
        String navNbRow = (String)bean.getParameterDataByName("navNbRow");
        if(UtilString.isNotEmpty(application) && UtilString.isNotEmpty(fileEditor) && UtilString.isNotEmpty(fileName))
        {
            Document dom = (Document)request.getSession().getAttribute("resultDom");
            String filePathMain = AdpXmlApplication.getFormatedPathMain(context, dom, application);
            if(filePathMain != null && !filePathMain.equals(""))
                if(filePathMain.toUpperCase().startsWith("FTP://"))
                {
                    BeanFTPAddress address = new BeanFTPAddress(filePathMain);
                    pathToExpand = UtilString.isNotEmpty(pathToExpand) ? pathToExpand : "";
                    BeanFTP ftp = new BeanFTP(address, (new StringBuilder(String.valueOf(pathToExpand))).append(fileName).toString());
                    if(UtilString.isNotEmpty(navIndex) && UtilString.isNotEmpty(navNbRow))
                        fileEditor = replaceText(ftp.read(), fileEditor, Integer.parseInt(navIndex), Integer.parseInt(navNbRow));
                    ftp.write(fileEditor);
                    request.setAttribute("path", filePathMain);
                } else
                {
                    String szPath = UtilString.isNotEmpty(pathToExpand) ? (new File(filePathMain, pathToExpand)).getCanonicalPath() : (new File(filePathMain)).getCanonicalPath();
                    BeanFile filePathToExpand = new BeanFile(szPath);
                    BeanFile outputFile = new BeanFile(filePathToExpand, fileName);
                    if(outputFile.exists() && outputFile.isFile())
                    {
                        if(UtilString.isNotEmpty(navIndex) && UtilString.isNotEmpty(navNbRow))
                            fileEditor = replaceText(outputFile.read(), fileEditor, Integer.parseInt(navIndex), Integer.parseInt(navNbRow));
                        FileWriter out = new FileWriter(outputFile);
                        out.write(fileEditor.replace('\240', ' '));
                        out.close();
                    }
                    File fileMain = new File(filePathMain);
                    request.setAttribute("path", fileMain.toURI().getPath());
                }
        }
    }

    private String replaceText(String content, String text, int startIndex, int nbRow)
        throws IOException
    {
        StringBuffer ret;
        BufferedReader in;
        ret = new StringBuffer();
        StringReader sr = new StringReader(content);
        in = new BufferedReader(sr);
        if(!in.ready())
            throw new IOException();
        String line;
        for(int i = 1; i < startIndex && (line = in.readLine()) != null; i++)
            ret.append(line).append("\r\n");

        ret.append(text).append("\r\n");
        for(int i = 1; i <= nbRow && (line = in.readLine()) != null; i++);
        while((line = in.readLine()) != null) 
            ret.append(line).append("\r\n");
        in.close();
        return ret.toString();
    }
}
