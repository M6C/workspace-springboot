// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   BeanHbnGenerator.java

package workspace.adaptateur.bean;


public class BeanHbnGenerator
{

    public BeanHbnGenerator()
    {
    }

    public BeanHbnGenerator(String className)
    {
        this.className = className;
    }

    public String getClassName()
    {
        return className;
    }

    public void setClassName(String className)
    {
        this.className = className;
    }

    private String className;
}
