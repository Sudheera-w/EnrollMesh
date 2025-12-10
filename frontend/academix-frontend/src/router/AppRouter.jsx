import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import StudentsPage from "../pages/StudentsPage.jsx";
import AddStudentPage from "../pages/AddStudentPage.jsx";
import Navbar from "../components/Navbar";
import UpdateStudentPage from "../pages/UpdateStudentPage.jsx";
import ModulesPage from "../pages/ModulesPage.jsx";
import AddModulePage from "../pages/AddModulePage.jsx";
import EditModulePage from "../pages/EditModulePage.jsx";
import EnrollmentPage from "../pages/EnrollmentPage.jsx";

function AppRouter() {
    return (
        <BrowserRouter>
            <div style={{width: "100%", minHeight: "100vh"}}>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/Students" element={<StudentsPage/>}/>
                    <Route path="/Students/add" element={<AddStudentPage />} />
                    <Route path="/edit-student/:id" element={<UpdateStudentPage />} />
                    <Route path="/modules" element={<ModulesPage/>}/>
                    <Route path="/modules/add" element={<AddModulePage/>}/>
                    <Route path="/edit-module/:id" element={<EditModulePage/>}/>
                    <Route path="/enrollments" element={<EnrollmentPage />} />

                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default AppRouter;
