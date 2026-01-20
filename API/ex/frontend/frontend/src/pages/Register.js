import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../api/auth';
import Input from '../components/Input';
import Button from '../components/Button';
import Loader from '../components/Loader';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password2: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.includes('@')) {
      newErrors.email = 'Введите корректный email';
    }
    
    if (formData.password.length < 8) {
      newErrors.password = 'Пароль должен быть не менее 8 символов';
    }
    
    if (formData.password !== formData.password2) {
      newErrors.password2 = 'Пароли не совпадают';
    }
    
    if (!formData.first_name.trim()) {
      newErrors.first_name = 'Введите имя';
    }
    
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Введите фамилию';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccess('');

    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    const result = await register(formData);
    
    if (result.success) {
      setSuccess('Регистрация прошла успешно!');
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } else {
      if (typeof result.error === 'object') {
        setErrors(result.error);
      } else {
        setErrors({ general: result.error });
      }
    }
    
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Регистрация</h2>
      
      {success && <div className="success">{success}</div>}
      {errors.general && <div className="error">{errors.general}</div>}
      
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Введите email"
          error={errors.email}
          required
        />
        
        <Input
          type="text"
          name="first_name"
          label="Имя"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="Введите имя"
          error={errors.first_name}
          required
        />
        
        <Input
          type="text"
          name="last_name"
          label="Фамилия"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Введите фамилию"
          error={errors.last_name}
          required
        />
        
        <Input
          type="password"
          name="password"
          label="Пароль"
          value={formData.password}
          onChange={handleChange}
          placeholder="Введите пароль"
          error={errors.password}
          required
        />
        
        <Input
          type="password"
          name="password2"
          label="Подтверждение пароля"
          value={formData.password2}
          onChange={handleChange}
          placeholder="Повторите пароль"
          error={errors.password2}
          required
        />
        
        <Button 
          type="submit" 
          variant="primary" 
          fullWidth
          disabled={loading}
        >
          Зарегистрироваться
        </Button>
      </form>
      
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>
          Уже есть аккаунт?{' '}
          <Link to="/login" className="link">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;