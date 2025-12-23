import { useState, useEffect } from "react";
import StudentService from "../Services/StudentService.jsx";
import ModuleService from "../Services/ModuleService.jsx";
import axios from "axios";

const ENROLL_URL = `${import.meta.env.VITE_API_URL}/api/enrollments`;

function EnrollmentPage() {
    const [enrollmentData, setEnrollmentData] = useState({
        students: [],
        modules: [],
        selectedStudent: null,
        enrolledModules: []
    });

    // Fetch all students and modules
    useEffect(() => {
        StudentService.getAllStudents()
            .then(res => setEnrollmentData(prev => ({ ...prev, students: res.data })))
            .catch(err => console.error("Error fetching students:", err));

        ModuleService.getAllModules()
            .then(res => setEnrollmentData(prev => ({ ...prev, modules: res.data })))
            .catch(err => console.error("Error fetching modules:", err));
    }, []);

    // Fetch enrolled modules when selected student changes
    useEffect(() => {
        const student = enrollmentData.selectedStudent;
        if (student) {
            axios.get(`${ENROLL_URL}/student/${student.id}`)
                .then(res => setEnrollmentData(prev => ({ ...prev, enrolledModules: res.data })))
                .catch(err => console.error("Error fetching enrollments:", err));
        } else {
            setEnrollmentData(prev => ({ ...prev, enrolledModules: [] }));
        }
    }, [enrollmentData.selectedStudent]);

    const handleCheckboxChange = (module, checked) => {
        const student = enrollmentData.selectedStudent;
        if (!student) return;

        if (checked) {
            axios.post(`${ENROLL_URL}/${student.id}/${module.id}`)
                .then(() => setEnrollmentData(prev => ({
                    ...prev,
                    enrolledModules: [...prev.enrolledModules, module]
                })))
                .catch(err => console.error("Error enrolling module:", err));
        } else {
            axios.delete(`${ENROLL_URL}/${student.id}/${module.id}`)
                .then(() => setEnrollmentData(prev => ({
                    ...prev,
                    enrolledModules: prev.enrolledModules.filter(m => m.id !== module.id)
                })))
                .catch(err => console.error("Error unenrolling module:", err));
        }
    };

    const isModuleEnrolled = (moduleId) => {
        return enrollmentData.enrolledModules.some(m => m.id === moduleId);
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "80px",
            width: "100%",
            minHeight: "100vh",
            backgroundColor: "#cbcdcd",
            boxSizing: "border-box",
        }}>
            <h2 style={{ fontSize: "35px",marginBottom: "20px", color: "#333" }}>Manage Student Enrollments</h2>

            <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                <label style={{ fontWeight: "bold", color: "#555" }}>Select Student: </label>
                <select
                    value={enrollmentData.selectedStudent ? enrollmentData.selectedStudent.id : ""}
                    onChange={e => {
                        const student = enrollmentData.students.find(s => s.id === Number(e.target.value));
                        setEnrollmentData(prev => ({ ...prev, selectedStudent: student }));
                    }}
                    style={{
                        padding: "10px",
                        fontSize: "16px",
                        borderRadius: "4px",
                        border: "2px solid #ccc",
                        transition: "border-color 0.3s",
                        minWidth: "250px",
                        color: "black",
                        backgroundColor: "white"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#2852bc"}
                    onBlur={(e) => e.target.style.borderColor = "#ccc"}
                >
                    <option value="">-- Select --</option>
                    {enrollmentData.students.map(s => (
                        <option key={s.id} value={s.id}>
                            {s.name} ({s.department})
                        </option>
                    ))}
                </select>
            </div>

            {enrollmentData.selectedStudent && (
                <table
                    border="1"
                    cellPadding="10"
                    style={{
                        marginTop: "20px",
                        minWidth: "600px",
                        borderCollapse: "collapse",
                        backgroundColor: "#fdfdfd",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        textAlign: "center",
                        borderColor: "#ddd"
                    }}
                >
                    <thead style={{ backgroundColor: "#2852bc", color: "#ffffff" }}>
                    <tr>
                        <th>Module Name</th>
                        <th>Code</th>
                        <th>Credits</th>
                        <th>Department</th>
                        <th>Enrolled</th>
                    </tr>
                    </thead>
                    <tbody style={{ color: "black" }}>
                    {enrollmentData.modules.map(module => (
                        <tr key={module.id} style={{ borderBottom: "1px solid #ddd" }}>
                            <td>{module.name}</td>
                            <td>{module.code}</td>
                            <td>{module.credits}</td>
                            <td>{module.department}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={isModuleEnrolled(module.id)}
                                    onChange={e => handleCheckboxChange(module, e.target.checked)}
                                    style={{ width: "18px", height: "18px", cursor: "pointer" }}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default EnrollmentPage;
