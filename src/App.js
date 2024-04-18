import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import NotFound from './Pages/NotFound';
import Tabs from './Pages/Tabs';
import validateLogin from './Hooks/validateLogin';
import Loader from './Components/Loader';
const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    validateLogin();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Router>
      {!loading &&
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          {localStorage.getItem('loginTime') && <Route exact path="/" element={<Tabs />} />}
          {!localStorage.getItem('loginTime') && <Route exact path="/" element={<Navigate to="/login" />} />}
          <Route path="*" element={<NotFound />} />
        </Routes>}
      {loading &&
        <Loader />}
    </Router>
  );
}

export default App;
