import { render, screen } from "@testing-library/react";
import PokemonDetail from "../pages/PokemonDetail";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; 
import store from "../redux/store";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: "1",
  }),
}));

test("renders PokemonDetail component", async () => {
  render(
    <BrowserRouter>
      <Provider store={store}> 
        <PokemonDetail />
      </Provider>
    </BrowserRouter>,
  );

  expect(screen.getByText("Loading...")).toBeInTheDocument();
});
