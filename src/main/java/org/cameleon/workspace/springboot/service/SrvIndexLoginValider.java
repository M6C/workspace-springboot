package org.cameleon.workspace.springboot.service;

import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;

import framework.ressource.util.UtilString;

public class SrvIndexLoginValider extends workspace.service.SrvIndexLoginValider {

	private static String PARAMETER_WORKSPACE_SECURITY = "workspace.security";

	// SPRINGBOOT
	@Override
    protected URL getResource(String name) throws MalformedURLException {
		URL res = getClass().getResource(name);
        return (res == null) ? getResourceSystemPath(name) : super.getResource(res.getPath());
    }
	
	@Override
	protected String getWorkspaceSecurityXsl() {
		return "/xsl/WorkSpace_Security.xsl";
	}
	
	@Override
	protected String getWorkspaceSecurityXml() {
		String ret = System.getProperty(PARAMETER_WORKSPACE_SECURITY);
		if (ret != null) {
			ret = ret.replaceAll("-noverify$", "");
		} else {
			ret = "/xml/WorkSpace_Security.xml";
		};
		return ret;
	}
	
	protected URL getResourceSystemPath(String resource) {
		if (UtilString.isNotEmpty(resource)) {
			try {
				File file = new File(resource);
				return (file != null && file.isFile() && file.exists()) ? file.toURI().toURL() : null;
			} catch (Exception ex) {
				ex.printStackTrace();
			}
		}
		return null;
	}
}