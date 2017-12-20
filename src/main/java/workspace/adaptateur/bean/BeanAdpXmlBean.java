// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   BeanAdpXmlBean.java

package workspace.adaptateur.bean;


// Referenced classes of package workspace.adaptateur.bean:
//            BeanAdpXmlQuery

public class BeanAdpXmlBean
{

    public BeanAdpXmlBean()
    {
    }

    public BeanAdpXmlBean(String name, String service, String class1, String scope, BeanAdpXmlQuery beanAdpXmlQuery, String paramName, String paramType)
    {
        this.name = name;
        this.service = service;
        aClass = class1;
        this.scope = scope;
        this.beanAdpXmlQuery = beanAdpXmlQuery;
        this.paramName = paramName;
        this.paramType = paramType;
    }

    public BeanAdpXmlBean(String name, String service, String class1, String scope, BeanAdpXmlQuery beanAdpXmlQuery, String paramName, String paramType, 
            String paramBean)
    {
        this.name = name;
        this.service = service;
        aClass = class1;
        this.scope = scope;
        this.beanAdpXmlQuery = beanAdpXmlQuery;
        this.paramName = paramName;
        this.paramType = paramType;
        this.paramBean = paramBean;
    }

    public BeanAdpXmlBean(String name, String service, String class1, String scope, BeanAdpXmlQuery beanAdpXmlQuery, String paramName, String paramType, 
            String paramBean, String paramFormatIn)
    {
        this.name = name;
        this.service = service;
        aClass = class1;
        this.scope = scope;
        this.beanAdpXmlQuery = beanAdpXmlQuery;
        this.paramName = paramName;
        this.paramType = paramType;
        this.paramBean = paramBean;
        this.paramFormatIn = paramFormatIn;
    }

    public String getAClass()
    {
        return aClass;
    }

    public void setAClass(String class1)
    {
        aClass = class1;
    }

    public BeanAdpXmlQuery getBeanAdpXmlQuery()
    {
        return beanAdpXmlQuery;
    }

    public void setBeanAdpXmlQuery(BeanAdpXmlQuery beanAdpXmlQuery)
    {
        this.beanAdpXmlQuery = beanAdpXmlQuery;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getScope()
    {
        return scope;
    }

    public void setScope(String scope)
    {
        this.scope = scope;
    }

    public String getService()
    {
        return service;
    }

    public void setService(String service)
    {
        this.service = service;
    }

    public String getParamName()
    {
        return paramName;
    }

    public void setParamName(String paramName)
    {
        this.paramName = paramName;
    }

    public String getParamType()
    {
        return paramType;
    }

    public void setParamType(String paramType)
    {
        this.paramType = paramType;
    }

    public String getParamBean()
    {
        return paramBean;
    }

    public void setParamBean(String paramBean)
    {
        this.paramBean = paramBean;
    }

    public String getParamFormatIn()
    {
        return paramFormatIn;
    }

    public void setParamFormatIn(String paramFormatIn)
    {
        this.paramFormatIn = paramFormatIn;
    }

    private String name;
    private String service;
    private String aClass;
    private String scope;
    private BeanAdpXmlQuery beanAdpXmlQuery;
    private String paramName;
    private String paramType;
    private String paramBean;
    private String paramFormatIn;
}
