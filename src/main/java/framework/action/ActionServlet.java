package framework.action;

import framework.ressource.FrmWrkConfig;
import framework.ressource.FrmWrkServlet;
import framework.ressource.bean.BeanServlet;
import framework.ressource.util.UtilReflect;
import framework.ressource.util.UtilString;
import framework.trace.Trace;
import java.io.IOException;
import java.lang.reflect.Method;
import java.util.Enumeration;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class ActionServlet extends HttpServlet {
    private static final String CONTENT_TYPE = "text/html";
    private static final String CONFIG_FILE = "config_file";
    private static final String SERVLET_FILE = "servlet_file";
    public static String SECURITY_XML = "security_xml";
    public static String SECURITY_XSL = "security_xsl";
    public static String WORKSPACE_SECURITY_XML = "FrameWork_Security.xml";
    public static String WORKSPACE_SECURITY_XSL = "FrameWork_Security.xsl";

    public ActionServlet() {
    }

    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        String szConfigFile = this.getInitParameter("config_file");
        if (UtilString.isNotEmpty(szConfigFile)) {
            try {
                // SPRINGBOOT
                String s = this.getResource(szConfigFile);
                FrmWrkConfig.setup(s);
            } catch (Exception var10) {
                ;
            }
        }

        String szServletFile = this.getInitParameter("servlet_file");
        if (UtilString.isNotEmpty(szServletFile)) {
            try {
                // SPRINGBOOT
                FrmWrkServlet.setup(this.getResource(szServletFile));
            } catch (Exception var9) {
                ;
            }
        }

        String szSecurityXml = this.getInitParameter(SECURITY_XML);
        if (UtilString.isNotEmpty(szSecurityXml)) {
            try {
                // SPRINGBOOT
                WORKSPACE_SECURITY_XML = this.getResource(szSecurityXml);
            } catch (Exception var8) {
                ;
            }
        }

        String szSecurityXsl = this.getInitParameter(SECURITY_XSL);
        if (UtilString.isNotEmpty(szSecurityXsl)) {
            try {
                // SPRINGBOOT
                WORKSPACE_SECURITY_XSL = this.getResource(szSecurityXsl);
            } catch (Exception var7) {
                ;
            }
        }

    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request, response);
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String szEvent = request.getParameter("event");
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

    // SPRINGBOOT
    protected RequestDispatcher doReditect(HttpServletRequest request, String redirect) {
        return request.getRequestDispatcher(redirect);
    }

    // SPRINGBOOT
    protected String getResource(String name) {
        return getClass().getResource(name).getPath();
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

    public void destroy() {
    }
}
