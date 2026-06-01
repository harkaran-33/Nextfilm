import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Recommendation from "./pages/Recommendation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/home" element={<Home />} />

        <Route
          path="/movie/:id"
          element={<MovieDetails />}
        />

        <Route
          path="/recommendations"
          element={<Recommendation />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;