import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import UserRoutes from './UserRoutes.jsx';
import Cookies from 'js-cookie';
import { checkAuth } from '../../utils.js';
import MainContainer from '../../components/MainContainer.jsx';
import LoginForm from '../LoginForm.jsx';
import RegisterForm from '../RegisterForm.jsx';
import ErrorAlert from '../../components/ErrorAlert.jsx';
import ChatWindow from '../ChatWindow.jsx';

export default function AppRouter() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = Cookies.get('sessionToken');
  const [user, setUser] = React.useState(null);
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    setChecked(false);
    async function checkUserAuth() {
      const isAuthenticated = await checkAuth(token);
      setUser(isAuthenticated);
      if (token && isAuthenticated) {
        navigate('/');
      }
      setChecked(true);
    }
    checkUserAuth();
  }, [location.pathname]);

  const RoutesArray = [
    { path: "/", page: checked && <UserRoutes force={checked} user={user}><ChatWindow key={`chat-${user?.username}`} user={user} /></UserRoutes> },
    { path: "/login", page: <LoginForm /> },
    { path: "/register", page: <RegisterForm /> },
  ];

  return (
    <MainContainer>
      <ErrorAlert />
      <Routes>
        {RoutesArray.map(r => <Route key={r.path} path={r.path} element={r.page} />)}
      </Routes>
    </MainContainer>
  );
}
