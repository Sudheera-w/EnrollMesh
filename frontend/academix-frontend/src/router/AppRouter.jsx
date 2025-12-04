import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import StudentsPage from "../pages/StudentsPage.jsx";
import AddStudentPage from "../pages/AddStudentPage.jsx";
import Navbar from "../components/Navbar";

function AppRouter() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/Students" element={<StudentsPage/>}/>
                <Route path="/Students/add" element={<AddStudentPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
