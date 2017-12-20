// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvEditPackage.java

package workspace.service.extjs;

import framework.beandata.BeanGenerique;
import framework.trace.Trace;
import java.io.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import workspace.service.SrvEditorJavaPackage;

public class SrvEditPackage extends SrvEditorJavaPackage
{

    public SrvEditPackage()
    {
        success = false;
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        try
        {
            success = false;
            super.execute(request, response, bean);
        }
        catch(Exception ex)
        {
            Trace.ERROR(this, ex);
        }
        String jsonData = null;
        if(success)
        {
            jsonData = "{status:'success',data:[";
            jsonData = (new StringBuilder(String.valueOf(jsonData))).append("{message:'Package creation successful'}").toString();
            jsonData = (new StringBuilder(String.valueOf(jsonData))).append("]}").toString();
        } else
        {
            jsonData = "{status:'failure',data:[";
            jsonData = (new StringBuilder(String.valueOf(jsonData))).append("{message:'Package creation failed'}").toString();
            jsonData = (new StringBuilder(String.valueOf(jsonData))).append("]}").toString();
        }
        Trace.DEBUG(this, (new StringBuilder("execute jsonData:")).append(jsonData).toString());
        OutputStream os = response.getOutputStream();
        response.setContentType("text/json");
        os.write(jsonData.getBytes());
        os.close();
    }

    protected void build(String listPathSrcFrom[], String listPathSrcTo[], String pathDst)
        throws FileNotFoundException, IOException
    {
        super.build(listPathSrcFrom, listPathSrcTo, pathDst);
        success = true;
    }

    protected void copyFile(File in, File out)
        throws Exception
    {
        super.copyFile(in, out);
        success = true;
    }

    private boolean success;
}
