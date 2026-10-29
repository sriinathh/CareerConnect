package com.careerconnect.util;

/**
 * Global application constants.
 */
public final class AppConstants {

    private AppConstants() {
        // Prevent instantiation
    }

    public static final String API_V1_PREFIX = "/api/v1";

    public static final String DEFAULT_PAGE_NUMBER = "0";
    public static final String DEFAULT_PAGE_SIZE = "10";
    public static final String DEFAULT_SORT_BY = "createdAt";
    public static final String DEFAULT_SORT_DIRECTION = "desc";

    public static final String ROLE_STUDENT = "ROLE_STUDENT";
    public static final String ROLE_RECRUITER = "ROLE_RECRUITER";
    public static final String ROLE_ADMIN = "ROLE_ADMIN";

    public static final String TOKEN_TYPE_BEARER = "Bearer";
    public static final String AUTH_HEADER = "Authorization";
}
