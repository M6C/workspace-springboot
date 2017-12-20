package workspace.service.versioning;

/**
 *           OK
 */

import java.io.File;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.netbeans.lib.cvsclient.Client;
import org.netbeans.lib.cvsclient.command.GlobalOptions;
import org.netbeans.lib.cvsclient.command.commit.CommitCommand;

import framework.beandata.BeanGenerique;

/**
 * @author rocada
 *
 * Pour changer le modele de ce commentaire de type gamp;eacute;namp;eacute;ramp;eacute;, allez a :
 * Fenetre&gt;Pramp;eacute;famp;eacute;rences&gt;Java&gt;Gamp;eacute;namp;eacute;ration de code&gt;Code et commentaires
 */
public class SrvCVSCommitFile extends SrvCVS {

  /**
   * (non-Javadoc)
   * @see framework.service.SrvDatabase#execute(framework.beandata.BeanDatabase)
   */
  public void execute(HttpServletRequest req, HttpServletResponse res, BeanGenerique bean) throws Exception {
    try {
      String messageStr = (String) bean.get("messageStr"); //"aMessage";
      String fileName = (String) bean.get("fileName"); //"aMessage";

      init(req, bean);

      Client client = newClient();

      CommitCommand command = new CommitCommand();
      command.setBuilder(null);

      File[] files = new File[1];
      files[0] = new File(new File(getLocalDirectory(), getRepository()), fileName);
      command.setFiles(files);
      command.setMessage(messageStr);

      GlobalOptions globalOptions = new GlobalOptions();
      globalOptions.setCVSRoot(getRootDirectory() + "/" + getRepository());
      client.executeCommand(command, globalOptions);
    }
    finally {
      traceBuffer(req);
    }
  }
}
