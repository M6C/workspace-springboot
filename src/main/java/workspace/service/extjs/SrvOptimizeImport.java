package workspace.service.extjs;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;
import java.util.zip.ZipEntry;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.w3c.dom.Document;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilFile;
import framework.ressource.util.UtilPackageResource;
import framework.ressource.util.UtilString;
import framework.ressource.util.UtilVector;
import framework.service.SrvGenerique;
import framework.trace.Trace;
import workspace.business.BusinessClasspath;
import workspace.util.UtilExtjs;

public class SrvOptimizeImport extends SrvGenerique {

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean) throws Exception {
    	List<String> classpathJson = new ArrayList<String>();
    	String jsonImport = "";
        try {
	        HttpSession session = request.getSession();
	        Document domXml = (Document)session.getAttribute("resultDom");
	        String application = (String)bean.getParameterDataByName("application");
	        String classname = (String)bean.getParameterDataByName("classname");
            String[] classnameList = classname.split(";");

	        Map<String, List<String>> mapListClass = new HashMap<String, List<String>>();
	        Map<String, List<String>> mapPathClass = BusinessClasspath.getClassList(request, application, domXml);
	        for(String pathKey : mapPathClass.keySet()) {
	        	List<String> classpathList = mapPathClass.get(pathKey);
		        for(String classnameItem : classnameList) {
		            for(String classpathItem : classpathList) {
		                if (classpathItem.endsWith("." + classnameItem)) {
		                    List list = mapListClass.get(classnameItem);
		                    if (list == null) {
		                        list = new ArrayList<String>();
		                        mapListClass.put(classnameItem, list);
		                    }
		                    String path = pathKey.replaceAll("\\\\", "\\\\\\\\");
		                    String jsonClasspathItem = "{classname:'" + classpathItem + "', path:'" + path + "'}";
		                    list.add(jsonClasspathItem);
		                }
		            }
		        }
	        }

	        Comparator<String> listComparator = new Comparator<String>() {
				@Override
				public int compare(String o1, String o2) {
					return o1.compareTo(o2);
				}
			};

			for(String classnameItem : mapListClass.keySet()) {
	            List<String> list = mapListClass.get(classnameItem);
		        list.sort(listComparator);
	            classpathJson.add("{classname: '" + classnameItem + "', list:[" + String.join(",", list) + "]}");
	        }
	        jsonImport = String.join(",", classpathJson);

		} catch (Exception e) {
			Trace.ERROR(this, e);
		} finally {
			String jsonData = "{results:"+classpathJson.size()+",import:["+jsonImport+"]}";
			UtilExtjs.sendJson(jsonData, response);
		}
    }
}