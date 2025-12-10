import { Link, useLocation } from "react-router-dom";

function NavBar(){
    const location = useLocation();
    
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

    return(
        <nav
            style={{
                display:"flex",
                alignItems: "center",
                gap:"10px",
                padding:"5px 30px",
                background:"#ffffff",
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
                Academix
            </Link>
            <div style={{ marginLeft: "auto", display: "flex", gap: "10px", alignItems: "center" }}>
                <Link
                    to="/"
                    style={location.pathname === "/" ? activeLinkStyle : linkStyle}
                    onMouseEnter={(e) => {
                        if(location.pathname !== "/") {
                            e.target.style.background = "#f0f0f0";
                        }
                    }}
                    onMouseLeave={(e) => {
                        if(location.pathname !== "/") {
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
                        if(location.pathname !== "/Students") {
                            e.target.style.background = "#f0f0f0";
                        }
                    }}
                    onMouseLeave={(e) => {
                        if(location.pathname !== "/Students") {
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
                        if(location.pathname !== "/modules") {
                            e.target.style.background = "#f0f0f0";
                        }
                    }}
                    onMouseLeave={(e) => {
                        if(location.pathname !== "/modules") {
                            e.target.style.background = "transparent";
                        }
                    }}
                >
                    Modules
                </Link>
            </div>
        </nav>
    )
}

export default NavBar;