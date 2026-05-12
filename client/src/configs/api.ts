
import axios from "axios";

// 1. Create the axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api", 
});

// 2. Define the setAuthToken helper
export const setAuthToken = (token: string | null) => {
  if (token) {
    // This applies the token to EVERY future request made with 'api'
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;
