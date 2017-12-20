package workspace.service.ant;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.PrintStream;
import java.util.Hashtable;
import java.util.Vector;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.xml.transform.TransformerException;

import org.apache.tools.ant.BuildLogger;
import org.apache.tools.ant.NoBannerLogger;
import org.apache.tools.ant.Project;
import org.apache.tools.ant.ProjectHelper;
import org.apache.tools.ant.Target;
import org.w3c.dom.Document;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilString;
import framework.service.SrvGenerique;
import workspace.adaptateur.application.AdpXmlApplication;
import workspace.business.BusinessClasspath;
import workspace.util.UtilPath;

public class SrvAntTargetExecute extends SrvGenerique {

    public void init() {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean) throws Exception {
        HttpSession session = request.getSession();
        ServletContext context = session.getServletContext();
        String target = (String)bean.getParameterDataByName("target");
        String application = (String)bean.getParameterDataByName("application");
        if(UtilString.isNotEmpty(target)) {

      	  ByteArrayOutputStream streamLog = new ByteArrayOutputStream();
          PrintStream psLog = new PrintStream(streamLog);
          PrintStream out = System.out;
          PrintStream err = System.err;

          try {
	            Document domXml = (Document)session.getAttribute("resultDom");

	            String szPathMain = AdpXmlApplication.getPathByName(context, domXml, application, "Main");
	            szPathMain = (szPathMain == null) ? szPathMain : UtilPath.formatPath(domXml, szPathMain);
	            //Recuperation du chemin des sources
	            String szPathSource = AdpXmlApplication.getPathByName(context, domXml, application, "Source");
	            szPathSource = (szPathSource == null) ? szPathSource : UtilPath.formatPath(domXml, szPathSource);
	            szPathSource = (new File(szPathMain, szPathSource)).getCanonicalPath();
	            //Recuperation du chemin de destination des classes
	            String szPathClass = AdpXmlApplication.getPathByName(context, domXml, application, "Class");
	            szPathClass = (szPathClass == null) ? szPathClass : UtilPath.formatPath(domXml, szPathClass);
	            szPathClass = (new File(szPathMain, szPathClass)).getCanonicalPath();
	            //Recuperation des classpath de l'application
	            String pathClass = BusinessClasspath.getClassPath(request, application, domXml);

	            File buildXml = new File(context.getRealPath("/Xml/Ant/Task/CompileProject.xml"));
	            Project p = new Project();
	            p.setUserProperty("ant.file", buildXml.getAbsolutePath());
	            p.setProperty("java.src", szPathSource);
	            p.setProperty("java.cls", szPathClass);
	            p.setProperty("class.path", pathClass);

	            ProjectHelper ph = ProjectHelper.getProjectHelper();
	            p.addReference("ant.projectHelper", ph);

	            BuildLogger buildLogger = new NoBannerLogger();
	            buildLogger.setMessageOutputLevel(Project.MSG_INFO);
	            buildLogger.setOutputPrintStream(System.out);
	            buildLogger.setErrorPrintStream(System.err);
	            p.addBuildListener(buildLogger);

	            p.init();

	            System.out.println(p.getBaseDir());
	            System.out.println(p.getDefaultTarget());

	            System.setErr(psLog);
	            System.setOut(psLog);
//	            System.out.println(pathClass);

	            ph.parse(p, buildXml);

	            Hashtable<String, Object> hTarget = p.getTargets();
	            if (hTarget!=null) {
	              Object aTarget = hTarget.get(target);
	              if (target!=null) {
	                  if (aTarget instanceof Target) {
	                      ((Target)aTarget).execute();
	                  }
	                  else if (aTarget instanceof String) {
	                      p.executeTarget((String)aTarget);
	                  }
	              }
	            }
	            
	        } catch (Exception ex) {
	            //StringWriter sw = new StringWriter();
	            //ex.printStackTrace(sw);
	            //request.setAttribute("msgText", sw);
	            ex.printStackTrace(psLog);
	        }
	        finally {
	      	  System.setErr(err);
	      	  System.setOut(out);
	
	      	  doResponse(request, response, bean, streamLog);
	        }
        }
    }

    protected void doResponse(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean, ByteArrayOutputStream streamLog) throws Exception {
  	  //streamLog.write(new byte[]{'t', 'e', 's', 't'});
		request.setAttribute("msgText", streamLog.toString());
    }
}