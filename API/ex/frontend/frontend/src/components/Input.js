import React from 'react';

const Input = ({
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  label = '',
  error = '',
  required = false
}) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      {label && (
        <label 
          htmlFor={name}
          style={{
            display: 'block',
            marginBottom: '5px',
            fontWeight: '500'
          }}
        >
          {label}
          {required && <span style={{ color: '#dc3545' }}> *</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{
          width: '100%',
          padding: '10px',
          border: `1px solid ${error ? '#dc3545' : '#ddd'}`,
          borderRadius: '4px',
          fontSize: '16px'
        }}
      />
      {error && (
        <div style={{
          color: '#dc3545',
          fontSize: '14px',
          marginTop: '5px'
        }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;