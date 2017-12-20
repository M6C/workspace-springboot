// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   BeanHbnClass.java

package workspace.adaptateur.bean;

import java.io.File;
import java.util.Hashtable;

// Referenced classes of package workspace.adaptateur.bean:
//            BeanHbnMeta, BeanHbnProperty, BeanHbnManyToOne, BeanHbnId

public class BeanHbnClass
{

    public BeanHbnClass()
    {
        hashMeta = new Hashtable();
        hashProperty = new Hashtable();
        hashManyToOne = new Hashtable();
        hashId = new Hashtable();
    }

    public void addHbnMeta(String key, BeanHbnMeta bean)
    {
        hashMeta.put(key, bean);
    }

    public void addHbnManyToOne(String key, BeanHbnManyToOne bean)
    {
        hashManyToOne.put(key, bean);
    }

    public void addHbnProperty(String key, BeanHbnProperty bean)
    {
        hashProperty.put(key, bean);
    }

    public void addHbnId(String key, BeanHbnId bean)
    {
        hashId.put(key, bean);
    }

    public BeanHbnMeta getHbnMeta(String key)
    {
        return (BeanHbnMeta)hashMeta.get(key);
    }

    public BeanHbnProperty getHbnProperty(String key)
    {
        return (BeanHbnProperty)hashProperty.get(key);
    }

    public BeanHbnManyToOne getHbnManyToOne(String key)
    {
        return (BeanHbnManyToOne)hashManyToOne.get(key);
    }

    public BeanHbnId getHbnId(String key)
    {
        return (BeanHbnId)hashId.get(key);
    }

    public String getClassName()
    {
        return className;
    }

    public void setClassName(String className)
    {
        this.className = className;
    }

    public File getFile()
    {
        return file;
    }

    public void setFile(File file)
    {
        this.file = file;
    }

    public Hashtable getHashMeta()
    {
        return hashMeta;
    }

    public void setHashMeta(Hashtable hashMeta)
    {
        this.hashMeta = hashMeta;
    }

    public Hashtable getHashProperty()
    {
        return hashProperty;
    }

    public void setHashProperty(Hashtable hashProperty)
    {
        this.hashProperty = hashProperty;
    }

    public String getPackageName()
    {
        return packageName;
    }

    public void setPackageName(String packageName)
    {
        this.packageName = packageName;
    }

    public String getTable()
    {
        return table;
    }

    public void setTable(String table)
    {
        this.table = table;
    }

    public Hashtable getHashId()
    {
        return hashId;
    }

    public void setHashId(Hashtable hashId)
    {
        this.hashId = hashId;
    }

    public Hashtable getHashManyToOne()
    {
        return hashManyToOne;
    }

    public void setHashManyToOne(Hashtable hashManyToOne)
    {
        this.hashManyToOne = hashManyToOne;
    }

    private String packageName;
    private String className;
    private String table;
    private Hashtable hashMeta;
    private Hashtable hashProperty;
    private Hashtable hashManyToOne;
    private Hashtable hashId;
    private File file;
}
