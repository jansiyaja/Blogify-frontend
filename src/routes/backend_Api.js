export const API_ROUTES = {
  PUBLIC: {
    REGISTER: "/users/register",            
    OTP_VERIFICATION: "/users/otp-verification",  
    LOGIN: "/users/login",                 
    LOGOUT: "/users/logout",                  
  },
  PROTECTED: {
    PROFILE: "/users/profile",   
    
    DASHBOARD: "/users/dashboard",          
    CREATE_BLOG: "/users/blog",             
    EDIT_BLOG: "/users/blog/:id",           
    SINGLE_BLOG: "/users/singleblog",       
    DELETE_BLOG: "/users/deleteBlog",       
    USER_BLOGS: "/users/usersblog",       
    USER_IMAGE: "/users/upload",       
  },
};
