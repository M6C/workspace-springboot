package org.cameleon.workspace.springboot.service;

import java.net.MalformedURLException;
import java.net.URL;

public class SrvIndexLoginValider extends workspace.service.SrvIndexLoginValider {

    // SPRINGBOOT
	@Override
    protected URL getResource(String name) throws MalformedURLException {
        return super.getResource(getClass().getResource(name).getPath());
    }
	
	@Override
	protected String getWorkspaceSecurityXml() {
		return "/BOOT-INF/classes/xml/WorkSpace_Security.xml";
	}
}
