// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvServerCommand.java

package workspace.service.server.web.extjs;

import framework.beandata.BeanGenerique;
import java.io.OutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class SrvServerCommand extends workspace.service.server.web.SrvServerCommand
{

    public SrvServerCommand()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        boolean success = true;
        try
        {
            super.execute(request, response, bean);
        }
        catch(Exception ex)
        {
            request.setAttribute("msgText", ex.getMessage());
            success = false;
            throw ex;
        }
        String jsonData = null;
        if(success)
            jsonData = "{status:'success',data:[";
        else
            jsonData = "{status:'failure',data:[";
        jsonData = (new StringBuilder(String.valueOf(jsonData))).append("{message:'").append(request.getAttribute("msgText")).append("'}").toString();
        jsonData = (new StringBuilder(String.valueOf(jsonData))).append("]}").toString();
        OutputStream os = response.getOutputStream();
        response.setContentType("text/json");
        os.write(jsonData.getBytes());
        os.close();
        return;
    }
}
