import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';

function App(): React.ReactElement {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;