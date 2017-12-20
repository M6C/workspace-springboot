// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   BeanHbnProperty.java

package workspace.adaptateur.bean;


public class BeanHbnProperty
{

    public BeanHbnProperty()
    {
    }

    public String getColumn()
    {
        return column;
    }

    public void setColumn(String column)
    {
        this.column = column;
    }

    public String getLength()
    {
        return length;
    }

    public void setLength(String length)
    {
        this.length = length;
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

    public String getType()
    {
        return type;
    }

    public void setType(String type)
    {
        this.type = type;
    }

    private String name;
    private String column;
    private String type;
    private String notNull;
    private String length;
}
