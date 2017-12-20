package workspace.service.extjs;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.w3c.dom.Document;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilEncoder;
import framework.ressource.util.UtilFile;
import framework.ressource.util.UtilString;
import framework.ressource.util.UtilVector;
import framework.trace.Trace;
import workspace.adaptateur.application.AdpXmlApplication;
import workspace.adaptateur.application.AdpXmlServer;
import workspace.util.UtilPath;

public class SrvAutoDeployWebContent extends SrvAutoDeployBuild {

    protected List<String> doAutoDeploy(HttpServletRequest request, BeanGenerique bean) throws Exception {
    	return doAutoDeployWeb(request, bean);
    }

    protected List<String> doAutoDeployWeb(HttpServletRequest request, BeanGenerique bean) throws Exception {
    	List<String> json = new ArrayList<>();

    	String filename = (String)bean.getParameterDataByName("filename");
    	String application = UtilPath.getApplication(bean, filename);

    	if (UtilString.isEmpty(application)) {
    		String msg = "No autoDeploy '" + filename + "' - application not found";
            Trace.DEBUG(this, msg);
        	json.add("{success:false, src:'" + filename + "', dst:'', msg:'" + formatJsonMessage(msg) + "'}");
    		return json;
    	} else {
    		// Deploy Single File
    		json.addAll(autoDeployFile(request, application, filename));
    	}
        
        return json;
    }

    protected List<String> autoDeployFile(HttpServletRequest request, String application, String filename) throws IOException {
    	List<String> json = new ArrayList<>();
    	try {
            HttpSession session = request.getSession();
            ServletContext context = session.getServletContext();
            Document dom = (Document)session.getAttribute("resultDom");
        	List<String> forbiddenExtension = Arrays.asList("java");

	        int idx = filename.indexOf('.');
	    	if (idx<0) {
	    		String msg = "No autoDeploy '" + filename + "' - No Extension";
	            Trace.DEBUG(this, msg);
	        	json.add("{success:false, src:'" + filename + "', dst:'', msg:'" + formatJsonMessage(msg) + "'}");
	    		return json;
	    	}
	
	    	String extention = filename.substring(idx+1);
	    	if (UtilVector.isContainsString(forbiddenExtension, extention)) {
	    		String msg = "No autoDeploy '" + filename + "' - Forbidden Extension '" + extention + "'";
	            Trace.DEBUG(this, msg);
	        	json.add("{success:false, src:'" + filename + "', dst:'', msg:'" + formatJsonMessage(msg) + "'}");
	    		return json;
	    	}
	
	    	// if no AutoDeploy defined this call throw an IllegalArgumentException
	        String autoDeploy = AdpXmlServer.getCommandByName(context, dom, application, "WebApplication", "AutoDeploy");
        	autoDeploy = UtilPath.formatPath(dom, autoDeploy);
	    	// if no RootDeploy defined this call throw an IllegalArgumentException
	        String serverDeploy = AdpXmlServer.getPathByName(context, dom, application, "WebApplication", "RootDeploy");
        	serverDeploy = UtilPath.formatPath(dom, serverDeploy);

        	if (!UtilFile.isPathAbsolute(autoDeploy) && !UtilFile.isPathAbsolute(serverDeploy)) {
        		String msg = "No autoDeploy Relative path autoDeploy '" + autoDeploy + "' and Relative path serverDeploy '" + serverDeploy + "'";
	            Trace.DEBUG(this, msg);
	        	json.add("{success:false, src:'" + filename + "', dst:'', msg:'" + formatJsonMessage(msg) + "'}");
	    		return json;
        	}
        	if (!UtilFile.isPathAbsolute(autoDeploy)) {
        		autoDeploy = UtilFile.formatPath(serverDeploy, autoDeploy);
        	}

	        String pathWebRoot = AdpXmlApplication.getPathByName(context, dom, application, "WebContent");
        	if (UtilString.isEmpty(pathWebRoot)) {
                String msg = "No autoDeploy '" + filename + "' - path 'WebContent' not found";
	            Trace.DEBUG(this, msg);
	        	json.add("{success:false, src:'" + filename + "', dst:'', msg:'" + formatJsonMessage(msg) + "'}");
	    		return json;
        	}
        	pathWebRoot = UtilPath.formatPath(dom, application, pathWebRoot);

    		String filenameSrc = UtilPath.formatPath(dom, application, filename);

        	if (!filenameSrc.startsWith(pathWebRoot+"\\")) {
        		String msg = "No autoDeploy '" + filename + "' - not in WebRoot directory '" + pathWebRoot + "'";
	            Trace.DEBUG(this, msg);
	        	json.add("{success:false, src:'" + filename + "', dst:'', msg:'" + formatJsonMessage(msg) + "'}");
	    		return json;
        	}

        	String filenameDst = UtilFile.formatPath(autoDeploy, filenameSrc.substring(pathWebRoot.length()));

         	File fileDst = new File(filenameDst);
//        	File fileDst = new File(filenameDst.substring(filenameDst.lastIndexOf(File.separator)));
//        	fileDst.mkdirs();
 			File dirDst = fileDst.getParentFile();
 			if (dirDst.isFile()) {
 				dirDst.delete();
 			}
 			if (!dirDst.exists()) {
 				dirDst.mkdirs();
 			}

        	UtilFile.copyFile(filenameSrc, filenameDst);
            String msg = "Success autoDeploy '" + filenameSrc + "' copied to '"+filenameDst+"'";
            Trace.DEBUG(this, msg);

            String src = filename;
            String dst = UtilEncoder.encodeHTMLEntities("[DEPLOYED_SERVER]" + filenameDst.substring(serverDeploy.length()));
        	src = UtilString.replaceAll(src, "\\", "\\\\");
        	dst = UtilString.replaceAll(dst, "\\", "\\\\");
            msg = "Success autoDeploy '" + src + "' copied to '"+dst+"'";
        	json.add("{success:true, src:'" + src + "', dst:'" + dst + "', msg:'" + formatJsonMessage(msg) + "'}");
        }
        catch (IllegalArgumentException ex) {
            Trace.DEBUG(this, "No autoDeploy '" + filename + "' - " + ex.getMessage());
        }
        catch (Exception ex) {
            Trace.ERROR(this, ex);
        }
		return json;
    }
}