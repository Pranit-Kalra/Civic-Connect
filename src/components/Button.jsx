import React from 'react';

function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = '', 
  type = 'button',
  disabled = false 
}) {
  const btnClass = `btn btn-${variant} ${size ? `btn-${size}` : ''}`;

  return (
    <button 
      type={type} 
      className={btnClass} 
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
