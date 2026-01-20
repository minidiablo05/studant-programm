import React, { useState, useEffect } from 'react';
import { useAuth } from '../api/auth';
import axios from 'axios'; // Импортируем чистый axios
import Input from '../components/Input';
import Loader from '../components/Loader';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const { user: currentUser } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (searchQuery = '') => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Необходима авторизация');
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: searchQuery ? { search: searchQuery } : {}
      };

      const response = await axios.get('http://localhost:8000/api/users/', config);
      setUsers(response.data);
      setError('');
    } catch (err) {
      if (err.response?.status === 403) {
        setError('У вас нет прав для просмотра списка пользователей');
      } else if (err.response?.status === 401) {
        setError('Требуется авторизация');
      } else {
        setError('Ошибка при загрузке пользователей');
      }
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    // Добавим небольшую задержку для поиска
    const timeoutId = setTimeout(() => {
      fetchUsers(value);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchUsers(search);
  };

  if (loading && !users.length) {
    return <Loader />;
  }

  return (
    <div className="card">
      <h2>Управление пользователями</h2>
      
      {error && <div className="error">{error}</div>}
      
      <div style={{ marginBottom: '30px' }}>
        <form onSubmit={handleSearchSubmit}>
          <Input
            type="text"
            name="search"
            label="Поиск пользователей"
            value={search}
            onChange={handleSearch}
            placeholder="Поиск по email, имени или фамилии..."
          />
          <button 
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Найти
          </button>
          <button 
            type="button"
            onClick={() => {
              setSearch('');
              fetchUsers();
            }}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px',
              marginLeft: '10px'
            }}
          >
            Сбросить
          </button>
        </form>
      </div>
      
      {users.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Пользователи не найдены</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px'
          }}>
            <thead>
              <tr style={{
                backgroundColor: '#f8f9fa',
                borderBottom: '2px solid #dee2e6'
              }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>ID</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Имя</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Фамилия</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Роль</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Текущий</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr 
                  key={user.id}
                  style={{
                    borderBottom: '1px solid #dee2e6',
                    backgroundColor: user.is_staff ? '#f0f7ff' : 'white',
                    ...(currentUser?.id === user.id && {
                      backgroundColor: '#fff3cd',
                      fontWeight: 'bold'
                    })
                  }}
                >
                  <td style={{ padding: '12px' }}>{user.id}</td>
                  <td style={{ padding: '12px' }}>{user.email}</td>
                  <td style={{ padding: '12px' }}>{user.first_name || '-'}</td>
                  <td style={{ padding: '12px' }}>{user.last_name || '-'}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      backgroundColor: user.is_staff ? '#007bff' : '#6c757d',
                      color: 'white',
                      fontSize: '12px'
                    }}>
                      {user.is_staff ? 'Администратор' : 'Пользователь'}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    {currentUser?.id === user.id && (
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: '#ffc107',
                        color: '#212529',
                        fontSize: '12px'
                      }}>
                        Вы
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div style={{ 
        marginTop: '20px', 
        color: '#666',
        padding: '10px',
        backgroundColor: '#f8f9fa',
        borderRadius: '4px'
      }}>
        <p>Найдено пользователей: {users.length}</p>
        <p>Текущий пользователь: {currentUser?.email} (ID: {currentUser?.id})</p>
      </div>
    </div>
  );
};

export default Users;