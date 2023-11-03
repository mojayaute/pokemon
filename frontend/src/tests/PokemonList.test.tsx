import { render, waitFor, screen } from "@testing-library/react";
import PokemonList from "../pages/PokemonList";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; 
import store from "../redux/store";

jest.mock("../services/PokemonService", () => ({
  savePokemon: jest.fn().mockResolvedValue({ status: 200 }),
}));

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

test("renders PokemonList component", async () => {
  render(
    <BrowserRouter>
      <Provider store={store}> 
        <PokemonList />
      </Provider>
    </BrowserRouter>,
  );

  expect(screen.getByText("Pokemon List")).toBeInTheDocument();

  const mockResponse = {
    results: [
      { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
      { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
    ],
  };

  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockResponse),
  });

  await waitFor(() => {
    const addButtonElements = document.getElementsByClassName("add-button");
    const pokemonItems = Array.from(addButtonElements);
    expect(pokemonItems).toHaveLength(20);
  });
});
