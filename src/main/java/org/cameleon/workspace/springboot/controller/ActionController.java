package org.cameleon.workspace.springboot.controller;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.File;
import java.util.Arrays;

@Controller
@EnableAutoConfiguration
public class ActionController {

    @RequestMapping("/action.servlet")
    @ResponseBody
    public String action(String event) {

        final StringBuilder ret = new StringBuilder("Hello World! ").append(event);
        File file = new File(getClass().getResource("/xml").getFile());
        File[] files = file.listFiles();

        Arrays.stream(files).forEach((p) -> {
            ret.append("\r\n" + p.getName());
        });

        return ret.toString();
    }
}