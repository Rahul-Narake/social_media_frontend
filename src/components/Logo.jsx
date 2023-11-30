import React from 'react';
import logo from '../assets/logo.jpg';

function Logo({ width = '10px' }) {
  return (
    <div className="text-ceneter">
      <img src={logo} alt="logo" className="rounded-full" />
    </div>
  );
}

export default Logo;
