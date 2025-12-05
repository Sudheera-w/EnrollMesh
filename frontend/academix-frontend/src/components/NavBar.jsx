import { Link } from "react-router-dom";

function NavBar(){
    return(
        <nav
            style={{
                display:"flex",
                gap:"20px",
                padding:"15px",
                background:"#175ad3",
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                zIndex: 1000,
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",

        }}
        >
            <Link to="/">Home</Link>
            <Link to="/Students">Students</Link>
            <Link to={"/Students/add"}>Add students</Link>
        </nav>
    )
}

export default NavBar;