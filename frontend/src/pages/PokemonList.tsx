import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import PokemonService from "../services/PokemonService";
import type { Pokemon } from "../interfaces/types";
import Swal from "sweetalert2";

function PokemonList() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 20;

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/?limit=151`,
        );
        const data = await response.json();
        setPokemonList(data.results);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      }
    };

    fetchPokemon();
  }, []);

  const handlePokemonClick = (url: string) => {
    const pokemon_id = parseInt(getIdUrl(url), 10);

    PokemonService.savePokemon(pokemon_id)
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            title: "Done",
            text: "Pokemon added",
            icon: "success",
          }).then((result) => {});
        } else {
          Swal.fire({
            title: "Error",
            text: "Error, inténtalo más tarde",
            icon: "error",
          }).then((result) => {});
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const getTotalPages = () => Math.ceil(pokemonList.length / itemsPerPage);
  const visiblePokemon = pokemonList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleNextPage = () => {
    if (currentPage < getTotalPages()) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getIdUrl = (url: string) => {
    const parts = url.split("/");
    const id = parts[parts.length - 2];
    return id;
  };

  return (
    <>
      <Header />
      <div className="container pt-5">
        <div className="row justify-content-center">
          <h2>Pokemon List</h2>
          {visiblePokemon.map((pokemon) => (
            <div
              key={pokemon.name}
              className="text-center col-md-5 offset-md-1 bg-light p-2 mb-1"
            >
              <Link to={`/pokemon/detail/${getIdUrl(pokemon.url)}`}>
                {pokemon.name}
              </Link>
              <button
                onClick={() => handlePokemonClick(pokemon.url)}
                className="btn add-button"
              >
                {" "}
                Add{" "}
              </button>
            </div>
          ))}
        </div>
        <div className="row justify-content-center">
          <div className="col-md-10  mt-4">
            <button
              onClick={handlePrevPage}
              className="btn"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              className="btn"
              disabled={currentPage === getTotalPages()}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PokemonList;
