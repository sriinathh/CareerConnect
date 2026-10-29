package com.careerconnect.config;

import com.careerconnect.entity.Job;
import com.careerconnect.entity.RecruiterProfile;
import com.careerconnect.entity.Role;
import com.careerconnect.entity.StudentProfile;
import com.careerconnect.entity.User;
import com.careerconnect.repository.JobRepository;
import com.careerconnect.repository.RecruiterProfileRepository;
import com.careerconnect.repository.RoleRepository;
import com.careerconnect.repository.StudentProfileRepository;
import com.careerconnect.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

/**
 * Startup Data Seeder.
 * Ensures base roles, demo test users (Student, Recruiter, Admin), and sample jobs exist.
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final RecruiterProfileRepository recruiterProfileRepository;
    private final JobRepository jobRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(
            RoleRepository roleRepository,
            UserRepository userRepository,
            StudentProfileRepository studentProfileRepository,
            RecruiterProfileRepository recruiterProfileRepository,
            JobRepository jobRepository,
            PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.recruiterProfileRepository = recruiterProfileRepository;
        this.jobRepository = jobRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        log.info("Checking CareerConnect initial data seed...");

        // 1. Ensure Roles
        Role studentRole = getOrCreateRole("ROLE_STUDENT", "Student applicant role");
        Role recruiterRole = getOrCreateRole("ROLE_RECRUITER", "Recruiter and employer role");
        Role adminRole = getOrCreateRole("ROLE_ADMIN", "Placement cell administrator role");

        // 2. Seed Admin User
        if (!userRepository.existsByEmail("admin@careerconnect.org")) {
            User admin = new User("admin@careerconnect.org", passwordEncoder.encode("Password@123"), "System", "Admin", "+91 99000 00001");
            admin.setRoles(Set.of(adminRole));
            userRepository.save(admin);
            log.info("Seeded Demo Admin: admin@careerconnect.org / Password@123");
        }

        // 3. Seed Recruiter & Company
        RecruiterProfile recruiterProfile = null;
        if (!userRepository.existsByEmail("recruiter@techcorp.com")) {
            User recruiterUser = new User("recruiter@techcorp.com", passwordEncoder.encode("Password@123"), "Priya", "Sharma", "+91 99000 00002");
            recruiterUser.setRoles(Set.of(recruiterRole));
            User savedRecruiter = userRepository.save(recruiterUser);

            recruiterProfile = new RecruiterProfile(savedRecruiter, "TechCorp Global", "University Talent Director", "Bengaluru, India");
            recruiterProfile.setCompanyWebsite("https://techcorpglobal.com");
            recruiterProfile.setVerificationStatus("VERIFIED");
            recruiterProfile.setIndustry("Software Engineering & Cloud Computing");
            recruiterProfile.setCompanyDescription("Leading multi-national cloud infrastructure and enterprise software engineering enterprise.");
            recruiterProfile = recruiterProfileRepository.save(recruiterProfile);
            log.info("Seeded Demo Recruiter: recruiter@techcorp.com / Password@123");
        } else {
            User recruiterUser = userRepository.findByEmail("recruiter@techcorp.com").orElse(null);
            if (recruiterUser != null) {
                recruiterProfile = recruiterProfileRepository.findByUserId(recruiterUser.getId()).orElse(null);
            }
        }

        // 4. Seed Student & Profile
        if (!userRepository.existsByEmail("student@college.edu")) {
            User studentUser = new User("student@college.edu", passwordEncoder.encode("Password@123"), "Arun", "Kumar", "+91 99000 00003");
            studentUser.setRoles(Set.of(studentRole));
            User savedStudent = userRepository.save(studentUser);

            StudentProfile studentProfile = new StudentProfile(savedStudent, "1CC22CS045", "Computer Science & Engineering", 2026, 8.85);
            studentProfile.setBio("Passionate Full-Stack Java and Cloud developer with strong algorithms and distributed systems background.");
            studentProfile.setSkills("Java, Spring Boot, React, PostgreSQL, Docker, Git, AWS");
            studentProfile.setLinkedinUrl("https://linkedin.com/in/arun-kumar-cse");
            studentProfile.setGithubUrl("https://github.com/arun-kumar-cse");
            studentProfileRepository.save(studentProfile);
            log.info("Seeded Demo Student: student@college.edu / Password@123");
        }

        // 5. Seed Sample Jobs
        if (recruiterProfile != null && jobRepository.count() == 0) {
            Job job1 = new Job(recruiterProfile, "Graduate Software Engineer (Java / Backend)", 
                    "We are hiring graduating 2026 CSE students for our core platform engineering team in Bengaluru. Build high-throughput microservices using Java 21, Spring Boot, and PostgreSQL.",
                    "FULL_TIME", "Bengaluru (Hybrid)");
            job1.setSalaryMin(new BigDecimal("1200000"));
            job1.setSalaryMax(new BigDecimal("1600000"));
            job1.setWorkplaceType("HYBRID");
            job1.setExperienceLevel("ENTRY_LEVEL");
            job1.setRequiredSkills("Java 21, Spring Boot, REST APIs, PostgreSQL, Docker");
            job1.setTotalOpenings(5);
            job1.setApplicationDeadline(LocalDate.now().plusMonths(2));
            jobRepository.save(job1);

            Job job2 = new Job(recruiterProfile, "Cloud Infrastructure & DevOps Intern", 
                    "6-month paid internship leading to full-time placement. Hands-on experience with Docker, Kubernetes, CI/CD pipelines, and cloud security architectures.",
                    "INTERNSHIP", "Bengaluru (On-Site)");
            job2.setSalaryMin(new BigDecimal("40000"));
            job2.setSalaryMax(new BigDecimal("60000"));
            job2.setWorkplaceType("ON_SITE");
            job2.setExperienceLevel("INTERNSHIP");
            job2.setRequiredSkills("Linux, Docker, Python, Bash, AWS");
            job2.setTotalOpenings(3);
            job2.setApplicationDeadline(LocalDate.now().plusMonths(1));
            jobRepository.save(job2);

            log.info("Seeded 2 initial verified campus job postings!");
        }

        log.info("CareerConnect initial data seeding completed successfully.");
    }

    private Role getOrCreateRole(String name, String description) {
        return roleRepository.findByName(name)
                .orElseGet(() -> roleRepository.save(new Role(name, description)));
    }
}
