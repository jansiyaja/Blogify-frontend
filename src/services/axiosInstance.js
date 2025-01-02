import axios from "axios";

const baseURL = "http://localhost:3000/";

 const axiosInstance = axios.create({
    baseURL,
    withCredentials: true, 
 });


 const getAccessToken = () => localStorage.getItem('accessToken');
const getRefreshToken = () => localStorage.getItem('refreshToken');

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
       
        const refreshToken = getRefreshToken();
        const response =  await axiosInstance.post('/users/verify-token',{ refreshToken });

        const { accessToken } = response.data;

       
        localStorage.setItem('accessToken', accessToken);

        
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
       
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login'; 
      }
    }
    return Promise.reject(error);
  }
);


export default axiosInstance