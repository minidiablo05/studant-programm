import React, { useState, useEffect } from 'react';
import { useAuth } from '../api/auth';
import axios from '../api/auth';
import Input from '../components/Input';
import Button from '../components/Button';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.put('/api/profile/', formData);
      updateUser(response.data);
      setSuccess('Профиль успешно обновлен');
    } catch (err) {
      setError('Ошибка при обновлении профиля');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>Профиль пользователя</h2>
      
      {success && <div className="success">{success}</div>}
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="first_name"
          label="Имя"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        
        <Input
          type="text"
          name="last_name"
          label="Фамилия"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        
        <Input
          type="email"
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          disabled
        />
        
        <p style={{ marginBottom: '20px', color: '#666' }}>
          Email нельзя изменить
        </p>
        
        <Button 
          type="submit" 
          variant="primary"
          disabled={loading}
        >
          {loading ? 'Сохранение...' : 'Сохранить изменения'}
        </Button>
      </form>
      
      <div className="user-info">
        <p><strong>ID пользователя:</strong> {user.id}</p>
        <p><strong>Статус:</strong> {user.is_staff ? 'Администратор' : 'Пользователь'}</p>
      </div>
    </div>
  );
};

export default Profile;