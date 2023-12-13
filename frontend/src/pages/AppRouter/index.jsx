import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import UserRoutes from './UserRoutes.jsx';
import Cookies from 'js-cookie';
import { checkAuth } from '../../utils.js';

export default function AppRouter() {
  // force prop to force user routes (check for the JSDocs on UserRoutes.jsx)
  const navigate = useNavigate();
  const token = Cookies.get('sessionToken');
  const [user,setUser] = React.useState(null);
  useEffect( () => { 
    async function checkUserAuth() {
      const isAuthenticated = await checkAuth(token);
      setUser(isAuthenticated);
      if (token && isAuthenticated) {
        navigate('/');
      }
    }
    checkUserAuth();
  }, []);
  
  const RoutesArray = [
    { path:"/", page: <UserRoutes isAuthenticated={user}><div>Main page test</div></UserRoutes> }
  ]
  return (
      <Routes>
        {RoutesArray.map(r => <Route key={r.path} path={r.path} element={r.page}/>)}
      </Routes>
  );
}
