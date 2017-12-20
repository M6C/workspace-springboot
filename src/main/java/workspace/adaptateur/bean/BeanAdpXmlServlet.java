// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   BeanAdpXmlServlet.java

package workspace.adaptateur.bean;


// Referenced classes of package workspace.adaptateur.bean:
//            BeanAdpXmlBean

public class BeanAdpXmlServlet
    implements Cloneable
{

    public BeanAdpXmlServlet()
    {
    }

    public BeanAdpXmlServlet(String name, String class1, String target, String targetError, String authentification, BeanAdpXmlBean beanAdpXmlBean)
    {
        this.name = name;
        aClass = class1;
        this.target = target;
        this.targetError = targetError;
        this.authentification = authentification;
        this.beanAdpXmlBean = beanAdpXmlBean;
    }

    public Object clone()
        throws CloneNotSupportedException
    {
        return super.clone();
    }

    public Object clone(String name)
        throws CloneNotSupportedException
    {
        BeanAdpXmlServlet ret = (BeanAdpXmlServlet)super.clone();
        ret.setName(name);
        return ret;
    }

    public String getAClass()
    {
        return aClass;
    }

    public void setAClass(String class1)
    {
        aClass = class1;
    }

    public String getAuthentification()
    {
        return authentification;
    }

    public void setAuthentification(String authentification)
    {
        this.authentification = authentification;
    }

    public BeanAdpXmlBean getBeanAdpXmlBean()
    {
        return beanAdpXmlBean;
    }

    public void setBeanAdpXmlBean(BeanAdpXmlBean beanAdpXmlBean)
    {
        this.beanAdpXmlBean = beanAdpXmlBean;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getTarget()
    {
        return target;
    }

    public void setTarget(String target)
    {
        this.target = target;
    }

    public String getTargetError()
    {
        return targetError;
    }

    public void setTargetError(String targetError)
    {
        this.targetError = targetError;
    }

    private String name;
    private String aClass;
    private String target;
    private String targetError;
    private String authentification;
    private BeanAdpXmlBean beanAdpXmlBean;
}
