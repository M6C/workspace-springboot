// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvAdminStreaming.java

package workspace.service;

import framework.beandata.BeanGenerique;
import framework.service.SrvGenerique;
import java.io.File;
import java.io.FileInputStream;
import java.nio.ByteBuffer;
import java.nio.channels.*;
import javax.servlet.ServletContext;
import javax.servlet.http.*;
import org.w3c.dom.Document;
import workspace.adaptateur.application.AdpXmlApplication;

public class SrvAdminStreaming extends SrvGenerique
{

    public SrvAdminStreaming()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        HttpSession session = request.getSession();
        ServletContext context = session.getServletContext();
        FileChannel rbc = null;
        WritableByteChannel wbc = null;
        Document domXml = (Document)session.getAttribute("resultDom");
        String application = (String)bean.getParameterDataByName("application");
        String path = (String)bean.getParameterDataByName("path");
        String filename = (String)bean.getParameterDataByName("filename");
        String szPathMain = AdpXmlApplication.getFormatedPathByName(context, domXml, application, "Main");
        try
        {
            File file = new File(new File(szPathMain, path), filename);
            rbc = (new FileInputStream(file)).getChannel();
            rbc.position(0L);
            wbc = Channels.newChannel(response.getOutputStream());
            response.setContentType("video/mpeg");
            response.setHeader("Content-Length", String.valueOf(file.length()));
            for(ByteBuffer bb = ByteBuffer.allocateDirect(11680); rbc.read(bb) != -1; bb.clear())
            {
                bb.flip();
                wbc.write(bb);
            }

            wbc.close();
            rbc.close();
        }
        catch(Exception exp)
        {
            exp.printStackTrace();
            if(wbc != null)
                wbc.close();
            if(rbc != null)
                rbc.close();
        }
    }
}
