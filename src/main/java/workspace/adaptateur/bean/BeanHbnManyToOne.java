// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   BeanHbnManyToOne.java

package workspace.adaptateur.bean;


public class BeanHbnManyToOne
{

    public BeanHbnManyToOne()
    {
    }

    public String getClassName()
    {
        return className;
    }

    public void setClassName(String className)
    {
        this.className = className;
    }

    public String getColumn()
    {
        return column;
    }

    public void setColumn(String column)
    {
        this.column = column;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getNotNull()
    {
        return notNull;
    }

    public void setNotNull(String notNull)
    {
        this.notNull = notNull;
    }

    private String name;
    private String column;
    private String className;
    private String notNull;
}
