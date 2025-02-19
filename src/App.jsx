import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout/Layout";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import ResultPage from "./pages/ResultPage/ResultPage";
import FavoritePage from "./pages/FavoritePage/FavoritePage";
import ActorDetails from "./pages/ActorDetails/ActorDetails";
import FilmDetails from "./pages/FilmDetails/FilmDetails";
import NotFound from "./pages/NotFound/NotFound";

const routes = createBrowserRouter([
  { path: "login", element: <Login /> },
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "result", element: <ResultPage /> },
      { path: "result/:type", element: <ResultPage /> },
      { path: "FavoritePage", element: <FavoritePage /> },
      { path: "ActorDetails", element: <ActorDetails /> },
      { path: "FilmDetails/:id", element: <FilmDetails /> },
      { path: "FilmDetails/:type/:id", element: <FilmDetails /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;
