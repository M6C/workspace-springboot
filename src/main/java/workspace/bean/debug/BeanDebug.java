package workspace.bean.debug;

import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import com.sun.jdi.IncompatibleThreadStateException;
import com.sun.jdi.StackFrame;
import com.sun.jdi.ThreadReference;
import com.sun.jdi.VirtualMachine;
import com.sun.jdi.event.Event;
import com.sun.jdi.event.LocatableEvent;
import com.sun.jdi.event.StepEvent;
import com.sun.jdi.request.EventRequestManager;

import workspace.thread.debug.ThrdDebugEventQueue;

public class BeanDebug
{
    private VirtualMachine virtualMachine;
    private Event currentEvent;
    private Hashtable<String, Properties> tableBreakpoint = new Hashtable<String, Properties>();
    private ThrdDebugEventQueue thrdDebugEventQueue;
    private StepEvent currentStepEvent;
    private String application;
    private String hostname;
    private int port;
    private int timeout;
    private String messageError;

    private Map<String, String[]> mapApplicationPath = new HashMap<String, String[]>();

	public BeanDebug() {
    }

	public BeanDebug(String application) {
	    this.application = application;
    }

    public BeanDebug(VirtualMachine pVirtualMachine) {
        virtualMachine = pVirtualMachine;
    }

    public EventRequestManager getEventRequestManager() {
        EventRequestManager ret = null;
        if(virtualMachine != null)
            ret = virtualMachine.eventRequestManager();
        return ret;
    }

    public List getBreakpointRequests() {
        List ret = null;
        EventRequestManager eventRequestManager = getEventRequestManager();
        if(eventRequestManager != null)
            ret = eventRequestManager.breakpointRequests();
        return ret;
    }

    public LocatableEvent getEvent() {
        LocatableEvent ret = null;
        Event currentEvent = getCurrentEvent();
        if(currentEvent != null && (currentEvent instanceof LocatableEvent))
            ret = (LocatableEvent)currentEvent;
        return ret;
    }

    public ThreadReference getThread() {
        ThreadReference ret = null;
        LocatableEvent event = getEvent();
        if(event != null)
            ret = event.thread();
        return ret;
    }

    public List getFrames() throws IncompatibleThreadStateException {
        List ret = null;
        ThreadReference thread = getThread();
        if(thread != null)
            ret = thread.frames();
        return ret;
    }

    public Integer getFrameCount() throws IncompatibleThreadStateException {
        Integer ret = null;
        ThreadReference thread = getThread();
        if(thread != null)
            ret = new Integer(thread.frameCount());
        return ret;
    }

    public StackFrame getFrame(String index) throws IncompatibleThreadStateException {
        return index != null ? getFrame(new Integer(index)) : null;
    }

    public StackFrame getFrame(Integer index) throws IncompatibleThreadStateException {
        StackFrame ret = null;
        ThreadReference thread = getThread();
        if(thread != null)
            ret = thread.frame(index.intValue());
        return ret;
    }

    public Hashtable<String, Properties> getTableBreakpoint() {
        return tableBreakpoint;
    }

    public VirtualMachine getVirtualMachine() {
        return virtualMachine;
    }

    public void setVirtualMachine(VirtualMachine virtualMachine) {
        this.virtualMachine = virtualMachine;
    }

    public ThrdDebugEventQueue getThrdDebugEventQueue() {
        return thrdDebugEventQueue;
    }

    public void setThrdDebugEventQueue(ThrdDebugEventQueue thrdDebugEventQueue) {
        this.thrdDebugEventQueue = thrdDebugEventQueue;
    }

    public Event getCurrentEvent() {
        return currentEvent;
    }

    public void setCurrentEvent(Event currentEvent) {
        this.currentEvent = currentEvent;
    }

    public StepEvent getCurrentStepEvent() {
        return currentStepEvent;
    }

    public void setCurrentStepEvent(StepEvent currentStepEvent) {
        this.currentStepEvent = currentStepEvent;
    }

	public Map<String, String[]> getMapApplicationPath() {
		return mapApplicationPath;
	}

    public String getApplication() {
        return application;
    }

    public void setApplication(String application) {
        this.application = application;
    }

    public String getHostname() {
        return hostname;
    }

    public void setHostname(String hostname) {
        this.hostname = hostname;
    }

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }

    public int getTimeout() {
        return timeout;
    }

    public void setTimeout(int timeout) {
        this.timeout = timeout;
    }

	public String getMessageError() {
		return messageError;
	}

	public void setMessageError(String messageError) {
		this.messageError = messageError;
	}
}