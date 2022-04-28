import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PokemonPage from './pages/Pokemon';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:pokemon" element={<PokemonPage />} />
    </Routes>
  );
}

export default App;
