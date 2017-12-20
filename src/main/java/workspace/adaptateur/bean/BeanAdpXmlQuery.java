// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   BeanAdpXmlQuery.java

package workspace.adaptateur.bean;


public class BeanAdpXmlQuery
{

    public BeanAdpXmlQuery()
    {
    }

    public BeanAdpXmlQuery(String type, String query, String parameterCount)
    {
        this.type = type;
        this.query = query;
        this.parameterCount = parameterCount;
    }

    public String getQuery()
    {
        return query;
    }

    public void setQuery(String query)
    {
        this.query = query;
    }

    public String getType()
    {
        return type;
    }

    public void setType(String type)
    {
        this.type = type;
    }

    public String getParameterCount()
    {
        return parameterCount;
    }

    public void setParameterCount(String parameterCount)
    {
        this.parameterCount = parameterCount;
    }

    private String type;
    private String query;
    private String parameterCount;
}
