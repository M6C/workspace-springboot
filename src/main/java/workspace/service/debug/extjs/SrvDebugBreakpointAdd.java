package workspace.service.debug.extjs;

import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sun.jdi.request.BreakpointRequest;

import framework.beandata.BeanGenerique;
import workspace.service.debug.tool.ToolDebug;

public class SrvDebugBreakpointAdd extends workspace.service.debug.SrvDebugBreakpointAdd {

    protected void doResponse(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean, String result, boolean success) throws Exception {
        String jsonData = null;
        String szClassName = "";
        String szResponse = "";
        String szText = "";
        try {
            int idx1 = result.indexOf(":");
            if(idx1 > 0) {
                szClassName = result.substring(0, idx1);
                int idx2 = result.indexOf(":", idx1 + 1);
                if(idx2 > 0) {
	                szResponse = result.substring(idx1 + 1, idx2);
	                szText = result.substring(idx2 + 1);
                }
            }
        }
        catch(Exception ex) {
        	success = false;
//            szText = (String)request.getAttribute("msgText");
            szText = ex.getMessage();
        } finally {
	        jsonData = "{"+
                "'success':" + success + ","+
            	"'classname':'" + encode(szClassName) + "',"+
            	"'response':'" + encode(szResponse) + "',"+
            	"'text':'" + encode(szText) + "'"+
            "}";

	        OutputStream os = response.getOutputStream();
	        response.setContentType("text/json");
	        os.write(jsonData.getBytes());
	        os.close();
        }
        return;
    }

    protected Properties initBreakpointProperties(BeanGenerique bean, BreakpointRequest brkR) throws Exception {
    	Properties ret = new Properties();
        String line = (String)bean.getParameterDataByName("breakpointLine");
        String className = (String)bean.getParameterDataByName("className");
        String application = (String)bean.getParameterDataByName("application");
        String fileName = (String)bean.getParameterDataByName("FileName");

        ret.put("line", line);
        ret.put("className", className);
        ret.put("application", application);
        ret.put("fileName", fileName);

        ToolDebug.initializeBreakpointPropertie(ret, brkR);

        return ret;
    }

    private String encode(String text) {
		String ret = "";
		try {
			ret = URLEncoder.encode(text, "UTF-8");
		} catch(Exception ex) {
        	System.err.println("SrvDebugBreakpointAdd text error message:" + ex.getMessage());
		}
		return ret;
	}
}
