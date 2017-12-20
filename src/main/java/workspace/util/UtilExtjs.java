// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   UtilExtjs.java

package workspace.util;

import framework.ressource.util.UtilString;
import framework.trace.Trace;
import java.io.IOException;
import java.io.OutputStream;
import javax.servlet.http.HttpServletResponse;

public class UtilExtjs
{

    public UtilExtjs()
    {
    }

    public static String splitToJson(String text, HttpServletResponse response) throws IOException {
    	return splitToJson(text, null, response);
    }

    public static String splitToJson(String text, String jsonAdd, HttpServletResponse response) throws IOException {
        String jsonData = null;
        if(UtilString.isNotEmpty(text)) {
            String content = text.toString();
            String lines[] = content.split("\r\n");
            String line = null;
            int nb = lines.length;
            for(int i = 0; i < nb; i++)
            {
                line = simpleFormat(lines[i]);
                Trace.DEBUG((new StringBuilder("splitAndSendJason lines[")).append(i).append("]:").append(line).toString());
                if(jsonData == null)
                    jsonData = (new StringBuilder("{results:")).append(nb).append(",data:[").toString();
                else
                    jsonData = (new StringBuilder(String.valueOf(jsonData))).append(",").toString();
                jsonData = (new StringBuilder(String.valueOf(jsonData))).append("{'text':'").append(line).append("',").append("'id':'").append(i).append("'").append("}").toString();
            }

        } else {
            Trace.DEBUG("splitAndSendJason text is Empty");
        }
        if(jsonData != null)
            jsonData = (new StringBuilder(String.valueOf(jsonData))).append("]").toString();
        else
            jsonData = "{results:0,data:[]";
        if (jsonAdd != null) {
        	jsonData += "," + jsonAdd;
        }
        jsonData += "}";
        Trace.DEBUG("splitAndSendJason jsonData:"+jsonData);
        return jsonData;
    }

    public static void sendJson(String json, HttpServletResponse response) throws IOException {
        OutputStream os = response.getOutputStream();
        response.setContentType("text/json");
        os.write(json.getBytes());
        os.close();
    }
    public static void splitAndSendJson(String text, HttpServletResponse response) throws IOException {
        splitAndSendJson(text, null, response);
    }

    public static void splitAndSendJson(String text, String jsonAdd, HttpServletResponse response) throws IOException {
        String jsonData = splitToJson(text, jsonAdd, response);
        sendJson(jsonData, response);
    }

    private static String simpleFormat(String text)
    {
        text = text.replaceAll("\\\\", "\\\\\\\\");
        text = text.replaceAll("'", "\\\\'");
        return text;
    }
}
