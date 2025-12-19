import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import StudentService from "../Services/StudentService.jsx";

function UpdateStudentPage(){

    const { id } = useParams();

    const navigate = useNavigate();

    const[student,setStudent]= useState({
        name:"",
        email:"",
        department:"",
        year:2000,
    });

    const handleChange=(e)=>{
        setStudent({
            ...student,
            [e.target.name]:e.target.value,
        });
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        StudentService.updateStudent(id,student)
            .then(()=>{
                alert("Student successfully updated");
                navigate("/Students")
            }).catch((error)=>{
            console.error("Error adding student:",error);
        });
    };

    useEffect(() => {
        StudentService.getStudentById(id)
            .then((response) => {
                setStudent(response.data)
            })
            .catch((error)=>{
                console.error("Error fetching student:",error);
            })
    }, [id]);

    return (
        <div style={{
            display:"flex",
            alignItems: "center",
            flexDirection: "column",
            paddingTop: "50px",
            width: "100%",
            margin: 0
        }}>
            <h2 style={{ textAlign: "center", marginBottom:"10px", width: "100%", marginTop: "20px"}}>Update Student</h2>
            <form onSubmit={handleSubmit} style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "90%",
                maxWidth: "450px",
                padding: "30px",
            }}>
                <label style={{ marginBottom: "-15px" }}>Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={student.name}
                    onChange={handleChange}
                    required
                    style={{
                        padding: "12px",
                        fontSize: "16px",
                        borderRadius: "4px",
                        border: "2px solid #ccc",
                        transition: "border-color 0.8s",
                        marginBottom:"-5px"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#2852bc"}
                    onBlur={(e) => e.target.style.borderColor = "#ccc"}
                />
                <label style={{ marginBottom: "-15px" }}>Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={student.email}
                    onChange={handleChange}
                    required
                    style={{
                        padding: "12px",
                        fontSize: "16px",
                        borderRadius: "4px",
                        border: "2px solid #ccc",
                        transition: "border-color 0.8s",
                        marginBottom:"-5px"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#2852bc"}
                    onBlur={(e) => e.target.style.borderColor = "#ccc"}
                />
                <label style={{ marginBottom: "-15px" }}>Department</label>
                <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={student.department}
                    onChange={handleChange}
                    required
                    style={{
                        padding: "12px",
                        fontSize: "16px",
                        borderRadius: "4px",
                        border: "2px solid #ccc",
                        transition: "border-color 0.8s",
                        marginBottom:"-5px"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#2852bc"}
                    onBlur={(e) => e.target.style.borderColor = "#ccc"}
                />
                <label style={{ marginBottom: "-15px" }}>Year</label>
                <input
                    type="number"
                    name="year"
                    placeholder="Year"
                    value={student.year}
                    onChange={handleChange}
                    required
                    style={{
                        padding: "12px",
                        fontSize: "16px",
                        borderRadius: "4px",
                        border: "2px solid #ccc",
                        transition: "border-color 0.8s",
                        marginBottom:"-5px"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#2852bc"}
                    onBlur={(e) => e.target.style.borderColor = "#ccc"}
                />
                <button
                    type="submit"
                    style={{
                        padding: "14px",
                        fontSize: "18px",
                        fontWeight: "bold",
                        borderRadius: "4px",
                        background: "#0bc547",
                        color: "white",
                        cursor: "pointer",
                        transition: "background 0.3s",
                        marginTop: "10px",
                        width: "50%",
                        maxWidth: "400px",
                        alignSelf: "center",
                    }}
                    onMouseEnter={(e) => e.target.style.background = "#0bc447"}
                    onMouseLeave={(e) => e.target.style.background = "#016c25"}
                >
                    Update Student
                </button>
            </form>
        </div>
    )
}

export default UpdateStudentPage;