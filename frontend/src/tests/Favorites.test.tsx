import { render, screen, waitFor } from "@testing-library/react";
import Favorites from "../pages/Favorites";
import PokemonService from "../services/PokemonService";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; 
import store from "../redux/store";

jest.mock("../services/PokemonService", () => ({
  getAllPokemon: jest.fn(() =>
    Promise.resolve({
      data: [{ pokemon_id: 1 }, { pokemon_id: 2 }],
    }),
  ),
}));

test("renders Favorites component", async () => {
  render(
    <BrowserRouter>
      <Provider store={store}> 
        <Favorites />
      </Provider>
    </BrowserRouter>,
  );

  expect(screen.getByText("Pokemon")).toBeInTheDocument();

  await waitFor(() => {
    expect(PokemonService.getAllPokemon).toHaveBeenCalledTimes(1);
  });

  const pokemons = await screen.findAllByText(/pokemon/i);
  expect(pokemons).toHaveLength(2);
});
