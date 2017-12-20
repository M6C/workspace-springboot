package org.cameleon.workspace.springboot.configuration;

import org.cameleon.workspace.springboot.filter.FilterAuthentification;
import org.cameleon.workspace.springboot.filter.FilterSecurity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InjectionPoint;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

@Configuration
//@EnableMBeanExport
public class ApplicationConfig {

    @Bean @Scope("prototype")
    public Logger logger(InjectionPoint ip){
        return LoggerFactory.getLogger(ip.getMember().getDeclaringClass());
    }

    @Bean
    public FilterRegistrationBean filterAuthentification() {

        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(new FilterAuthentification());
        registration.addUrlPatterns("/action.servlet/*");
        registration.addInitParameter("OutputName", "EventAuthentification");
        registration.addInitParameter("config_file", "/Xml/FrmWrk_Config.xml");
        registration.addInitParameter("servlet_file", "/Xml/ExtJs/FrmWrk_Servlet.xml");
        registration.setName("filterAuthentification");
        registration.setOrder(1);
        return registration;
    }

    @Bean
    public FilterRegistrationBean filterSecurity() {

        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(new FilterSecurity());
        registration.addUrlPatterns("/action.servlet/*");
        registration.addInitParameter("InputName", "EventAuthentification");
        registration.addInitParameter("DefaultUrl", "/action.servlet?event=Index");
        registration.setName("filterSecurity");
        registration.setOrder(2);
        return registration;
    }
}