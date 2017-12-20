package workspace.service.extjs;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilString;
import framework.service.SrvGenerique;
import framework.trace.Trace;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.w3c.dom.Document;

import workspace.business.BusinessClasspath;

public class SrvInitializeProject extends SrvGenerique {

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean) throws Exception {
        HttpSession session = request.getSession();
        Document domXml = (Document)session.getAttribute("resultDom");
        String application = (String)bean.getParameterDataByName("application");

        if (UtilString.isNotEmpty(application)) {
            Trace.DEBUG(this, "SrvInitializeProject execute application:" + application);
            BusinessClasspath.initializeApplication(request, application, domXml);
        } else {
            Trace.DEBUG(this, "SrvInitializeProject execute no application found");
        }
    }
}