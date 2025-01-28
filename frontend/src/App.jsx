import Profile from './components/Profile';
import { useState,useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'; // Use BrowserRouter here
import { Navigate } from 'react-router';
import Login from './components/Login';
import Register from './components/Register';






function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkPersistedLogin = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/user/verify`, { withCredentials: true });
        setUser(response.data);
      } catch {
        console.log('Not logged in');
        setUser(null);
      }
    };
    checkPersistedLogin();
  }, []);

  return (
    <div>
      <Toaster position="top-center" />
      <Router>
        <Profile setUser={setUser} /> {/* Pass setUser as a prop */}
        <Routes>
          <Route path="/" element={<Navigate to={user ? '/todos' : '/login'} />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/todos" />} />
          <Route path="/todos" element={user ? <Todos user={user} /> : <Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
