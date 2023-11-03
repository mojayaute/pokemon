import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Profile from "../pages/Profile";
import { BrowserRouter } from "react-router-dom";

const mockStore = configureStore([]);

test("renders Profile component", () => {
  const initialState = {
    user: {
      full_name: "John Doe",
      username: "johndoe",
      email: "john.doe@example.com",
    },
  };

  const store = mockStore(initialState);

  render(
    <BrowserRouter>
      <Provider store={store}>
        <Profile />
      </Provider>
    </BrowserRouter>,
  );

  expect(screen.getByText("User Profile")).toBeInTheDocument();
});

test("updates user data on input change", () => {
  const initialState = {
    user: {
      full_name: "John Doe",
      username: "johndoe",
      email: "john.doe@example.com",
    },
  };

  const store = mockStore(initialState);

  render(
    <BrowserRouter>
      <Provider store={store}>
        <Profile />
      </Provider>
    </BrowserRouter>,
  );

  fireEvent.change(screen.getByPlaceholderText("Full name"), {
    target: { value: "Jane Doe" },
  });

  const actions = store.getActions();
  expect(actions).toEqual([
    {
      type: "user/changeUserData",
      payload: {
        full_name: "Jane Doe",
        username: "johndoe",
        email: "john.doe@example.com",
      },
    },
  ]);
});
