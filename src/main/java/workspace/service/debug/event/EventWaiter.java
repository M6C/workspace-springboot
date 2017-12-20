// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   EventWaiter.java

package workspace.service.debug.event;

import com.sun.jdi.event.*;
import com.sun.jdi.request.EventRequest;
import java.util.EventListener;

public class EventWaiter
    implements EventListener
{

    public EventWaiter(EventRequest request, boolean shouldGo)
    {
        fRequest = request;
        fShouldGo = shouldGo;
    }

    public boolean accessWatchpoint(AccessWatchpointEvent event)
    {
        return handleEvent(event);
    }

    public boolean methodEntry(MethodEntryEvent event)
    {
        return handleEvent(event);
    }

    public boolean methodExit(MethodExitEvent event)
    {
        return handleEvent(event);
    }

    public boolean breakpoint(BreakpointEvent event)
    {
        return handleEvent(event);
    }

    public boolean classPrepare(ClassPrepareEvent event)
    {
        return handleEvent(event);
    }

    public boolean classUnload(ClassUnloadEvent event)
    {
        return handleEvent(event);
    }

    public boolean exception(ExceptionEvent event)
    {
        return handleEvent(event);
    }

    protected boolean handleEvent(Event event)
    {
        if(event.request() != null && event.request().equals(fRequest))
        {
            notifyEvent(event);
            return fShouldGo;
        } else
        {
            return true;
        }
    }

    public boolean modificationWatchpoint(ModificationWatchpointEvent event)
    {
        return handleEvent(event);
    }

    protected synchronized void notifyEvent(Event event)
    {
        notify();
        fEvent = event;
    }

    public boolean step(StepEvent event)
    {
        return handleEvent(event);
    }

    public boolean threadDeath(ThreadDeathEvent event)
    {
        return handleEvent(event);
    }

    public boolean threadStart(ThreadStartEvent event)
    {
        return handleEvent(event);
    }

    public boolean vmDeath(VMDeathEvent event)
    {
        if(fEvent == null)
        {
            notifyEvent(null);
            return true;
        } else
        {
            return handleEvent(event);
        }
    }

    public boolean vmDisconnect(VMDisconnectEvent event)
    {
        return handleEvent(event);
    }

    public synchronized Event waitEvent()
        throws InterruptedException
    {
        if(fEvent == null)
            wait();
        Event result = fEvent;
        fEvent = null;
        return result;
    }

    public synchronized Event waitEvent(long time)
        throws InterruptedException
    {
        if(fEvent == null)
            wait(time);
        Event result = fEvent;
        fEvent = null;
        return result;
    }

    protected EventRequest fRequest;
    protected boolean fShouldGo;
    protected Event fEvent;
}
