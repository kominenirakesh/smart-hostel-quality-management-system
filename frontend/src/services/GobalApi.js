import axios from "axios";

const api = axios.create({
    baseURL: "https://smart-hostel-quality-management-system.onrender.com/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;

