

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import { ROUTES } from './routes/Routes';
import Register from './pages/Register';
import Layout from './Layout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {


  return (
    <>
           <Router>
            <Routes>
              <Route element={<Layout/>}>
              <Route path={ROUTES.PUBLIC.REGISTER} element={<Register/> } />
              {/* <Route path={ROUTES.PUBLIC.OTP_VERIFICATION} element={<CommonPage page="otp" />} />
              <Route path={ROUTES.PUBLIC.LOGIN} element={<CommonPage page="login" />} />
            
              <Route path={ROUTES.PUBLIC.HOME} element={<HomePage />} /> */}
              

             
              <Route element={<ProtectedRoute />}>
                
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
