import React from 'react';

function Button({
  type = 'button',
  children,
  className = '',
  props,
  bgColor = 'bg-blue-600',
  textColor = 'white',
}) {
  return (
    <button
      type={type}
      className={`w-full px-4 py-2 rounded-lg ${className} ${bgColor} text-${textColor} text-white`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
