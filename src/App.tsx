import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import UsersList from './pages/UsersList';
import './App.css';
import PrivateRoute from './components/common/PrivateRoute';

function App(): React.ReactElement {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route
          path='/list'
          element={
            <PrivateRoute>
              <UsersList />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
