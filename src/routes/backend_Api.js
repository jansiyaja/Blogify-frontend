export const API_ROUTES = {
  PUBLIC: {
    REGISTER: "/users/register",            
    OTP_VERIFICATION: "/users/otp-verification",  
    LOGIN: "/users/login",                 
    LOGOUT: "/users/logout",                  
  },
  PROTECTED: {
    PROFILE: "/users/profile",              // User Profile users
    DASHBOARD: "/users/dashboard",          // Dashboard users
    CREATE_BLOG: "/users/blog",             // Create Blog users
    EDIT_BLOG: "/users/blog/:id",           // Edit Blog users (with ID parameter)
    SINGLE_BLOG: "/users/blog/:id",       
  },
};
