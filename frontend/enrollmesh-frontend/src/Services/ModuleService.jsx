import axios from "axios";

const API_URL = "http://localhost:8080/api/modules";

const ModuleService = {
    getAllModules: () => axios.get(API_URL),
    createModule: (module) => axios.post(API_URL, module),
    getModuleById: (id) => axios.get(`${API_URL}/${id}`),
    updateModule: (id, module) => axios.put(`${API_URL}/${id}`, module),
    deleteModule: (id) => axios.delete(`${API_URL}/${id}`),
};

export default ModuleService;
