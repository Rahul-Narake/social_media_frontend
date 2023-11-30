import React from 'react';
import { Login as AuthLogin } from '../components/index.js';
function Login() {
  return (
    <div className="w-full py-8 flex content-between">
      <AuthLogin />
    </div>
  );
}

export default Login;
