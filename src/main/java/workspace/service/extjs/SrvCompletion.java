// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   SrvCompletion.java

package workspace.service.extjs;

import framework.beandata.BeanGenerique;
import framework.trace.Trace;
import java.io.OutputStream;
import java.lang.reflect.Method;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import workspace.service.SrvEditorJavaCompletion;

public class SrvCompletion extends SrvEditorJavaCompletion
{

    public SrvCompletion()
    {
    }

    public void init()
    {
    }

    protected void doResponse(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean, String className, String caretPos, Method listMethod[])
        throws Exception
    {
        String jsonData = (new StringBuilder("[{'id':'root0','text':'")).append(className).append("',").append("'className':'").append(className).append("',").append("'expanded':true,").append("draggable:false,").append("animate:false,").append("'caretPosition':'").append(caretPos).append("',").append("children:[").toString();
        try
        {
            if(listMethod != null)
            {
                int nb = listMethod.length;
                Method method = null;
                for(int i = 0; i < nb; i++)
                {
                    method = listMethod[i];
                    String name = method.getName();
                    String prototype = (new StringBuilder(String.valueOf(name))).append("(").toString();
                    Class listCls[] = method.getParameterTypes();
                    if(listCls != null)
                    {
                        int sizeParam = listCls.length - 1;
                        for(int j = 0; j <= sizeParam; j++)
                        {
                            Class cls = listCls[j];
                            prototype = (new StringBuilder(String.valueOf(prototype))).append(cls.getName()).toString();
                            if(j < sizeParam)
                                prototype = (new StringBuilder(String.valueOf(prototype))).append(", ").toString();
                        }

                    }
                    prototype = (new StringBuilder(String.valueOf(prototype))).append(")").toString();
                    Trace.DEBUG((new StringBuilder("SrvCompletion execute id:")).append(i).append(" className:").append(className).append(" prototype:").append(prototype).toString());
                    if(i > 0)
                        jsonData = (new StringBuilder(String.valueOf(jsonData))).append(",").toString();
                    jsonData = (new StringBuilder(String.valueOf(jsonData))).append("{'text':'").append(prototype.toString()).append("',").append("'name':'").append(name).append("',").append("'prototype':'").append(prototype.toString()).append("',").append("'id':'").append(i).append("',").append("'leaf':true").append("}").toString();
                }

            }
        }
        catch(Exception ex)
        {
            Trace.ERROR(this, ex);
        }
        jsonData = (new StringBuilder(String.valueOf(jsonData))).append("]}]").toString();
        Trace.DEBUG(this, (new StringBuilder("SrvCompletion execute jsonData:")).append(jsonData).toString());
        OutputStream os = response.getOutputStream();
        response.setContentType("text/json");
        os.write(jsonData.getBytes());
        os.close();
    }

    private String simpleFormat(String text)
    {
        text = text.replaceAll("\\\\", "\\\\\\\\");
        text = text.replaceAll("'", "\\\\'");
        return text;
    }
}
