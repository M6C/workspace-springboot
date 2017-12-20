package workspace.service.extjs;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.w3c.dom.Document;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilString;
import framework.trace.Trace;
import workspace.adaptateur.application.AdpXmlApplication;
import workspace.util.UtilPath;

public class SrvAutoDeploy extends SrvAutoDeployWebContent {

	@Override
    protected List<String> doAutoDeploy(HttpServletRequest request, BeanGenerique bean) throws Exception {
    	List<String> json = new ArrayList<>();

    	HttpSession session = request.getSession();
        ServletContext context = session.getServletContext();
        Document dom = (Document)session.getAttribute("resultDom");

        String application = (String)bean.getParameterDataByName("application");

    	String filename = (String)bean.getParameterDataByName("filename");
    	boolean deployFile = UtilString.isNotEmpty(filename);
    	if (deployFile) {
    		application = UtilPath.getApplication(bean, filename);
    	}

    	if (UtilString.isEmpty(application)) {
    		String msg = "No autoDeploy '" + filename + "' - application not found";
            Trace.DEBUG(this, msg);
        	json.add("{success:false, src:'" + filename + "', dst:'', msg:'" + formatJsonMessage(msg) + "'}");
    		return json;
    	} else {
        	if (deployFile) {
	    		// Deploy Single File
	    		filename = UtilPath.formatPath(dom, application, filename);
	    		json.addAll(super.autoDeployFile(request, application, filename));
        	}

    		// Deploy modified Build content by super call
	        json.addAll(super.doAutoDeployBuild(request, application));

	        // Deploy modified Web Content
	        String pathWebRoot = AdpXmlApplication.getPathByName(context, dom, application, "WebContent");
        	if (UtilString.isEmpty(pathWebRoot)) {
                String msg = "No autoDeploy '" + application + "' - path 'WebContent' not found";
	            Trace.DEBUG(this, msg);
	        	json.add("{success:false, src:'" + application + "', dst:'', msg:'" + formatJsonMessage(msg) + "'}");
	    		return json;
        	}
        	pathWebRoot = UtilPath.formatPath(dom, application, pathWebRoot);
	    	
	    	// if no Class path defined this call throw an IllegalArgumentException
	        String pathFrom = pathWebRoot;
	        String pathTo = "";
	        
	        json.addAll(super.autoDeployPath(request, application, pathFrom, pathTo));
    	}
        
        return json;
    }
}