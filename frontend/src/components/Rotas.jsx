import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Search from './Search';
import Insert from './insert';
import History from './History';




export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/insert" element={<Insert />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}