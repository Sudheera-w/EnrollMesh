package com.academix.backend.service;

import com.academix.backend.dto.LoginRequest;
import com.academix.backend.dto.LoginResponse;
import com.academix.backend.dto.SignupRequest;

public interface AuthService {
    LoginResponse login(LoginRequest request);
    String signup(SignupRequest request);
}
