import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Search from './Search';

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}