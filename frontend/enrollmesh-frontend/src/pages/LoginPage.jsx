import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../Services/AuthService';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await AuthService.login({ email, password });

            // Check if login was successful (backend returns LoginResponse with token and role)
            if (response.data && response.data.token && response.data.role) {
                // Store token, role, and email in localStorage for User entity reference
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.role);
                localStorage.setItem('email', email);

                // Navigate to home or dashboard based on role
                navigate('/');
            } else {
                // Backend returned null or invalid response
                setError('Invalid email or password. Please check your credentials and try again.');
            }
        } catch (err) {
            // Handle various error scenarios
            if (err.response) {
                // Backend returned an error response
                if (err.response.status === 200 && (!err.response.data || err.response.data === null)) {
                    // Backend returned null (user not found or wrong password)
                    setError('Invalid email or password. Please check your credentials and try again.');
                } else {
                    setError(err.response.data?.message || 'Login failed. Please try again.');
                }
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f4f7f6',
            paddingTop: '80px'
        }}>
            <div style={{
                backgroundColor: '#fff',
                padding: '40px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                width: '100%',
                maxWidth: '400px'
            }}>
                <h2 style={{
                    marginBottom: '30px',
                    color: '#2852bc',
                    textAlign: 'center',
                    fontSize: '28px'
                }}>
                    Login
                </h2>

                {error && (
                    <div style={{
                        backgroundColor: '#fee',
                        color: '#c33',
                        padding: '12px',
                        borderRadius: '4px',
                        marginBottom: '20px',
                        fontSize: '14px'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            color: '#333',
                            fontWeight: '500'
                        }}>
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '16px',
                                boxSizing: 'border-box'
                            }}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            color: '#333',
                            fontWeight: '500'
                        }}>
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '16px',
                                boxSizing: 'border-box'
                            }}
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: loading ? '#ccc' : '#2852bc',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            marginBottom: '20px'
                        }}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', color: '#666' }}>
                    Don't have an account?{' '}
                    <Link
                        to="/signup"
                        style={{
                            color: '#2852bc',
                            textDecoration: 'none',
                            fontWeight: '500'
                        }}
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
