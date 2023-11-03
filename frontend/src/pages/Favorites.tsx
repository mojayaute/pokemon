import { useState, useEffect } from "react";
import Header from "../components/Header";
import PokemonService from "../services/PokemonService";
import type { Pokemon } from "../interfaces/types";

function Favorites() {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const endpoints = await getIdPokemons();

      const responses = await Promise.all(
        endpoints.map((endpoint) =>
          fetch(endpoint).then((response) => response.json()),
        ),
      );
      const data = responses.map(
        (response) =>
          ({
            id: response.id,
            name: response.name,
            image: response.sprites.front_default,
          }) as Pokemon,
      );
      setPokemonData(data);
    };

    fetchData();
  }, []);

  const getIdPokemons = async () => {
    try {
      const response = await PokemonService.getAllPokemon();
      const pokemones = response.data;

      const endpoints = pokemones.map(
        (pokemon) => `https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon_id}/`,
      );

      return endpoints;
    } catch (error) {
      return [];
    }
  };

  return (
    <>
      <Header />
      <div className="container pt-5">
        <div className="row mb-3">
          <div className="col-md-6">
            <h3>Pokemon Favorites</h3>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-12">
            {pokemonData.map((pokemon) => (
              <div className="col-md-12 bg-light p-2 mb-1" key={pokemon.id}>
                <img src={pokemon.image} alt={pokemon.name} />
                {pokemon.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Favorites;
