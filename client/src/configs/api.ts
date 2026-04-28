// // import axios from "axios";

// // const api = axios.create({
// //     baseURL: import.meta.env.VITE_STRAPI_API_URL
// // })

// // export default api;
// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:1337",
// });

// api.interceptors.request.use((config) => {
//   const token = window.localStorage.getItem("token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export default api;
import axios from "axios";

const api = axios.create({
baseURL: "http://localhost:1337"

});

// 🔥 Attach JWT token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 🔥 Optional: clean error handling (helps debugging)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API Error:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;

