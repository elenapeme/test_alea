import React from 'react';
import LoginForm from '../components/LoginForm';

const Login: React.FC = () => {
  return (
    <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
      <LoginForm />
    </div>
  );
};

export default Login;
