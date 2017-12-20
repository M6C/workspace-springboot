package workspace.service.extjs;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.w3c.dom.Document;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilString;
import framework.service.SrvGenerique;
import framework.trace.Trace;
import workspace.util.UtilPath;
import workspace.util.UtilFile;

public class SrvEditLoadFile extends SrvGenerique {

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean) throws Exception {
        String filename = (String)bean.getParameterDataByName("filename");
        String filenameFormated = null;
        String jsonData = null;
        try {
            if (UtilString.isNotEmpty(filename)) {
                Document dom = (Document)request.getSession().getAttribute("resultDom");
                filenameFormated = UtilPath.formatPath(dom, filename);
                if(UtilString.isNotEmpty(filenameFormated)) {
                    File file = new File(filenameFormated);
                    if(file != null && file.exists() && file.isFile()) {
                    	String encoding = UtilFile.guessEncoding(file);

                        String[] content = read(file);
                        if (content != null && content.length > 0) {
                            String lines[] = content;
                            String line = null;
                            int nb = lines.length;
                            for (int i = 0; i < nb; i++) {
                                line = simpleFormat(lines[i]);
                                // Trace.DEBUG("SrvEditLoadFile execute lines[" + i + "]:" + line);
                                if (jsonData == null) {
                                    jsonData = "{results:" + nb + ", encoding:'" + encoding + "', data:[";
                                } else {
                                    jsonData += ",";
                                }
                                jsonData += "{'text':'" + line + "'," + "'id':'" + i + "'" + "}";
                            }

                        }
                    }
                }
            }
        }
        catch(Exception ex) {
            Trace.ERROR(this, ex);
        }

        if (jsonData != null) {
            jsonData += "]}";
        } else {
            jsonData = "{results:0,data:[]}";
        }
        Trace.DEBUG(this, "SrvEditLoadFile execute filename:" + filename + " filenameFormated:" + filenameFormated);
        // Trace.DEBUG(this, "SrvEditLoadFile execute jsonData:" + jsonData);
        OutputStream os = response.getOutputStream();
        response.setContentType("text/json");
        os.write(jsonData.getBytes());
        os.close();
    }

    private String[] read(File file) throws FileNotFoundException, IOException {
    	String encoding = UtilFile.guessEncoding(file);
        Trace.DEBUG("encoding:" + encoding);
        return UtilFile.read(file, encoding);
    }

    private String simpleFormat(String text) {
        text = text.replaceAll("\\\\", "\\\\\\\\");
        text = text.replaceAll("'", "\\\\'");
        return text;
    }
}