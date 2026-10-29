# =============================================================================
# Stage 1: Build Application with Maven
# =============================================================================
FROM maven:3.9.9-eclipse-temurin-17-alpine AS builder

WORKDIR /build

# Copy pom.xml and download dependencies (layer caching)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and package application
COPY src ./src
RUN mvn clean package -DskipTests

# =============================================================================
# Stage 2: Minimal Production JRE Runtime
# =============================================================================
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Create non-root system group and user for security
RUN addgroup -S spring && adduser -S spring -G spring

# Create uploads directory with appropriate permissions
RUN mkdir -p /app/uploads/resumes && chown -R spring:spring /app

# Copy executable jar from builder stage
COPY --from=builder /build/target/careerconnect-api-*.jar /app/careerconnect-api.jar

# Switch to non-root user
USER spring:spring

EXPOSE 8080

# Configure JVM memory flags and container awareness
ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0"

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/careerconnect-api.jar"]
