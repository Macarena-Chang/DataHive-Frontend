import React from 'react';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const ProtectedComponent = ({ component: Component, ...rest }) => {
  const { isAuth } = useContext(AuthContext);

  return isAuth ? <Component {...rest} /> : <Navigate to="/" />;
};

export default ProtectedComponent;
