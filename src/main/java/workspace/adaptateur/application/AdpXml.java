// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   AdpXml.java

package workspace.adaptateur.application;

import org.w3c.dom.Document;

public class AdpXml
{

    public AdpXml()
    {
    }

    protected static void checkDocument(Document dom)
    {
        if(dom == null)
            throw new IllegalArgumentException("Argument dom (org.w3c.dom.Document) is null");
        else
            return;
    }

    protected static void checkApplication(String application)
    {
        if(application == null)
            throw new IllegalArgumentException("Argument application (java.lang.String) is null");
        if(application.trim().equals(""))
            throw new IllegalArgumentException("Argument application (java.lang.String) is empty");
        else
            return;
    }

    protected static final String XSL_PATH_PREFIX = "/";
}
