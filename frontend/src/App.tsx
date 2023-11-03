import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PokemonList from "./pages/PokemonList";
import PokemonDetail from "./pages/PokemonDetail";
import PokemonFavorites from "./pages/Favorites";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/pokemon" element={<PokemonList />} />
        <Route path="/pokemon/detail/:id" element={<PokemonDetail />} />
        <Route path="/favorites" element={<PokemonFavorites />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
