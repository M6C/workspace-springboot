package workspace.util;

//import com.glaforge.i18n.io.CharsetToolkit;

import framework.ressource.util.UtilString;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

import javax.activation.MimetypesFileTypeMap;

public class UtilFile extends framework.ressource.util.UtilFile {

    public static String[] read(File file, String charset) throws FileNotFoundException, IOException {
    	InputStream input = new FileInputStream(file);
    	InputStreamReader reader = new InputStreamReader(input, charset);
        BufferedReader br = new BufferedReader(reader);
        try {
            List<String> list = new ArrayList<String>();
            String line = br.readLine();

            int i=0;
            while (line != null) {
                line = URLEncoder.encode(line, charset);
                list.add(line);
                line = br.readLine();
            }
            String[] ret = new String[list.size()];
            list.toArray(ret);
            return ret;
        } finally {
        	try {
            	try {
                    br.close();
    	    	} finally {
                    reader.close();
    			}
	    	} finally {
	    		input.close();
			}
        }
    }

	// http://stackoverflow.com/questions/499010/java-how-to-determine-the-correct-charset-encoding-of-a-stream/4013565#4013565
	// http://mvnrepository.com/artifact/org.codehaus.guessencoding/guessencoding/1.4
//    public static String guessEncoding(File file) throws IOException {
//    	InputStream input = new FileInputStream(file);
//        // Load input data
//        long count = 0;
//        int n = 0, EOF = -1;
//        byte[] buffer = new byte[4096];
//        ByteArrayOutputStream output = new ByteArrayOutputStream();
//    	try {
//	        while ((EOF != (n = input.read(buffer))) && (count <= Integer.MAX_VALUE)) {
//	            output.write(buffer, 0, n);
//	            count += n;
//	            if (count > Integer.MAX_VALUE) {
//	                break;
//	            }
//	        }
//	
//	        byte[] data = output.toByteArray();
//	
//	        return new CharsetToolkit(data).guessEncoding().displayName();
//    	} finally {
//        	try {
//	    		output.close();
//	    	} finally {
//	    		input.close();
//			}
//		}
//    }

    // http://www.programcreek.com/java-api-examples/index.php?class=java.nio.file.Files&method=probeContentType
    // http://www.java-forums.org/advanced-java/82143-how-check-if-file-plain-text-binary.html
    // http://stackoverflow.com/questions/3093580/how-to-check-whether-the-file-is-binary
    // * More elegant solution Register FileTypeDetector Service
    // http://stackoverflow.com/questions/29880198/how-to-write-a-filetypedetector-for-zip-archives
    public static String getTypeByExtension(File file) throws IOException {
        String type = Files.probeContentType(file.toPath());
        if (UtilString.isNotEmpty(type)) {
            return type;
        }
        String path = file.getAbsolutePath();
        int index = path.lastIndexOf('.');
        if(index > -1) {
            String extension = path.substring(index + 1);
            switch (extension.toLowerCase()){
                case "java":
                    return "text/java";
                case "php":
                    return "text/php";
                case "json":
                    return "text/json";
                case "css":
                    return "text/css";
                case "js":
                    return "text/javascript";
                case "html":
                    return "text/html";
                case "txt":
                    return "text/plain";
                case "xml":
                    return "text/xml";
                case "png":
                    return "image/png";
                case "jpeg":
                    return "image/jpeg";
                case "jpg":
                    return "image/jpeg";
                case "gif":
                    return "image/gif";
                case "mp4":
                    return "video/mp4";
                case "mp3":
                    return "audio/mpeg";
                case "ogg":
                    return "audio/ogg";
                case "wav":
                    return "audio/vnd.wave";
                case "zip":
                    return "application/zip";
                case "gzip":
                    return "application/gzip";
                case "exe":
                    return "application/octet-stream";
             }
        }                            
        return new MimetypesFileTypeMap().getContentType(file);//"unknown";
    }
}