import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div style={{
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            color: '#333',
            backgroundColor: '#f4f7f6',
            margin: 0,
            padding: '80px 0 0', // Adjusted padding to account for the fixed NavBar
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
        }}>
            <main style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '40px 20px'
            }}>
                <h2 style={{ fontSize: '48px', color: '#333', marginBottom: '20px' }}>
                    Effortless Management, Seamless Learning
                </h2>
                <p style={{ fontSize: '20px', maxWidth: '700px', marginBottom: '40px', color: '#555' }}>
                    Welcome to EnrollMesh, the all-in-one platform designed for both administrators and students. Manage with precision, learn with focus.
                </p>
                <Link to="/signup" style={{
                    textDecoration: 'none',
                    color: '#fff',
                    backgroundColor: '#28a745',
                    padding: '15px 30px',
                    borderRadius: '5px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                    Get Started
                </Link>
            </main>

            <section style={{
                padding: '50px 20px',
                backgroundColor: '#fff',
                textAlign: 'center'
            }}>
                <h3 style={{ fontSize: '32px', color: '#333', marginBottom: '40px' }}>Key Features</h3>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '30px',
                    flexWrap: 'wrap'
                }}>
                    <div style={{
                        maxWidth: '300px',
                        padding: '20px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        borderRadius: '8px',
                        backgroundColor: '#f9f9f9'
                    }}>
                        <h4 style={{ fontSize: '22px', color: '#0056b3' }}>Admin: Full Control</h4>
                        <p style={{ color: '#666' }}>Administrators have complete access to manage student records, create new modules, and oversee all enrollments.</p>
                    </div>
                    <div style={{
                        maxWidth: '300px',
                        padding: '20px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        borderRadius: '8px',
                        backgroundColor: '#f9f9f9'
                    }}>
                        <h4 style={{ fontSize: '22px', color: '#0056b3' }}>Student: My Modules</h4>
                        <p style={{ color: '#666' }}>Students can log in to a personalized dashboard to view only the modules they are enrolled in.</p>
                    </div>
                </div>
            </section>

            <footer style={{
                backgroundColor: '#333',
                color: '#fff',
                textAlign: 'center',
                padding: '20px',
                marginTop: 'auto'
            }}>
                <p>&copy; {new Date().getFullYear()} EnrollMesh. All Rights Reserved.</p>
            </footer>
        </div>
    );
}

export default HomePage;