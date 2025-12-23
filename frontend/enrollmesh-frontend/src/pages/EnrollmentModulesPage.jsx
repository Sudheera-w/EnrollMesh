import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentService from "../Services/StudentService";

const ENROLL_URL =`${import.meta.env.VITE_API_URL}/api/enrollments`;

function EnrollmentModulesPage() {
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadEnrolledModules = async () => {
            try {
                const email = localStorage.getItem("email");
                const role = localStorage.getItem("role");

                if (!email || !role || role.toLowerCase() !== "student") {
                    setError("You must be logged in as a student to view enrolled modules.");
                    setLoading(false);
                    return;
                }

                // to find the current student by email
                const studentsRes = await StudentService.getAllStudents();
                const currentStudent = studentsRes.data.find(
                    (s) => s.email && s.email.toLowerCase() === email.toLowerCase()
                );

                if (!currentStudent) {
                    setError("Student record not found for the logged-in user.");
                    setLoading(false);
                    return;
                }

                // Fetch enrolled modules for this student
                const modulesRes = await axios.get(`${ENROLL_URL}/student/${currentStudent.id}`);
                setModules(modulesRes.data || []);
            } catch (err) {
                console.error("Error loading enrolled modules:", err);
                setError("Failed to load enrolled modules. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        loadEnrolledModules();
    }, []);

    return (

        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "80px",
                width: "100%",
                minHeight: "100vh",
                backgroundColor: "#f4f7f6",
                boxSizing: "border-box",
            }}
        >
            <h2 style={{ fontSize: "30px",marginBottom: "20px", color: "#333" }}>My Enrolled Modules</h2>

            {loading && (
                <p style={{ color: "#555" }}>Loading your enrolled modules...</p>
            )}

            {!loading && error && (
                <div
                    style={{
                        backgroundColor: "#fee",
                        color: "#c33",
                        padding: "12px 16px",
                        borderRadius: "4px",
                        maxWidth: "600px",
                        textAlign: "center",
                    }}
                >
                    {error}
                </div>
            )}

            {!loading && !error && modules.length === 0 && (
                <p style={{ color: "#555" }}>You are not enrolled in any modules yet.</p>
            )}

            {!loading && !error && modules.length > 0 && (
                <table
                    border="2"
                    cellPadding="10"
                    style={{
                        marginTop: "20px",
                        minWidth: "600px",
                        borderCollapse: "collapse",
                        backgroundColor: "#676767",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    }}
                >
                    <thead style={{ backgroundColor: "#2852bc", color: "#ffffff" }}>
                    <tr>
                        <th>Module Name</th>
                        <th>Code</th>
                        <th>Credits</th>
                        <th>Department</th>
                    </tr>
                    </thead>
                    <tbody>
                    {modules.map((module) => (
                        <tr key={module.id}>
                            <td>{module.name}</td>
                            <td>{module.code}</td>
                            <td>{module.credits}</td>
                            <td>{module.department}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default EnrollmentModulesPage;

