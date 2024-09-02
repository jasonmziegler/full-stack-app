import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PrivateRoute = ({element: Component, ...rest}) => {
  const { user } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) => 
      user ? (
        <Component {...props} />
      ) : (
        <Navigate to="/signin" replace />
      )
      }
    />
  );
};

export default PrivateRoute;