// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   BeanUploadData.java

package workspace.bean;


public class BeanUploadData
{

    public BeanUploadData(String name, String value, String contentType, int size, boolean isFile)
    {
        this.name = name;
        this.value = value;
        this.contentType = contentType;
        this.size = size;
        aFile = isFile;
    }

    public String getName()
    {
        return name;
    }

    public String getContentType()
    {
        return contentType;
    }

    public int getSize()
    {
        return size;
    }

    public void setValue(String value)
    {
        this.value = value;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public void setContentType(String contentType)
    {
        this.contentType = contentType;
    }

    public void setSize(int size)
    {
        this.size = size;
    }

    public void setAFile(boolean aFile)
    {
        this.aFile = aFile;
    }

    public String getValue()
    {
        return value;
    }

    public boolean isAFile()
    {
        return aFile;
    }

    private String name;
    private String value;
    private String contentType;
    private int size;
    private boolean aFile;
}
