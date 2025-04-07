
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Layout from './Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import CreateBlog from './pages/Blog/CreateBlog';
import { ROUTES } from './routes/frontend_Api';
import Otp from './pages/Otp';
import Home from './pages/Home';
import SingleBlog from './pages/Singleblog';

import Profile from './pages/profile/Profile';
import Tips from './pages/profile/Tips';
import About from './pages/profile/About';

function App() {


  return (
    <>
           <Router>
            <Routes>
              <Route element={<Layout/>}>
            <Route path={ROUTES.PUBLIC.REGISTER} element={<Register />} />
            <Route path={ROUTES.PUBLIC.LOGIN} element={<Login/>} />
            <Route path={ROUTES.PUBLIC.OTP_VERIFICATION} element={<Otp />} />
            <Route path={ROUTES.PUBLIC.ABOUT} element={<About />} />
            
           
           
              

             
            <Route element={<ProtectedRoute />}>
              <Route path={ROUTES.PUBLIC.HOME} element={<Home/>} />
              <Route path={ROUTES.PROTECTED.CREATE_BLOG} element={<CreateBlog />} />
              <Route path={ROUTES.PROTECTED.SINGLE_BLOG} element={<SingleBlog />} />
               <Route path={ROUTES.PROTECTED.DASHBOARD} element={<Profile />} />
               <Route path={ROUTES.PROTECTED.TIPS} element={<Tips />} />
                
              


              </Route>
           </Route>
            

         
{/*               
              <Route path="*" element={<NotFound />} /> */}
            </Routes>
            
          </Router>
    </>
  )
}

export default App
