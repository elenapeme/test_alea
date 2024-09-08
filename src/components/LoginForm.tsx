import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import { RootState, AppDispatch } from '../store';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email: formData.email, password: formData.password }))
      .unwrap()
      .then(() => setLoginSuccess(true))
      .catch(() => {});
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      {loginSuccess && <p>Login successful!</p>}
      <div className='mb-4'>
        <label className='mb-2'>Email:</label>
        <input
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className='mb-6'>
        <label>Password:</label>
        <input
          type='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      {error && <p className='mb-4'>{error}</p>}
      <button type='submit' disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;
