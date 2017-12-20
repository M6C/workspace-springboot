// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   ActionScreenShoot.java

package workspace.action;

import framework.ressource.util.UtilString;
import java.awt.Image;
import java.awt.Robot;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ActionScreenShoot extends framework.action.ActionScreenShoot
{

    public ActionScreenShoot()
    {
    }

    protected Image getImage(HttpServletRequest request, HttpServletResponse response)
        throws Exception
    {
        String x = request.getParameter("mousex");
        String y = request.getParameter("mousey");
        if(UtilString.isNotEmpty(x) && UtilString.isNotEmpty(y))
            try
            {
                (new Robot()).mouseMove(Integer.parseInt(x), Integer.parseInt(y));
            }
            catch(Exception exception) { }
        return super.getImage(request, response);
    }
}
