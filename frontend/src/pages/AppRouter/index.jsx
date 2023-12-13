import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import UserRoutes from './UserRoutes.jsx';
import Cookies from 'js-cookie';
import { checkAuth, cleanCookie } from '../../utils.js';
import MainContainer from '../../components/MainContainer.jsx';
import LoginForm from '../LoginForm.jsx';
import RegisterForm from '../RegisterForm.jsx';
import ErrorAlert from '../../components/ErrorAlert.jsx';

export default function AppRouter() {
  // force prop to force user routes (check for the JSDocs on UserRoutes.jsx)
  const navigate = useNavigate();
  const token = Cookies.get('sessionToken');
  const [user,setUser] = React.useState(true);
  useEffect( () => { 
    async function checkUserAuth() {
      const isAuthenticated = await checkAuth(token);
      console.log(isAuthenticated);
      setUser(isAuthenticated);
      if (token && isAuthenticated) {
        navigate('/');
      }
    }
    checkUserAuth();
  }, []);
  
  const RoutesArray = [
    { path:"/", page: <UserRoutes force={true} user={user}>Main page</UserRoutes> },
    { path:"/login", page: <LoginForm/> },
    { path:"/register", page: <RegisterForm/> },
  ]
  return (
    <MainContainer>
      <ErrorAlert />
      <Routes>
        {RoutesArray.map(r => <Route key={r.path} path={r.path} element={r.page}/>)}
      </Routes>
    </MainContainer>
  );
}
