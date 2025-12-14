import { createBrowserRouter } from "react-router-dom";
import CharactersPage from "../pages/CharactersPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CharactersPage />,
  },
]);
