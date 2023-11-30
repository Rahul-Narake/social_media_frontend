import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    if (authentication && isLoggedIn != authentication) {
      navigate('/login');
    } else if (!authentication && isLoggedIn != authentication) {
      navigate('/');
    }
    setLoading(false);
  }, [isLoggedIn, navigate, authentication]);

  return loading ? <h1>Loading..</h1> : <div>{children}</div>;
}

export default AuthLayout;
