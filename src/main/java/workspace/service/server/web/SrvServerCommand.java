// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvServerCommand.java

package workspace.service.server.web;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilString;
import framework.service.SrvGenerique;
import framework.trace.Trace;
import java.io.*;
import java.net.*;
import javax.servlet.ServletContext;
import javax.servlet.http.*;
import org.w3c.dom.Document;
import workspace.adaptateur.application.AdpXmlApplication;
import workspace.adaptateur.application.AdpXmlServer;

public class SrvServerCommand extends SrvGenerique
{

    public SrvServerCommand()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        HttpSession session = request.getSession();
        ServletContext context = session.getServletContext();
        BeanGenerique beanAuthentification = (BeanGenerique)session.getAttribute("BeanAuthentification");
        String application = (String)bean.getParameterDataByName("application");
        String command = (String)bean.getParameterDataByName("command");
        String packagename = (String)bean.getParameterDataByName("package");
        Document domXml = (Document)session.getAttribute("resultDom");
        if(UtilString.isNotEmpty(application) && UtilString.isNotEmpty(command) && UtilString.isNotEmpty(packagename) && domXml != null) {
            try
            {
                String msgText = null;
                String filePathMain = AdpXmlApplication.getFormatedPathMain(context, domXml, application);
                String szCommand = AdpXmlServer.getCommandByName(context, domXml, application, "WebApplication", command);
                String szServerDeploy = AdpXmlServer.getPathByName(context, domXml, application, "WebApplication", "RootDeploy");
                String szFilename = AdpXmlApplication.getPackageFileNameByName(context, domXml, application, "War", packagename);
                String szWebApp = (new File(szServerDeploy, szFilename)).toURL().toString();
                szCommand = (new StringBuilder(String.valueOf(szCommand))).append(URLEncoder.encode(szWebApp)).toString();
                System.out.println(szCommand);
                if(UtilString.isNotEmpty(szCommand))
                    msgText = sendHttpRequest(szCommand);
                request.setAttribute("msgText", msgText);
            }
            catch(Exception ex)
            {
                Trace.ERROR(this, ex);
                throw ex;
            }
        }
    }

    private String sendHttpRequest(String request)
        throws IOException
    {
        StringBuffer response = new StringBuffer();
        URL url = new URL(request);
        HttpURLConnection connection = (HttpURLConnection)url.openConnection();
        connection.connect();
        BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        String line;
        while((line = reader.readLine()) != null) 
        {
            response.append(line);
            response.append("\n");
        }
        int code = connection.getResponseCode();
        connection.disconnect();
        return (new StringBuilder(String.valueOf(code))).append("\n").append(response.toString()).toString();
    }
}
