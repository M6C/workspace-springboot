package workspace.util;

import java.net.URL;

public class UtilResource {

    private UtilResource() {
    }

    public static URL getResource(final Class c, String name) {
        // return context.getRealPath(name)
        return c.getClass().getResource(name);
    }
}
