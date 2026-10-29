package com.careerconnect;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * Basic application initialization test suite.
 */
class CareerConnectApplicationTests {

    @Test
    @DisplayName("Application class should be loadable by JVM")
    void applicationClassLoads() {
        CareerConnectApplication application = new CareerConnectApplication();
        assertNotNull(application, "CareerConnect application instance should not be null");
    }
}
