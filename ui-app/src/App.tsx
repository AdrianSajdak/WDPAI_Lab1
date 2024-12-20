import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Register from './components/Register';
import Login from './components/Login';
import UserList from './components/UserList';
import Toolbar from './components/Toolbar.tsx'


function App() {
  return (
  <BrowserRouter>
    <Toolbar />
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/users" element={<UserList />} />
      <Route path="*" element={<UserList />} />
    </Routes>
  </BrowserRouter>
);
}

export default App;
