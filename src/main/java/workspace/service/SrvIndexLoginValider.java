/*
 * Cree le 23 juil. 2004
 *
 * Pour changer le modele de ce fichier genere, allez a :
 * Fenetre&gt;Prerences&gt;Java&gt;Geration de code&gt;Code et commentaires
 */
package workspace.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;

import org.w3c.dom.Document;
import org.xml.sax.InputSource;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilString;
import framework.ressource.util.UtilXML;
import framework.service.SrvGenerique;
import framework.trace.Trace;
import workspace.action.ActionServlet;
import workspace.util.UtilFile;

/**
 * @author rocada
 *
 * Pour changer le modele de ce commentaire de type gdndrd, allez a :
 * Fenetre&gt;Preferences&gt;Java&gt;Generation de code&gt;Code et commentaires
 */
public class SrvIndexLoginValider extends SrvGenerique {

	/* (non-Javadoc)
	 * @see framework.service.SrvDatabase#execute(framework.beandata.BeanDatabase)
	 */
	public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean) throws Exception{
		
		String login = (String)bean.getParameterDataByName("login");
		String password = (String)bean.getParameterDataByName("password");
		boolean bOk = false;

		// TEST OK
		/*
		if (login!=null) {
			try {
				DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
				DocumentBuilder   docBuilder =factory.newDocumentBuilder();
	
				Document request_doc = null;
				synchronized (docBuilder)
				{
					String testXml = request.getSession().getServletContext().getRealPath("/Xml/test.xml");
					Trace.ERROR(this, "ERROR test testXml:"+testXml);
	
					request_doc = docBuilder.parse(new java.net.URL("file", "", testXml).openStream());
					//TRACE
					Trace.ERROR(this, "ERROR test request_doc:"+request_doc);
				}
				Element reqRootElt = request_doc.getDocumentElement();
				//TRACE
				Trace.ERROR(this, "ERROR test reqRootElt:"+reqRootElt);
				Trace.ERROR(this, "ERROR test reqRootElt.getChildNodes().item(0):"+reqRootElt.getChildNodes().item(0));
				Trace.ERROR(this, "ERROR test reqRootElt.getChildNodes().item(1):"+reqRootElt.getChildNodes().item(1));
				Trace.ERROR(this, "ERROR test reqRootElt.getChildNodes().item(2):"+reqRootElt.getChildNodes().item(2));
			} catch (Exception ex) {
				StringWriter s = new StringWriter();
				ex.printStackTrace(new PrintWriter(s));
				Trace.ERROR(this, "ERROR test Exception ex:"+s.toString());
			}
			return;
		}
	*/
		
		//TRACE
		Trace.DEBUG(this, "login:"+login);
		Trace.DEBUG(this, "password:"+password);
		if (UtilString.isNotEmpty(login)&&
			UtilString.isNotEmpty(password)) {
			String workspaceSecurityXsl = getWorkspaceSecurityXsl();
			String workspaceSecurityXml = getWorkspaceSecurityXml();
			try {
				//TransformerFactory tFactory = TransformerFactory.newInstance();
				TransformerFactory tFactory = TransformerFactory.newInstance(
					"org.apache.xalan.processor.TransformerFactoryImpl",
					Thread.currentThread().getContextClassLoader()); 
				//TRACE
				Trace.DEBUG(this, "ActionServlet.WORKSPACE_SECURITY_XSL:"+workspaceSecurityXsl);
				Trace.DEBUG(this, "ActionServlet.WORKSPACE_SECURITY_XML:"+workspaceSecurityXml);
				Source xslSource = getSource(workspaceSecurityXsl);
				Source xmlSource = getSource(workspaceSecurityXml);
				//TRACE
				Trace.DEBUG(this, "xslSource 1:"+xslSource);
				Trace.DEBUG(this, "xmlSource 1:"+xmlSource);
				if (xslSource==null) {
					xslSource = new StreamSource(request.getSession().getServletContext().getResourceAsStream(workspaceSecurityXsl));
					//TRACE
					Trace.DEBUG(this, "xslSource 2:"+xslSource);
				}
				//TRACE
				{/*
					StringWriter strWriterXsl = new StringWriter();
					//TransformerFactory tFactory = TransformerFactory.newInstance();
					TransformerFactory tFactoryXsl = TransformerFactory.newInstance(
						"org.apache.xalan.processor.TransformerFactoryImpl",
						Thread.currentThread().getContextClassLoader());
					Transformer transformerXsl = tFactoryXsl.newTransformer();
					transformerXsl.transform(xslSource, new StreamResult(strWriterXsl));
					Trace.DEBUG(this, "strWriterXsl.toString():"+strWriterXsl.toString());
				*/}
				if (xmlSource==null) {
					xmlSource = new StreamSource(request.getSession().getServletContext().getResourceAsStream(workspaceSecurityXml));
					//TRACE
					Trace.DEBUG(this, "xmlSource 2:"+xmlSource);
				}

				// traceFile("workspaceSecurityXsl", workspaceSecurityXsl);
				// traceFile("workspaceSecurityXml", workspaceSecurityXml);

				//TRACE
				Trace.DEBUG(this, "BEFOR transformer");
				// Generate the transformer.
				Transformer transformer = tFactory.newTransformer(xslSource);
				//TRACE
				Trace.DEBUG(this, "AFTER transformer:"+transformer);
				StringWriter strWriter = new StringWriter();
				// Pass the xsl parameters
				transformer.setParameter("myID", login);
				transformer.setParameter("myPWD", password);
				//TRACE
				Trace.DEBUG(this, "transformer.setParameter");
				// Perform the transformation, sending the output to the response.
				transformer.transform(xmlSource, new StreamResult(strWriter));
				//TRACE
				Trace.DEBUG(this, "transformer.transform");
				// Get the Xml result
				String strResult = strWriter.toString();
				//TRACE
				// Trace.DEBUG(this, "strResult:"+strResult);
				// Check if the result is not empty
				if (UtilString.isNotEmpty(strResult)) {
					StringReader strReader = new StringReader(strResult);
					// Check if the result can be read
					if (strReader.ready()) {
						//TRACE
						Trace.DEBUG(this, "strReader.ready");
						// Creation des outils de Parse du fichier XML
						DocumentBuilderFactory docBuilderFactory = DocumentBuilderFactory.newInstance();
						DocumentBuilder docBuilder = docBuilderFactory.newDocumentBuilder();
						//TRACE
						Trace.DEBUG(this, "newDocumentBuilder");
						// Build the dom document from the result
						Document resultDom = docBuilder.parse(new InputSource(strReader));
						//TRACE
						Trace.DEBUG(this, "docBuilder.parse resultDom:"+resultDom);
						if (resultDom!=null) {
							resultDom.normalize();
							//TRACE
							Trace.DEBUG(this, "docBuilder.parse resultDom.normalize()");
							String name = UtilXML.getXPathStringValue(resultDom, "/ROOT/USER/@Name");
							//String name = getXPathStringValue(resultDom, "/ROOT/USER/@Name");
							//TRACE
							Trace.DEBUG(this, "docBuilder.parse /ROOT/USER/@Name:"+name);
							bOk = (UtilString.isNotEmpty(name));
							//TRACE
							Trace.DEBUG(this, "bOk:"+bOk);
						}
					}
				}
			}
			// If an Exception occurs, write the error to the page.
			catch (Exception ex) {
				Trace.ERROR(this, ex);
			}
			finally {
				try {
					if (bOk) {
	                  request.getSession().setAttribute("BeanAuthentification", bean);
	                  request.getSession().setAttribute(ActionServlet.SECURITY_XSL, workspaceSecurityXsl);
	                  request.getSession().setAttribute(ActionServlet.SECURITY_XML, workspaceSecurityXml);
	                }
					else {
						if (request.getSession().getAttribute("BeanAuthentification")!=null)
							request.getSession().removeAttribute("BeanAuthentification");
	                    throw new Exception("No Authentification");
	                }
				}
				// If an Exception occurs, write the error to the page.
				catch (Exception ex) {
					Trace.ERROR(this, ex);
				}
			}
		}
	}

	// SPRINGBOOT
	protected StreamSource getSource(String resource) throws IOException, MalformedURLException {
		URL url = resource == null ? null : getResource(resource);
		return url == null ? null : new StreamSource(url.openStream());
	}

	// SPRINGBOOT
	protected URL getResource(String file) throws MalformedURLException {
		return new java.net.URL("file", "", file);
	}

	// SPRINGBOOT
	protected String getWorkspaceSecurityXml() {
		return ActionServlet.WORKSPACE_SECURITY_XML;
	}

	// SPRINGBOOT
	protected String getWorkspaceSecurityXsl() {
		return ActionServlet.WORKSPACE_SECURITY_XSL;
	}

	// SPRINGBOOT
	private void traceFile(String title, String file) throws FileNotFoundException, IOException, MalformedURLException {
		Trace.DEBUG(this, "---------------------> " + title + ":" + file);
		URL resource = getResource(file);
		String file2 = resource.getFile();
		File file3 = new File(file2);
		String[] list = UtilFile.read(file3, "UTF-8");
		Arrays.asList(list).stream().forEach(l -> Trace.DEBUG(this, l));
	}
}
