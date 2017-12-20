package workspace.service.versioning;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.Iterator;
import java.util.LinkedList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilString;

/**
 * @author rocada
 *
 * Pour changer le modele de ce commentaire de type gamp;eacute;namp;eacute;ramp;eacute;, allez a :
 * Fenetre&gt;Pramp;eacute;famp;eacute;rences&gt;Java&gt;Gamp;eacute;namp;eacute;ration de code&gt;Code et commentaires
 */
public class SrvCVSIgnoreDel extends SrvCVS {

  /**
   * (non-Javadoc)
   * @see framework.service.SrvDatabase#execute(framework.beandata.BeanDatabase)
   */
  public void execute(HttpServletRequest req, HttpServletResponse res, BeanGenerique bean) throws Exception {
    try {
      String fileName = (String) bean.get("fileName"); //"aMessage";

      init(req, bean);

      if (UtilString.isNotEmpty(fileName)) {
        File file = new File(new File(getLocalDirectory(), getRepository()), fileName);
        File fileParent = file.getParentFile();
        File fileIgnore = new File(fileParent, ".cvsignore");
        LinkedList list = new LinkedList();
        fileName = file.getName();
        if (fileIgnore.exists()) {
          /**
           * Read ingored filename from ignored file
           */
          FileReader fr = null;
          BufferedReader br = null;
          try {
            fr = new FileReader(fileIgnore);
            br = new BufferedReader(fr);
            String line = br.readLine();
            while (line != null) {
              if (!fileName.equals(line))
                list.add(line);
              line = br.readLine();
            }
          }
          finally {
            if (br!=null)
              br.close();
            if (fr!=null)
              fr.close();
          }
          /**
           * Write ingored filename in ignored file
           */
          if (!list.isEmpty()) {
            fileIgnore.createNewFile();
            FileWriter fw = null;
            BufferedWriter bw = null;
            try {
              fw = new FileWriter(fileIgnore);
              bw = new BufferedWriter(fw);
              Iterator it = list.iterator();
              while(it.hasNext()) {
                bw.write(it.next().toString());
                bw.newLine();
              }
            }
            finally {
              if (bw != null)
                bw.close();
              if (fw != null)
                fw.close();
            }
          }
          else {
            fileIgnore.delete();
          }
        }
      }
    }
    finally {
      traceBuffer(req);
    }
  }
}
