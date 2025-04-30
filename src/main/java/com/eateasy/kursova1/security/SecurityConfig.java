package com.eateasy.kursova1.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Вимикаємо CSRF (актуально для REST API)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/", "/main.html", "/menu.html", "/cart.html", "/scripts/**", "/styles/**", "/image/**", "/static/**", "/favicon.ico"
                        ).permitAll()

                        .requestMatchers(HttpMethod.GET, "/api/menu/**").permitAll() // Меню — публічно
                        .requestMatchers("/api/admin/**", "/admin.html", "/scripts/admin.js").hasRole("ADMIN") // Адмін
                        .requestMatchers(HttpMethod.POST, "/api/orders").permitAll()


                        .anyRequest().authenticated()

                )
                .httpBasic(withDefaults()) // ✅ Вмикає Basic Auth (працює з Postman)
                .formLogin(form -> form.disable()); // ❌ Вимикає HTML-форму входу
        return http.build();
    }

    // Тестові користувачі в пам'яті
    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder passwordEncoder) {
        var user = User.withUsername("user")
                .password(passwordEncoder.encode("userpass"))
                .roles("USER")
                .build();

        var admin = User.withUsername("admin")
                .password(passwordEncoder.encode("adminpass"))
                .roles("ADMIN")
                .build();

        return new InMemoryUserDetailsManager(user, admin);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
