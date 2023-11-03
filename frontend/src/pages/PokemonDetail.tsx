import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import type { Pokemon, RouteParams } from "../interfaces/types";

const PokemonDetail: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const { id } = useParams<RouteParams>();

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${id}/`,
        );
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      }
    };

    fetchPokemon();
  }, [id]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div>
        <div className="container pt-5">
          <div className="row justify-content-center">
            <div className="col-md-6 bg-light p-2">
              <img
                src={pokemon.sprites.front_default}
                height="400"
                alt={pokemon.name}
              />
            </div>

            <div className="col-md-6 bg-light p-5">
              <h2>{pokemon.name}</h2>
              <div>
                <h6>Abilities:</h6>
                {pokemon.abilities.map((ability, index) => (
                  <p key={index}>{index+1}.-{ability.ability.name}</p>
                ))}
              </div>

              <div>
                
                <p>Experience: {pokemon.base_experience}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
