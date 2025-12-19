import { Link, useLocation, useNavigate } from "react-router-dom";

function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    const isAdmin = role && role.toLowerCase() === "admin";
    const isStudent = role && role.toLowerCase() === "student";

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
        navigate("/login");
    };

    const linkStyle = {
        textDecoration: "none",
        color: "#333",
        padding: "10px 20px",
        borderRadius: "4px",
        transition: "all 0.3s",
        fontWeight: "500",
        fontSize: "16px",
        whiteSpace: "nowrap",
    };

    const activeLinkStyle = {
        ...linkStyle,
        background: "#2852bc",
        color: "white",
    };

    return (
        <nav
            style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "5px 30px",
                background: "#ffffff",
                position: "fixed",
                width: "100%",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                borderBottom: "1px solid #e0e0e0",
                justifyContent: "space-between",
                boxSizing: "border-box",
            }}
        >
            <Link
                to="/"
                style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#2852bc",
                    textDecoration: "none",
                }}
            >
                EnrollMesh
            </Link>
            <div style={{ marginLeft: "auto", display: "flex", gap: "10px", alignItems: "center" }}>
                {isAdmin && (
                    <>
                        <Link
                            to="/"
                            style={location.pathname === "/" ? activeLinkStyle : linkStyle}
                            onMouseEnter={(e) => {
                                if (location.pathname !== "/") {
                                    e.target.style.background = "#f0f0f0";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (location.pathname !== "/") {
                                    e.target.style.background = "transparent";
                                }
                            }}
                        >
                            Home
                        </Link>
                        <Link
                            to="/Students"
                            style={location.pathname === "/Students" ? activeLinkStyle : linkStyle}
                            onMouseEnter={(e) => {
                                if (location.pathname !== "/Students") {
                                    e.target.style.background = "#f0f0f0";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (location.pathname !== "/Students") {
                                    e.target.style.background = "transparent";
                                }
                            }}
                        >
                            Students
                        </Link>
                        <Link
                            to="/modules"
                            style={location.pathname === "/modules" ? activeLinkStyle : linkStyle}
                            onMouseEnter={(e) => {
                                if (location.pathname !== "/modules") {
                                    e.target.style.background = "#f0f0f0";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (location.pathname !== "/modules") {
                                    e.target.style.background = "transparent";
                                }
                            }}
                        >
                            Modules
                        </Link>
                        <Link
                            to="/enrollments"
                            style={location.pathname === "/enrollments" ? activeLinkStyle : linkStyle}
                            onMouseEnter={(e) => {
                                if (location.pathname !== "/enrollments") {
                                    e.target.style.background = "#f0f0f0";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (location.pathname !== "/enrollments") {
                                    e.target.style.background = "transparent";
                                }
                            }}
                        >
                            Enrollments
                        </Link>
                        <button
                            onClick={handleLogout}
                            style={{ ...linkStyle, borderRadius: "24px",backgroundColor: "#980101", color: "white", border: "none", cursor: "pointer" }}
                            onMouseEnter={(e) => {
                                e.target.style.background = "#df0404";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = "#970101";
                            }}
                        >
                            Logout
                        </button>
                    </>
                )}

                {!isAdmin && isStudent && (
                    <>
                        <Link
                            to="/"
                            style={location.pathname === "/" ? activeLinkStyle : linkStyle}
                            onMouseEnter={(e) => {
                                if (location.pathname !== "/") {
                                    e.target.style.background = "#f0f0f0";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (location.pathname !== "/") {
                                    e.target.style.background = "transparent";
                                }
                            }}
                        >
                            Home
                        </Link>


                        <Link
                            to="/my-modules"
                            style={location.pathname === "/my-modules" ? activeLinkStyle : linkStyle}
                            onMouseEnter={(e) => {
                                if (location.pathname !== "/my-modules") {
                                    e.target.style.background = "#f0f0f0";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (location.pathname !== "/my-modules") {
                                    e.target.style.background = "transparent";
                                }
                            }}
                        >
                            My Modules
                        </Link>

                        <button
                            onClick={handleLogout}
                            style={{ ...linkStyle, borderRadius: "24px",backgroundColor: "#980101", color: "white", border: "none", cursor: "pointer" }}
                            onMouseEnter={(e) => {
                                e.target.style.background = "#df0404";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = "#970101";
                            }}
                        >
                            Logout
                        </button>
                    </>
                )}

                {!isAdmin && !isStudent && (
                    <>
                        <Link
                            to="/login"
                            style={location.pathname === "/login" ? activeLinkStyle : linkStyle}
                            onMouseEnter={(e) => {
                                if (location.pathname !== "/login") {
                                    e.target.style.background = "#f0f0f0";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (location.pathname !== "/login") {
                                    e.target.style.background = "transparent";
                                }
                            }}
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            style={{
                                ...(location.pathname === "/signup" ? activeLinkStyle : linkStyle),
                                backgroundColor: location.pathname === "/signup" ? "#2852bc" : "#2852bc",
                                color: "white",
                            }}
                            onMouseEnter={(e) => {
                                if (location.pathname !== "/signup") {
                                    e.target.style.background = "#1e3d8f";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (location.pathname !== "/signup") {
                                    e.target.style.background = "#2852bc";
                                }
                            }}
                        >
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default NavBar;