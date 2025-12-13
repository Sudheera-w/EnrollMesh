package com.academix.backend.service.impl;

import com.academix.backend.dto.LoginRequest;
import com.academix.backend.dto.LoginResponse;
import com.academix.backend.dto.SignupRequest;
import com.academix.backend.entity.User;
import com.academix.backend.repository.UserRepository;
import com.academix.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    //  simple token generation
    private String generateToken(String email, String role) {
        return Base64.getEncoder().encodeToString((email + ":" + role).getBytes());
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        Optional<User> user = userRepository.findByEmail(request.getEmail());

        if (user.isEmpty())
            return null;

        if (!user.get().getPassword().equals(request.getPassword()))
            return null;

        String token = generateToken(user.get().getEmail(), user.get().getRole());
        return new LoginResponse(token, user.get().getRole());
    }

    @Override
    public String signup(SignupRequest request) {

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole("STUDENT"); // always "student" for signup
        user.setDepartment(request.getDepartment());

        userRepository.save(user);
        return "Signup successful";
    }
}
