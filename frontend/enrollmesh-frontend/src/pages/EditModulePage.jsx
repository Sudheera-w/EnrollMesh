import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ModuleService from "../services/ModuleService";

function EditModulePage() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [module, setModule] = useState({
        name: "",
        code: "",
        credits: "",
        department: "",
    });

    const handleChange = (e) => {
        setModule({
            ...module,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedModule = {
            ...module,
            credits: Number(module.credits),
        };

        ModuleService.updateModule(id, updatedModule)
            .then(() => {
                alert("Module updated successfully");
                navigate("/modules");
            })
            .catch((error) => {
                console.error("Error updating module:", error);
            });
    };

    useEffect(() => {
        ModuleService.getModuleById(id)
            .then((response) => {
                setModule(response.data);
            })
            .catch((error) => {
                console.error("Error fetching module:", error);
            });
    }, [id]);

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            paddingTop: "50px",
            width: "100%",
            margin: 0
        }}>
            <h2 style={{ textAlign: "center", marginBottom: "10px", width: "100%", marginTop: "20px" }}>
                Edit Module
            </h2>

            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    width: "90%",
                    maxWidth: "450px",
                    padding: "30px",
                }}
            >

                <label style={{ marginBottom: "-15px" }}>Name</label>
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
                        transition: "border-color 0.8s",
                        marginBottom: "-5px"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#2852bc"}
                    onBlur={(e) => e.target.style.borderColor = "#ccc"}
                />

                <label style={{ marginBottom: "-15px" }}>Code</label>
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
                        transition: "border-color 0.8s",
                        marginBottom: "-5px"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#2852bc"}
                    onBlur={(e) => e.target.style.borderColor = "#ccc"}
                />

                <label style={{ marginBottom: "-15px" }}>Credits</label>
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
                        transition: "border-color 0.8s",
                        marginBottom: "-5px"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#2852bc"}
                    onBlur={(e) => e.target.style.borderColor = "#ccc"}
                />

                <label style={{ marginBottom: "-15px" }}>Department</label>
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
                        transition: "border-color 0.8s",
                        marginBottom: "-5px"
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
                    Update Module
                </button>

            </form>
        </div>
    );
}

export default EditModulePage;
