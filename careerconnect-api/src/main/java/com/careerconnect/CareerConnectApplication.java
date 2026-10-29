package com.careerconnect;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;

import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * CareerConnect — Main Spring Boot Application Entry Point.
 * 
 * Provides an enterprise-grade job portal and campus placement platform
 * built with Spring Boot 3, Spring Security, JPA/Hibernate, and PostgreSQL.
 */
@SpringBootApplication
public class CareerConnectApplication {

    private static final Logger log = LoggerFactory.getLogger(CareerConnectApplication.class);

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(CareerConnectApplication.class);
        Environment env = app.run(args).getEnvironment();
        logApplicationStartup(env);
    }

    private static void logApplicationStartup(Environment env) {
        String protocol = "http";
        if (env.getProperty("server.ssl.key-store") != null) {
            protocol = "https";
        }
        String serverPort = env.getProperty("server.port", "8080");
        String contextPath = env.getProperty("server.servlet.context-path", "/");
        String hostAddress = "localhost";
        try {
            hostAddress = InetAddress.getLocalHost().getHostAddress();
        } catch (UnknownHostException e) {
            log.warn("The host name could not be determined, using `localhost` as fallback");
        }

        log.info("""
                
                --------------------------------------------------------------------------------
                \tApplication '{}' is running! Access URLs:
                \tLocal:      {}://localhost:{}{}
                \tExternal:   {}://{}:{}{}
                \tProfile(s): {}
                \tHealth:     {}://localhost:{}{}api/v1/health
                \tActuator:   {}://localhost:{}{}actuator/health
                --------------------------------------------------------------------------------
                """,
                env.getProperty("spring.application.name", "careerconnect-api"),
                protocol, serverPort, contextPath,
                protocol, hostAddress, serverPort, contextPath,
                env.getActiveProfiles().length == 0 ? "default" : String.join(", ", env.getActiveProfiles()),
                protocol, serverPort, contextPath,
                protocol, serverPort, contextPath
        );
    }
}
