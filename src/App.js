import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import Files from './Pages/Files';
import NotFound from './Pages/NotFound';
import validateLogin from './Hooks/validateLogin';
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

        {!isLoggedIn && <Route exact path="/home" element={<Navigate to="/login" />} />}
        {!isLoggedIn && <Route exact path="/files" element={<Navigate to="/login" />} />}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
