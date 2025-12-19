import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import StudentsPage from "../pages/StudentsPage.jsx";
import AddStudentPage from "../pages/AddStudentPage.jsx";
import NavBar from "../components/NavBar";
import UpdateStudentPage from "../pages/UpdateStudentPage.jsx";
import ModulesPage from "../pages/ModulesPage.jsx";
import AddModulePage from "../pages/AddModulePage.jsx";
import EditModulePage from "../pages/EditModulePage.jsx";
import EnrollmentPage from "../pages/EnrollmentPage.jsx";
import EnrollmentModulesPage from "../pages/EnrollmentModulesPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import SignupPage from "../pages/SignupPage.jsx";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminRoute from "../components/AdminRoute";
import PublicRoute from "../components/PublicRoute";

function AppRouter() {
    return (
        <BrowserRouter>
            <div style={{width: "100%", minHeight: "100vh"}}>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<HomePage />} />

                    <Route 
                        path="/login" 
                        element={
                            <PublicRoute>
                                <LoginPage />
                            </PublicRoute>
                        } 
                    />
                    <Route 
                        path="/signup" 
                        element={
                            <PublicRoute>
                                <SignupPage />
                            </PublicRoute>
                        } 
                    />
                    
                    {/* Protected routes- that require authentication */}
                    <Route 
                        path="/my-modules" 
                        element={
                            <ProtectedRoute>
                                <EnrollmentModulesPage />
                            </ProtectedRoute>
                        } 
                    />
                    
                    {/* Admin-only routes */}
                    <Route 
                        path="/Students" 
                        element={
                            <AdminRoute>
                                <StudentsPage/>
                            </AdminRoute>
                        }
                    />
                    <Route 
                        path="/Students/add" 
                        element={
                            <AdminRoute>
                                <AddStudentPage />
                            </AdminRoute>
                        } 
                    />
                    <Route 
                        path="/edit-student/:id" 
                        element={
                            <AdminRoute>
                                <UpdateStudentPage />
                            </AdminRoute>
                        } 
                    />
                    <Route 
                        path="/modules" 
                        element={
                            <AdminRoute>
                                <ModulesPage/>
                            </AdminRoute>
                        }
                    />
                    <Route 
                        path="/modules/add" 
                        element={
                            <AdminRoute>
                                <AddModulePage/>
                            </AdminRoute>
                        }
                    />
                    <Route 
                        path="/edit-module/:id" 
                        element={
                            <AdminRoute>
                                <EditModulePage/>
                            </AdminRoute>
                        }
                    />
                    <Route 
                        path="/enrollments" 
                        element={
                            <AdminRoute>
                                <EnrollmentPage />
                            </AdminRoute>
                        } 
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default AppRouter;
