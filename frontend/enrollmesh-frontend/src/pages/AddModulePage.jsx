import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModuleService from "../Services/ModuleService.jsx";

function AddModulePage() {

    const navigate = useNavigate();

    const [module, setModule] = useState({
        name: "",
        code: "",
        credits: "",
        department: ""
    });

    const handleChange = (e) => {
        setModule({
            ...module,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        ModuleService.createModule(module)
            .then(() => {
                alert("Module successfully added");
                navigate("/modules");
            })
            .catch((error) => {
                console.error("Error adding module:", error);
            });
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "80px",
            width: "100%",
            minHeight: "100vh",
            backgroundColor: "rgb(205,207,207)",
            boxSizing: "border-box",
        }}>
            <h2 style={{ marginBottom: "20px", color: "#333" }}>
                Add Module
            </h2>

            <form onSubmit={handleSubmit} style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "90%",
                maxWidth: "500px",
                padding: "30px",
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
            }}>

                <input
                    type="text"
                    name="name"
                    placeholder="Module Name"
                    value={module.name}
                    onChange={handleChange}
                    required
                    style={{
                        padding: "12px",
                        fontSize: "16px",
                        borderRadius: "4px",
                        border: "2px solid #ccc",
                        transition: "border-color 0.8s"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#2852bc"}
                    onBlur={(e) => e.target.style.borderColor = "#ccc"}
                />

                <input
                    type="text"
                    name="code"
                    placeholder="Module Code"
                    value={module.code}
                    onChange={handleChange}
                    required
                    style={{
                        padding: "12px",
                        fontSize: "16px",
                        borderRadius: "4px",
                        border: "2px solid #ccc",
                        transition: "border-color 0.8s"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#2852bc"}
                    onBlur={(e) => e.target.style.borderColor = "#ccc"}
                />

                <input
                    type="number"
                    name="credits"
                    placeholder="Credits"
                    value={module.credits}
                    onChange={handleChange}
                    required
                    style={{
                        padding: "12px",
                        fontSize: "16px",
                        borderRadius: "4px",
                        border: "2px solid #ccc",
                        transition: "border-color 0.8s"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#2852bc"}
                    onBlur={(e) => e.target.style.borderColor = "#ccc"}
                />

                <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={module.department}
                    onChange={handleChange}
                    required
                    style={{
                        padding: "12px",
                        fontSize: "16px",
                        borderRadius: "4px",
                        border: "2px solid #ccc",
                        transition: "border-color 0.8s"
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
                        background: "#2852bc",
                        color: "white",
                        cursor: "pointer",
                        transition: "background 0.3s",
                        marginTop: "10px",
                        border: "none"
                    }}
                    onMouseEnter={(e) => e.target.style.background = "#1e3d8f"}
                    onMouseLeave={(e) => e.target.style.background = "#2852bc"}
                >
                    Add Module
                </button>
            </form>
        </div>
    );
}

export default AddModulePage;
