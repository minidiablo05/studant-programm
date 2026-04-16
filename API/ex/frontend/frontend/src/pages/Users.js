import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from '../components/Input';
import Loader from '../components/Loader';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    console.log('Users page loaded');
    fetchUsers();
  }, []);

  const fetchUsers = async (searchQuery = '') => {
    try {
      setLoading(true);
      
      // Получаем токен
      const token = localStorage.getItem('token');
      console.log('Token exists:', !!token);
      
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      // Если есть поисковый запрос, добавляем его
      if (searchQuery) {
        config.params = { search: searchQuery };
      }

      console.log('Fetching users from API...');
      const response = await axios.get('http://localhost:8000/api/users/', config);
      
      console.log('Users received:', response.data);
      setUsers(response.data);
      setError('');
    } catch (err) {
      console.error('Full error:', err);
      console.error('Error response:', err.response);
      
      setError(`Ошибка: ${err.message}. Проверьте консоль для подробностей.`);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchUsers(value);
  };

  const handleClearSearch = () => {
    setSearch('');
    fetchUsers();
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="card">
      <h2>Список пользователей</h2>
      
      {error && (
        <div className="error">
          <p>{error}</p>
          <p>Убедитесь что:</p>
          <ul>
            <li>Вы вошли в систему</li>
            <li>Имеете права администратора (is_staff: true)</li>
            <li>Сервер backend запущен на localhost:8000</li>
          </ul>
        </div>
      )}
      
      <div style={{ marginBottom: '20px' }}>
        <Input
          type="text"
          name="search"
          label="Поиск пользователей"
          value={search}
          onChange={handleSearch}
          placeholder="Поиск по email, имени или фамилии..."
        />
        <div style={{ marginTop: '10px' }}>
          <button 
            onClick={() => fetchUsers(search)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            Найти
          </button>
          <button 
            onClick={handleClearSearch}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Сбросить
          </button>
        </div>
      </div>
      
      {users.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Пользователи не найдены</p>
          <button 
            onClick={() => fetchUsers()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Попробовать снова
          </button>
        </div>
      ) : (
        <div>
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
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr 
                    key={user.id}
                    style={{
                      borderBottom: '1px solid #dee2e6'
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div style={{ 
            marginTop: '20px', 
            color: '#666',
            padding: '10px',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px'
          }}>
            <p>Найдено пользователей: {users.length}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;