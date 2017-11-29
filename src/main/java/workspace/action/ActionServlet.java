package workspace.action;

import framework.ressource.util.UtilString;
import workspace.util.UtilFile;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.io.File;

public class ActionServlet extends framework.action.ActionServlet {

	private static final long serialVersionUID = 1L;
//	private static final String REP_META_INF = "/META-INF/";
	private static final String REP_META_INF = "/BOOT-INF/classes/xml/";

	private static String PARAMETER_WORKSPACE_SECURITY = "workspace.security";

	//Initialize global variables
	public void init(ServletConfig config) throws ServletException {
		super.init(config);
		String szSecurityXml = System.getProperty(PARAMETER_WORKSPACE_SECURITY);
		if (UtilString.isNotEmpty(szSecurityXml)) {
//			try {WORKSPACE_SECURITY_XML = getServletContext().getRealPath(szSecurityXml);}catch (Exception ex){}
			try {WORKSPACE_SECURITY_XML = new File(szSecurityXml).getCanonicalPath();}catch (Exception ex){ex.printStackTrace();}
		}
	}

	// SPRINGBOOT
	@Override
	protected RequestDispatcher doReditect(HttpServletRequest request, String redirect) {
		String data = formatMetaInf(redirect);
		return request.getRequestDispatcher(data);
	}

	@Override
	protected String getResource(String name) {
		String data = formatMetaInf(name);
		return super.getResource(data);
	}

	private String formatMetaInf(String data) {
		if (!UtilFile.isPathFile(data, REP_META_INF)) {
			return UtilFile.formatPath(REP_META_INF, data).replaceAll("\\\\", "/");
		}
		return data;
	}
}
