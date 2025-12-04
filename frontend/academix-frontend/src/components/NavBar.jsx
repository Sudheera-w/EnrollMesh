import { Link } from "react-router-dom";

function NavBar(){
    return(
        <nav
            style={{
                display:"flex",
                gap:"20px",
                padding:"15px",
                background:"#f0f0f0",
        }}
        >
            <Link to="/">Home</Link>
            <Link to="/Students">Students</Link>
            <Link to={"/Students/add"}>Add students</Link>
        </nav>
    )
}

export default NavBar;