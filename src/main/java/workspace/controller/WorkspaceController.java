package workspace.controller;

import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@Controller
//@RequestMapping("/workspace")
@EnableAutoConfiguration
public class WorkspaceController {

    @RequestMapping("/hello")
    @ResponseBody
    String home() {
        return "Hello World!";
    }

    @RequestMapping("/index")
    public void home(HttpServletResponse httpServletResponse) {
        String url = "http://localhost:7070/Workspace/action.servlet?event=Index";
        httpServletResponse.setHeader("Location", url);
    }
}