package workspace.service.extjs;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.StringReader;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.w3c.dom.Document;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilFile;
import framework.ressource.util.UtilString;
import framework.service.SrvGenerique;
import framework.trace.Trace;
import workspace.util.UtilPath;

public class SrvEditSaveFile extends SrvGenerique
{
    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean) throws Exception {
        String content = (String)bean.getParameterDataByName("content");
        String filename = (String)bean.getParameterDataByName("filename");
        String navIndex = (String)bean.getParameterDataByName("navIndex");
        String navNbRow = (String)bean.getParameterDataByName("navNbRow");
        String filenameFormated = null;
        try
        {
            if(UtilString.isNotEmpty(content) && UtilString.isNotEmpty(filename))
            {
                Document dom = (Document)request.getSession().getAttribute("resultDom");
                filenameFormated = UtilPath.formatPath(dom, filename);
                if(UtilString.isNotEmpty(filenameFormated))
                {
                    File outputFile = new File(filenameFormated);
                    try {
	                    if(outputFile.exists() && !outputFile.isFile()) {
	   					 	Trace.WARNING(this, (new StringBuilder("'")).append(outputFile.getPath()).append("' is not a file.").toString());
	                    } else {
							if(UtilString.isNotEmpty(navIndex) && UtilString.isNotEmpty(navNbRow)) {
								content = replaceText(read(outputFile), content, Integer.parseInt(navIndex), Integer.parseInt(navNbRow));
							}
							if (content.indexOf('\r')<0) { 
								content = content.replaceAll("\n", "\r\n");
							}
							content = content.trim();
							write(outputFile, content);
	                    }
                    } finally {
						outputFile = null;
						System.gc();
						System.gc();
					}
                } else
                {
                    Trace.DEBUG(this, "path is Empty");
                }
            } else
            {
                Trace.DEBUG(this, "content is Empty and filename is Empty");
            }
        }
        catch(Exception ex)
        {
            Trace.ERROR(this, ex);
        }
        Trace.DEBUG(this, (new StringBuilder("filename:")).append(filename).append(" filenameFormated:").append(filenameFormated).append(" navIndex:").append(navIndex).append(" navNbRow:").append(navNbRow).toString());
    }

    private String read(File file) throws IOException {
        Trace.DEBUG(this, (new StringBuilder("read file '")).append(file.getPath()).append("'").toString());
        StringBuffer ret = new StringBuffer();
        if (file.exists()) {
        	ret.append(UtilFile.read(file));
			Trace.DEBUG(this, (new StringBuilder("file '")).append(file.getPath()).append("' read.").toString());
        } else {
            Trace.ERROR(this, (new StringBuilder("file '")).append(file.getPath()).append("' do not exist.").toString());
        }
        return ret.toString();
    }

    private boolean write(File file, String content) throws IOException {
        Trace.DEBUG(this, (new StringBuilder("write file '")).append(file.getPath()).append("'").toString());
        if(!file.exists() || file.canWrite()) {
        	UtilFile.write(file, content);
    		Trace.DEBUG(this, (new StringBuilder("file '")).append(file.getPath()).append("' writed.").toString());
    		return true;
        } else {
            Trace.ERROR(this, (new StringBuilder("file '")).append(file.getPath()).append("' can not be writable.").toString());
        }
		return false;
    }

    private String replaceText(String content, String text, int startIndex, int nbRow)
        throws IOException
    {
        Trace.DEBUG(this, (new StringBuilder("replaceText content:")).append(content).append(" text:").append(text).append(" startIndex:").append(startIndex).append(" nbRow:").append(nbRow).toString());
        StringBuffer ret = new StringBuffer();
        StringReader sr = new StringReader(content);
        BufferedReader in = new BufferedReader(sr);
        if(!in.ready()) {
            throw new IOException();
        }
        try
        {
            String line;
            for(int i = 1; i < startIndex && (line = in.readLine()) != null; i++) {
                ret.append(line).append("\r\n");
            }

            ret.append(text).append("\r\n");
            for(int i = 1; i <= nbRow && (line = in.readLine()) != null; i++);
            while((line = in.readLine()) != null) { 
                ret.append(line).append("\r\n");
            }
        }
        catch(Exception ex)
        {
            Trace.ERROR(this, ex);
        }
        finally {
        	in.close();
		}
        return ret.toString();
    }
}