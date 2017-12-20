package workspace.service.extjs;

import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.w3c.dom.Document;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilEncoder;
import framework.ressource.util.UtilFile;
import framework.ressource.util.UtilString;
import framework.service.SrvGenerique;
import framework.trace.Trace;
import workspace.adaptateur.application.AdpXmlApplication;
import workspace.adaptateur.application.AdpXmlServer;
import workspace.util.UtilExtjs;
import workspace.util.UtilPath;

public class SrvAutoDeployBuild extends SrvGenerique {

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean) throws Exception {
        List<String> list = doAutoDeploy(request, bean);

		String json = "";
    	for(int i=0 ; i<list.size() ; json += (i>0 ? "," : "") + list.get(i++));

    	String jsonData = "{results:"+list.size()+",autodeploy:["+json+"]}";
        UtilExtjs.sendJson(jsonData, response);
    }

    protected List<String> doAutoDeploy(HttpServletRequest request, BeanGenerique bean) throws Exception {
        String application = (String)bean.getParameterDataByName("application");

    	return doAutoDeployBuild(request, application);
    }

    protected List<String> doAutoDeployBuild(HttpServletRequest request, String application) throws Exception {
        HttpSession session = request.getSession();
        ServletContext context = session.getServletContext();
        Document dom = (Document)session.getAttribute("resultDom");

        // if no Class path defined this call throw an IllegalArgumentException
        String pathFrom = AdpXmlApplication.getPathByName(context, dom, application, "Class");
        String pathTo = "WEB-INF" + File.separator + "classes";
        
        return autoDeployPath(request, application, pathFrom, pathTo);
    }

    protected List<String> autoDeployPath(HttpServletRequest request, String application, String pathFrom, String pathTo) throws IOException {
    	List<String> json = new ArrayList<>();
    	try
        {
            HttpSession session = request.getSession();
            ServletContext context = session.getServletContext();
            Document dom = (Document)session.getAttribute("resultDom");

	    	if (UtilString.isEmpty(application)) {
	    		String msg = "No autoDeploy - application not found";
	            Trace.DEBUG(this, msg);
	        	json.add("{success:false, src:'', dst:'', msg:'" + formatJsonMessage(msg) + "'}");
	    		return json;
	    	} else {

		    	// if no Main path defined this call throw an IllegalArgumentException
	            String szPathMain = AdpXmlApplication.getPathByName(context, dom, application, "Main");
	            szPathMain = UtilPath.formatPath(dom, szPathMain);
	
	        	if (!UtilFile.isPathAbsolute(pathFrom)) {
	                pathFrom = UtilFile.formatPath(szPathMain, pathFrom);
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
		        	json.add("{success:false, src:'', dst:'', msg:'" + formatJsonMessage(msg) + "'}");
		    		return json;
	        	}
	        	if (!UtilFile.isPathAbsolute(autoDeploy)) {
	        		autoDeploy = UtilFile.formatPath(serverDeploy, autoDeploy);
	        	}
	
            	String filenameDst = UtilFile.formatPath(autoDeploy, pathTo);
	        	deploy(json, application, serverDeploy, pathFrom, filenameDst);
	    	}
        }
        catch (IllegalArgumentException ex) {
            Trace.DEBUG(this, "No autoDeploy - " + ex.getMessage());
        }
        catch (Exception ex) {
            Trace.ERROR(this, ex);
        }
		return json;
    }

	private void deploy(List<String> json, String application, String serverDeploy, String pathFrom, String pathTo) throws IOException, Exception {
    	int serverDeployLen = serverDeploy.length();
		int pathClassLen = pathFrom.length();
		List<?> list = UtilFile.dir(pathFrom, true, (FilenameFilter)null, false, true);
		for(int i=0 ; i<list.size() ; i++) {
			String classname = (String) list.get(i);
			String classnameDst = UtilFile.formatPath(pathTo, classname.substring(pathClassLen));
			
			File fileSrc = new File(classname);
			File fileDst = new File(classnameDst);
			if (fileDst.isDirectory() || fileSrc.isDirectory())
				continue;

 			File dirDst = fileDst.getParentFile();
 			if (dirDst.isFile()) {
 				dirDst.delete();
 			}
 			if (!dirDst.exists()) {
 				dirDst.mkdirs();
 			}

			String src = UtilEncoder.encodeHTMLEntities("[" + application + "]" + classname.substring(pathClassLen));
			String dst = UtilEncoder.encodeHTMLEntities("[DEPLOYED_SERVER]" + classnameDst.substring(serverDeployLen));
			src = UtilString.replaceAll(src, "\\", "\\\\");
			dst = UtilString.replaceAll(dst, "\\", "\\\\");

			if (!fileDst.exists() || fileSrc.lastModified() > fileDst.lastModified()) {
		    	UtilFile.copyFile(fileSrc, fileDst);
		    	String msg = "Success autoDeploy '" + classname + "' copied to '"+classnameDst+"'";
		    	Trace.DEBUG(this, msg);
		    	msg = "Success autoDeploy '"+src+"' copied to '"+dst+"'";
		    	json.add("{success:true, src:'" + src + "', dst:'" + dst + "', msg:'" + formatJsonMessage(msg) + "'}");
         // 	} else {
         // 		String msg = "No autoDeploy '" + classname + "' fileSrc.lastModified:"+fileSrc.lastModified()+" fileDst.lastModified:" + fileDst.lastModified();
         // 		Trace.DEBUG(this, msg);
		  //  	json.add("{success:false, src:'" + src + "', dst:'" + dst + "', msg:'" + formatJsonMessage(msg) + "'}");
			}
		}
	}

    protected String formatJsonMessage(String msg) {
    	return UtilString.replaceAll(msg, "\\", "\\\\").replaceAll("'", "\\\\'");
    }
}