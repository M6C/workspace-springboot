package workspace.bean;

public class BeanRuntime {

    private String application;
    private Runtime runtime;

	public BeanRuntime() {
    }

	public BeanRuntime(String application, Runtime runtime) {
	    this.application = application;
        this.runtime = runtime;
    }

    public Runtime getRuntime() {
        return runtime;
    }
}