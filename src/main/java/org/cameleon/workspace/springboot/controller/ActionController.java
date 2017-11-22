package org.cameleon.workspace.springboot.controller;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import framework.ressource.FrmWrkConfig;
import framework.ressource.FrmWrkServlet;
import framework.ressource.bean.BeanServlet;
import framework.ressource.util.UtilReflect;
import framework.ressource.util.UtilString;
import framework.trace.Trace;

@Controller
@EnableAutoConfiguration
public class ActionController {

    private static final String CONTENT_TYPE = "text/html";
    private static final String CONFIG_FILE = "config_file";
    private static final String SERVLET_FILE = "servlet_file";
    private static String SECURITY_XML = "security_xml";
    private static String SECURITY_XSL = "security_xsl";
    private static String WORKSPACE_SECURITY_XML = "FrameWork_Security.xml";
    private static String WORKSPACE_SECURITY_XSL = "FrameWork_Security.xsl";
	private static String PARAMETER_WORKSPACE_SECURITY = "workspace.security";

    private ServletContext context;

    private List<List<String>> listParam = Arrays.asList(
		Arrays.asList(CONFIG_FILE, "/xml/FrmWrk_Config.xml"), 
		Arrays.asList(SERVLET_FILE, "/xml/ExtJs/FrmWrk_Servlet.xml")
    );

    private Map<String, String> mapParam =
	   listParam.stream().collect(HashMap<String, String>::new, 
	                           (m, c) -> m.put(c.get(0), c.get(1)),
	                           (m, u) -> {});
    
    public ActionController(ServletContext servletContext) throws ServletException {
        this.context = servletContext;
        this.initFramework();
        this.initWorkspace();;
	}

	@RequestMapping("/action.servlet")
    @ResponseBody
    public String action(HttpServletRequest request, HttpServletResponse response, String event) throws ServletException, IOException {

        final StringBuilder ret = new StringBuilder("Hello World! ").append(event);
        File file = new File(getClass().getResource("/xml").getFile());
        File[] files = file.listFiles();

        Arrays.stream(files).forEach((p) -> {
            ret.append("\r\n" + p.getName());
        });
        
        process(request, response, event);

        return ret.toString();
    }

	// SPRINGBOOT
    protected void initFramework() throws ServletException {
      String szConfigFile = getInitParameter(CONFIG_FILE);
      if (UtilString.isNotEmpty(szConfigFile))
        try {FrmWrkConfig.setup(getResource(szConfigFile));}catch (Exception ex){}
      String szServletFile = getInitParameter(SERVLET_FILE);
      if (UtilString.isNotEmpty(szServletFile))
        try {FrmWrkServlet.setup(getResource(szServletFile));}catch (Exception ex){}
      String szSecurityXml = getInitParameter(SECURITY_XML);
      if (UtilString.isNotEmpty(szSecurityXml))
        try {WORKSPACE_SECURITY_XML = getResource(szSecurityXml);}catch (Exception ex){}
      String szSecurityXsl = getInitParameter(SECURITY_XSL);
      if (UtilString.isNotEmpty(szSecurityXsl))
        try {WORKSPACE_SECURITY_XSL = getResource(szSecurityXsl);}catch (Exception ex){}
    }

	// SPRINGBOOT
	protected void initWorkspace() {
		String szSecurityXml = System.getProperty(PARAMETER_WORKSPACE_SECURITY);
		if (UtilString.isNotEmpty(szSecurityXml)) {
//			try {WORKSPACE_SECURITY_XML = getServletContext().getRealPath(szSecurityXml);}catch (Exception ex){}
			try {WORKSPACE_SECURITY_XML = new File(szSecurityXml).getCanonicalPath();}catch (Exception ex){ex.printStackTrace();}
		}
	}
    
	// SPRINGBOOT
    protected RequestDispatcher doReditect(HttpServletRequest request, String redirect) {
        return request.getRequestDispatcher(redirect);
    }

    // SPRINGBOOT
    protected String getResource(String name) {
    	// return context.getRealPath(name)
        return getClass().getResource(name).getPath();
    }

    // SPRINGBOOT
    protected String getInitParameter(String key) {
//    	return context.getInitParameter(key);
    	return mapParam.get(key);
    }

    // SPRINGBOOT
    protected void process(HttpServletRequest request, HttpServletResponse response, String szEvent) throws ServletException, IOException {
        String redirect = null;
        if (szEvent != null) {
            BeanServlet bean = FrmWrkServlet.get(szEvent);
            if (bean != null) {
                String servletClass = bean.getServlet() != null && !bean.getServlet().equals("") ? bean.getServlet() : "framework.action.ActionGenerique";
                Trace.DEBUG(this, "event: '" + szEvent + "' servlet: '" + servletClass + "'");
                boolean ok = false;

                try {
                    ClassLoader classloader = UtilReflect.getContextClassLoader();
                    Class classe = classloader.loadClass(servletClass);
                    Class param1 = ServletRequest.class;
                    Class param2 = ServletResponse.class;
                    Method method = classe.getMethod("service", param1, param2);
                    if (method != null) {
                        method.invoke(classe.newInstance(), request, response);
                        redirect = bean.getForwardTarget(request);
                        ok = true;
                    } else {
                        Trace.ERROR(this, "No method 'service(javax.servlet.ServletRequest, javax.servlet.ServletResponse)' found in class: '" + classe.getName() + "'");
                    }
                } catch (Throwable var17) {
                    Trace.ERROR(this, var17);
                    throw new ServletException(var17);
                } finally {
                    if (!response.isCommitted()) {
                        if (!ok) {
                            redirect = bean.getForwardTargetError(request);
                        }

                        if (UtilString.isNotEmpty(redirect)) {
                            // SPRINGBOOT
                            RequestDispatcher rd = doReditect(request, redirect);
                            if (rd != null) {
                                Trace.DEBUG(this, "Redirect to : '" + redirect + "'");
                                rd.forward(request, response);
                            } else {
                                Trace.DEBUG(this, "Redirect : '" + redirect + "' not found");
                            }
                        } else {
                            Trace.DEBUG(this, "No redirection");
                        }
                    } else {
                        Trace.DEBUG(this, "Don't redirect, target all ready commited: '" + redirect + "'");
                    }

                }
            } else {
                Trace.ERROR(this, "event: '" + szEvent + "' not found");
            }
        }

    }

    protected void showRequest(HttpServletRequest request) {
        StringBuffer sbAttr = new StringBuffer("REQUEST ATTRIBUTES:");
        Enumeration enumAttr = request.getAttributeNames();

        while(enumAttr.hasMoreElements()) {
            sbAttr.append(enumAttr.nextElement().toString());
            sbAttr.append(" ");
        }

        Trace.OUT(this, sbAttr.toString());
        StringBuffer sbParam = new StringBuffer("REQUEST PARAMETRES:");
        Enumeration enumParam = request.getParameterNames();

        while(enumParam.hasMoreElements()) {
            sbParam.append(enumParam.nextElement().toString());
            sbParam.append(" ");
        }

        Trace.OUT(this, sbParam.toString());
        HttpSession session = request.getSession();
        StringBuffer sbSessionAttr = new StringBuffer("SESSION ATTRIBUTES:");
        Enumeration enumSessionAttr = session.getAttributeNames();

        while(enumSessionAttr.hasMoreElements()) {
            sbSessionAttr.append(enumSessionAttr.nextElement().toString());
            sbSessionAttr.append(" ");
        }

        Trace.OUT(this, sbSessionAttr.toString());
    }
}