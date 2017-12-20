// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   BeanAdpXmlHibernate.java

package workspace.adaptateur.bean;


public class BeanAdpXmlHibernate
    implements Cloneable
{

    public BeanAdpXmlHibernate()
    {
    }

    public BeanAdpXmlHibernate(String table)
    {
        this.table = table;
    }

    public Object clone()
        throws CloneNotSupportedException
    {
        return super.clone();
    }

    public Object clone(String table)
        throws CloneNotSupportedException
    {
        BeanAdpXmlHibernate ret = (BeanAdpXmlHibernate)super.clone();
        ret.setTable(table);
        return ret;
    }

    public String getTable()
    {
        return table;
    }

    public void setTable(String table)
    {
        this.table = table;
    }

    private String table;
}
