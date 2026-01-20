import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../api/auth';
import Button from './Button';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header style={{
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '20px 0'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{
          textDecoration: 'none',
          color: '#333',
          fontSize: '20px',
          fontWeight: 'bold'
        }}>
          Auth App
        </Link>
        
        <nav>
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <span style={{ color: '#666' }}>
                Привет, {user.first_name} {user.last_name}
              </span>
              <Link to="/profile" style={{
                textDecoration: 'none',
                color: '#007bff'
              }}>
                Профиль
              </Link>
              {user.is_staff && (
                <Link to="/users" style={{
                  textDecoration: 'none',
                  color: '#007bff'
                }}>
                  Пользователи
                </Link>
              )}
              <Button 
                variant="secondary" 
                onClick={handleLogout}
              >
                Выйти
              </Button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link to="/login">
                <Button variant="primary">Войти</Button>
              </Link>
              <Link to="/register">
                <Button variant="secondary">Регистрация</Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;