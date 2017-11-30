package org.cameleon.workspace.springboot.configuration;

import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
@EnableWebMvc
@EnableCaching
public class MvcConfiguration extends WebMvcConfigurerAdapter{

    @Bean
    public CacheManager cacheManager(){
        return new ConcurrentMapCacheManager("refData");
    }

    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
//        registry.jsp().prefix("/Web/Page/").suffix(".jsp");
    	registry.jsp().prefix("").suffix("");
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/logout-success").setViewName("logout-success");
        registry.addViewController("/login").setViewName("login");
    }

//    @Bean
//    public ResourceBundleMessageSource messageSource() {
//        ResourceBundleMessageSource source =new ResourceBundleMessageSource();
//        source.setBasenames("uiMessages", "i18n/applicationMessages");
//        return source;
//    }


    }