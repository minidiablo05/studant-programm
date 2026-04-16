import React from 'react';

const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  onClick, 
  disabled = false,
  fullWidth = false 
}) => {
  const baseStyles = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    width: fullWidth ? '100%' : 'auto'
  };

  const variants = {
    primary: {
      backgroundColor: disabled ? '#ccc' : '#007bff',
      color: 'white'
    },
    secondary: {
      backgroundColor: disabled ? '#ccc' : '#6c757d',
      color: 'white'
    },
    danger: {
      backgroundColor: disabled ? '#ccc' : '#dc3545',
      color: 'white'
    }
  };

  const styles = {
    ...baseStyles,
    ...variants[variant]
  };

  return (
    <button
      type={type}
      style={styles}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;