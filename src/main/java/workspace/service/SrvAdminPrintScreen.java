// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvAdminPrintScreen.java

package workspace.service;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.Calendar;
import javax.imageio.ImageIO;

public class SrvAdminPrintScreen
{

    public String getNomFichier()
    {
        return nomfichier;
    }

    public SrvAdminPrintScreen()
    {
        tempattente = 1;
        Calendar calendar = Calendar.getInstance();
        String YY = (new StringBuilder(String.valueOf(calendar.get(1)))).toString().substring(2);
        String MM = (new StringBuilder(String.valueOf(calendar.get(2) + 1))).toString();
        String DD = (new StringBuilder(String.valueOf(calendar.get(5)))).toString();
        String HH = (new StringBuilder(String.valueOf(calendar.get(10)))).toString();
        String MI = (new StringBuilder(String.valueOf(calendar.get(12)))).toString();
        int AMint = calendar.get(9);
        String AMStr;
        if(AMint == 0)
            AMStr = "AM";
        else
            AMStr = "PM";
        if(MM.length() == 1)
            MM = (new StringBuilder("0")).append(MM).toString();
        if(DD.length() == 1)
            DD = (new StringBuilder("0")).append(DD).toString();
        if(HH.length() == 1)
            HH = (new StringBuilder("0")).append(HH).toString();
        if(MI.length() == 1)
            MI = (new StringBuilder("0")).append(MI).toString();
        nomfichier = (new StringBuilder(String.valueOf(YY))).append("-").append(MM).append("-").append(DD).append("_").append(HH).append("-").append(MI).append("-").append(AMStr).append(".png").toString();
    }

    public void takeSnapShot()
        throws AWTException
    {
        Toolkit toolkit = Toolkit.getDefaultToolkit();
        Dimension screenSize = toolkit.getScreenSize();
        Rectangle screenRect = new Rectangle(screenSize);
        Robot robot = new Robot();
        BufferedImage image = robot.createScreenCapture(screenRect);
        try
        {
            ImageIO.write(image, "png", new File(getNomFichier()));
        }
        catch(IOException ioe)
        {
            System.out.println(ioe.toString());
        }
    }

    private int tempattente;
    String nomfichier;
}
