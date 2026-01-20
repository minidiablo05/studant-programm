import React from 'react';
import { useAuth } from '../api/auth';
import { Link } from 'react-router-dom';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="card">
      <h1>Добро пожаловать в Auth App</h1>
      
      {isAuthenticated ? (
        <div>
          <p>Вы вошли в систему как:</p>
          <div className="user-info">
            <p><strong>Имя:</strong> {user.first_name} {user.last_name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
          <div style={{ marginTop: '30px' }}>
            <Link to="/profile">
              <button style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                Перейти в профиль
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <p>Пожалуйста, войдите или зарегистрируйтесь, чтобы продолжить.</p>
          <div style={{ 
            display: 'flex', 
            gap: '20px', 
            marginTop: '30px',
            justifyContent: 'center'
          }}>
            <Link to="/login">
              <button style={{
                padding: '10px 30px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                Войти
              </button>
            </Link>
            <Link to="/register">
              <button style={{
                padding: '10px 30px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                Регистрация
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;