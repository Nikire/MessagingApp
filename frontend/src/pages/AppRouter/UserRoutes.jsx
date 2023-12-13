import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
/**
 * A component that requires authentication to access its children.
 * If the user is not authenticated or the token is invalid, the component will redirect the user to the login page.
 *
 * @component
 * @param {ReactNode}  "children" - The child elements to render.
 * @param {boolean}  "force" = false - Whether to force the component to redirect the user to the login page even if the user is already authenticated.
 * @returns {ReactNode} - The rendered component.
 **/
const UserRoutes = ({ children, force = false, user = false }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (force) {
      if (!user) {
        navigate('/login');
      }
    }
  }, []);

  return <>{children}</>;
};

export default UserRoutes;
