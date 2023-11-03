import HttpService from "../HttpService";
import type { Pokemon } from "../interfaces/types";

const savePokemon = (id: number) => {
  const pokemon = { id };
  return HttpService.post<Pokemon>("/pokemon", pokemon);
};

const getAllPokemon = () => {
  return HttpService.get<Pokemon[]>("/pokemon/list");
};

export default {
  savePokemon,
  getAllPokemon,
};
