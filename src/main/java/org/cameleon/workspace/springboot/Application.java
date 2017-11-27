package org.cameleon.workspace.springboot;

import org.cameleon.workspace.springboot.filter.FilterAuthentification;
import org.cameleon.workspace.springboot.filter.FilterSecurity;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	public FilterRegistrationBean filterAuthentification() {

	    FilterRegistrationBean registration = new FilterRegistrationBean();
	    registration.setFilter(new FilterAuthentification());
//	    registration.addUrlPatterns("/url/*");

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
//	    registration.addUrlPatterns("/url/*");
	    registration.addInitParameter("InputName", "EventAuthentification");
	    registration.addInitParameter("DefaultUrl", "/action.servlet?event=Index");
	    registration.setName("filterSecurity");
	    registration.setOrder(2);
	    return registration;
	} 
}
