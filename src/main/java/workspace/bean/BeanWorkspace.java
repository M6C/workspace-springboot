package workspace.bean;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class BeanWorkspace {
    public final static String KEY_SESSION_HTTP = "KEY_SESSION_HTTP_BEANWORKSPACE";

    public final static String KEY_CLASSPATH_STRING = "KEY_CLASSPATH_STRING";
    public final static String KEY_CLASSPATH_LIST = "KEY_CLASSPATH_LIST";
    public final static String KEY_CLASSPATH_CLASS_LIST = "KEY_CLASSPATH_CLASS_LIST";

    private Map<String, Map<String, List<String>>> mapString = new HashMap<String, Map<String, List<String>>>();
    private Map<String, List<String>> listString = new HashMap<String, List<String>>();
    private Map<String, String> dataString = new HashMap<String, String>();

    public Map<String, List<String>> getMapString(String application, String key) {
        return mapString.get(key + "_" + application);
    }

    public void setMapString(String application, String key, Map<String, List<String>> map) {
        mapString.put(key + "_" + application, map);
    }

    public List<String> getListString(String application, String key) {
        return listString.get(key + "_" + application);
    }

    public void setListString(String application, String key, List<String> list) {
        listString.put(key + "_" + application, list);
    }

    public String getDataString(String application, String key) {
        return dataString.get(key + "_" + application);
    }

    public void setDataString(String application, String key, String data) {
        dataString.put(key + "_" + application, data);
    }
}