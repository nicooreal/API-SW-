import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import CharactersPage from "../pages/CharactersPage.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/characters",
    element: <CharactersPage />,
  },
]);