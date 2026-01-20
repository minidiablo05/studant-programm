import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../api/auth';
import Input from '../components/Input';
import Button from '../components/Button';
import Loader from '../components/Loader';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/profile');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Вход в систему</h2>
      
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Введите email"
          required
        />
        
        <Input
          type="password"
          name="password"
          label="Пароль"
          value={formData.password}
          onChange={handleChange}
          placeholder="Введите пароль"
          required
        />
        
        <Button 
          type="submit" 
          variant="primary" 
          fullWidth
          disabled={loading}
        >
          Войти
        </Button>
      </form>
      
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>
          Нет аккаунта?{' '}
          <Link to="/register" className="link">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;