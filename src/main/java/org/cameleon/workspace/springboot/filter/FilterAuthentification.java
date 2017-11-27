package org.cameleon.workspace.springboot.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import framework.ressource.FrmWrkConfig;
import framework.ressource.FrmWrkServlet;
import framework.ressource.bean.BeanServlet;
import framework.ressource.util.UtilString;

/**
 * @author rocada
 *
 * Pour changer le mod�le de ce commentaire de type gamp;eacute;namp;eacute;ramp;eacute;, allez � :
 * Fen�tre&gt;Pramp;eacute;famp;eacute;rences&gt;Java&gt;Gamp;eacute;namp;eacute;ration de code&gt;Code et commentaires
 */
public class FilterAuthentification implements Filter {

  private FilterConfig filterConfig = null;

  private final static String URL_LOGOUT = "?event=Index";
  private final static String CONFIG_FILE = "config_file";
  private final static String SERVLET_FILE = "servlet_file";

  public void init(FilterConfig arg0) throws ServletException {
    filterConfig = arg0;

    String szConfigFile = filterConfig.getInitParameter(CONFIG_FILE);
    if (UtilString.isNotEmpty(szConfigFile))
      try {FrmWrkConfig.setup(getResource(szConfigFile));}catch (Exception ex){ex.printStackTrace();}
    String szServletFile = filterConfig.getInitParameter(SERVLET_FILE);
    if (UtilString.isNotEmpty(szServletFile))
      try {FrmWrkServlet.setup(getResource(szServletFile));}catch (Exception ex){ex.printStackTrace();}
  }

  public void destroy() {
  }

  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
    BeanServlet bean = null;
    HttpServletRequest req = (HttpServletRequest) request;
    String event = request.getParameter("event");
    /****** Check event ******/
    if ( (event != null) && (!event.equals(""))) {
      bean = FrmWrkServlet.get(event);
      if (bean != null) {
        // Lecture du nom du param�tre qui indique si l'evenement � besoin d'une authentification
        String szOutputName = filterConfig.getInitParameter("OutputName");
        if (UtilString.isNotEmpty(szOutputName)) {
          // R�cupere la valeur de l'authentification ou "true" par d�faut
          String szOutputValue = (UtilString.isNotEmpty(bean.getAuthentification())) ? bean.getAuthentification() : Boolean.TRUE.toString();
          // Initialise le parametre d'authentification
          filterConfig.getServletContext().setAttribute(szOutputName, szOutputValue);
        }
      }
      /****** Continue Filter chain ******/
      chain.doFilter(request, response);
    }
  }

  // SPRINGBOOT
  protected String getResource(String name) {
  	// return filterConfig.getServletContext().getRealPath(szConfigFile)
      return getClass().getResource(name).getPath();
  }
}
