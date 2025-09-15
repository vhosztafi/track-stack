import './styles/global.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import EmbedPage from './pages/EmbedPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/embed" element={<EmbedPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
