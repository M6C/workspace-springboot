// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvAdminExecuteCmdOld.java

package workspace.service;

import framework.beandata.BeanGenerique;
import framework.service.SrvGenerique;
import java.io.IOException;
import java.io.PrintStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class SrvAdminExecuteCmdOld extends SrvGenerique
{

    public SrvAdminExecuteCmdOld()
    {
    }

    public void init()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        String commandLine = request.getParameter("commandLine");
        if(commandLine != null && !commandLine.equals(""))
            try
            {
                Runtime.getRuntime().exec(commandLine);
            }
            catch(IOException e)
            {
                System.err.println(e);
            }
    }
}
