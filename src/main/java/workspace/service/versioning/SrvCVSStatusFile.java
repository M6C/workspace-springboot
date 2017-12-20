package workspace.service.versioning;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import framework.beandata.BeanGenerique;

/**
 * @author rocada
 *
 * Pour changer le modele de ce commentaire de type gamp;eacute;namp;eacute;ramp;eacute;, allez a :
 * Fenetre&gt;Pramp;eacute;famp;eacute;rences&gt;Java&gt;Gamp;eacute;namp;eacute;ration de code&gt;Code et commentaires
 */
public class SrvCVSStatusFile extends SrvCVS {

  /**
   * (non-Javadoc)
   * @see framework.service.SrvDatabase#execute(framework.beandata.BeanDatabase)
   */
  public void execute(HttpServletRequest req, HttpServletResponse res, BeanGenerique bean) throws Exception {
    try {
      init(req, bean);

      String fileName = (String) bean.get("fileName"); //"aMessage";

      beanCVS.executeStatusInformation(fileName);
    }
    finally {
      traceBuffer(req, beanCVS.getTraceBuffer().toString());
    }
  }
}
