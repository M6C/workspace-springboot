package workspace.service.extjs;

import java.io.ByteArrayOutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilString;
import workspace.service.ant.SrvAntTargetExecute;
import workspace.util.UtilExtjs;

public class SrvCompileProject extends SrvAntTargetExecute {

    protected void doResponse(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean, ByteArrayOutputStream streamLog) throws Exception {
        System.out.println(streamLog.toString());
        String content = streamLog.toString();
        String contentLow = (content == null) ? "" : content.toLowerCase();
    	String jsonSuccess = "success:" + (UtilString.isEmpty(contentLow) || ((contentLow.indexOf("error") < 0) && (contentLow.indexOf("exception") < 0)));
        UtilExtjs.splitAndSendJson(content, jsonSuccess, response);
    }
}