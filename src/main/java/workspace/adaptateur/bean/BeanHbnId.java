// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   BeanHbnId.java

package workspace.adaptateur.bean;

import java.util.List;
import java.util.Vector;

// Referenced classes of package workspace.adaptateur.bean:
//            BeanHbnGenerator

public class BeanHbnId
{

    public BeanHbnId()
    {
        listGenerator = new Vector();
    }

    public void addHbnGenerator(BeanHbnGenerator bean)
    {
        listGenerator.add(bean);
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

    public String getType()
    {
        return type;
    }

    public void setType(String type)
    {
        this.type = type;
    }

    public List getListGenerator()
    {
        return listGenerator;
    }

    public void setListGenerator(List listGenerator)
    {
        this.listGenerator = listGenerator;
    }

    private String name;
    private String type;
    private String column;
    private List listGenerator;
}
