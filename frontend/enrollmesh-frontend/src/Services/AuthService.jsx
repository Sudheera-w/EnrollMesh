import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

const AuthService = {
    login: (credentials) => axios.post(`${API_URL}/login`, credentials),
    signup: (userData) => axios.post(`${API_URL}/signup`, userData),
};

export default AuthService;
