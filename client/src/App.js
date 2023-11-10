
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Tasks from './components/Tasks';
import EditProfile from './components/EditProfile';

function App() {
  return (
    
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/tasks" element={<Tasks/>}></Route>
      <Route path="/editProfile" element={<EditProfile/>}></Route>
      <Route path="/" >Delete</Route>
      <Route path="/">Logout</Route>
    </Routes>
  </BrowserRouter>
    
  );
}

export default App;
