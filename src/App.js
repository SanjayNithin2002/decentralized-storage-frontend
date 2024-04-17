import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import Files from './Pages/Files';
import Users from './Pages/Users';
import Upload from './Pages/Upload';
import NotFound from './Pages/NotFound';
import validateLogin from './Hooks/validateLogin';
import getUserType from './Hooks/getUserType';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(validateLogin());
  useEffect(() => setIsLoggedIn(validateLogin()), [isLoggedIn]);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Navigate to="/login" />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />

        {isLoggedIn && <Route exact path="/home" element={<Home />} />}
        {isLoggedIn && <Route exact path="/files" element={<Files />} />}
        {isLoggedIn && getUserType() === 'dataowners' && <Route exact path="/users" element={<Users />} />}
        {isLoggedIn && getUserType() === 'dataowners' && <Route exact path="/upload" element={<Upload />} />}

        {!isLoggedIn && <Route exact path="/home" element={<Navigate to="/login" />} />}
        {!isLoggedIn && <Route exact path="/files" element={<Navigate to="/login" />} />}
        {!isLoggedIn && <Route exact path="/users" element={<Navigate to="/login" />} />}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
