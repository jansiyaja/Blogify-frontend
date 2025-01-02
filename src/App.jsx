

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Register from './pages/Register';
import Layout from './Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import CreateBlog from './pages/Blog/CreateBlog';
import { ROUTES } from './routes/frontend_Api';
import Otp from './pages/Otp';
import Home from './pages/Home';

function App() {


  return (
    <>
           <Router>
            <Routes>
              <Route element={<Layout/>}>
            <Route path={ROUTES.PUBLIC.REGISTER} element={<Register />} />
            <Route path={ROUTES.PUBLIC.LOGIN} element={<Login/>} />
            <Route path={ROUTES.PUBLIC.OTP_VERIFICATION} element={<Otp />} />
               <Route path={ROUTES.PUBLIC.HOME} element={<Home/>} />
           
           
              

             
            <Route element={<ProtectedRoute />}>
               <Route path={ROUTES.PROTECTED.CREATE_BLOG} element={<CreateBlog/>} />
                
{/*                
              

                <Route path={ROUTES.PROTECTED.PROFILE} element={<UserProfile />} />
            
                <Route path={ROUTES.PROTECTED.DASHBOARD} element={<Dashboard />} />
 
                <Route path={ROUTES.PROTECTED.BLOG_EDITOR} element={<Blog page="blogeditor" />} />
                <Route path={ROUTES.PROTECTED.EDIT_BLOG} element={<EditBlogPost />} />
                <Route path={ROUTES.PROTECTED.SINGLE_BLOG} element={<Blog page="singleblog" />} /> */}

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
