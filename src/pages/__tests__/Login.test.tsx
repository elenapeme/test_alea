import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Login from '../Login';
import authReducer, { AuthState } from '../../features/auth/authSlice';
import '@testing-library/jest-dom';

const createTestStore = (preloadedState: { auth?: AuthState } = {}) => {
  return configureStore({
    reducer: { auth: authReducer },
    preloadedState: {
      auth: {
        token: null, // El token por defecto es null
        loading: false, // El estado de loading por defecto es false
        error: null, // No hay error al inicio
        ...(preloadedState.auth || {}), // Sobreescribe si hay preloadedState
      },
    },
  });
};

describe('Login Page', () => {
  it('renders Login component', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    expect(screen.getByText(/Sign in to your account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Log in/i })).toBeInTheDocument();
  });

  it('permits the user to enter a username and password ans succesfully login', () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'testt@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'test' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Log in/i }));

    expect(store.getState().auth.loading).toBe(true);
  });

  it('muestra un mensaje de éxito después de iniciar sesión', async () => {
    const store = createTestStore({
      auth: { token: null, loading: false, error: null }, // Estado inicial del test
    });

    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Log in/i }));

    expect(
      await screen.findByText((_, element) => {
        return element?.textContent === 'Login successful!';
      })
    ).toBeInTheDocument();
  });
});
