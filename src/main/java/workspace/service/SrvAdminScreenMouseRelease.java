// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvAdminScreenMouseRelease.java

package workspace.service;

import framework.beandata.BeanGenerique;
import framework.service.SrvGenerique;
import java.awt.Robot;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class SrvAdminScreenMouseRelease extends SrvGenerique
{

    public SrvAdminScreenMouseRelease()
    {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean)
        throws Exception
    {
        String bouton = request.getParameter("bouton");
        if(bouton != null && !bouton.equals(""))
            (new Robot()).mouseRelease(Integer.parseInt(bouton));
    }
}
