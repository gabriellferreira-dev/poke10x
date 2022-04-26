import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/:pokemon" element={<Pokemon />} /> */}
    </Routes>
  );
}

export default App;
