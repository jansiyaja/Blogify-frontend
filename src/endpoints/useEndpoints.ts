import { API_ROUTES } from "../routes/backend_Api";
import axiosInstance from "../services/axiosInstance";
import { AxiosResponse } from "axios";


interface RegisterData {
  email: string;
  password: string;
  
  
}

interface LoginData {
  email: string;
  password: string;
}

interface OTPData {
  otpString: string;
  email: string;
}

interface BlogFormData extends FormData {}

interface EditProfileData {
  name?: string;
  eamil?: string;
  imageFile?: File | string;
  about?:string
}

export const userRegister = async (registerData: RegisterData): Promise<AxiosResponse> => {
  try {
    return await axiosInstance.post(API_ROUTES.PUBLIC.REGISTER, registerData);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const verifyOTP = async (otp: OTPData): Promise<AxiosResponse> => {
  try {
    return await axiosInstance.post(API_ROUTES.PUBLIC.OTP_VERIFICATION, otp);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const useLogin = async (data: LoginData): Promise<AxiosResponse> => {
  try {
    return await axiosInstance.post(API_ROUTES.PUBLIC.LOGIN, data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createBlog = async (blogData: BlogFormData): Promise<AxiosResponse> => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    return await axiosInstance.post(API_ROUTES.PROTECTED.CREATE_BLOG, blogData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllBlogs = async (): Promise<any> => {
  const accessToken = localStorage.getItem("accessToken");

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

export const getSingleBlog = async (id: string): Promise<any> => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axiosInstance.get(`${API_ROUTES.PROTECTED.SINGLE_BLOG}?id=${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteSingleBlog = async (id: string): Promise<any> => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axiosInstance.post(
      `${API_ROUTES.PROTECTED.DELETE_BLOG}?id=${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const uploadImage = async (link: FormData): Promise<any> => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axiosInstance.post(API_ROUTES.PROTECTED.USER_IMAGE, link, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
 
export const userBlogs = async (id: string | undefined): Promise<any> => {

  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axiosInstance.get(`${API_ROUTES.PROTECTED.USER_BLOGS}?id=${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const editProfile = async (data: EditProfileData|FormData): Promise<any> => {

  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axiosInstance.post(API_ROUTES.PROTECTED.PROFILE, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateBlog = async (id: string, updatedData: FormData): Promise<any> => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axiosInstance.put(
      `${API_ROUTES.PROTECTED.EDIT_BLOG}/${id}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
