package workspace.service.extjs;

import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import framework.beandata.BeanGenerique;
import workspace.util.UtilExtjs;

public class SrvAdminExecuteCmd extends workspace.service.SrvAdminExecuteCmd {

    protected void doResponse(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean, String content) throws Exception {
        boolean success = content.startsWith(OUT_PREFIX);
        String json = "{'success':"+success+",'msg':'" + encode(content) + "'}";
        UtilExtjs.sendJson(json, response);
    }

    private String encode(String content) {
    	try{
    		return URLEncoder.encode(content, "UTF-8");
    	} catch(Exception ex) {
    	}
    	return "";
    }
}
