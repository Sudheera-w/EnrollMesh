import { useState, useEffect } from "react";
import StudentService from "../services/StudentService";
import ModuleService from "../services/ModuleService";
import axios from "axios";

const ENROLL_URL = "http://localhost:8080/api/enrollments";

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
            paddingTop: "50px",
            width: "100%",
            margin: 0
        }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Manage Student Enrollments</h2>

            <div style={{ marginBottom: "20px" }}>
                <label>Select Student: </label>
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
                        transition: "border-color 0.8s"
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
                <table border="2" cellPadding="10" style={{ margin: "20px auto", minWidth: "600px" }}>
                    <thead>
                    <tr>
                        <th>Module Name</th>
                        <th>Code</th>
                        <th>Credits</th>
                        <th>Department</th>
                        <th>Enrolled</th>
                    </tr>
                    </thead>
                    <tbody>
                    {enrollmentData.modules.map(module => (
                        <tr key={module.id}>
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
