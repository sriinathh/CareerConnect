package com.careerconnect.security;

import com.careerconnect.entity.Role;
import com.careerconnect.entity.User;
import com.careerconnect.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service loading UserPrincipal from database by email for Spring Security.
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        List<String> roleNames = user.getRoles().stream()
                .map(Role::getName)
                .toList();

        return UserPrincipal.create(
                user.getId(),
                user.getEmail(),
                user.getPasswordHash(),
                roleNames,
                user.isActive()
        );
    }
}
