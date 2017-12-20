// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   BeanAdpXmlParam.java

package workspace.adaptateur.bean;


public class BeanAdpXmlParam
{

    public BeanAdpXmlParam()
    {
    }

    public BeanAdpXmlParam(String name, String type)
    {
        this.name = name;
        this.type = type;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getType()
    {
        return type;
    }

    public void setType(String type)
    {
        this.type = type;
    }

    public String getFormat()
    {
        return format;
    }

    public void setFormat(String format)
    {
        this.format = format;
    }

    public String getBean()
    {
        return bean;
    }

    public void setBean(String bean)
    {
        this.bean = bean;
    }

    private String name;
    private String type;
    private String bean;
    private String format;
}
