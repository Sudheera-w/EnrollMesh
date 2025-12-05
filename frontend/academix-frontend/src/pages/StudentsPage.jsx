import {useEffect,useState} from "react";
import StudentService from "../Services/StudentService.jsx";

function StudentsPage(){

    const [students,setStudents]= useState([])

    useEffect(()=>{
        StudentService.getAllStudents().then((response)=>{setStudents(response.data);})
        .catch((error)=>{console.error("Error fetching students:",error)});
    },[])
    return(
        <div style={{display:"flex",alignItems: "center",marginTop:"50px",flexDirection: "column"}}>
            <h1 style={{ textAlign: "center",marginBottom:"20px"}}>Students</h1>
            <table
            border="2"
            cellPadding="10"
            style={{
                width:"100%",
                borderCollapse:"collapse",
                textAlign:"center",
                background:"#2852bc",
                marginTop:"20px",
            }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Year</th>
                    </tr>
                </thead>
                <tbody>
                {students.map((student)=>(
                    <tr key = {student.id}>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.department}</td>
                        <td>{student.year}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default StudentsPage;