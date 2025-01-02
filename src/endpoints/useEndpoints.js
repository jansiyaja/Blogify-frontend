import { API_ROUTES } from "../routes/backend_Api";
import axiosInstance from "../services/axiosInstance";


export const userRegister = async (registerData) => {
    try {
        return await axiosInstance.post(API_ROUTES.PUBLIC.REGISTER, registerData);
    } catch (error) {
        return Promise.reject(error);
    }
};
export const verifyOTP = async (otp) => {
    try {
        console.log(otp);
        
        return await axiosInstance.post(API_ROUTES.PUBLIC.OTP_VERIFICATION, otp);
    } catch (error) {
        return Promise.reject(error);
    }
};
export const useLogin = async (data) => {
    try {
        return await axiosInstance.post(API_ROUTES.PUBLIC.LOGIN, data);
    } catch (error) {
        return Promise.reject(error);
    }
};


export const createBlog = async (blogData) => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    console.log('FormData content:', blogData);
    for (let pair of blogData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }

    try {
        return await axiosInstance.post(API_ROUTES.PROTECTED.CREATE_BLOG, blogData, refreshToken, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`,
                   
            },
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

   export const getAllBlogs = async () => {
    const accessToken = localStorage.getItem('accessToken');

    try {
        const response = await axiosInstance.get(API_ROUTES.PROTECTED.CREATE_BLOG, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;  
    } catch (error) {
        return Promise.reject(error);
    }
};


